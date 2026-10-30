import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Users,
  Award,
  Calendar,
  MapPin,
  QrCode,
  Download,
  RotateCcw,
  Sparkles,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  IdCard,
} from 'lucide-react';
import {
  LeaderInfo,
  TeamMember,
  LeaderValidationErrors,
  MembersValidationErrors,
  FullRegistrationData,
} from '../types';
import { ROBOT_EVENTS } from '../data/events';
import { validateLeaderInfo, validateTeamMembers } from '../utils/validation';

interface RegistrationPageProps {
  initialEventId?: string;
  onBackToHome: () => void;
}

const ROLES_LIST = [
  'Mechanics & Chassis CAD',
  'Electronics & Power Systems',
  'Autonomous Code & PID Tuning',
  'Bot Driver / Pilot',
  'Pit Crew & Structural Safety',
];

export const RegistrationPage: React.FC<RegistrationPageProps> = ({
  initialEventId = 'robo-wars',
  onBackToHome,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Complete Leader Details & Team Basics
  const [leaderInfo, setLeaderInfo] = useState<LeaderInfo>({
    teamName: '',
    college: 'NIT Raipur',
    eventId: initialEventId,
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderStudentId: '',
    leaderBranchYear: 'Mechanical Engineering · 3rd Year',
  });

  // Step 2: Remaining Team Members
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: 'member-1',
      name: '',
      email: '',
      phone: '',
      studentId: '',
      role: 'Electronics & Power Systems',
    },
  ]);

  const [leaderErrors, setLeaderErrors] = useState<LeaderValidationErrors>({});
  const [memberErrors, setMemberErrors] = useState<MembersValidationErrors>({
    members: {},
  });

  const [completedData, setCompletedData] = useState<FullRegistrationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedEvent =
    ROBOT_EVENTS.find((e) => e.id === leaderInfo.eventId) || ROBOT_EVENTS[0];

  const minAdditional = Math.max(1, selectedEvent.minMembers - 1);
  const maxAdditional = selectedEvent.maxMembers - 1;

  // Handle Leader Info Change
  const handleLeaderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLeaderInfo((prev) => ({ ...prev, [name]: value }));

    if (leaderErrors[name as keyof LeaderValidationErrors]) {
      setLeaderErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Step 1 to Step 2 Transition
  const handleProceedToMembers = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeaderInfo(leaderInfo);
    if (!validation.isValid) {
      setLeaderErrors(validation.errors);
      return;
    }

    // Ensure member count is at least the min required for the chosen event
    if (members.length < minAdditional) {
      const needed = minAdditional - members.length;
      const additional: TeamMember[] = [];
      for (let i = 0; i < needed; i++) {
        additional.push({
          id: `member-${Date.now()}-${i}`,
          name: '',
          email: '',
          phone: '',
          studentId: '',
          role: ROLES_LIST[(members.length + i) % ROLES_LIST.length],
        });
      }
      setMembers([...members, ...additional]);
    }

    setLeaderErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Member Field Change
  const handleMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });

    if (memberErrors.members[index]?.[field as keyof typeof memberErrors.members[number]]) {
      setMemberErrors((prev) => {
        const nextMembers = { ...prev.members };
        if (nextMembers[index]) {
          const nextItem = { ...nextMembers[index] };
          delete nextItem[field as keyof typeof nextItem];
          nextMembers[index] = nextItem;
        }
        return { ...prev, members: nextMembers };
      });
    }
  };

  // Add Member Card
  const handleAddMember = () => {
    if (members.length >= maxAdditional) return;
    setMembers((prev) => [
      ...prev,
      {
        id: `member-${Date.now()}`,
        name: '',
        email: '',
        phone: '',
        studentId: '',
        role: ROLES_LIST[prev.length % ROLES_LIST.length],
      },
    ]);
  };

  // Remove Member Card
  const handleRemoveMember = (index: number) => {
    if (members.length <= minAdditional) return;
    setMembers((prev) => prev.filter((_, i) => i !== index));
    setMemberErrors((prev) => {
      const nextMembers = { ...prev.members };
      delete nextMembers[index];
      return { ...prev, members: nextMembers };
    });
  };

  // Step 2 Submission (Lock In Registration)
  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTeamMembers(members, leaderInfo.eventId);

    if (!validation.isValid) {
      setMemberErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const regId = `ROBO-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const fullData: FullRegistrationData = {
        ...leaderInfo,
        members,
        registrationId: regId,
        createdAt: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setCompletedData(fullData);
      setIsSubmitting(false);
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  const handleResetRegistration = () => {
    setStep(1);
    setCompletedData(null);
    setLeaderInfo({
      teamName: '',
      college: 'NIT Raipur',
      eventId: 'robo-wars',
      leaderName: '',
      leaderEmail: '',
      leaderPhone: '',
      leaderStudentId: '',
      leaderBranchYear: 'Mechanical Engineering · 3rd Year',
    });
    setMembers([
      {
        id: 'member-1',
        name: '',
        email: '',
        phone: '',
        studentId: '',
        role: 'Electronics & Power Systems',
      },
    ]);
    setLeaderErrors({});
    setMemberErrors({ members: {} });
  };

  // Checklist Helpers
  const isLeaderFilled =
    leaderInfo.teamName.trim().length >= 2 &&
    leaderInfo.leaderName.trim().length >= 2 &&
    leaderInfo.leaderEmail.includes('@') &&
    leaderInfo.leaderPhone.replace(/\D/g, '').length === 10;

  const validMembersCount = members.filter(
    (m) =>
      m.name.trim().length >= 2 &&
      m.email.includes('@') &&
      m.phone.replace(/\D/g, '').length === 10
  ).length;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 selection:bg-[#00E5FF]/30">
      {/* Top Bar Navigation & Step Progress for Laptop */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-[#00E5FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] rounded py-1 px-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Robofest Overview</span>
          </button>

          {/* Stepper Progress */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                step === 1
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50'
                  : step > 1
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                {step > 1 ? '✓' : '1'}
              </span>
              <span>1. Team Leader Details</span>
            </div>

            <div className="w-4 h-[1px] bg-slate-800 hidden sm:block" />

            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                step === 2
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50'
                  : step > 2
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                {step > 2 ? '✓' : '2'}
              </span>
              <span>2. Remaining Crew</span>
            </div>

            <div className="w-4 h-[1px] bg-slate-800 hidden sm:block" />

            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all ${
                step === 3
                  ? 'bg-[#FF9F1C]/20 text-[#FF9F1C] border border-[#FF9F1C]/50'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                3
              </span>
              <span>3. Verified Pass</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Laptop Optimized 2-Column Split */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Active Step Wizard Form */}
          <div className="lg:col-span-7 bg-[#0b1120] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            {/* STEP 1: Leader & Team Details */}
            {step === 1 && (
              <div>
                <div className="mb-6 pb-4 border-b border-slate-800/80">
                  <span className="text-xs uppercase tracking-widest text-[#00E5FF] font-semibold block mb-1">
                    Step 1 of 2 · Primary Point of Contact
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">
                    Team & Leader Registration
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    Enter the official team name and complete contact details of the team leader.
                    Remaining squad members will be added in Step 2.
                  </p>
                </div>

                <form onSubmit={handleProceedToMembers} noValidate className="space-y-6">
                  {/* Select Event Arena */}
                  <div className="space-y-2">
                    <label
                      htmlFor="eventId"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-200"
                    >
                      Selected Event Arena <span className="text-[#FF9F1C]">*</span>
                    </label>
                    <select
                      id="eventId"
                      name="eventId"
                      value={leaderInfo.eventId}
                      onChange={handleLeaderChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
                    >
                      {ROBOT_EVENTS.map((evt) => (
                        <option key={evt.id} value={evt.id} className="bg-slate-900 text-white">
                          {evt.title} ({evt.category}) — {evt.prize} — {evt.teamSize}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                      <span>{selectedEvent.highlight}</span>
                    </p>
                  </div>

                  {/* Team Name & College Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="teamName"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-200"
                      >
                        Team Name <span className="text-[#FF9F1C]">*</span>
                      </label>
                      <input
                        type="text"
                        id="teamName"
                        name="teamName"
                        value={leaderInfo.teamName}
                        onChange={handleLeaderChange}
                        placeholder="e.g. MechWarriors NITRR"
                        className={`w-full px-4 py-3 bg-slate-950 border rounded-xl text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                          leaderErrors.teamName
                            ? 'border-red-500/80 focus-visible:ring-red-500'
                            : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                        }`}
                      />
                      {leaderErrors.teamName && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{leaderErrors.teamName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="college"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-200"
                      >
                        College / University <span className="text-[#FF9F1C]">*</span>
                      </label>
                      <input
                        type="text"
                        id="college"
                        name="college"
                        value={leaderInfo.college}
                        onChange={handleLeaderChange}
                        placeholder="e.g. National Institute of Technology Raipur"
                        className={`w-full px-4 py-3 bg-slate-950 border rounded-xl text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                          leaderErrors.college
                            ? 'border-red-500/80 focus-visible:ring-red-500'
                            : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                        }`}
                      />
                      {leaderErrors.college && (
                        <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{leaderErrors.college}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Complete Leader Details Section */}
                  <div className="pt-4 border-t border-slate-800">
                    <h3 className="text-xs uppercase tracking-widest text-[#00E5FF] font-semibold mb-4 flex items-center gap-2">
                      <IdCard className="w-4 h-4" />
                      <span>Team Leader Credentials</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Leader Full Name */}
                      <div className="space-y-2">
                        <label
                          htmlFor="leaderName"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                        >
                          Leader Full Name <span className="text-[#FF9F1C]">*</span>
                        </label>
                        <input
                          type="text"
                          id="leaderName"
                          name="leaderName"
                          value={leaderInfo.leaderName}
                          onChange={handleLeaderChange}
                          placeholder="e.g. Aniket Rathore"
                          className={`w-full px-4 py-3 bg-slate-950 border rounded-xl text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                            leaderErrors.leaderName
                              ? 'border-red-500/80 focus-visible:ring-red-500'
                              : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                          }`}
                        />
                        {leaderErrors.leaderName && (
                          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{leaderErrors.leaderName}</span>
                          </p>
                        )}
                      </div>

                      {/* Leader Email */}
                      <div className="space-y-2">
                        <label
                          htmlFor="leaderEmail"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                        >
                          Official Email Address <span className="text-[#FF9F1C]">*</span>
                        </label>
                        <input
                          type="email"
                          id="leaderEmail"
                          name="leaderEmail"
                          value={leaderInfo.leaderEmail}
                          onChange={handleLeaderChange}
                          placeholder="leader@nitrr.ac.in"
                          className={`w-full px-4 py-3 bg-slate-950 border rounded-xl text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                            leaderErrors.leaderEmail
                              ? 'border-red-500/80 focus-visible:ring-red-500'
                              : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                          }`}
                        />
                        {leaderErrors.leaderEmail && (
                          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{leaderErrors.leaderEmail}</span>
                          </p>
                        )}
                      </div>

                      {/* Leader Phone */}
                      <div className="space-y-2">
                        <label
                          htmlFor="leaderPhone"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                        >
                          10-Digit Mobile Number <span className="text-[#FF9F1C]">*</span>
                        </label>
                        <input
                          type="tel"
                          id="leaderPhone"
                          name="leaderPhone"
                          value={leaderInfo.leaderPhone}
                          onChange={handleLeaderChange}
                          placeholder="9876543210"
                          maxLength={12}
                          className={`w-full px-4 py-3 bg-slate-950 border rounded-xl text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                            leaderErrors.leaderPhone
                              ? 'border-red-500/80 focus-visible:ring-red-500'
                              : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                          }`}
                        />
                        {leaderErrors.leaderPhone && (
                          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{leaderErrors.leaderPhone}</span>
                          </p>
                        )}
                      </div>

                      {/* Leader Roll No / Student ID */}
                      <div className="space-y-2">
                        <label
                          htmlFor="leaderStudentId"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                        >
                          College Roll No / Student ID <span className="text-[#FF9F1C]">*</span>
                        </label>
                        <input
                          type="text"
                          id="leaderStudentId"
                          name="leaderStudentId"
                          value={leaderInfo.leaderStudentId}
                          onChange={handleLeaderChange}
                          placeholder="e.g. 21115042"
                          className={`w-full px-4 py-3 bg-slate-950 border rounded-xl text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                            leaderErrors.leaderStudentId
                              ? 'border-red-500/80 focus-visible:ring-red-500'
                              : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                          }`}
                        />
                        {leaderErrors.leaderStudentId && (
                          <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>{leaderErrors.leaderStudentId}</span>
                          </p>
                        )}
                      </div>

                      {/* Branch & Year */}
                      <div className="space-y-2 sm:col-span-2">
                        <label
                          htmlFor="leaderBranchYear"
                          className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
                        >
                          Branch & Year of Study
                        </label>
                        <input
                          type="text"
                          id="leaderBranchYear"
                          name="leaderBranchYear"
                          value={leaderInfo.leaderBranchYear}
                          onChange={handleLeaderChange}
                          placeholder="e.g. Mechanical Engineering · 3rd Year"
                          className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 1 Submit / Next Button */}
                  <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
                    <span className="text-xs text-slate-400">
                      Step 2 will prompt for {minAdditional} to {maxAdditional} additional team members.
                    </span>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#070b14] bg-[#FF9F1C] hover:bg-[#ffb042] rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#FF9F1C]/25 hover:shadow-[#FF9F1C]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F1C]"
                    >
                      <span>Proceed to Member Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2: Remaining Team Members Details */}
            {step === 2 && (
              <div>
                <div className="mb-6 pb-4 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#00E5FF] font-semibold block mb-1">
                      Step 2 of 2 · Remaining Team Members
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                      Roster: Remaining Squad Members
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Leader: <strong className="text-white">{leaderInfo.leaderName}</strong> (
                      {leaderInfo.teamName}) · {selectedEvent.title}
                    </p>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-lg p-2.5 shrink-0">
                    <span className="text-slate-400 block">Allowed Squad Size</span>
                    <span className="font-semibold text-[#00E5FF]">
                      1 Leader + {minAdditional} to {maxAdditional} Members
                    </span>
                  </div>
                </div>

                {memberErrors.general && (
                  <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{memberErrors.general}</span>
                  </div>
                )}

                <form onSubmit={handleFinalSubmit} noValidate className="space-y-6">
                  {/* Dynamic Members Cards */}
                  <div className="space-y-6">
                    {members.map((member, index) => {
                      const memberErr = memberErrors.members[index] || {};

                      return (
                        <div
                          key={member.id}
                          className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 rounded-xl p-5 relative transition-all"
                        >
                          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-md bg-[#00E5FF]/10 text-[#00E5FF] font-bold text-xs flex items-center justify-center font-mono">
                                0{index + 2}
                              </span>
                              <h3 className="text-sm font-semibold text-white">
                                Team Member #{index + 1}
                              </h3>
                            </div>

                            {members.length > minAdditional && (
                              <button
                                type="button"
                                onClick={() => handleRemoveMember(index)}
                                className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Member Name */}
                            <div className="space-y-1.5">
                              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                                Full Name <span className="text-[#FF9F1C]">*</span>
                              </label>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) =>
                                  handleMemberChange(index, 'name', e.target.value)
                                }
                                placeholder="e.g. Rohan Verma"
                                className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-lg text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                                  memberErr.name
                                    ? 'border-red-500/80 focus-visible:ring-red-500'
                                    : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                                }`}
                              />
                              {memberErr.name && (
                                <p className="text-[11px] text-red-400 mt-0.5">{memberErr.name}</p>
                              )}
                            </div>

                            {/* Member Email */}
                            <div className="space-y-1.5">
                              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                                Email Address <span className="text-[#FF9F1C]">*</span>
                              </label>
                              <input
                                type="email"
                                value={member.email}
                                onChange={(e) =>
                                  handleMemberChange(index, 'email', e.target.value)
                                }
                                placeholder="member@institute.ac.in"
                                className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-lg text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                                  memberErr.email
                                    ? 'border-red-500/80 focus-visible:ring-red-500'
                                    : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                                }`}
                              />
                              {memberErr.email && (
                                <p className="text-[11px] text-red-400 mt-0.5">{memberErr.email}</p>
                              )}
                            </div>

                            {/* Member Phone */}
                            <div className="space-y-1.5">
                              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                                10-Digit Mobile <span className="text-[#FF9F1C]">*</span>
                              </label>
                              <input
                                type="tel"
                                value={member.phone}
                                onChange={(e) =>
                                  handleMemberChange(index, 'phone', e.target.value)
                                }
                                placeholder="9876543211"
                                maxLength={12}
                                className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-lg text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                                  memberErr.phone
                                    ? 'border-red-500/80 focus-visible:ring-red-500'
                                    : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                                }`}
                              />
                              {memberErr.phone && (
                                <p className="text-[11px] text-red-400 mt-0.5">{memberErr.phone}</p>
                              )}
                            </div>

                            {/* Member Student ID */}
                            <div className="space-y-1.5">
                              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                                Roll No / Student ID <span className="text-[#FF9F1C]">*</span>
                              </label>
                              <input
                                type="text"
                                value={member.studentId}
                                onChange={(e) =>
                                  handleMemberChange(index, 'studentId', e.target.value)
                                }
                                placeholder="e.g. 21115088"
                                className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-lg text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                                  memberErr.studentId
                                    ? 'border-red-500/80 focus-visible:ring-red-500'
                                    : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                                }`}
                              />
                              {memberErr.studentId && (
                                <p className="text-[11px] text-red-400 mt-0.5">
                                  {memberErr.studentId}
                                </p>
                              )}
                            </div>

                            {/* Member Assigned Role */}
                            <div className="space-y-1.5 sm:col-span-2">
                              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                                Technical Role in Team
                              </label>
                              <select
                                value={member.role}
                                onChange={(e) =>
                                  handleMemberChange(index, 'role', e.target.value)
                                }
                                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
                              >
                                {ROLES_LIST.map((role) => (
                                  <option key={role} value={role} className="bg-slate-900">
                                    {role}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Add Member Button if under max limit */}
                  {members.length < maxAdditional && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="w-full py-3 border-2 border-dashed border-slate-800 hover:border-[#00E5FF]/60 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-[#00E5FF] transition-all flex items-center justify-center gap-2 bg-slate-950/40"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Another Team Member ({members.length}/{maxAdditional})</span>
                    </button>
                  )}

                  {/* Navigation Buttons */}
                  <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Edit Leader Details</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#070b14] bg-[#FF9F1C] hover:bg-[#ffb042] rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#FF9F1C]/25 hover:shadow-[#FF9F1C]/45 disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Locking Credentials...' : 'Complete & Generate Team Pass'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3: Verified Digital Arena Pass & Confirmation */}
            {step === 3 && completedData && (
              <div className="space-y-6">
                <div className="text-center pb-4 border-b border-slate-800">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold block">
                    Registration Confirmed · Verified Roster
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mt-1">
                    Welcome to ROBOFEST 2026!
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Your team and crew roster have been registered into the tournament system.
                  </p>
                </div>

                {/* Printable Digital Pass */}
                <div
                  id="printable-pass"
                  className="bg-slate-950 border border-[#00E5FF]/40 rounded-xl p-6 relative overflow-hidden shadow-xl"
                >
                  {/* Watermark header */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#00E5FF] font-mono">
                        OFFICIAL PARTICIPANT ARENA PASS
                      </span>
                      <h3 className="text-xl font-display font-bold text-white">
                        {completedData.teamName}
                      </h3>
                      <p className="text-xs text-slate-400">{completedData.college}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-mono block">TEAM PASS ID</span>
                      <span className="font-mono text-lg font-extrabold text-[#00E5FF]">
                        {completedData.registrationId}
                      </span>
                    </div>
                  </div>

                  {/* Pass Quick Details */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-4 p-3 bg-slate-900/60 rounded-lg border border-slate-800 font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px]">EVENT ARENA</span>
                      <span className="text-white font-semibold">{selectedEvent.title}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">TOTAL SQUAD</span>
                      <span className="text-[#FF9F1C] font-semibold">
                        {completedData.members.length + 1} Engineers
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">ARENA PIT</span>
                      <span className="text-white">Booth B-{Math.floor(10 + Math.random() * 40)}</span>
                    </div>
                  </div>

                  {/* Leader and Roster List */}
                  <div className="space-y-3">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Registered Roster:
                    </div>

                    {/* Team Leader row */}
                    <div className="flex items-center justify-between p-2.5 rounded bg-slate-900/40 border border-slate-800 text-xs">
                      <div>
                        <span className="font-bold text-white">{completedData.leaderName}</span>
                        <span className="text-slate-400 text-[11px] ml-2">
                          ({completedData.leaderStudentId})
                        </span>
                        <div className="text-[11px] text-slate-400">{completedData.leaderEmail}</div>
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30">
                        Team Leader & Captain
                      </span>
                    </div>

                    {/* Additional Members */}
                    {completedData.members.map((m, idx) => (
                      <div
                        key={m.id || idx}
                        className="flex items-center justify-between p-2 rounded bg-slate-900/20 border border-slate-800/60 text-xs"
                      >
                        <div>
                          <span className="text-slate-200 font-medium">{m.name}</span>
                          <span className="text-slate-500 text-[11px] ml-2">({m.studentId})</span>
                          <div className="text-[11px] text-slate-400">{m.email}</div>
                        </div>
                        <span className="text-[10px] text-slate-300 px-2 py-0.5 rounded bg-slate-800">
                          {m.role}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* QR & Security Seal */}
                  <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-8 h-8 text-[#00E5FF]" />
                      <span className="text-[11px]">
                        Scan at Entry Gate · NIT Raipur Campus Ground
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      ISSUED {completedData.createdAt}
                    </span>
                  </div>
                </div>

                {/* Post Registration Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#070b14] bg-[#00E5FF] hover:bg-[#33ebff] rounded-lg transition-colors shadow-md shadow-[#00E5FF]/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Print / Save Arena Pass</span>
                  </button>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={handleResetRegistration}
                      className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Register Another Team</span>
                    </button>
                    <button
                      type="button"
                      onClick={onBackToHome}
                      className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg transition-colors"
                    >
                      <span>Return to Overview</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Sticky Live Interactive Laptop Pass & Event Telemetry Preview */}
          <div className="lg:col-span-5 sticky top-8 space-y-6">
            {/* Live Holographic Pass Preview */}
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#00E5FF] px-2.5 py-1 rounded bg-slate-950/90 border border-[#00E5FF]/30 backdrop-blur-md">
                    {selectedEvent.category} Arena
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-mono font-bold text-[#FF9F1C] bg-slate-950/90 px-3 py-1 rounded border border-[#FF9F1C]/40 backdrop-blur-md">
                    {selectedEvent.prize}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
                    LIVE TEAM PASS PREVIEW
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mt-0.5 truncate">
                    {leaderInfo.teamName.trim() || 'Your Team Name'}
                  </h3>
                  <p className="text-xs text-slate-400 truncate">
                    {leaderInfo.college.trim() || 'College Name'}
                  </p>
                </div>

                {/* Squad Counter */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">TEAM LEADER</span>
                    <span className="text-white font-semibold truncate block">
                      {leaderInfo.leaderName.trim() || 'Not entered yet'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CREW ROSTER</span>
                    <span className="text-[#00E5FF] font-semibold block">
                      1 Leader + {members.length} Members
                    </span>
                  </div>
                </div>

                {/* Event Schedule & Specs */}
                <div className="text-xs space-y-2 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span>{selectedEvent.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00E5FF] shrink-0" />
                    <span className="line-clamp-1">{selectedEvent.arenaSpecs}</span>
                  </div>
                </div>

                {/* Real-time Checklist for Laptop User */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Readiness Checklist
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          isLeaderFilled
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {isLeaderFilled ? '✓' : '○'}
                      </span>
                      <span>Leader details completed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          members.length >= minAdditional
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {members.length >= minAdditional ? '✓' : '○'}
                      </span>
                      <span>
                        Squad size ({members.length + 1} of {selectedEvent.minMembers} min)
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                          validMembersCount >= minAdditional
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {validMembersCount >= minAdditional ? '✓' : '○'}
                      </span>
                      <span>Member credentials validated</span>
                    </li>
                  </ul>
                </div>

                {/* Coordinator help note */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Questions regarding rules?</span>
                  <span className="text-slate-300 font-medium">
                    {selectedEvent.coordinator.name} ({selectedEvent.coordinator.contact})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
