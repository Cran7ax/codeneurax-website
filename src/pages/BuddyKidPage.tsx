import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  KeyRound,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  Users,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BUDDYKID_SKILL_OPTIONS } from '../data/buddykid';
import type { Squad } from '../types';
import { Drawer } from '../components/ui/Drawer';
import { HeroMount } from '../components/ui/MotionPrimitives';

type BuddyKidTab = 'browse' | 'code' | 'create' | 'manage';

export const BuddyKidPage: React.FC = () => {
  const {
    user,
    toggleSignIn,
    squads,
    incomingRequests,
    outgoingRequests,
    requestJoinSquad,
    joinWithCode,
    createSquad,
    handleIncomingRequest,
    withdrawOutgoingRequest,
    pushToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<BuddyKidTab>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState<string>('All');
  const [selectedSquad, setSelectedSquad] = useState<Squad | null>(null);
  const [joinNote, setJoinNote] = useState('');
  const [joinRole, setJoinRole] = useState('');

  const [inviteCode, setInviteCode] = useState('');
  const [codeFeedback, setCodeFeedback] = useState<{
    ok: boolean;
    message: string;
    squad?: Squad;
  } | null>(null);

  const [newName, setNewName] = useState('');
  const [newHackathon, setNewHackathon] = useState('');
  const [newMaxSize, setNewMaxSize] = useState(4);
  const [newSkills, setNewSkills] = useState<string[]>(['React', 'Machine Learning']);
  const [newLookingFor, setNewLookingFor] = useState('');
  const [newCollege, setNewCollege] = useState(user.college);
  const [newMode, setNewMode] = useState<'Hybrid' | 'Offline' | 'Online'>('Hybrid');
  const [newDescription, setNewDescription] = useState('');
  const [createdSquad, setCreatedSquad] = useState<Squad | null>(null);

  const pendingIncomingCount = incomingRequests.filter((r) => r.status === 'Pending').length;

  const filteredSquads = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return squads.filter((sq) => {
      const skillMatch =
        skillFilter === 'All' ||
        sq.skills.some((s) => s.toLowerCase() === skillFilter.toLowerCase());
      const qMatch =
        !q ||
        sq.name.toLowerCase().includes(q) ||
        sq.hackathon.toLowerCase().includes(q) ||
        sq.college.toLowerCase().includes(q) ||
        sq.lookingFor.toLowerCase().includes(q) ||
        sq.skills.some((s) => s.toLowerCase().includes(q));
      return skillMatch && qMatch;
    });
  }, [squads, searchQuery, skillFilter]);

  const mySquads = useMemo(
    () => squads.filter((s) => s.createdByMe || s.leader === user.name),
    [squads, user.name],
  );

  const toggleCreateSkill = (skill: string) => {
    setNewSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const handleRedeemCode = (e: React.FormEvent) => {
    e.preventDefault();
    const res = joinWithCode(inviteCode);
    setCodeFeedback(res);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.signedIn) {
      pushToast({
        title: 'Sign in required',
        description: 'Activate your Dev Parmar session before creating a squad.',
        variant: 'warning',
      });
      return;
    }
    if (!newName.trim() || !newHackathon.trim() || !newLookingFor.trim()) {
      pushToast({
        title: 'Missing squad fields',
        description: 'Enter Squad Name, Hackathon Name, and the role you are looking for.',
        variant: 'warning',
      });
      return;
    }

    const squad = createSquad({
      name: newName,
      hackathon: newHackathon,
      maxSize: newMaxSize,
      skills: newSkills,
      lookingFor: newLookingFor,
      college: newCollege,
      mode: newMode,
      description: newDescription,
    });

    setCreatedSquad(squad);
    setNewName('');
    setNewHackathon('');
    setNewLookingFor('');
    setNewDescription('');
  };

  const getOutgoingStatus = (squadId: string) =>
    outgoingRequests.find((r) => r.squadId === squadId);

  const copyCode = (code: string) => {
    navigator.clipboard?.writeText(code).catch(() => {});
    pushToast({ title: `Copied invite code ${code}`, variant: 'success' });
  };

  return (
    <div className="bg-[#0E0E10] text-white min-h-screen">
      {/* Clean Developer Utility Header */}
      <section className="border-b border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-10 pb-8">
          <HeroMount className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="cnx-section-label text-[#818CF8] mb-2">BuddyKid Utility</p>
              <h1 className="text-[clamp(2rem,4.2vw,3.35rem)] font-bold tracking-[-0.03em] text-white leading-[1.12] pb-2 overflow-visible">
                BuddyKid — Pan-India Hackathon{' '}
                <span className="font-editorial pr-1">Squad</span> Finder
              </h1>
              <p className="mt-1 text-sm sm:text-base text-neutral-400 max-w-2xl">
                Recruit balanced hackathon teams across Indian campuses, join squads via invite
                codes, and approve incoming builders in one fast workspace.
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#16161A] border border-white/[0.08] shrink-0 self-start md:self-auto">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white">
                  {user.signedIn ? user.name : 'Guest viewer'}
                </p>
                <p className="text-[11px] text-neutral-400 truncate">
                  {user.signedIn ? user.college : 'Sign in to manage squads'}
                </p>
              </div>
              <button
                type="button"
                onClick={toggleSignIn}
                className="ml-2 px-3 py-1 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold hover:bg-neutral-200"
              >
                {user.signedIn ? 'Switch' : 'Sign In'}
              </button>
            </div>
          </HeroMount>

          {/* Clean rounded-lg Tabs */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'browse', label: 'Browse Teams', count: squads.length },
                { id: 'code', label: 'Join with Code' },
                { id: 'create', label: 'Create a Team' },
                {
                  id: 'manage',
                  label: 'My Squads & Approvals',
                  count: pendingIncomingCount + outgoingRequests.length,
                },
              ] as const
            ).map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 ${
                    active
                      ? 'bg-[#4353FF] text-white'
                      : 'bg-[#16161A] border border-white/[0.08] text-neutral-400 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  {'count' in tab && tab.count !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[11px] ${
                        active ? 'bg-white/20 text-white' : 'bg-[#0E0E10] text-neutral-300'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workspace Body */}
      <section className="py-10">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          {/* 1. BROWSE TEAMS */}
          {activeTab === 'browse' && (
            <div className="space-y-6">
              <div className="pb-6 border-b border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="relative w-full lg:w-96">
                  <Search
                    className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                    strokeWidth={1.75}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hackathon, skill, or college..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#16161A] border border-white/[0.08] text-sm text-white placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {[
                    'All',
                    'Machine Learning',
                    'Backend',
                    'React',
                    'Blockchain',
                    'Cloud',
                    'LLM Agents',
                  ].map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => setSkillFilter(skill)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        skillFilter === skill
                          ? 'bg-white text-[#0E0E10]'
                          : 'bg-[#16161A] border border-white/[0.08] text-neutral-400 hover:text-white'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {filteredSquads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredSquads.map((squad) => {
                    const outReq = getOutgoingStatus(squad.id);
                    const isMine = squad.createdByMe || squad.leader === user.name;
                    const isFull = squad.currentSize >= squad.maxSize;

                    return (
                      <article
                        key={squad.id}
                        className="rounded-2xl bg-[#16161A] border border-white/[0.08] hover:border-white/[0.16] transition-colors p-6 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span
                              className={`text-xs font-semibold ${
                                isFull ? 'text-neutral-500' : 'text-[#E1498A]'
                              }`}
                            >
                              {squad.currentSize}/{squad.maxSize} seats
                            </span>
                            {/* Monospace strictly for invite code */}
                            <span className="font-mono text-[11px] font-semibold text-neutral-300">
                              {squad.inviteCode}
                            </span>
                          </div>

                          <h2 className="text-xl font-bold text-white tracking-tight">
                            {squad.name}
                          </h2>
                          <p className="text-xs font-semibold text-[#818CF8] mt-0.5">
                            {squad.hackathon}
                          </p>
                          <p className="text-xs text-neutral-400 mt-1">
                            Leader: {squad.leader} · {squad.college}
                          </p>

                          <p className="mt-3 text-xs text-neutral-400 leading-relaxed line-clamp-2">
                            {squad.description}
                          </p>

                          <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-1">
                            <p className="text-xs text-neutral-400">
                              Looking for:{' '}
                              <strong className="text-white">{squad.lookingFor}</strong>
                            </p>
                            <p className="text-[11px] font-medium text-neutral-400">
                              {squad.skills.join(', ')}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSquad(squad);
                              setJoinRole(squad.lookingFor);
                              setJoinNote('');
                            }}
                            className="text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                          >
                            View details
                          </button>

                          {isMine ? (
                            <button
                              type="button"
                              onClick={() => setActiveTab('manage')}
                              className="px-4 py-2 rounded-lg bg-[#4353FF]/20 text-[#818CF8] text-xs font-semibold hover:bg-[#4353FF]/30 transition-colors"
                            >
                              Manage Squad
                            </button>
                          ) : outReq ? (
                            <span className="text-xs font-semibold text-[#818CF8]">
                              {outReq.status}
                            </span>
                          ) : (
                            <button
                              type="button"
                              disabled={isFull}
                              onClick={() =>
                                requestJoinSquad(
                                  squad.id,
                                  `Applying for ${squad.lookingFor} role.`,
                                  squad.lookingFor,
                                )
                              }
                              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors active:scale-[0.98] ${
                                isFull
                                  ? 'bg-white/[0.04] text-neutral-500 cursor-not-allowed'
                                  : 'bg-[#4353FF] hover:bg-[#3442E6] text-white'
                              }`}
                            >
                              {isFull ? 'Squad Full' : 'Request to Join'}
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 rounded-2xl bg-[#16161A] border border-white/[0.08] text-center space-y-3">
                  <p className="text-sm text-neutral-400">
                    No squads matched your filter. Create a new squad or clear filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSkillFilter('All');
                    }}
                    className="px-5 py-2.5 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. JOIN WITH CODE */}
          {activeTab === 'code' && (
            <div className="max-w-xl mx-auto">
              <div className="rounded-2xl bg-[#16161A] border border-white/[0.08] p-7 sm:p-9 space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-lg bg-[#4353FF]/20 text-[#818CF8] flex items-center justify-center shrink-0">
                    <KeyRound className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Redeem Squad Code</h2>
                    <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                      Enter a team invite code shared by a squad leader to claim an open seat
                      immediately.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleRedeemCode} className="space-y-4">
                  <div>
                    <label className="block cnx-section-label text-neutral-400 mb-2">
                      Invite Code
                    </label>
                    <div className="flex gap-2.5">
                      <input
                        type="text"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                        placeholder="e.g. CNX-ROACH"
                        className="flex-1 px-4 py-3 rounded-lg bg-[#0E0E10] border border-white/[0.1] font-mono text-sm font-semibold text-white uppercase placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold transition-colors active:scale-[0.98]"
                      >
                        Join Squad
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                    <span>Sample codes:</span>
                    {['CNX-ROACH', 'CNX-AI26', 'CNX-NK26'].map((sample) => (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => setInviteCode(sample)}
                        className="px-3 py-1 rounded-lg bg-[#0E0E10] border border-white/[0.08] font-mono text-xs font-semibold text-neutral-200 hover:border-[#4353FF]"
                      >
                        {sample}
                      </button>
                    ))}
                  </div>
                </form>

                {codeFeedback && (
                  <div
                    className={`p-4 rounded-xl border text-xs ${
                      codeFeedback.ok
                        ? 'bg-[#4353FF]/15 border-[#4353FF]/30 text-white'
                        : 'bg-[#E1498A]/15 border-[#E1498A]/30 text-white'
                    }`}
                  >
                    <p className="font-semibold">{codeFeedback.message}</p>
                    {codeFeedback.squad && (
                      <p className="mt-1 text-neutral-300">
                        Leader: {codeFeedback.squad.leader} · Looking for{' '}
                        {codeFeedback.squad.lookingFor}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 3. CREATE A TEAM */}
          {activeTab === 'create' && (
            <div className="max-w-2xl mx-auto">
              <div className="rounded-2xl bg-[#16161A] border border-white/[0.08] p-7 sm:p-9 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Create a Hackathon Squad</h2>
                  <p className="mt-1 text-xs text-neutral-400">
                    Publish your team to Browse Teams and generate a shareable BuddyKid invite code.
                  </p>
                </div>

                {createdSquad && (
                  <div className="p-4 rounded-xl bg-[#4353FF]/15 border border-[#4353FF]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-white">
                        Squad &ldquo;{createdSquad.name}&rdquo; is live
                      </p>
                      <p className="text-xs text-neutral-300 mt-0.5">
                        Invite Code:{' '}
                        <span className="font-mono font-bold text-white">
                          {createdSquad.inviteCode}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copyCode(createdSquad.inviteCode)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-xs font-semibold text-white"
                      >
                        <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
                        Copy Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('browse')}
                        className="inline-flex items-center gap-1 px-4 py-1.5 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold"
                      >
                        View in Browse
                        <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                )}

                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block cnx-section-label text-neutral-400 mb-1.5">
                        Squad Name
                      </label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. TensorGuild"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block cnx-section-label text-neutral-400 mb-1.5">
                        Hackathon Name
                      </label>
                      <input
                        type="text"
                        value={newHackathon}
                        onChange={(e) => setNewHackathon(e.target.value)}
                        placeholder="e.g. Smart India Hackathon 2026"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block cnx-section-label text-neutral-400 mb-1.5">
                        Max Team Size
                      </label>
                      <select
                        value={newMaxSize}
                        onChange={(e) => setNewMaxSize(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                      >
                        {[2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} Members
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block cnx-section-label text-neutral-400 mb-1.5">
                        Mode
                      </label>
                      <select
                        value={newMode}
                        onChange={(e) =>
                          setNewMode(e.target.value as 'Hybrid' | 'Offline' | 'Online')
                        }
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                      >
                        <option value="Hybrid">Hybrid</option>
                        <option value="Offline">Offline</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                    <div>
                      <label className="block cnx-section-label text-neutral-400 mb-1.5">
                        Looking For
                      </label>
                      <input
                        type="text"
                        value={newLookingFor}
                        onChange={(e) => setNewLookingFor(e.target.value)}
                        placeholder="e.g. Frontend / Design"
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block cnx-section-label text-neutral-400 mb-1.5">
                      College / Hub
                    </label>
                    <input
                      type="text"
                      value={newCollege}
                      onChange={(e) => setNewCollege(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block cnx-section-label text-neutral-400 mb-2">
                      Required Stack / Skills
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {BUDDYKID_SKILL_OPTIONS.map((skill) => {
                        const selected = newSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleCreateSkill(skill)}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                              selected
                                ? 'bg-[#4353FF] text-white border-[#4353FF]'
                                : 'bg-[#0E0E10] text-neutral-400 border-white/[0.08] hover:text-white'
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block cnx-section-label text-neutral-400 mb-1.5">
                      Project Brief (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Describe the problem statement or stack direction..."
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-sm font-semibold transition-colors active:scale-[0.98]"
                    >
                      <Plus className="w-4 h-4" strokeWidth={1.75} />
                      Publish Squad
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* 4. MY SQUADS & APPROVALS */}
          {activeTab === 'manage' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#4353FF]" strokeWidth={1.75} />
                    My Created Squads ({mySquads.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('create')}
                    className="text-xs font-semibold text-[#818CF8] hover:underline underline-offset-4"
                  >
                    + New Squad
                  </button>
                </div>

                <div className="space-y-4">
                  {mySquads.map((sq) => (
                    <div
                      key={sq.id}
                      className="rounded-xl bg-[#16161A] border border-white/[0.08] p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-white">{sq.name}</h3>
                          <p className="text-xs text-neutral-400">{sq.hackathon}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyCode(sq.inviteCode)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0E0E10] border border-white/[0.1] font-mono text-xs font-semibold text-white hover:border-[#4353FF]"
                        >
                          {sq.inviteCode}
                          <Copy className="w-3 h-3 text-neutral-400" strokeWidth={1.75} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-neutral-400 pt-2 border-t border-white/[0.08]">
                        <span className="font-semibold text-white">
                          {sq.currentSize}/{sq.maxSize} seats filled
                        </span>
                        <span>Looking for: {sq.lookingFor}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-4">
                  <h2 className="text-lg font-bold text-white">
                    Outgoing Join Requests ({outgoingRequests.length})
                  </h2>
                  {outgoingRequests.length > 0 ? (
                    <div className="space-y-3">
                      {outgoingRequests.map((req) => (
                        <div
                          key={req.id}
                          className="rounded-xl bg-[#16161A] border border-white/[0.08] p-4 flex items-center justify-between gap-4"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                              {req.squadName} ·{' '}
                              <span className="text-neutral-400 font-normal">{req.hackathon}</span>
                            </p>
                            <p className="text-xs text-neutral-500 mt-0.5">
                              Role: {req.roleRequested} · {req.timestamp}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="px-2.5 py-1 rounded-lg bg-[#4353FF]/20 text-[#818CF8] text-[11px] font-semibold">
                              {req.status}
                            </span>
                            {req.status === 'Pending' && (
                              <button
                                type="button"
                                onClick={() => withdrawOutgoingRequest(req.id)}
                                className="p-1.5 rounded-lg border border-white/[0.1] text-neutral-400 hover:text-white"
                                title="Withdraw request"
                              >
                                <X className="w-3.5 h-3.5" strokeWidth={1.75} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl bg-[#16161A] border border-white/[0.08] text-xs text-neutral-400">
                      No outgoing requests yet. Request to join a squad from Browse Teams.
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E1498A]" strokeWidth={1.75} />
                  Incoming Join Approvals ({pendingIncomingCount} Pending)
                </h2>

                <div className="space-y-4">
                  {incomingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="rounded-xl bg-[#16161A] border border-white/[0.08] p-5 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-[#4353FF]" strokeWidth={1.75} />
                            <h3 className="text-sm font-bold text-white">{req.applicantName}</h3>
                            <span className="text-[11px] text-neutral-500">· {req.timestamp}</span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-0.5">{req.applicantCollege}</p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-lg bg-[#0E0E10] border border-white/[0.08] text-[11px] font-semibold text-white">
                          {req.status}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] text-xs space-y-1">
                        <p className="text-white font-semibold">
                          Applying to {req.squadName} · {req.roleRequested}
                        </p>
                        <p className="text-neutral-400 leading-relaxed">{req.note}</p>
                        <p className="text-[11px] font-medium text-neutral-500 pt-1">
                          {req.skills.join(', ')}
                        </p>
                      </div>

                      {req.status === 'Pending' && (
                        <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-white/[0.08]">
                          <button
                            type="button"
                            onClick={() => handleIncomingRequest(req.id, 'decline')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/[0.1] text-xs font-semibold text-neutral-300 hover:text-white"
                          >
                            <X className="w-3.5 h-3.5" strokeWidth={1.75} />
                            Decline
                          </button>
                          <button
                            type="button"
                            onClick={() => handleIncomingRequest(req.id, 'accept')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold active:scale-[0.98]"
                          >
                            <Check className="w-3.5 h-3.5" strokeWidth={1.75} />
                            Accept Builder
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Drawer
        open={Boolean(selectedSquad)}
        onClose={() => setSelectedSquad(null)}
        subtitle={selectedSquad ? `${selectedSquad.hackathon} · ${selectedSquad.inviteCode}` : ''}
        title={selectedSquad?.name || ''}
        footer={
          selectedSquad && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-neutral-400">
                {selectedSquad.currentSize}/{selectedSquad.maxSize} seats filled
              </span>
              <button
                type="button"
                disabled={
                  selectedSquad.createdByMe ||
                  selectedSquad.leader === user.name ||
                  selectedSquad.currentSize >= selectedSquad.maxSize
                }
                onClick={() => {
                  const ok = requestJoinSquad(selectedSquad.id, joinNote, joinRole);
                  if (ok) setSelectedSquad(null);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Join Request
              </button>
            </div>
          )
        }
      >
        {selectedSquad && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[#0E0E10] border border-white/[0.08] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Squad Leader</span>
                <span className="text-white font-semibold">{selectedSquad.leader}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Campus / Base</span>
                <span className="text-neutral-300">{selectedSquad.college}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Mode</span>
                <span className="text-neutral-300">{selectedSquad.mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Open Role</span>
                <span className="text-[#818CF8] font-semibold">{selectedSquad.lookingFor}</span>
              </div>
            </div>

            <div>
              <p className="cnx-section-label text-neutral-500 mb-2">Squad Brief</p>
              <p className="text-sm text-neutral-300 leading-relaxed">{selectedSquad.description}</p>
            </div>

            <div>
              <p className="cnx-section-label text-neutral-500 mb-2">Core Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedSquad.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-[#0E0E10] border border-white/[0.08] text-xs font-medium text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {!selectedSquad.createdByMe && selectedSquad.leader !== user.name && (
              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <div>
                  <label className="block cnx-section-label text-neutral-400 mb-1.5">
                    Role You Offer
                  </label>
                  <input
                    type="text"
                    value={joinRole}
                    onChange={(e) => setJoinRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block cnx-section-label text-neutral-400 mb-1.5">
                    Intro Pitch to {selectedSquad.leader}
                  </label>
                  <textarea
                    rows={3}
                    value={joinNote}
                    onChange={(e) => setJoinNote(e.target.value)}
                    placeholder="Share relevant repos, hackathon experience, or what you can ship..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};
