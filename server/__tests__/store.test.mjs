import test from 'node:test';
import assert from 'node:assert/strict';
import { getSeedStore, getAnalyticsSummary } from '../store.js';

test('seed store includes default admin, officer and citizen accounts', () => {
  const store = getSeedStore();
  assert.ok(store.users.some((user) => user.role === 'Admin'));
  assert.ok(store.users.some((user) => user.role === 'Officer'));
  assert.ok(store.users.some((user) => user.role === 'Citizen'));
});

test('analytics summary counts complaints by status', () => {
  const store = getSeedStore();
  const summary = getAnalyticsSummary(store);
  assert.ok(summary.totalComplaints >= 1);
  assert.ok(summary.pending >= 0);
  assert.ok(summary.resolved >= 0);
});
