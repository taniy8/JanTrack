export const officerOverviewStats = [
  { id: 'assigned', label: 'Total Assigned Complaints', value: 18, suffix: '', description: 'Complaints currently linked to your queue', accent: 'from-blue-600 to-cyan-500' },
  { id: 'pending', label: 'New / Pending', value: 6, suffix: '', description: 'Awaiting review or first action', accent: 'from-amber-500 to-orange-500' },
  { id: 'in-progress', label: 'In Progress', value: 9, suffix: '', description: 'Cases actively being worked on', accent: 'from-violet-500 to-fuchsia-500' },
  { id: 'resolved', label: 'Resolved Complaints', value: 14, suffix: '', description: 'Complaints completed successfully', accent: 'from-emerald-500 to-teal-500' },
  { id: 'overdue', label: 'Overdue Complaints', value: 3, suffix: '', description: 'Past due and requiring attention', accent: 'from-rose-500 to-red-500' },
  { id: 'avg-time', label: 'Average Resolution Time', value: 2.8, suffix: ' days', decimals: 1, description: 'Average time to close a case', accent: 'from-sky-500 to-blue-500' },
];

export const officerActivityStats = [
  { id: 'new-today', label: 'New complaints today', value: 4, suffix: '' },
  { id: 'updated-today', label: 'Complaints updated today', value: 7, suffix: '' },
  { id: 'resolved-today', label: 'Resolved today', value: 2, suffix: '' },
  { id: 'awaiting-action', label: 'Awaiting action', value: 5, suffix: '' },
];

export const officerPerformanceMetrics = [
  { id: 'resolution-rate', label: 'Resolution Rate', value: 87, suffix: '%', description: 'Cases closed successfully' },
  { id: 'avg-time', label: 'Average Resolution Time', value: 2.8, suffix: ' days', decimals: 1, description: 'Average turnaround' },
  { id: 'handled-month', label: 'Handled This Month', value: 42, suffix: '', description: 'Complaints addressed this month' },
  { id: 'resolved-week', label: 'Resolved This Week', value: 13, suffix: '', description: 'Cases finished this week' },
  { id: 'pending-percent', label: 'Pending', value: 18, suffix: '%', description: 'Open cases still pending' },
  { id: 'satisfaction', label: 'Citizen Satisfaction', value: 91, suffix: '%', description: 'Average public feedback score' },
];

export const officerStatusDistribution = [
  { label: 'Pending', value: 18, color: 'from-amber-500 to-orange-500' },
  { label: 'In Progress', value: 24, color: 'from-sky-500 to-cyan-500' },
  { label: 'Resolved', value: 42, color: 'from-emerald-500 to-teal-500' },
  { label: 'Closed', value: 31, color: 'from-blue-600 to-indigo-600' },
  { label: 'Overdue', value: 12, color: 'from-rose-500 to-pink-500' },
];

export const officerActivityTimeline = [
  { time: '10:42 AM', title: 'JT-1042 marked as Resolved', detail: 'Completion proof uploaded and verified.' },
  { time: '09:35 AM', title: 'JT-1051 assigned to you', detail: 'New complaint routed to your queue.' },
  { time: '09:10 AM', title: 'JT-1048 status changed to In Progress', detail: 'Inspection team updated the case notes.' },
  { time: 'Yesterday', title: 'JT-1038 completion proof uploaded', detail: 'Citizen evidence attached for final review.' },
];

export const officerComplaintHistory = [
  { id: 'JT-1042', type: 'Street Light', location: 'Main Market', reportedDate: '05 Aug', resolvedDate: '07 Aug', status: 'Resolved', priority: 'High' },
  { id: 'JT-1038', type: 'Road Damage', location: 'Station Road', reportedDate: '03 Aug', resolvedDate: '06 Aug', status: 'Resolved', priority: 'High' },
  { id: 'JT-1027', type: 'Garbage Collection', location: 'Ward 4', reportedDate: '01 Aug', resolvedDate: '04 Aug', status: 'Closed', priority: 'Medium' },
  { id: 'JT-1019', type: 'Water Supply', location: 'Ward 2', reportedDate: '29 Jul', resolvedDate: '02 Aug', status: 'Resolved', priority: 'Medium' },
  { id: 'JT-1008', type: 'Drainage', location: 'Civil Lines', reportedDate: '27 Jul', resolvedDate: '30 Jul', status: 'Resolved', priority: 'Low' },
];

export const officerComplaintActivityData = [
  { id: 'JT-1042', title: 'Street Light Repair', category: 'Street Light', location: 'New Delhi, Main Market', department: 'Public Works', priority: 'High', status: 'In Progress', submittedDate: '08 Aug 2026', lastUpdated: 'Today', description: 'Streetlight outage reported near the central market and needs immediate inspection.', assignedOfficer: 'Officer R. Shah', createdAt: '2026-08-08' },
  { id: 'JT-1041', title: 'Road Damage', category: 'Road Damage', location: 'Ghaziabad', department: 'Road & Transport', priority: 'High', status: 'Assigned', submittedDate: '07 Aug 2026', lastUpdated: 'Today', description: 'Large pothole causing vehicle disruption and pedestrian risk.', assignedOfficer: 'Officer R. Shah', createdAt: '2026-08-07' },
  { id: 'JT-1039', title: 'Garbage Collection', category: 'Garbage Collection', location: 'Pilkhuwa', department: 'Sanitation', priority: 'Medium', status: 'Resolved', submittedDate: '05 Aug 2026', lastUpdated: 'Yesterday', description: 'Overflowing bins were cleared and sanitation team completed follow-up.', assignedOfficer: 'Officer R. Shah', createdAt: '2026-08-05' },
  { id: 'JT-1037', title: 'Water Supply', category: 'Water Supply', location: 'Hapur', department: 'Water Department', priority: 'High', status: 'Pending', submittedDate: '04 Aug 2026', lastUpdated: '2 days ago', description: 'Low pressure reported during the evening and water service needs review.', assignedOfficer: 'Officer R. Shah', createdAt: '2026-08-04' },
  { id: 'JT-1035', title: 'Drainage', category: 'Drainage', location: 'Ghaziabad', department: 'Municipal Services', priority: 'Medium', status: 'Resolved', submittedDate: '02 Aug 2026', lastUpdated: '4 days ago', description: 'Drain blockage cleared after a site inspection and cleanup.', assignedOfficer: 'Officer R. Shah', createdAt: '2026-08-02' },
  { id: 'JT-1032', title: 'Street Light', category: 'Street Light', location: 'Hapur', department: 'Public Works', priority: 'Low', status: 'Resolved', submittedDate: '31 Jul 2026', lastUpdated: '8 days ago', description: 'Faulty lighting fixture replaced and site verified.', assignedOfficer: 'Officer R. Shah', createdAt: '2026-07-31' },
];

export const officerRecentUpdates = [
  { title: 'Complaint JT-1042 assigned to Public Works', detail: 'A new inspection task was routed to the field team.' },
  { title: 'Complaint JT-1041 status changed to In Progress', detail: 'The road repair team started work at the site.' },
  { title: 'Complaint JT-1039 marked as Resolved', detail: 'Sanitation follow-up was completed successfully.' },
  { title: 'New complaint JT-1043 received', detail: 'A fresh drainage concern was logged for review.' },
  { title: 'Proof of completion uploaded for JT-1035', detail: 'The citizen evidence was attached to close the case.' },
];
