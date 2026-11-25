import React, { useMemo, useState } from 'react';
import { ArrowUpRight, GraduationCap, MapPin, Search } from 'lucide-react';
import { CAMPUS_AMBASSADORS } from '../data/ambassadors';
import { RoleApplicationModal } from '../components/shared/RoleApplicationModal';
import { HeroMount } from '../components/ui/MotionPrimitives';
import { SectionHeader } from '../components/ui/SectionHeader';

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
    desc: 'Receive chapter playbooks, BuddyKid squad priority, speaker request access, and partner links.',
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
      {/* Midnight-Indigo Hero Banner + Real Stats Strip */}
      <section className="cnx-midnight-hero border-b border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <HeroMount className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="cnx-section-label text-[#818CF8] mb-3">Chapter Network</p>
              <h1 className="text-[clamp(2.35rem,4.6vw,3.9rem)] font-bold tracking-[-0.03em] text-white leading-[1.12] pb-2 overflow-visible">
                Student leaders scaling{' '}
                <span className="font-editorial pr-1">chapters</span> across India.
              </h1>
              <p className="mt-2 text-[15px] sm:text-base text-neutral-300 leading-relaxed">
                Campus Ambassadors anchor local study circles, form cross-year hackathon squads,
                and represent CodeNeuraX inside engineering institutes nationwide.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setApplyOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#0E0E10] text-sm font-semibold hover:bg-neutral-200 transition-colors active:scale-[0.98] shrink-0 w-fit"
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
              <span className="text-sm font-medium text-neutral-400">Network</span>
              <span className="text-xl font-bold text-[#818CF8]">Pan-India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pure-White Section: 8 Verified Ambassadors */}
      <section className="py-16 sm:py-20 bg-white text-[#0E0E10]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <p className="cnx-section-label text-[#4353FF] mb-1">Verified Roster</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0E0E10]">
                2026 Campus Ambassadors ({filtered.length})
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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#F4F4F6] border border-[#0E0E10]/[0.08] text-xs text-[#0E0E10] placeholder:text-neutral-500 focus:border-[#4353FF] focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((amb, idx) => (
              <article
                key={amb.id}
                className="rounded-2xl bg-[#F4F4F6] border border-[#0E0E10]/[0.08] hover:border-[#0E0E10]/[0.2] transition-all p-6 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="w-14 h-14 rounded-xl bg-[#0E0E10] text-white flex items-center justify-center text-lg font-extrabold">
                      {amb.initials}
                    </div>
                    <span className="text-xs font-bold text-[#4353FF]">#{idx + 1}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0E0E10] tracking-tight">{amb.name}</h3>

                  <div className="mt-2 flex items-start gap-1.5 text-xs text-neutral-700">
                    <GraduationCap
                      className="w-3.5 h-3.5 text-[#4353FF] mt-0.5 shrink-0"
                      strokeWidth={1.75}
                    />
                    <span className="leading-snug font-medium">{amb.college}</span>
                  </div>

                  <div className="mt-1.5 flex items-center gap-1.5 text-xs text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
                    <span>{amb.city}</span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#0E0E10]/[0.08]">
                    <span className="text-[11px] font-semibold text-[#0E0E10]">{amb.cohort}</span>
                    <p className="mt-1 text-xs text-neutral-600 leading-relaxed">{amb.focus}</p>
                  </div>
                </div>

                <a
                  href={amb.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 pt-3 border-t border-[#0E0E10]/[0.08] inline-flex items-center justify-between text-xs font-semibold text-[#0E0E10] hover:text-[#4353FF] transition-colors"
                >
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Process Timeline + CTA */}
      <section className="py-16 sm:py-20 bg-[#0E0E10] border-t border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 space-y-14">
          <SectionHeader
            label="Selection Process"
            title={
              <>
                Ready to represent CodeNeuraX on your{' '}
                <span className="font-editorial pr-1">campus</span>?
              </>
            }
            action={
              <button
                type="button"
                onClick={() => setApplyOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-sm font-semibold transition-colors"
              >
                Apply as Ambassador
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((st) => (
              <div
                key={st.step}
                className="rounded-xl bg-[#16161A] border border-white/[0.08] p-6"
              >
                <span className="text-xs font-bold text-[#818CF8]">Step {st.step}</span>
                <h3 className="mt-2 text-base font-bold text-white">{st.title}</h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed">{st.desc}</p>
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
