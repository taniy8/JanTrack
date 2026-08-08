import { v4 as uuidv4 } from 'uuid';

const initialUsers = [
  {
    id: 'user-admin',
    name: 'Aman Rao',
    email: 'admin@jtrack.gov.in',
    password: 'password123',
    role: 'Admin',
    citizenId: 'ADM1004',
    status: 'Active',
    createdAt: '2026-01-01T00:00:00.000Z',
    profile: { department: 'Administration', city: 'New Delhi', state: 'Delhi' },
  },
  {
    id: 'user-officer',
    name: 'Rohan Mehta',
    email: 'officer@jtrack.gov.in',
    password: 'password123',
    role: 'Officer',
    citizenId: 'OFF1002',
    status: 'Active',
    createdAt: '2026-01-02T00:00:00.000Z',
    profile: { department: 'Public Works', city: 'New Delhi', state: 'Delhi' },
  },
  {
    id: 'user-citizen',
    name: 'Asha Patel',
    email: 'citizen@jtrack.gov.in',
    password: 'password123',
    role: 'Citizen',
    citizenId: 'CTZ1001',
    status: 'Active',
    createdAt: '2026-01-03T00:00:00.000Z',
    profile: { city: 'New Delhi', state: 'Delhi' },
  },
];

const initialDepartments = [
  { id: 'dept-public-works', name: 'Public Works', description: 'Roads and civic infrastructure', totalOfficers: 1, totalComplaints: 2, pending: 1, resolved: 1 },
  { id: 'dept-water', name: 'Water Supply', description: 'Water and drainage services', totalOfficers: 1, totalComplaints: 1, pending: 1, resolved: 0 },
];

const initialCategories = [
  { id: 'cat-road', name: 'Road Damage', description: 'Potholes and damaged roads' },
  { id: 'cat-water', name: 'Water Supply', description: 'Leaks and water disruptions' },
  { id: 'cat-electricity', name: 'Electricity', description: 'Street light and power issues' },
];

const initialComplaints = [
  {
    id: 'JT-1001',
    title: 'Streetlight outage near main market',
    description: 'The streetlight outside the market has been out for over a week.',
    category: 'Electricity',
    department: 'Public Works',
    citizenName: 'Asha Patel',
    citizenId: 'CTZ1001',
    assignedOfficer: 'Rohan Mehta',
    priority: 'High',
    status: 'In Progress',
    evidence: 'Photo uploaded',
    attachments: ['streetlight.jpg'],
    createdAt: '2026-07-21T09:30:00.000Z',
    updates: [
      { id: 'upd-1', message: 'Complaint submitted', createdAt: '2026-07-21T09:30:00.000Z' },
      { id: 'upd-2', message: 'Officer started review', createdAt: '2026-07-22T10:15:00.000Z' },
    ],
    comments: [],
    feedback: '',
  },
  {
    id: 'JT-1002',
    title: 'Water leakage near park road',
    description: 'Continuous water leakage is causing traffic blockage.',
    category: 'Water Supply',
    department: 'Water Supply',
    citizenName: 'Asha Patel',
    citizenId: 'CTZ1001',
    assignedOfficer: 'Rohan Mehta',
    priority: 'Medium',
    status: 'Pending',
    evidence: 'Leakage photo attached',
    attachments: ['leakage.jpg'],
    createdAt: '2026-07-24T13:45:00.000Z',
    updates: [{ id: 'upd-3', message: 'Complaint submitted', createdAt: '2026-07-24T13:45:00.000Z' }],
    comments: [],
    feedback: '',
  },
];

const initialNotifications = [
  { id: 'notif-1', userId: 'user-citizen', title: 'Complaint Registered', message: 'Your complaint JT-1001 has been registered.', unread: true, createdAt: '2026-07-21T09:30:00.000Z' },
  { id: 'notif-2', userId: 'user-officer', title: 'New Complaint Assigned', message: 'A new complaint JT-1002 needs review.', unread: true, createdAt: '2026-07-24T13:45:00.000Z' },
];

const initialFeedback = [];
const initialAuditLogs = [
  { id: 'audit-1', action: 'Complaint Created', actor: 'Asha Patel', module: 'Complaints', createdAt: '2026-07-21T09:30:00.000Z' },
];

