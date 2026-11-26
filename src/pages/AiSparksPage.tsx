import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Award, Calendar, Check, Clock, Cpu, MapPin, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AI_SPARKS_SCHEDULE } from '../data/events';
import { AI_SPARKS_PARTNERS, AI_SPARKS_SPEAKERS } from '../data/team';
import { HeroMount } from '../components/ui/MotionPrimitives';
import { Modal } from '../components/ui/Modal';
import { PartnerLogoMark } from '../components/ui/PartnerLogoMark';
import { SectionHeader } from '../components/ui/SectionHeader';

export const AiSparksPage: React.FC = () => {
  const { pushToast } = useApp();
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');
  const [recapModalOpen, setRecapModalOpen] = useState(false);

  const schedule = AI_SPARKS_SCHEDULE[activeDay];

  const handleDownloadMaterials = (tierName: string) => {
    const content = [
      `# AI Sparks '26 — ${tierName}`,
      `Venue: Marwadi University, Rajkot (Dept. of AI, ML & DS)`,
      `Dates: Aug 7-8, 2026 | 360+ Attendees`,
      ``,
      `Included Verified Perks:`,
      `- $30 USD (₹2,800) platform credits for Lovable / Vercel / n8n via Devnovate`,
      `- Free GATE DA Prep Course (₹4,999 value) for top assessment performers`,
      `- Official 2-Day Co-Branded Completion Certificate`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-sparks-2026-syllabus-perks.md';
    a.click();
    URL.revokeObjectURL(url);

    pushToast({
      title: `Downloaded AI Sparks ’26 Brief`,
      description: `Saved syllabus & ${tierName} details as Markdown.`,
      variant: 'success',
    });
  };

  return (
    <div className="bg-[#0E0E10] text-white min-h-screen">
      {/* Midnight-Indigo Atmospheric Hero */}
      <section className="cnx-prism-hero border-b border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.75} />
            Back to CNX Events
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <HeroMount className="lg:col-span-7">
              <p className="text-xs font-semibold text-[#60A5FA] mb-3">
                Flagship Summit · Aug 7–8, 2026
              </p>

              <h1 className="text-[clamp(2.85rem,6vw,5rem)] font-bold tracking-[-0.03em] text-white leading-[1.12] pb-2 overflow-visible">
                AI Sparks{' '}
                <span className="cnx-accent-gradient-dark">’26</span>
              </h1>

              <p className="mt-3 text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
                2-day flagship AI &amp; Automation summit at Marwadi University, Rajkot.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Calendar, label: 'Dates', value: 'Aug 7–8, 2026' },
                  { icon: MapPin, label: 'Venue', value: 'Rajkot, MU' },
                  { icon: Users, label: 'Attendees', value: '360+ Builders' },
                  { icon: Cpu, label: 'Credits', value: '$30 USD / Pass' },
                ].map((meta) => {
                  const Icon = meta.icon;
                  return (
                    <div
                      key={meta.label}
                      className="rounded-[20px] cnx-clay-dark-soft p-4"
                    >
                      <p className="text-xs text-neutral-500 flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-[#4353FF]" strokeWidth={1.75} />
                        {meta.label}
                      </p>
                      <p className="mt-1 text-sm font-bold text-white">{meta.value}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setRecapModalOpen(true)}
                  className="cnx-clay-btn-primary inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                >
                  Summit Recap &amp; Materials
                </button>
                <Link
                  to="/library"
                  className="cnx-clay-btn-white inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
                >
                  Open Agentic AI Notes
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
                </Link>
              </div>
            </HeroMount>

            <HeroMount delay={0.08} className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.1]">
                  <img
                    src="/images/ai-sparks-audience.jpg"
                    alt="AI Sparks 2026 packed auditorium"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.1]">
                  <img
                    src="/images/ai-sparks-speaker.jpg"
                    alt="Technical keynote on Marwadi University podium"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.1]">
                  <img
                    src="/images/ai-sparks-closing.jpg"
                    alt="AI Sparks 2026 workshop felicitation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </HeroMount>
          </div>
        </div>
      </section>

      {/* Alternating Pure-White Schedule Band */}
      <section className="py-20 bg-[#F3F4F8] text-[#0E0E10]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <SectionHeader
            tone="light"
            label="Interactive Schedule"
            title={
              <>
                Two days of structured{' '}
                <span className="cnx-accent-gradient-dark">curriculum</span>.
              </>
            }
            description={`${schedule.theme} · ${schedule.hours}`}
            action={
              <div className="flex items-center gap-2">
                {(['day1', 'day2'] as const).map((dayKey) => {
                  const active = activeDay === dayKey;
                  return (
                    <button
                      key={dayKey}
                      type="button"
                      onClick={() => setActiveDay(dayKey)}
                      className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                        active
                          ? 'bg-[#0E0E10] text-white'
                          : 'bg-[#F4F4F6] border border-[#0E0E10]/[0.08] text-neutral-700 hover:text-[#0E0E10]'
                      }`}
                    >
                      {dayKey === 'day1' ? 'Day 1 · Aug 7' : 'Day 2 · Aug 8'}
                    </button>
                  );
                })}
              </div>
            }
          />

          <div className="mt-8 rounded-[24px] cnx-clay-light-static divide-y divide-[#0E0E10]/[0.08] overflow-hidden">
            {schedule.sessions.map((session, idx) => (
              <div
                key={session.title}
                className="p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start bg-white hover:bg-[#F4F4F6]/60 transition-colors"
              >
                <div className="lg:col-span-3 flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#EEF0FF] text-[#4353FF] text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-[#0E0E10] inline-flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" strokeWidth={1.75} />
                    {session.time} IST
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <h3 className="text-base sm:text-lg font-bold text-[#0E0E10] tracking-tight">
                    {session.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">
                    {session.description}
                  </p>
                </div>

                <div className="lg:col-span-3 flex flex-col lg:items-end justify-between gap-2.5">
                  <span className="text-xs font-semibold text-[#0E0E10]">{session.speaker}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {session.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md bg-[#F4F4F6] border border-[#0E0E10]/[0.06] text-[11px] font-medium text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark 4-Speaker Portrait Cards & Partners & Passes */}
      <section className="py-20 bg-[#0E0E10] border-t border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 space-y-20">
          {/* 4 Keynote Speakers */}
          <div>
            <SectionHeader
              label="Keynote Speakers"
              title={
                <>
                  Four speakers across AI, ML &amp;{' '}
                  <span className="cnx-accent-gradient-dark">automation</span>.
                </>
              }
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {AI_SPARKS_SPEAKERS.map((spk) => (
                <div
                  key={spk.id}
                  className="group rounded-[24px] cnx-clay-dark transition-colors p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold text-[#818CF8]">{spk.day}</span>
                      <a
                        href={spk.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-neutral-500 hover:text-white inline-flex items-center gap-1"
                      >
                        LinkedIn
                        <ArrowUpRight className="w-3 h-3" strokeWidth={1.75} />
                      </a>
                    </div>

                    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden bg-[#0E0E10] ring-1 ring-white/[0.14] group-hover:ring-white/[0.3] transition-all duration-300 shadow-[0_12px_26px_rgba(0,0,0,0.55)] mb-5">
                      {spk.avatar ? (
                        <img
                          src={spk.avatar}
                          alt={spk.name}
                          className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl font-bold">
                          {spk.initials}
                        </div>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white">{spk.name}</h3>
                    <p className="mt-0.5 text-xs font-medium text-[#818CF8]">{spk.role}</p>
                    <p className="mt-1 text-xs text-neutral-500">{spk.organization}</p>
                    <p className="mt-3 text-xs text-neutral-500 leading-relaxed">{spk.bio}</p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.08]">
                    <p className="text-[11px] font-medium text-neutral-500 mb-1">Session Focus</p>
                    <p className="text-xs text-white font-semibold leading-snug">{spk.topic}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6 Official Partners */}
          <div>
            <SectionHeader
              label="Backed By The Best"
              title="Six official summit partners."
            />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {AI_SPARKS_PARTNERS.map((partner) => (
                <div
                  key={partner.id}
                  className="rounded-[20px] cnx-clay-dark-soft p-5 flex items-center gap-4"
                >
                  <PartnerLogoMark partner={partner} surface="dark" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white">{partner.name}</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">{partner.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2-Tier Pass & Perks Comparison */}
          <div>
            <SectionHeader
              label="Passes & Participant Perks"
              title="Verified credits, merit tracks & certification."
            />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-[24px] cnx-clay-dark-static p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="cnx-section-label text-neutral-500">All Attendees</span>
                    <span className="text-xs font-semibold text-white">₹350 Summit Pass</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">2-Day Builder Access Pass</h3>
                  <p className="mt-2 text-sm text-neutral-500">
                    Full access to Day 1 Agentic AI labs, Day 2 ML workshops, IDP counseling desk,
                    and partner builder credits.
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-white/[0.08] pt-6 text-sm text-neutral-300">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#4353FF] mt-0.5 shrink-0" strokeWidth={1.75} />
                      <span>
                        <strong className="text-white">$30 USD (₹2,800)</strong> platform credits
                        for Lovable, Vercel &amp; n8n via Devnovate
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#4353FF] mt-0.5 shrink-0" strokeWidth={1.75} />
                      <span>
                        Official{' '}
                        <strong className="text-white">
                          2-Day Co-Branded Completion Certificate
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#4353FF] mt-0.5 shrink-0" strokeWidth={1.75} />
                      <span>Meet-and-greet &amp; career Q&amp;A with Dev Anand &amp; speakers</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadMaterials('2-Day Builder Access Pass')}
                  className="cnx-clay-btn-dark mt-8 w-full py-3 rounded-xl border border-white/[0.1] text-xs font-semibold"
                >
                  Download Summit Syllabus &amp; Perks Brief
                </button>
              </div>

              <div className="rounded-[26px] cnx-clay-light-static text-[#0E0E10] p-7 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="cnx-section-label text-[#4353FF]">
                      Top Assessment Performers
                    </span>
                    <Award className="w-5 h-5 text-[#E1498A]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0E0E10]">
                    Merit &amp; Scholarship Recognition
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    Awarded to top-scoring students in the Day 2 technical evaluation covering
                    Agentic AI, workflows, and ML modeling.
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-neutral-200 pt-6 text-sm text-neutral-700">
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#4353FF] mt-0.5 shrink-0" strokeWidth={1.75} />
                      <span>
                        <strong className="text-[#0E0E10]">
                          Free GATE DA Prep Course (₹4,999 value)
                        </strong>{' '}
                        for top assessment performers
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#4353FF] mt-0.5 shrink-0" strokeWidth={1.75} />
                      <span>
                        Full <strong className="text-[#0E0E10]">$30 USD (₹2,800) Devnovate</strong>{' '}
                        credits for Lovable, Vercel &amp; n8n
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#4353FF] mt-0.5 shrink-0" strokeWidth={1.75} />
                      <span>
                        Official 2-Day Co-Branded Merit Certificate + priority Core Team track
                      </span>
                    </li>
                  </ul>
                </div>

                <Link
                  to="/library"
                  className="cnx-clay-btn-dark mt-8 w-full py-3 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-2"
                >
                  Access GATE DA PYQs in CNX Library
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        open={recapModalOpen}
        onClose={() => setRecapModalOpen(false)}
        subtitle="Aug 7-8, 2026 · Post-Summit Archive"
        title="AI Sparks ’26 Recap"
        maxWidthClass="max-w-[760px]"
        footer={
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/library"
              onClick={() => setRecapModalOpen(false)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-[#4353FF] transition-colors"
            >
              <span>Agentic AI notes</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.85} />
            </Link>
            <button
              type="button"
              onClick={() => handleDownloadMaterials("Post-Summit Archive")}
              className="cnx-clay-btn-primary px-5 py-2 rounded-xl text-xs font-semibold"
            >
              Download recap sheet
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-12 gap-3.5">
          <div className="col-span-4 rounded-[18px] cnx-bento-tile p-4">
            <p className="text-2xl font-extrabold text-[#0E111B]">360+</p>
            <p className="mt-0.5 text-[11px] font-medium text-neutral-500">Builders</p>
          </div>

          <div className="col-span-4 rounded-[18px] cnx-bento-accent p-4">
            <p className="text-2xl font-extrabold text-white">$30</p>
            <p className="mt-0.5 text-[11px] font-medium text-white/80">Devnovate credits</p>
          </div>

          <div className="col-span-4 rounded-[18px] cnx-bento-tile p-4">
            <p className="text-2xl font-extrabold text-[#0E111B]">₹4,999</p>
            <p className="mt-0.5 text-[11px] font-medium text-neutral-500">GATE DA awards</p>
          </div>

          <div className="col-span-12 sm:col-span-5 rounded-[18px] cnx-bento-tile p-4 flex flex-col justify-between">
            <p className="text-[11px] font-semibold text-neutral-500">Summary</p>
            <p className="mt-2 text-xs sm:text-[13.5px] text-neutral-700 leading-relaxed">
              Two full days of Python Colab labs, Agentic AI reasoning workshops, and ML model
              evaluations at Marwadi University, Rajkot.
            </p>
          </div>

          <div className="col-span-12 sm:col-span-7 rounded-[18px] cnx-bento-tile p-4">
            <p className="text-[11px] font-semibold text-neutral-500 mb-2">
              Verified perks distributed
            </p>
            <ul className="divide-y divide-black/[0.06] text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
              <li className="py-2 pt-0">
                $30 USD (₹2,800) Lovable, Vercel &amp; n8n credits via Devnovate
              </li>
              <li className="py-2">Free GATE DA Prep Course (₹4,999 value) for top scorers</li>
              <li className="py-2 pb-0">Official 2-Day Co-Branded Completion Certificates</li>
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};
