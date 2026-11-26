import React, { useMemo, useState } from 'react';
import { ArrowRight, Check, Copy, KeyRound, Plus, Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BUDDYKID_SKILL_OPTIONS } from '../data/buddykid';
import type { Squad } from '../types';
import { Drawer } from '../components/ui/Drawer';
import { HeroMount, RevealBlock } from '../components/ui/MotionPrimitives';
import { SlidingTabs } from '../components/ui/SlidingTabs';

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
    <div className="bg-[#F3F4F8] text-[#0E0E10] min-h-screen">
      {/* Clean Typographic Prism Header */}
      <section className="cnx-prism-hero text-white border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-28 pb-8 sm:pt-32">
          <HeroMount className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-[clamp(2.3rem,4.6vw,3.7rem)] font-bold tracking-[-0.035em] text-white leading-[1.06]">
                BuddyKid <span className="cnx-accent-gradient-dark">Squads</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-neutral-300 max-w-2xl">
                Find hackathon teammates across campuses or join with a code.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-neutral-300 shrink-0 self-start md:self-end">
              <span>
                {user.signedIn ? (
                  <>
                    Signed in as <strong className="text-white">{user.name}</strong>
                  </>
                ) : (
                  'Guest session'
                )}
              </span>
              <button
                type="button"
                onClick={toggleSignIn}
                className="underline underline-offset-4 text-neutral-300 hover:text-white transition-colors font-medium"
              >
                {user.signedIn ? 'Switch' : 'Sign in'}
              </button>
            </div>
          </HeroMount>

          {/* Clean Sliding Underline Workspace Navigation */}
          <SlidingTabs
            variant="underline-dark"
            className="mt-10"
            value={activeTab}
            onChange={setActiveTab}
            options={[
              { id: "browse", label: "Browse Teams", count: squads.length },
              { id: "code", label: "Join with Code" },
              { id: "create", label: "Create a Team" },
              {
                id: "manage",
                label: "My Squads",
                count: pendingIncomingCount + outgoingRequests.length,
              },
            ]}
          />
        </div>
      </section>

      {/* Porcelain Ceramic Clay Workspace Body */}
      <section className="py-16 sm:py-20 bg-[#F3F4F8] text-[#0E0E10]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          {/* 1. BROWSE TEAMS — Spacious 2-Column Sculpted Clay Squad Cards */}
          {activeTab === 'browse' && (
            <div className="space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="relative w-full lg:w-96">
                  <Search
                    className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                    strokeWidth={1.75}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hackathon, skill, or college..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-black/[0.08] text-sm text-[#0E0E10] placeholder:text-neutral-400 focus:border-[#4353FF] focus:outline-none"
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
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        skillFilter === skill
                          ? 'cnx-clay-btn-dark'
                          : 'bg-white border border-black/[0.08] text-neutral-600 hover:text-[#0E0E10]'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {filteredSquads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredSquads.map((squad, idx) => {
                    const outReq = getOutgoingStatus(squad.id);
                    const isMine = squad.createdByMe || squad.leader === user.name;
                    const isFull = squad.currentSize >= squad.maxSize;

                    return (
                      <RevealBlock key={squad.id} delay={Math.min(idx * 0.04, 0.2)}>
                        <article className="h-full rounded-[26px] cnx-clay-light p-7 flex flex-col justify-between gap-6">
                          <div>
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h2 className="text-xl font-bold text-[#0E0E10] tracking-[-0.02em]">
                                  {squad.name}
                                </h2>
                                <p className="text-xs font-semibold text-[#4353FF] mt-0.5">
                                  {squad.hackathon}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-xs font-bold text-[#0E0E10]">
                                  {squad.currentSize}/{squad.maxSize} filled
                                </p>
                                <p className="font-mono text-[11px] text-neutral-400 mt-0.5">
                                  {squad.inviteCode}
                                </p>
                              </div>
                            </div>

                            <p className="mt-5 text-sm text-neutral-600">
                              Looking for{' '}
                              <strong className="text-[#0E0E10]">{squad.lookingFor}</strong> ·{' '}
                              {squad.leader} ({squad.college})
                            </p>
                          </div>

                          <div className="pt-5 border-t border-black/[0.07] flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs text-neutral-500 font-medium">
                              {squad.skills.slice(0, 3).join(' · ')}
                            </span>

                            <div className="flex items-center gap-4">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedSquad(squad);
                                  setJoinRole(squad.lookingFor);
                                  setJoinNote('');
                                }}
                                className="text-xs font-semibold text-neutral-600 hover:text-[#0E0E10] transition-colors"
                              >
                                Details
                              </button>

                              {isMine ? (
                                <button
                                  type="button"
                                  onClick={() => setActiveTab('manage')}
                                  className="px-4 py-2 rounded-xl bg-[#EEF0FF] text-[#4353FF] text-xs font-semibold hover:bg-[#E0E4FF] transition-colors"
                                >
                                  Manage
                                </button>
                              ) : outReq ? (
                                <span className="text-xs font-semibold text-[#4353FF]">
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
                                  className={`px-4 py-2 rounded-xl text-xs font-semibold ${
                                    isFull
                                      ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                                      : 'cnx-clay-btn-primary'
                                  }`}
                                >
                                  {isFull ? 'Full' : 'Request to Join'}
                                </button>
                              )}
                            </div>
                          </div>
                        </article>
                      </RevealBlock>
                    );
                  })}
                </div>
              ) : (
                <div className="p-12 rounded-[26px] cnx-clay-light-static text-center space-y-3">
                  <p className="text-sm text-neutral-600">
                    No squads matched your filter. Create a new squad or clear filters.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSkillFilter('All');
                    }}
                    className="cnx-clay-btn-dark px-5 py-2.5 rounded-xl text-xs font-semibold"
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
              <div className="rounded-[28px] cnx-clay-light-static p-7 sm:p-9 space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-[#EEF0FF] text-[#4353FF] flex items-center justify-center shrink-0">
                    <KeyRound className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#0E0E10]">Redeem Squad Code</h2>
                    <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                      Enter a team invite code shared by a squad leader to claim an open seat
                      immediately.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleRedeemCode} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-2">
                      Invite code
                    </label>
                    <div className="flex gap-2.5">
                      <input
                        type="text"
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                        placeholder="e.g. CNX-ROACH"
                        className="flex-1 px-4 py-3 rounded-xl bg-[#F3F4F8] border border-black/[0.09] font-mono text-sm font-semibold text-[#0E0E10] uppercase placeholder:text-neutral-400 focus:border-[#4353FF] focus:bg-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="cnx-clay-btn-primary px-6 py-3 rounded-xl text-xs font-semibold"
                      >
                        Join Squad
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                    <span>Sample codes:</span>
                    {['CNX-ROACH', 'CNX-AI26', 'CNX-NK26'].map((sample) => (
                      <button
                        key={sample}
                        type="button"
                        onClick={() => setInviteCode(sample)}
                        className="px-3 py-1 rounded-lg bg-[#F3F4F8] border border-black/[0.08] font-mono text-xs font-semibold text-[#0E0E10] hover:border-[#4353FF]"
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
                        ? 'bg-[#EEF0FF] border-[#4353FF]/25 text-[#0E0E10]'
                        : 'bg-[#FFF0F6] border-[#E1498A]/25 text-[#0E0E10]'
                    }`}
                  >
                    <p className="font-semibold">{codeFeedback.message}</p>
                    {codeFeedback.squad && (
                      <p className="mt-1 text-neutral-600">
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
              <div className="rounded-[28px] cnx-clay-light-static p-7 sm:p-9 space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#0E0E10]">Create a Hackathon Squad</h2>
                  <p className="mt-1 text-xs text-neutral-600">
                    Publish your team to Browse Teams and generate a shareable BuddyKid invite code.
                  </p>
                </div>

                {createdSquad && (
                  <div className="p-4 rounded-2xl bg-[#EEF0FF] border border-[#4353FF]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[#0E0E10]">
                        Squad &ldquo;{createdSquad.name}&rdquo; is live
                      </p>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        Invite Code:{' '}
                        <span className="font-mono font-bold text-[#4353FF]">
                          {createdSquad.inviteCode}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => copyCode(createdSquad.inviteCode)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-black/[0.1] text-xs font-semibold text-[#0E0E10]"
                      >
                        <Copy className="w-3.5 h-3.5" strokeWidth={1.75} />
                        Copy Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('browse')}
                        className="cnx-clay-btn-dark inline-flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-semibold"
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
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                        Squad name
                      </label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. TensorGuild"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F3F4F8] border border-black/[0.08] text-sm text-[#0E0E10] placeholder:text-neutral-400 focus:border-[#4353FF] focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                        Hackathon name
                      </label>
                      <input
                        type="text"
                        value={newHackathon}
                        onChange={(e) => setNewHackathon(e.target.value)}
                        placeholder="e.g. Smart India Hackathon 2026"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F3F4F8] border border-black/[0.08] text-sm text-[#0E0E10] placeholder:text-neutral-400 focus:border-[#4353FF] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                        Max team size
                      </label>
                      <select
                        value={newMaxSize}
                        onChange={(e) => setNewMaxSize(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F3F4F8] border border-black/[0.08] text-sm text-[#0E0E10] focus:border-[#4353FF] focus:bg-white focus:outline-none"
                      >
                        {[2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} Members
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                        Mode
                      </label>
                      <select
                        value={newMode}
                        onChange={(e) =>
                          setNewMode(e.target.value as 'Hybrid' | 'Offline' | 'Online')
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F3F4F8] border border-black/[0.08] text-sm text-[#0E0E10] focus:border-[#4353FF] focus:bg-white focus:outline-none"
                      >
                        <option value="Hybrid">Hybrid</option>
                        <option value="Offline">Offline</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                        Looking for
                      </label>
                      <input
                        type="text"
                        value={newLookingFor}
                        onChange={(e) => setNewLookingFor(e.target.value)}
                        placeholder="e.g. Frontend / Design"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F3F4F8] border border-black/[0.08] text-sm text-[#0E0E10] placeholder:text-neutral-400 focus:border-[#4353FF] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      College / hub
                    </label>
                    <input
                      type="text"
                      value={newCollege}
                      onChange={(e) => setNewCollege(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F3F4F8] border border-black/[0.08] text-sm text-[#0E0E10] focus:border-[#4353FF] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-2">
                      Required stack
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {BUDDYKID_SKILL_OPTIONS.map((skill) => {
                        const selected = newSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => toggleCreateSkill(skill)}
                            className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-colors ${
                              selected
                                ? 'bg-[#4353FF] text-white border-[#4353FF]'
                                : 'bg-[#F3F4F8] text-neutral-600 border-black/[0.08] hover:text-[#0E0E10]'
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                      Project brief (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Describe the problem statement or stack direction..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F3F4F8] border border-black/[0.08] text-sm text-[#0E0E10] placeholder:text-neutral-400 focus:border-[#4353FF] focus:bg-white focus:outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="cnx-clay-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
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
                  <h2 className="text-lg font-bold text-[#0E0E10]">
                    My Created Squads ({mySquads.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('create')}
                    className="text-xs font-semibold text-[#4353FF] hover:underline underline-offset-4"
                  >
                    + New Squad
                  </button>
                </div>

                <div className="space-y-4">
                  {mySquads.map((sq) => (
                    <div
                      key={sq.id}
                      className="rounded-[24px] cnx-clay-light p-6 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="text-base font-bold text-[#0E0E10]">{sq.name}</h3>
                          <p className="text-xs text-neutral-500">{sq.hackathon}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyCode(sq.inviteCode)}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#F3F4F8] border border-black/[0.08] font-mono text-xs font-semibold text-[#0E0E10] hover:border-[#4353FF]"
                        >
                          {sq.inviteCode}
                          <Copy className="w-3 h-3 text-neutral-500" strokeWidth={1.75} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-black/[0.07]">
                        <span className="font-semibold text-[#0E0E10]">
                          {sq.currentSize}/{sq.maxSize} seats filled
                        </span>
                        <span>Looking for: {sq.lookingFor}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 space-y-4">
                  <h2 className="text-lg font-bold text-[#0E0E10]">
                    Outgoing Requests ({outgoingRequests.length})
                  </h2>
                  {outgoingRequests.length > 0 ? (
                    <div className="rounded-[24px] cnx-clay-light-static divide-y divide-black/[0.07] overflow-hidden">
                      {outgoingRequests.map((req) => (
                        <div
                          key={req.id}
                          className="p-4 sm:px-5 flex items-center justify-between gap-4"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#0E0E10] truncate">
                              {req.squadName} ·{' '}
                              <span className="text-neutral-500 font-normal">{req.hackathon}</span>
                            </p>
                            <p className="text-xs text-neutral-500 mt-0.5">
                              {req.roleRequested} · {req.timestamp}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-semibold text-[#4353FF]">
                              {req.status}
                            </span>
                            {req.status === 'Pending' && (
                              <button
                                type="button"
                                onClick={() => withdrawOutgoingRequest(req.id)}
                                className="p-1.5 rounded-lg text-neutral-400 hover:text-[#0E0E10]"
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
                    <div className="p-6 rounded-[24px] cnx-clay-light-static text-xs text-neutral-500">
                      No outgoing requests yet. Request to join a squad from Browse Teams.
                    </div>
                  )}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-5">
                <h2 className="text-lg font-bold text-[#0E0E10]">
                  Incoming Approvals ({pendingIncomingCount} pending)
                </h2>

                <div className="space-y-4">
                  {incomingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="rounded-[24px] cnx-clay-light-static p-6 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-sm font-bold text-[#0E0E10]">
                            {req.applicantName}{' '}
                            <span className="font-normal text-neutral-500">· {req.timestamp}</span>
                          </h3>
                          <p className="text-xs text-neutral-500 mt-0.5">{req.applicantCollege}</p>
                        </div>
                        <span className="text-xs font-semibold text-[#4353FF]">{req.status}</span>
                      </div>

                      <div className="pt-3 border-t border-black/[0.07] text-xs space-y-1">
                        <p className="text-[#0E0E10] font-semibold">
                          {req.squadName} · {req.roleRequested}
                        </p>
                        <p className="text-neutral-600 leading-relaxed">{req.note}</p>
                        <p className="text-[11px] font-medium text-neutral-500 pt-1">
                          {req.skills.join(' · ')}
                        </p>
                      </div>

                      {req.status === 'Pending' && (
                        <div className="pt-3 flex items-center justify-end gap-3 border-t border-black/[0.07]">
                          <button
                            type="button"
                            onClick={() => handleIncomingRequest(req.id, 'decline')}
                            className="px-4 py-2 rounded-xl border border-black/[0.1] bg-white text-xs font-semibold text-neutral-600 hover:text-[#0E0E10]"
                          >
                            Decline
                          </button>
                          <button
                            type="button"
                            onClick={() => handleIncomingRequest(req.id, 'accept')}
                            className="cnx-clay-btn-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
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
        subtitle={selectedSquad ? `${selectedSquad.hackathon} · ${selectedSquad.inviteCode}` : ""}
        title={selectedSquad?.name || ""}
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
                className="cnx-clay-btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Join Request
              </button>
            </div>
          )
        }
      >
        {selectedSquad && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl cnx-popout-tile p-3.5">
                <p className="text-[11px] font-medium text-neutral-500">Squad leader</p>
                <p className="mt-1 text-xs font-semibold text-white">{selectedSquad.leader}</p>
              </div>
              <div className="rounded-xl cnx-popout-tile p-3.5">
                <p className="text-[11px] font-medium text-neutral-500">Open role</p>
                <p className="mt-1 text-xs font-semibold text-[#60A5FA]">
                  {selectedSquad.lookingFor}
                </p>
              </div>
              <div className="rounded-xl cnx-popout-tile p-3.5">
                <p className="text-[11px] font-medium text-neutral-500">Campus / Base</p>
                <p className="mt-1 text-xs text-neutral-300">{selectedSquad.college}</p>
              </div>
              <div className="rounded-xl cnx-popout-tile p-3.5">
                <p className="text-[11px] font-medium text-neutral-500">Mode</p>
                <p className="mt-1 text-xs text-neutral-300">{selectedSquad.mode}</p>
              </div>
            </div>

            <div className="rounded-xl cnx-popout-tile p-4">
              <p className="text-[11px] font-medium text-neutral-500 mb-1.5">Squad brief</p>
              <p className="text-sm text-neutral-300 leading-relaxed">{selectedSquad.description}</p>
            </div>

            <div className="rounded-xl cnx-popout-tile p-4">
              <p className="text-[11px] font-medium text-neutral-500 mb-2">Core stack</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedSquad.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-white/[0.05] text-xs font-medium text-neutral-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {!selectedSquad.createdByMe && selectedSquad.leader !== user.name && (
              <div className="pt-2 space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Role you offer
                  </label>
                  <input
                    type="text"
                    value={joinRole}
                    onChange={(e) => setJoinRole(e.target.value)}
                    className="cnx-popout-input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                    Intro note to {selectedSquad.leader}
                  </label>
                  <textarea
                    rows={3}
                    value={joinNote}
                    onChange={(e) => setJoinNote(e.target.value)}
                    placeholder="Share relevant repos, hackathon experience, or what you can ship..."
                    className="cnx-popout-input resize-none"
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
