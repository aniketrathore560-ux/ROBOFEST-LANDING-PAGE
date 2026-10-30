import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLeaderInfo, validateTeamMembers, validateRegistrationForm } from './validation';

test('validateLeaderInfo returns valid for complete leader credentials', () => {
  const result = validateLeaderInfo({
    teamName: 'VoltCrushers',
    college: 'NIT Raipur',
    eventId: 'robo-wars',
    leaderName: 'Aarav Sharma',
    leaderEmail: 'aarav@nitrr.ac.in',
    leaderPhone: '9876543210',
    leaderStudentId: '2023ME1045',
    leaderBranchYear: 'Mechanical Engineering, 3rd Year',
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, {});
});

test('validateLeaderInfo flags missing leader details', () => {
  const result = validateLeaderInfo({
    teamName: '',
    college: '',
    eventId: '',
    leaderName: '',
    leaderEmail: 'invalid-email',
    leaderPhone: '123',
    leaderStudentId: '',
    leaderBranchYear: '',
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.teamName);
  assert.ok(result.errors.college);
  assert.ok(result.errors.eventId);
  assert.ok(result.errors.leaderName);
  assert.ok(result.errors.leaderEmail);
  assert.ok(result.errors.leaderPhone);
  assert.ok(result.errors.leaderStudentId);
});

test('validateTeamMembers enforces event team limits and field requirements', () => {
  // Robo Wars requires 2-5 members total (1 leader + 1 to 4 members)
  const emptyMembers = validateTeamMembers([], 'robo-wars');
  assert.equal(emptyMembers.isValid, false);
  assert.ok(emptyMembers.errors.general);

  // Valid members roster
  const validMembers = validateTeamMembers(
    [
      {
        id: 'm1',
        name: 'Rohan Verma',
        email: 'rohan@nitrr.ac.in',
        phone: '9876543211',
        studentId: '2023EE1012',
        role: 'Electronics & Power',
      },
      {
        id: 'm2',
        name: 'Sneha Patel',
        email: 'sneha@nitrr.ac.in',
        phone: '9876543212',
        studentId: '2023CS1089',
        role: 'Firmware & Telemetry',
      },
    ],
    'robo-wars'
  );
  assert.equal(validMembers.isValid, true);
  assert.deepEqual(validMembers.errors.members, {});
});

test('legacy validateRegistrationForm compatibility', () => {
  const res = validateRegistrationForm({
    teamName: 'CyberTitans',
    leaderName: 'Aarav Sharma',
    email: 'aarav@nitrr.ac.in',
    phone: '9876543210',
    eventId: 'robo-wars',
    college: 'NIT Raipur',
  });
  assert.equal(res.isValid, true);
});
