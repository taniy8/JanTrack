const STORAGE_KEYS = {
  users: 'jtrack-users',
  complaints: 'jtrack-complaints',
  auditLog: 'jtrack-audit-log',
};

const defaultUsers = [
  {
    id: 1,
    name: 'Asha Patel',
    email: 'citizen@jtrack.gov.in',
    password: 'password123',
    role: 'Citizen',
    citizenId: 'CTZ1001',
    profile: {
      state: 'Delhi',
      district: 'Central Delhi',
      city: 'New Delhi',
      address: 'House 42, Gulmohar Lane',
      pincode: '110001',
    },
  },
  {
    id: 2,
    name: 'Rohan Mehta',
    email: 'officer@jtrack.gov.in',
    password: 'password123',
    role: 'Officer',
    citizenId: 'OFF1002',
    profile: {
      department: 'Public Works',
      state: 'Delhi',
      city: 'New Delhi',
    },
  },
  {
    id: 3,
    name: 'Priya Nair',
    email: 'supervisor@jtrack.gov.in',
    password: 'password123',
    role: 'Department Head',
    citizenId: 'SUP1003',
    profile: {
      department: 'Water Supply',
      state: 'Delhi',
      city: 'New Delhi',
    },
  },
  {
    id: 4,
    name: 'Aman Rao',
    email: 'admin@jtrack.gov.in',
    password: 'password123',
    role: 'Admin',
    citizenId: 'ADM1004',
    profile: {
      department: 'Administration',
      state: 'Delhi',
      city: 'New Delhi',
    },
  },
];

const defaultComplaints = [
  {
    id: 'JT-1042',
    citizenId: 'CTZ1001',
    citizenName: 'Asha Patel',
    title: 'Streetlight outage near main market',
    category: 'Street Light',
    description: 'The streetlight outside the municipal market has been out for over a week and the area feels unsafe at night.',
    location: 'New Delhi, Main Market',
    priority: 'High',
    status: 'In Progress',
    department: 'Public Works',
    assignedTo: 'Rohan Mehta',
    attachments: ['photo-1.jpg'],
    createdAt: '2026-07-21T09:30:00.000Z',
    updates: [
      { title: 'Complaint filed', detail: 'The case was accepted and routed to Public Works.', createdAt: '2026-07-21T09:30:00.000Z' },
      { title: 'Under review', detail: 'Officer Rohan Mehta requested an inspection visit.', createdAt: '2026-07-22T10:15:00.000Z' },
    ],
    notes: 'Replacement lamp has been ordered.',
    resolutionProof: 'Replacement completed and photographed.',
    feedback: '',
    escalated: false,
  },
  {
    id: 'JT-1051',
    citizenId: 'CTZ1001',
    citizenName: 'Asha Patel',
    title: 'Water leakage near park road',
    category: 'Water Supply',
    description: 'There is continuous water leakage causing traffic blockage and puddling near the park road.',
    location: 'New Delhi, Park Road',
    priority: 'Medium',
    status: 'Submitted',
    department: 'Water Supply',
    assignedTo: 'Priya Nair',
    attachments: ['leakage.jpg'],
    createdAt: '2026-07-24T13:45:00.000Z',
    updates: [
      { title: 'Complaint filed', detail: 'Submitted for water team review.', createdAt: '2026-07-24T13:45:00.000Z' },
    ],
    notes: 'Awaiting site inspection.',
    resolutionProof: '',
    feedback: '',
    escalated: false,
  },
];

const defaultAuditLog = [
  { id: 1, action: 'Administrator reviewed complaint analytics', actor: 'Aman Rao', createdAt: '2026-07-26T11:15:00.000Z' },
  { id: 2, action: 'Officer updated complaint status', actor: 'Rohan Mehta', createdAt: '2026-07-25T14:00:00.000Z' },
];

