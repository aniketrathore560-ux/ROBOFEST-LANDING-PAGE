import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
  ArrowLeft,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  QrCode,
  Download,
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

interface RegistrationProps {
  selectedEventId: string;
  onEventChange: (id: string) => void;
  onOpenDedicatedPage?: () => void;
}

const ROLES = [
  'Mechanics & Chassis CAD',
  'Electronics & Power Systems',
  'Autonomous Code & PID',
  'Bot Pilot / Driver',
  'Pit Crew & Structural Safety',
];

export const Registration: React.FC<RegistrationProps> = ({
  selectedEventId,
  onEventChange,
  onOpenDedicatedPage,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Complete Leader Information
  const [leaderInfo, setLeaderInfo] = useState<LeaderInfo>({
    teamName: '',
    college: 'NIT Raipur',
    eventId: selectedEventId || 'robo-wars',
    leaderName: '',
    leaderEmail: '',
    leaderPhone: '',
    leaderStudentId: '',
    leaderBranchYear: 'Mechanical Engineering · 3rd Year',
  });

  // Step 2: Remaining Members
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

  useEffect(() => {
    if (selectedEventId) {
      setLeaderInfo((prev) => ({ ...prev, eventId: selectedEventId }));
    }
  }, [selectedEventId]);

  const selectedEvent =
    ROBOT_EVENTS.find((e) => e.id === leaderInfo.eventId) || ROBOT_EVENTS[0];

  const minAdditional = Math.max(1, selectedEvent.minMembers - 1);
  const maxAdditional = selectedEvent.maxMembers - 1;

  // Handle Leader Change
  const handleLeaderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLeaderInfo((prev) => ({ ...prev, [name]: value }));

    if (leaderErrors[name as keyof LeaderValidationErrors]) {
      setLeaderErrors((prev) => ({ ...prev, [name]: undefined }));
    }

    if (name === 'eventId') {
      onEventChange(value);
    }
  };

  // Step 1 to Step 2
  const handleProceedToMembers = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeaderInfo(leaderInfo);
    if (!validation.isValid) {
      setLeaderErrors(validation.errors);
      return;
    }

    if (members.length < minAdditional) {
      const needed = minAdditional - members.length;
      const additional: TeamMember[] = [];
      for (let i = 0; i < needed; i++) {
        additional.push({
          id: `m-${Date.now()}-${i}`,
          name: '',
          email: '',
          phone: '',
          studentId: '',
          role: ROLES[(members.length + i) % ROLES.length],
        });
      }
      setMembers([...members, ...additional]);
    }

    setLeaderErrors({});
    setStep(2);
  };

  // Member Field Change
  const handleMemberChange = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    setMembers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });

    if (memberErrors.members[index]?.[field as keyof typeof memberErrors.members[number]]) {
      setMemberErrors((prev) => {
        const nextMembers = { ...prev.members };
        if (nextMembers[index]) {
          const item = { ...nextMembers[index] };
          delete item[field as keyof typeof item];
          nextMembers[index] = item;
        }
        return { ...prev, members: nextMembers };
      });
    }
  };

  const handleAddMember = () => {
    if (members.length >= maxAdditional) return;
    setMembers((prev) => [
      ...prev,
      {
        id: `m-${Date.now()}`,
        name: '',
        email: '',
        phone: '',
        studentId: '',
        role: ROLES[prev.length % ROLES.length],
      },
    ]);
  };

  const handleRemoveMember = (index: number) => {
    if (members.length <= minAdditional) return;
    setMembers((prev) => prev.filter((_, i) => i !== index));
    setMemberErrors((prev) => {
      const nextMembers = { ...prev.members };
      delete nextMembers[index];
      return { ...prev, members: nextMembers };
    });
  };

  // Final Submit
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
      const full: FullRegistrationData = {
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
      setCompletedData(full);
      setIsSubmitting(false);
      setStep(3);
    }, 450);
  };

  const handleReset = () => {
    setStep(1);
    setCompletedData(null);
    setLeaderInfo({
      teamName: '',
      college: 'NIT Raipur',
      eventId: selectedEventId || 'robo-wars',
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

  const isLeaderValidPreview =
    leaderInfo.teamName.trim().length >= 2 &&
    leaderInfo.leaderName.trim().length >= 2 &&
    leaderInfo.leaderEmail.includes('@') &&
    leaderInfo.leaderPhone.replace(/\D/g, '').length === 10;

  return (
    <section id="register" className="py-24 relative bg-[#090d19] border-t border-slate-800">
      <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Pitch Headline & Multi-Step Breadcrumb */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-xs font-semibold uppercase tracking-wider text-[#00E5FF] mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Official Team Registration Portal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Your team. Your bot. Your win.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Complete the 2-step team entry: First enter the complete details of the team leader,
            followed by the remaining squad crew members.
          </p>

          {/* Step Pill Indicators */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 mt-6">
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
                step === 1
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40'
                  : step > 1
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">
                {step > 1 ? '✓' : '1'}
              </span>
              <span>1. Leader Details</span>
            </div>

            <div className="w-6 h-[1px] bg-slate-800" />

            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
                step === 2
                  ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40'
                  : step > 2
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">
                {step > 2 ? '✓' : '2'}
              </span>
              <span>2. Crew Members</span>
            </div>

            <div className="w-6 h-[1px] bg-slate-800" />

            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold ${
                step === 3
                  ? 'bg-[#FF9F1C]/20 text-[#FF9F1C] border border-[#FF9F1C]/50'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>3. Verified Pass</span>
            </div>
          </div>
        </div>

        {/* Laptop Ergonomic 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Active Form Step */}
          <div className="lg:col-span-7 bg-[#0b1120] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent" />

            {/* STEP 1: Complete Leader Details */}
            {step === 1 && (
              <div>
                <div className="mb-6 pb-4 border-b border-slate-800">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#00E5FF] mb-1">
                    Step 1 · Primary Team Contact
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                    Team & Leader Information
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Please provide complete details for the team leader. Remaining squad members
                    will be added in Step 2.
                  </p>
                </div>

                <form onSubmit={handleProceedToMembers} noValidate className="space-y-5">
                  {/* Event Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200">
                      Competitive Event Arena <span className="text-[#FF9F1C]">*</span>
                    </label>
                    <select
                      name="eventId"
                      value={leaderInfo.eventId}
                      onChange={handleLeaderChange}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]"
                    >
                      {ROBOT_EVENTS.map((evt) => (
                        <option key={evt.id} value={evt.id} className="bg-slate-900">
                          {evt.title} ({evt.category}) — {evt.prize} — {evt.teamSize}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Team Name & College */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200">
                        Team Name <span className="text-[#FF9F1C]">*</span>
                      </label>
                      <input
                        type="text"
                        name="teamName"
                        value={leaderInfo.teamName}
                        onChange={handleLeaderChange}
                        placeholder="e.g. TitansNITRR"
                        className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                          leaderErrors.teamName
                            ? 'border-red-500/80 focus-visible:ring-red-500'
                            : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                        }`}
                      />
                      {leaderErrors.teamName && (
                        <p className="text-xs text-red-400 mt-0.5">{leaderErrors.teamName}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-200">
                        College / Institute <span className="text-[#FF9F1C]">*</span>
                      </label>
                      <input
                        type="text"
                        name="college"
                        value={leaderInfo.college}
                        onChange={handleLeaderChange}
                        placeholder="e.g. NIT Raipur"
                        className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                          leaderErrors.college
                            ? 'border-red-500/80 focus-visible:ring-red-500'
                            : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                        }`}
                      />
                      {leaderErrors.college && (
                        <p className="text-xs text-red-400 mt-0.5">{leaderErrors.college}</p>
                      )}
                    </div>
                  </div>

                  {/* Leader Dossier */}
                  <div className="pt-3 border-t border-slate-800 space-y-4">
                    <div className="text-xs uppercase tracking-wider text-[#00E5FF] font-semibold flex items-center gap-1.5">
                      <IdCard className="w-4 h-4" />
                      <span>Team Leader Credentials</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Leader Full Name */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                          Leader Full Name <span className="text-[#FF9F1C]">*</span>
                        </label>
                        <input
                          type="text"
                          name="leaderName"
                          value={leaderInfo.leaderName}
                          onChange={handleLeaderChange}
                          placeholder="e.g. Aryan Deshmukh"
                          className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                            leaderErrors.leaderName
                              ? 'border-red-500/80 focus-visible:ring-red-500'
                              : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                          }`}
                        />
                        {leaderErrors.leaderName && (
                          <p className="text-xs text-red-400 mt-0.5">{leaderErrors.leaderName}</p>
                        )}
                      </div>

                      {/* Leader Email */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                          Leader Email <span className="text-[#FF9F1C]">*</span>
                        </label>
                        <input
                          type="email"
                          name="leaderEmail"
                          value={leaderInfo.leaderEmail}
                          onChange={handleLeaderChange}
                          placeholder="leader@nitrr.ac.in"
                          className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                            leaderErrors.leaderEmail
                              ? 'border-red-500/80 focus-visible:ring-red-500'
                              : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                          }`}
                        />
                        {leaderErrors.leaderEmail && (
                          <p className="text-xs text-red-400 mt-0.5">{leaderErrors.leaderEmail}</p>
                        )}
                      </div>

                      {/* Leader Phone */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                          10-Digit Mobile Number <span className="text-[#FF9F1C]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="leaderPhone"
                          value={leaderInfo.leaderPhone}
                          onChange={handleLeaderChange}
                          placeholder="9876543210"
                          maxLength={12}
                          className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                            leaderErrors.leaderPhone
                              ? 'border-red-500/80 focus-visible:ring-red-500'
                              : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                          }`}
                        />
                        {leaderErrors.leaderPhone && (
                          <p className="text-xs text-red-400 mt-0.5">{leaderErrors.leaderPhone}</p>
                        )}
                      </div>

                      {/* Leader Roll No */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                          College Roll No / Student ID <span className="text-[#FF9F1C]">*</span>
                        </label>
                        <input
                          type="text"
                          name="leaderStudentId"
                          value={leaderInfo.leaderStudentId}
                          onChange={handleLeaderChange}
                          placeholder="e.g. 21115042"
                          className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-white text-sm placeholder-slate-500 focus-visible:outline-none focus-visible:ring-2 ${
                            leaderErrors.leaderStudentId
                              ? 'border-red-500/80 focus-visible:ring-red-500'
                              : 'border-slate-800 focus-visible:ring-[#00E5FF]'
                          }`}
                        />
                        {leaderErrors.leaderStudentId && (
                          <p className="text-xs text-red-400 mt-0.5">
                            {leaderErrors.leaderStudentId}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 1 Actions */}
                  <div className="pt-5 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Squad requirement: 1 Leader + {minAdditional} to {maxAdditional} Members
                    </span>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#070b14] bg-[#FF9F1C] hover:bg-[#ffb042] rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg shadow-[#FF9F1C]/25"
                    >
                      <span>Proceed to Member Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 2: Remaining Members */}
            {step === 2 && (
              <div>
                <div className="mb-6 pb-4 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#00E5FF] mb-1">
                      Step 2 · Remaining Team Members
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                      Squad Roster ({selectedEvent.title})
                    </h3>
                  </div>

                  <span className="text-xs text-slate-400">
                    Leader: <strong className="text-white">{leaderInfo.leaderName}</strong>
                  </span>
                </div>

                {memberErrors.general && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{memberErrors.general}</span>
                  </div>
                )}

                <form onSubmit={handleFinalSubmit} noValidate className="space-y-5">
                  <div className="space-y-4">
                    {members.map((member, index) => {
                      const err = memberErrors.members[index] || {};

                      return (
                        <div
                          key={member.id}
                          className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative space-y-3"
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <span className="text-xs font-semibold text-[#00E5FF]">
                              Member #{index + 1}
                            </span>
                            {members.length > minAdditional && (
                              <button
                                type="button"
                                onClick={() => handleRemoveMember(index)}
                                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <input
                                type="text"
                                value={member.name}
                                onChange={(e) =>
                                  handleMemberChange(index, 'name', e.target.value)
                                }
                                placeholder="Full Name *"
                                className={`w-full px-3 py-2 bg-slate-900 border rounded-md text-white text-xs ${
                                  err.name ? 'border-red-500' : 'border-slate-800'
                                }`}
                              />
                              {err.name && <p className="text-[11px] text-red-400 mt-0.5">{err.name}</p>}
                            </div>

                            <div>
                              <input
                                type="email"
                                value={member.email}
                                onChange={(e) =>
                                  handleMemberChange(index, 'email', e.target.value)
                                }
                                placeholder="Email Address *"
                                className={`w-full px-3 py-2 bg-slate-900 border rounded-md text-white text-xs ${
                                  err.email ? 'border-red-500' : 'border-slate-800'
                                }`}
                              />
                              {err.email && <p className="text-[11px] text-red-400 mt-0.5">{err.email}</p>}
                            </div>

                            <div>
                              <input
                                type="tel"
                                value={member.phone}
                                onChange={(e) =>
                                  handleMemberChange(index, 'phone', e.target.value)
                                }
                                placeholder="10-Digit Phone *"
                                maxLength={12}
                                className={`w-full px-3 py-2 bg-slate-900 border rounded-md text-white text-xs ${
                                  err.phone ? 'border-red-500' : 'border-slate-800'
                                }`}
                              />
                              {err.phone && <p className="text-[11px] text-red-400 mt-0.5">{err.phone}</p>}
                            </div>

                            <div>
                              <input
                                type="text"
                                value={member.studentId}
                                onChange={(e) =>
                                  handleMemberChange(index, 'studentId', e.target.value)
                                }
                                placeholder="Roll No / Student ID *"
                                className={`w-full px-3 py-2 bg-slate-900 border rounded-md text-white text-xs ${
                                  err.studentId ? 'border-red-500' : 'border-slate-800'
                                }`}
                              />
                              {err.studentId && (
                                <p className="text-[11px] text-red-400 mt-0.5">{err.studentId}</p>
                              )}
                            </div>

                            <div className="sm:col-span-2">
                              <select
                                value={member.role}
                                onChange={(e) =>
                                  handleMemberChange(index, 'role', e.target.value)
                                }
                                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-white text-xs"
                              >
                                {ROLES.map((r) => (
                                  <option key={r} value={r}>
                                    {r}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {members.length < maxAdditional && (
                    <button
                      type="button"
                      onClick={handleAddMember}
                      className="w-full py-2.5 border border-dashed border-slate-800 hover:border-[#00E5FF]/60 rounded-lg text-xs font-semibold text-slate-300 hover:text-[#00E5FF] flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Another Member ({members.length}/{maxAdditional})</span>
                    </button>
                  )}

                  <div className="pt-5 border-t border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Edit Leader</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#070b14] bg-[#FF9F1C] hover:bg-[#ffb042] rounded-lg transition-all shadow-md shadow-[#FF9F1C]/25"
                    >
                      <span>{isSubmitting ? 'Registering...' : 'Lock In Team Registration'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3: Verified Arena Pass */}
            {step === 3 && completedData && (
              <div className="space-y-5">
                <div className="text-center pb-3 border-b border-slate-800">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    Registration Confirmed!
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your team pass has been issued and stored in the tournament directory.
                  </p>
                </div>

                <div className="bg-slate-950 border border-[#00E5FF]/30 rounded-xl p-5 text-xs space-y-3 font-mono">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-slate-400">TEAM PASS ID:</span>
                    <span className="text-base font-bold text-[#00E5FF]">
                      {completedData.registrationId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Team Name:</span>
                    <span className="text-white font-semibold">{completedData.teamName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Event Arena:</span>
                    <span className="text-[#FF9F1C] font-semibold">{selectedEvent.title}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Team Leader:</span>
                    <span className="text-white">
                      {completedData.leaderName} ({completedData.leaderStudentId})
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Squad:</span>
                    <span className="text-emerald-400 font-bold">
                      {completedData.members.length + 1} Registered Members
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase text-[#070b14] bg-[#00E5FF] rounded-lg"
                  >
                    <Download className="w-4 h-4" />
                    <span>Print Team Pass</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Register Another Squad</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Live Laptop Holographic Pass Preview */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-[#0b1120] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 text-[11px] font-semibold uppercase text-[#00E5FF] px-2.5 py-0.5 rounded bg-slate-950/90 border border-[#00E5FF]/30">
                  {selectedEvent.category} Track
                </div>
                <div className="absolute top-3 right-3 text-xs font-mono font-bold text-[#FF9F1C] bg-slate-950/90 px-2.5 py-0.5 rounded border border-[#FF9F1C]/40">
                  {selectedEvent.prize}
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">
                    LIVE TEAM BADGE PREVIEW
                  </span>
                  <h4 className="text-xl font-display font-bold text-white truncate">
                    {leaderInfo.teamName.trim() || 'Your Team Name'}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">
                    {leaderInfo.college.trim() || 'College Name'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px]">TEAM LEADER</span>
                    <span className="text-white truncate block">
                      {leaderInfo.leaderName.trim() || 'Pending Entry'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ROSTER COUNT</span>
                    <span className="text-[#00E5FF] font-semibold block">
                      1 Leader + {members.length} Members
                    </span>
                  </div>
                </div>

                {/* Live Checklist */}
                <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isLeaderValidPreview
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isLeaderValidPreview ? '✓' : '○'}
                    </span>
                    <span>Step 1: Complete Leader Details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        step >= 2 && members.length >= minAdditional
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {step >= 2 && members.length >= minAdditional ? '✓' : '○'}
                    </span>
                    <span>
                      Step 2: Remaining Members ({members.length}/{maxAdditional} max)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
