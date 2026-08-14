import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import {
  getSeedStore,
  getAnalyticsSummary,
  createComplaintRecord,
  updateComplaintRecord,
  createUserRecord,
  updateUserRecord,
  deleteUserRecord,
  createDepartmentRecord,
  updateDepartmentRecord,
  deleteDepartmentRecord,
  createCategoryRecord,
  updateCategoryRecord,
  deleteCategoryRecord,
} from './store.js';

const app = express();
const port = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET || 'jantrack-dev-secret';
const frontendOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173').split(',').map((entry) => entry.trim()).filter(Boolean);
const store = getSeedStore();

app.use(cors({ origin: frontendOrigins }));
app.use(express.json());

function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  if (!header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    req.user = jwt.verify(header.slice(7), jwtSecret);
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = store.users.find((entry) => entry.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const passwordMatches = bcrypt.compareSync(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role, email: user.email, name: user.name }, jwtSecret, { expiresIn: '6h' });
  res.json({ token, user: { ...user, password: undefined } });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password, role = 'Citizen', citizenId, profile = {} } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email and password are required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = store.users.find((entry) => entry.email === normalizedEmail);
  if (existingUser) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const normalizedRole = String(role || 'Citizen').trim();

  const user = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: normalizedRole,
    citizenId: citizenId || `CTZ${Date.now().toString().slice(-4)}`,
    status: 'Active',
    createdAt: new Date().toISOString(),
    profile,
  };

  store.users.unshift(user);
  store.auditLogs.unshift({ id: `audit-${Date.now()}`, action: 'User Registered', actor: name, module: 'Users', createdAt: new Date().toISOString() });
  const token = jwt.sign({ id: user.id, role: user.role, email: user.email, name: user.name }, jwtSecret, { expiresIn: '6h' });
  res.status(201).json({ token, user: { ...user, password: undefined } });
});

app.get('/api/me', authenticate, (req, res) => {
  const user = store.users.find((entry) => entry.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user: { ...user, password: undefined } });
});

function authorize(allowedRoles = []) {
  return (req, res, next) => {
    if (!allowedRoles.length) return next();
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

app.get('/api/analytics', authenticate, (req, res) => {
  res.json({ summary: getAnalyticsSummary(store) });
});

app.get('/api/users', authenticate, authorize(['Admin']), (req, res) => {
  res.json({ users: store.users });
});

app.get('/api/users/:id', authenticate, (req, res) => {
  const user = store.users.find((entry) => entry.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
});

app.post('/api/users', authenticate, authorize(['Admin']), (req, res) => {
  const { name, email, password, role, profile, status, citizenId } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required' });
  const existing = store.users.some((entry) => entry.email === email);
  if (existing) return res.status(409).json({ error: 'Email already in use' });
  const user = createUserRecord(store, { name, email, password, role, profile, status, citizenId, createdBy: req.user.name });
  res.status(201).json({ user });
});

app.patch('/api/users/:id', authenticate, authorize(['Admin']), (req, res) => {
  const user = updateUserRecord(store, req.params.id, { ...req.body, actor: req.user.name });
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ user });
});

app.delete('/api/users/:id', authenticate, authorize(['Admin']), (req, res) => {
  const deleted = deleteUserRecord(store, req.params.id);
  if (!deleted) return res.status(404).json({ error: 'User not found' });
  res.json({ user: deleted });
});

app.get('/api/departments', authenticate, (req, res) => {
  res.json({ departments: store.departments });
});

app.post('/api/departments', authenticate, authorize(['Admin']), (req, res) => {
  const department = createDepartmentRecord(store, req.body);
  res.status(201).json({ department });
});

app.patch('/api/departments/:id', authenticate, authorize(['Admin']), (req, res) => {
  const department = updateDepartmentRecord(store, req.params.id, { ...req.body, actor: req.user.name });
  if (!department) return res.status(404).json({ error: 'Department not found' });
  res.json({ department });
});

app.delete('/api/departments/:id', authenticate, authorize(['Admin']), (req, res) => {
  const deleted = deleteDepartmentRecord(store, req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Department not found' });
  res.json({ department: deleted });
});

app.get('/api/categories', authenticate, (req, res) => {
  res.json({ categories: store.categories });
});

app.post('/api/categories', authenticate, authorize(['Admin']), (req, res) => {
  const category = createCategoryRecord(store, req.body);
  res.status(201).json({ category });
});

app.patch('/api/categories/:id', authenticate, authorize(['Admin']), (req, res) => {
  const category = updateCategoryRecord(store, req.params.id, { ...req.body, actor: req.user.name });
  if (!category) return res.status(404).json({ error: 'Category not found' });
  res.json({ category });
});

app.delete('/api/categories/:id', authenticate, authorize(['Admin']), (req, res) => {
  const deleted = deleteCategoryRecord(store, req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Category not found' });
  res.json({ category: deleted });
});

app.get('/api/complaints', authenticate, (req, res) => {
  res.json({ complaints: store.complaints });
});

app.get('/api/complaints/:id', authenticate, (req, res) => {
  const complaint = store.complaints.find((item) => item.id === req.params.id);
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
  res.json({ complaint });
});

app.post('/api/complaints', authenticate, (req, res) => {
  const complaint = createComplaintRecord(store, req.body);
  res.status(201).json({ complaint });
});

app.patch('/api/complaints/:id', authenticate, (req, res) => {
  const complaint = updateComplaintRecord(store, req.params.id, { ...req.body, actor: req.user.name });
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
  res.json({ complaint });
});

app.delete('/api/complaints/:id', authenticate, authorize(['Admin']), (req, res) => {
  const index = store.complaints.findIndex((item) => item.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Complaint not found' });
  const [deleted] = store.complaints.splice(index, 1);
  store.auditLogs.unshift({ id: uuidv4(), action: 'Complaint Deleted', actor: req.user.name, module: 'Complaints', createdAt: new Date().toISOString() });
  res.json({ complaint: deleted });
});

app.get('/api/notifications', authenticate, (req, res) => {
  res.json({ notifications: store.notifications });
});

app.patch('/api/notifications/:id', authenticate, (req, res) => {
  const notification = store.notifications.find((item) => item.id === req.params.id);
  if (!notification) return res.status(404).json({ error: 'Notification not found' });
  Object.assign(notification, req.body);
  res.json({ notification });
});

app.get('/api/audit-logs', authenticate, authorize(['Admin']), (req, res) => {
  res.json({ auditLogs: store.auditLogs });
});

app.listen(port, () => {
  console.log(`JanTrack server listening on port ${port}`);
});
