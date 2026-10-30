import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTimeRemaining, getDefaultEventDate } from './countdown';

test('calculateTimeRemaining returns correct breakdown', () => {
  const current = new Date('2026-10-27T10:00:00.000Z');
  // 30 days, 2 hours, 15 minutes, 30 seconds later
  const target = new Date(current.getTime() + (30 * 86400 + 2 * 3600 + 15 * 60 + 30) * 1000);

  const res = calculateTimeRemaining(target, current);
  assert.equal(res.days, 30);
  assert.equal(res.hours, 2);
  assert.equal(res.minutes, 15);
  assert.equal(res.seconds, 30);
  assert.equal(res.isExpired, false);
});

test('calculateTimeRemaining handles expired dates cleanly', () => {
  const current = new Date('2026-10-27T10:00:00.000Z');
  const past = new Date('2026-10-25T10:00:00.000Z');

  const res = calculateTimeRemaining(past, current);
  assert.equal(res.totalMs, 0);
  assert.equal(res.days, 0);
  assert.equal(res.hours, 0);
  assert.equal(res.minutes, 0);
  assert.equal(res.seconds, 0);
  assert.equal(res.isExpired, true);
});

test('getDefaultEventDate returns date exactly 30 days ahead', () => {
  const ref = new Date('2026-10-27T00:00:00.000Z');
  const target = getDefaultEventDate(ref);
  const diffDays = Math.round((target.getTime() - ref.getTime()) / (1000 * 60 * 60 * 24));
  assert.equal(diffDays, 30);
});