export function getSeedStore() {
  return {
    users: initialUsers.map((user) => ({ ...user })),
    departments: initialDepartments.map((department) => ({ ...department })),
    categories: initialCategories.map((category) => ({ ...category })),
    complaints: initialComplaints.map((complaint) => ({ ...complaint, updates: complaint.updates.map((update) => ({ ...update })) })),
    notifications: initialNotifications.map((notification) => ({ ...notification })),
    feedback: initialFeedback.map((item) => ({ ...item })),
    auditLogs: initialAuditLogs.map((item) => ({ ...item })),
  };
}

export function getAnalyticsSummary(store) {
  return {
    totalComplaints: store.complaints.length,
    pending: store.complaints.filter((item) => item.status === 'Pending').length,
    inProgress: store.complaints.filter((item) => item.status === 'In Progress').length,
    resolved: store.complaints.filter((item) => item.status === 'Resolved').length,
    rejected: store.complaints.filter((item) => item.status === 'Rejected').length,
    totalCitizens: store.users.filter((user) => user.role === 'Citizen').length,
    totalOfficers: store.users.filter((user) => user.role === 'Officer').length,
    totalDepartments: store.departments.length,
  };
}

export function createComplaintRecord(store, payload) {
  const complaint = {
    id: payload.id || `JT-${Date.now().toString().slice(-6)}`,
    title: payload.title,
    description: payload.description,
    category: payload.category || 'Other',
    department: payload.department || 'Pending Assignment',
    citizenName: payload.citizenName,
    citizenId: payload.citizenId,
    assignedOfficer: payload.assignedOfficer || 'Unassigned',
    priority: payload.priority || 'Medium',
    status: payload.status || 'Pending',
    evidence: payload.evidence || '',
    attachments: payload.attachments || [],
    createdAt: payload.createdAt || new Date().toISOString(),
    updates: payload.updates || [{ id: uuidv4(), message: 'Complaint submitted', createdAt: new Date().toISOString() }],
    comments: payload.comments || [],
    feedback: payload.feedback || '',
  };

  store.complaints.unshift(complaint);
  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'Complaint Created',
    actor: payload.citizenName,
    module: 'Complaints',
    createdAt: new Date().toISOString(),
  });

  store.notifications.unshift({
    id: uuidv4(),
    userId: payload.userId || store.users.find((user) => user.role === 'Admin')?.id || 'user-admin',
    title: 'Complaint Registered',
    message: `Complaint ${complaint.id} registered successfully.`,
    unread: true,
    type: 'success',
    createdAt: new Date().toISOString(),
  });

  if (payload.assignedOfficer) {
    const assignedUser = store.users.find((user) => user.name === payload.assignedOfficer);
    if (assignedUser) {
      store.notifications.unshift({
        id: uuidv4(),
        userId: assignedUser.id,
        title: 'New Complaint Assigned',
        message: `Complaint ${complaint.id} has been assigned to you.`,
        unread: true,
        type: 'info',
        createdAt: new Date().toISOString(),
      });
    }
  }

  return complaint;
}

export function updateComplaintRecord(store, complaintId, updates) {
  const complaint = store.complaints.find((item) => item.id === complaintId);
  if (!complaint) return null;

  const previousStatus = complaint.status;
  Object.assign(complaint, updates);
  complaint.updates = [...(complaint.updates || []), { id: uuidv4(), message: updates.message || 'Complaint updated', createdAt: new Date().toISOString() }];

  if (updates.status && updates.status !== previousStatus) {
    store.notifications.unshift({
      id: uuidv4(),
      userId: store.users.find((user) => user.citizenId === complaint.citizenId)?.id || 'user-citizen',
      title: 'Complaint Status Updated',
      message: `Your complaint ${complaint.id} is now ${updates.status}.`,
      unread: true,
      type: 'info',
      createdAt: new Date().toISOString(),
    });
  }

  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'Complaint Updated',
    actor: updates.actor || 'System',
    module: 'Complaints',
    createdAt: new Date().toISOString(),
  });

  return complaint;
}

export function getUserById(store, userId) {
  return store.users.find((user) => user.id === userId) || null;
}