function readStorage(key, fallback) {
  try {
    const current = localStorage.getItem(key);
    return current ? JSON.parse(current) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function seedDemoData() {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    writeStorage(STORAGE_KEYS.users, defaultUsers);
  }
  if (!localStorage.getItem(STORAGE_KEYS.complaints)) {
    writeStorage(STORAGE_KEYS.complaints, defaultComplaints);
  }
  if (!localStorage.getItem(STORAGE_KEYS.auditLog)) {
    writeStorage(STORAGE_KEYS.auditLog, defaultAuditLog);
  }
}

export function getStoredUsers() {
  seedDemoData();
  return readStorage(STORAGE_KEYS.users, defaultUsers);
}

export function saveStoredUsers(users) {
  writeStorage(STORAGE_KEYS.users, users);
}

export function getStoredComplaints() {
  seedDemoData();
  return readStorage(STORAGE_KEYS.complaints, defaultComplaints);
}

export function saveStoredComplaints(complaints) {
  writeStorage(STORAGE_KEYS.complaints, complaints);
}

export function getStoredAuditLog() {
  seedDemoData();
  return readStorage(STORAGE_KEYS.auditLog, defaultAuditLog);
}

export function saveStoredAuditLog(entries) {
  writeStorage(STORAGE_KEYS.auditLog, entries);
}

export function normalizeRole(role) {
  const value = String(role || 'Citizen').trim().toLowerCase();
  if (['citizen', 'citizen user'].includes(value)) return 'citizen';
  if (['officer', 'department officer', 'field officer'].includes(value)) return 'officer';
  if (['department head', 'department-head', 'supervisor', 'department supervisor', 'head'].includes(value)) return 'department-head';
  if (['admin', 'administrator', 'system admin'].includes(value)) return 'admin';
  return value.replace(/\s+/g, '-');
}

export function isRoleAllowed(userRole, allowedRoles = []) {
  if (!allowedRoles.length) return true;
  const normalizedRole = normalizeRole(userRole);
  return allowedRoles.some((role) => normalizeRole(role) === normalizedRole);
}

export function getRoleDashboardPath(role) {
  switch (normalizeRole(role)) {
    case 'admin':
      return '/admin/dashboard';
    case 'officer':
      return '/officer/dashboard';
    case 'department-head':
      return '/department-dashboard';
    case 'citizen':
    default:
      return '/citizen/dashboard';
  }
}

export function createComplaint(payload) {
  const complaints = getStoredComplaints();
  const complaint = {
    id: payload.id || `JT-${Date.now().toString().slice(-6)}`,
    citizenId: payload.citizenId || 'CTZ1001',
    citizenName: payload.citizenName || 'Citizen User',
    title: payload.title || 'New Complaint',
    category: payload.category || 'Other',
    description: payload.description || '',
    location: payload.location || 'Location not provided',
    priority: payload.priority || 'Medium',
    status: payload.status || 'Submitted',
    department: payload.department || 'Pending Assignment',
    assignedTo: payload.assignedTo || 'Unassigned',
    attachments: payload.attachments || [],
    createdAt: payload.createdAt || new Date().toISOString(),
    updates: payload.updates || [
      { title: 'Complaint filed', detail: 'Submitted through JanTrack.', createdAt: new Date().toISOString() },
    ],
    notes: payload.notes || '',
    resolutionProof: payload.resolutionProof || '',
    feedback: payload.feedback || '',
    escalated: Boolean(payload.escalated),
  };
  const nextComplaints = [complaint, ...complaints];
  saveStoredComplaints(nextComplaints);
  return complaint;
}

export function updateComplaint(complaintId, updates) {
  const complaints = getStoredComplaints();
  const nextComplaints = complaints.map((item) => (item.id === complaintId ? { ...item, ...updates } : item));
  saveStoredComplaints(nextComplaints);
  return nextComplaints.find((item) => item.id === complaintId);
}

export function addComplaintUpdate(complaintId, entry) {
  const complaints = getStoredComplaints();
  const nextComplaints = complaints.map((item) => {
    if (item.id !== complaintId) return item;
    const nextUpdates = [
      ...(item.updates || []),
      { ...entry, createdAt: entry.createdAt || new Date().toISOString() },
    ];
    return { ...item, updates: nextUpdates };
  });
  saveStoredComplaints(nextComplaints);
  return nextComplaints.find((item) => item.id === complaintId);
}

export function submitComplaintFeedback(complaintId, feedback) {
  return updateComplaint(complaintId, { feedback, status: 'Resolved' });
}

export function getComplaintsForUser(user) {
  const complaints = getStoredComplaints();
  const normalizedRole = normalizeRole(user?.role);

  if (normalizedRole === 'officer') {
    return complaints.filter((item) => item.assignedTo === user?.name || item.assignedTo === 'Rohan Mehta');
  }

  if (normalizedRole === 'department-head') {
    return complaints.filter((item) => item.department === user?.profile?.department || item.department === 'Water Supply');
  }

  if (normalizedRole === 'admin') {
    return complaints;
  }

  return complaints.filter((item) => item.citizenId === user?.citizenId || item.citizenName === user?.name);
}
