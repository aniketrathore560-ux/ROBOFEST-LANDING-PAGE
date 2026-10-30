import type {
  LeaderInfo,
  LeaderValidationErrors,
  TeamMember,
  MembersValidationErrors,
  MemberErrorItem,
} from '../types';
import { ROBOT_EVENTS } from '../data/events';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
const PHONE_REGEX = /^[0-9]{10}$/;

/**
 * Validates Step 1: Team Leader and basic team data.
 */
export function validateLeaderInfo(data: LeaderInfo): {
  isValid: boolean;
  errors: LeaderValidationErrors;
} {
  const errors: LeaderValidationErrors = {};

  const trimmedTeam = (data.teamName || '').trim();
  if (!trimmedTeam) {
    errors.teamName = 'Team name is required.';
  } else if (trimmedTeam.length < 2) {
    errors.teamName = 'Team name must be at least 2 characters.';
  } else if (trimmedTeam.length > 50) {
    errors.teamName = 'Team name cannot exceed 50 characters.';
  }

  const trimmedCollege = (data.college || '').trim();
  if (!trimmedCollege) {
    errors.college = 'College / Institute name is required.';
  } else if (trimmedCollege.length < 2) {
    errors.college = 'College name must be at least 2 characters.';
  }

  if (!data.eventId || data.eventId.trim() === '') {
    errors.eventId = 'Please select a competitive event arena.';
  }

  const trimmedLeader = (data.leaderName || '').trim();
  if (!trimmedLeader) {
    errors.leaderName = 'Team leader name is required.';
  } else if (trimmedLeader.length < 2) {
    errors.leaderName = 'Leader name must be at least 2 characters.';
  }

  const trimmedEmail = (data.leaderEmail || '').trim();
  if (!trimmedEmail) {
    errors.leaderEmail = 'Leader email is required.';
  } else if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.leaderEmail = 'Please provide a valid email address.';
  }

  const cleanPhone = (data.leaderPhone || '').replace(/[\s\-()]/g, '');
  if (!cleanPhone) {
    errors.leaderPhone = 'Leader mobile number is required.';
  } else if (!PHONE_REGEX.test(cleanPhone)) {
    errors.leaderPhone = 'Please enter a valid 10-digit mobile number.';
  }

  const trimmedStudentId = (data.leaderStudentId || '').trim();
  if (!trimmedStudentId) {
    errors.leaderStudentId = 'College Roll No or Student ID is required.';
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}

/**
 * Validates Step 2: Remaining team members according to the event rules.
 * Total team size = 1 leader + N members.
 */
export function validateTeamMembers(
  members: TeamMember[],
  eventId: string
): {
  isValid: boolean;
  errors: MembersValidationErrors;
} {
  const errors: MembersValidationErrors = {
    members: {},
  };

  const event = ROBOT_EVENTS.find((e) => e.id === eventId);
  const minRequiredRemaining = event ? Math.max(1, event.minMembers - 1) : 1;
  const maxAllowedRemaining = event ? event.maxMembers - 1 : 4;

  if (members.length < minRequiredRemaining) {
    errors.general = `This event requires at least ${minRequiredRemaining} additional member(s) besides the team leader.`;
  } else if (members.length > maxAllowedRemaining) {
    errors.general = `Maximum ${maxAllowedRemaining} additional members allowed for this event.`;
  }

  let hasMemberError = false;

  members.forEach((member, index) => {
    const memberErr: MemberErrorItem = {};

    const trimmedName = (member.name || '').trim();
    if (!trimmedName) {
      memberErr.name = 'Full name is required.';
      hasMemberError = true;
    } else if (trimmedName.length < 2) {
      memberErr.name = 'Must be at least 2 characters.';
      hasMemberError = true;
    }

    const trimmedEmail = (member.email || '').trim();
    if (!trimmedEmail) {
      memberErr.email = 'Email is required.';
      hasMemberError = true;
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      memberErr.email = 'Invalid email address.';
      hasMemberError = true;
    }

    const cleanPhone = (member.phone || '').replace(/[\s\-()]/g, '');
    if (!cleanPhone) {
      memberErr.phone = '10-digit phone required.';
      hasMemberError = true;
    } else if (!PHONE_REGEX.test(cleanPhone)) {
      memberErr.phone = 'Must be a 10-digit number.';
      hasMemberError = true;
    }

    const trimmedId = (member.studentId || '').trim();
    if (!trimmedId) {
      memberErr.studentId = 'Roll No / ID required.';
      hasMemberError = true;
    }

    if (Object.keys(memberErr).length > 0) {
      errors.members[index] = memberErr;
    }
  });

  const isValid = !errors.general && !hasMemberError;
  return { isValid, errors };
}

/**
 * Backward compatibility helper for legacy one-step form if referenced.
 */
export function validateRegistrationForm(data: any): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const leaderRes = validateLeaderInfo({
    teamName: data.teamName || '',
    college: data.college || 'NIT Raipur',
    eventId: data.eventId || 'robo-wars',
    leaderName: data.leaderName || '',
    leaderEmail: data.email || '',
    leaderPhone: data.phone || '',
    leaderStudentId: 'LEAD-01',
    leaderBranchYear: 'Engineering',
  });

  const errors: Record<string, string> = {};
  if (leaderRes.errors.teamName) errors.teamName = leaderRes.errors.teamName;
  if (leaderRes.errors.leaderName) errors.leaderName = leaderRes.errors.leaderName;
  if (leaderRes.errors.leaderEmail) errors.email = leaderRes.errors.leaderEmail;
  if (leaderRes.errors.leaderPhone) errors.phone = leaderRes.errors.leaderPhone;
  if (leaderRes.errors.eventId) errors.eventId = leaderRes.errors.eventId;

  return { isValid: Object.keys(errors).length === 0, errors };
}
