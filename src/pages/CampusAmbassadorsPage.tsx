import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { CAMPUS_AMBASSADORS } from '../data/ambassadors';
import { RoleApplicationModal } from '../components/shared/RoleApplicationModal';
import { HeroMount, RevealBlock } from '../components/ui/MotionPrimitives';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Submit Application',
    desc: 'Share your campus background, communities led, or technical projects before Dec 15, 2026.',
  },
  {
    step: '02',
    title: '15-Min Chapter Sync',
    desc: 'Brief conversation with CodeNeuraX Core Team on local workshop goals and student needs.',
  },
  {
    step: '03',
    title: 'Onboard & Tooling',
    desc: 'Receive chapter playbooks, BuddyKid squad priority, speaker access, and partner links.',
  },
  {
    step: '04',
    title: 'Launch Campus Chapter',
    desc: 'Host peer study jams, mobilize AlgoRush & NeuraKnockout teams, and mentor junior cohorts.',
  },
];

export const CampusAmbassadorsPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [applyOpen, setApplyOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CAMPUS_AMBASSADORS;
    return CAMPUS_AMBASSADORS.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.college.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="bg-[#0E0E10] text-white min-h-screen">
      {/* Clean Typographic Prism Hero */}
      <section className="cnx-prism-hero border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <HeroMount className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-[clamp(2.35rem,4.6vw,3.75rem)] font-bold tracking-[-0.035em] text-white leading-[1.08]">
                Student leaders scaling{' '}
                <span className="cnx-accent-gradient-dark">chapters</span> across India.
              </h1>
              <p className="mt-3.5 text-[15px] sm:text-base text-neutral-300 leading-relaxed">
                Student leads representing CodeNeuraX across Indian campuses.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="cnx-clay-btn-white inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold shrink-0 w-fit"
            >
              Become a Campus Ambassador
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </HeroMount>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.1] border-y border-white/[0.1]">
            <div className="py-6 sm:pr-8 flex items-baseline justify-between">
              <span className="text-sm font-medium text-neutral-400">Campus Ambassadors</span>
              <span className="text-3xl font-extrabold text-white">08</span>
            </div>
            <div className="py-6 sm:px-8 flex items-baseline justify-between">
              <span className="text-sm font-medium text-neutral-400">Partner Colleges</span>
              <span className="text-3xl font-extrabold text-white">08</span>
            </div>
            <div className="py-6 sm:pl-8 flex items-baseline justify-between">
              <span className="text-sm font-medium text-neutral-400">Reach</span>
              <span className="text-xl font-bold cnx-accent-gradient-dark">Pan-India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Porcelain Section: Circular Clay Medallions (zero icon soup, zero #1 tags) */}
      <section className="py-20 bg-[#F3F4F8] text-[#0E0E10]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#0E0E10]">
                Campus <span className="cnx-accent-gradient-light">Ambassadors</span> ({filtered.length})
              </h2>
              
            </div>

            <div className="relative w-full sm:w-80">
              <Search
                className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                strokeWidth={1.75}
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search leader, college, city..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs text-[#0E0E10] placeholder:text-neutral-400 focus:border-[#4353FF] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((amb, idx) => (
              <RevealBlock key={amb.id} delay={Math.min(idx * 0.04, 0.2)}>
                <a
                  href={amb.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group h-full rounded-[26px] cnx-clay-light p-7 flex flex-col items-center text-center justify-between gap-5"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-[#151722] text-white ring-1 ring-black/[0.08] group-hover:ring-black/[0.2] transition-all duration-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.16),0_12px_24px_-8px_rgba(14,14,16,0.38)] flex items-center justify-center text-xl font-extrabold tracking-tight">
                      {amb.initials}
                    </div>

                    <h3 className="mt-5 text-base font-bold text-[#0E0E10] tracking-tight inline-flex items-center gap-1 group-hover:text-[#4353FF] transition-colors">
                      <span>{amb.name}</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#4353FF] transition-colors"
                        strokeWidth={1.75}
                      />
                    </h3>

                    <p className="mt-1 text-xs font-medium text-neutral-700 leading-snug">
                      {amb.shortCollege}
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-500">{amb.city}</p>
                  </div>

                  <p className="pt-4 border-t border-black/[0.07] w-full text-xs text-neutral-600 leading-relaxed">
                    {amb.focus}
                  </p>
                </a>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Clean Horizontal Editorial Process (Zero Boxy Step Cards) */}
      <section className="py-20 sm:py-24 bg-[#0E0E10] border-t border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-[clamp(1.95rem,3.4vw,2.85rem)] font-bold tracking-[-0.03em] text-white leading-[1.1]">
                Ready to lead on your <span className="cnx-accent-gradient-dark">campus</span>?
              </h2>
              
            </div>

            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="cnx-clay-btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold w-fit"
            >
              Apply as Ambassador
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>

          <div className="border-t border-white/[0.1] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
            {PROCESS_STEPS.map((st) => (
              <div
                key={st.step}
                className="py-8 sm:px-7 first:sm:pl-0 last:sm:pr-0 space-y-2.5"
              >
                <span className="text-xs font-bold text-[#60A5FA]">{st.step}</span>
                <h3 className="text-base font-bold text-white">{st.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RoleApplicationModal
        open={applyOpen}
        roleId="role-campus-ambassador-2027"
        roleTitle="CodeNeuraX Campus Ambassador 2027"
        onClose={() => setApplyOpen(false)}
      />
    </div>
  );
};