export function createUserRecord(store, payload) {
  const user = {
    id: payload.id || `user-${Date.now()}`,
    name: payload.name,
    email: payload.email,
    password: payload.password,
    role: payload.role || 'Citizen',
    citizenId: payload.citizenId || `CTZ${Date.now().toString().slice(-5)}`,
    status: payload.status || 'Active',
    createdAt: payload.createdAt || new Date().toISOString(),
    profile: payload.profile || {},
  };
  store.users.unshift(user);
  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'User Created',
    actor: payload.createdBy || 'Admin',
    module: 'Users',
    createdAt: new Date().toISOString(),
  });
  store.notifications.unshift({
    id: uuidv4(),
    userId: user.id,
    title: 'Account Created',
    message: `Your ${user.role} account has been created.`,
    unread: true,
    type: 'success',
    createdAt: new Date().toISOString(),
  });
  return user;
}

export function updateUserRecord(store, userId, updates) {
  const user = store.users.find((item) => item.id === userId);
  if (!user) return null;
  Object.assign(user, updates);
  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'User Updated',
    actor: updates.actor || 'Admin',
    module: 'Users',
    createdAt: new Date().toISOString(),
  });
  return user;
}

export function deleteUserRecord(store, userId) {
  const index = store.users.findIndex((item) => item.id === userId);
  if (index === -1) return null;
  const [deleted] = store.users.splice(index, 1);
  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'User Deleted',
    actor: 'Admin',
    module: 'Users',
    createdAt: new Date().toISOString(),
  });
  return deleted;
}

export function createDepartmentRecord(store, payload) {
  const department = {
    id: payload.id || `dept-${Date.now()}`,
    name: payload.name,
    description: payload.description || '',
    totalOfficers: payload.totalOfficers || 0,
    totalComplaints: payload.totalComplaints || 0,
    pending: payload.pending || 0,
    resolved: payload.resolved || 0,
  };
  store.departments.unshift(department);
  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'Department Created',
    actor: payload.actor || 'Admin',
    module: 'Departments',
    createdAt: new Date().toISOString(),
  });
  return department;
}

export function updateDepartmentRecord(store, departmentId, updates) {
  const department = store.departments.find((item) => item.id === departmentId);
  if (!department) return null;
  Object.assign(department, updates);
  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'Department Updated',
    actor: updates.actor || 'Admin',
    module: 'Departments',
    createdAt: new Date().toISOString(),
  });
  return department;
}

export function deleteDepartmentRecord(store, departmentId) {
  const index = store.departments.findIndex((item) => item.id === departmentId);
  if (index === -1) return null;
  const [deleted] = store.departments.splice(index, 1);
  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'Department Deleted',
    actor: 'Admin',
    module: 'Departments',
    createdAt: new Date().toISOString(),
  });
  return deleted;
}

export function createCategoryRecord(store, payload) {
  const category = {
    id: payload.id || `cat-${Date.now()}`,
    name: payload.name,
    description: payload.description || '',
  };
  store.categories.unshift(category);
  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'Category Created',
    actor: payload.actor || 'Admin',
    module: 'Categories',
    createdAt: new Date().toISOString(),
  });
  return category;
}

export function updateCategoryRecord(store, categoryId, updates) {
  const category = store.categories.find((item) => item.id === categoryId);
  if (!category) return null;
  Object.assign(category, updates);
  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'Category Updated',
    actor: updates.actor || 'Admin',
    module: 'Categories',
    createdAt: new Date().toISOString(),
  });
  return category;
}

export function deleteCategoryRecord(store, categoryId) {
  const index = store.categories.findIndex((item) => item.id === categoryId);
  if (index === -1) return null;
  const [deleted] = store.categories.splice(index, 1);
  store.auditLogs.unshift({
    id: uuidv4(),
    action: 'Category Deleted',
    actor: 'Admin',
    module: 'Categories',
    createdAt: new Date().toISOString(),
  });
  return deleted;
}

export function createNotificationRecord(store, payload) {
  const notification = {
    id: payload.id || `notif-${Date.now()}`,
    userId: payload.userId,
    title: payload.title,
    message: payload.message,
    unread: payload.unread ?? true,
    type: payload.type || 'info',
    createdAt: payload.createdAt || new Date().toISOString(),
  };
  store.notifications.unshift(notification);
  return notification;
}

export function updateNotificationRecord(store, notificationId, updates) {
  const notification = store.notifications.find((item) => item.id === notificationId);
  if (!notification) return null;
  Object.assign(notification, updates);
  return notification;
}
