export type EventCategory = 'All' | 'Combat' | 'Autonomous' | 'Design';

export interface RobotEvent {
  id: string;
  title: string;
  category: 'Combat' | 'Autonomous' | 'Design';
  shortDescription: string;
  fullDescription: string;
  prize: string;
  teamSize: string;
  minMembers: number;
  maxMembers: number;
  arenaSpecs: string;
  botSpecs: string;
  rounds: string[];
  rules: string[];
  schedule: string;
  coordinator: {
    name: string;
    contact: string;
  };
  image: string;
  highlight: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentId: string;
  role: string;
}

export interface LeaderInfo {
  teamName: string;
  college: string;
  eventId: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
  leaderStudentId: string;
  leaderBranchYear: string;
}

export interface FullRegistrationData extends LeaderInfo {
  members: TeamMember[];
  registrationId?: string;
  createdAt?: string;
}

export interface LeaderValidationErrors {
  teamName?: string;
  college?: string;
  eventId?: string;
  leaderName?: string;
  leaderEmail?: string;
  leaderPhone?: string;
  leaderStudentId?: string;
  leaderBranchYear?: string;
}

export interface MemberErrorItem {
  name?: string;
  email?: string;
  phone?: string;
  studentId?: string;
  role?: string;
}

export interface MembersValidationErrors {
  general?: string;
  members: { [memberIndex: number]: MemberErrorItem };
}

export interface TimeRemaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}
