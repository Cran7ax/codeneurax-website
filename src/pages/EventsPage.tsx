import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  COMPLETED_EVENTS,
  TOPICS_WE_COVER,
  UPCOMING_EVENTS,
} from '../data/events';
import type { CnxEvent } from '../types';
import { EventRegistrationModal } from '../components/shared/EventRegistrationModal';
import { HeroMount, RevealBlock } from '../components/ui/MotionPrimitives';
import { SectionHeader } from '../components/ui/SectionHeader';
import { SlidingTabs } from '../components/ui/SlidingTabs';

type GalleryFilter = 'All' | 'Upcoming' | 'Completed' | 'Workshops';

export const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<GalleryFilter>('All');
  const [selectedEvent, setSelectedEvent] = useState<CnxEvent | null>(null);

  const allEvents = useMemo(() => [...UPCOMING_EVENTS, ...COMPLETED_EVENTS], []);

  const filteredEvents = useMemo(() => {
    if (filter === 'All') return allEvents;
    if (filter === 'Upcoming') return UPCOMING_EVENTS;
    if (filter === 'Completed') return COMPLETED_EVENTS;
    return allEvents.filter(
      (e) =>
        e.category.toLowerCase().includes('summit') ||
        e.category.toLowerCase().includes('automation') ||
        e.category.toLowerCase().includes('interview') ||
        e.category.toLowerCase().includes('career'),
    );
  }, [filter, allEvents]);

  return (
    <div className="bg-[#0E0E10] text-white min-h-screen">
      {/* Clean Prism Header + Featured Clay Showcase */}
      <section className="cnx-prism-hero border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <HeroMount className="max-w-2xl mb-12">
            <h1 className="text-[clamp(2.35rem,4.6vw,3.75rem)] font-bold tracking-[-0.035em] text-white leading-[1.08]">
              Summits, sprints &amp; unfiltered{' '}
              <span className="cnx-accent-gradient-dark">engineering</span> sessions.
            </h1>
            <p className="mt-3.5 text-[15px] sm:text-base text-neutral-300 leading-relaxed">
              Summits, coding sprints, and engineering sessions across India.
            </p>
          </HeroMount>

          <RevealBlock className="rounded-[28px] overflow-hidden cnx-clay-dark-static grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#60A5FA] mb-2">
                  Flagship Summit · Aug 7–8, 2026
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-white">
                  AI Sparks ’26
                </h2>
                <p className="mt-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  360+ builders at Marwadi University · 4 keynotes, $30 credits &amp; GATE DA scholarships.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/aispark"
                  className="cnx-clay-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold"
                >
                  Explore AI Sparks ’26
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(UPCOMING_EVENTS[0])}
                  className="cnx-clay-btn-white inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold"
                >
                  Register NeuraKnockout ’26
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[260px] overflow-hidden group">
              <img
                src="/images/ai-sparks-closing.jpg"
                alt="AI Sparks 2026 at Marwadi University"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16161B]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-medium text-white">
                <span>360+ Attendees · 2 Days</span>
                <span>Marwadi University, Rajkot</span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Porcelain Ceramic Clay 2-Column Editorial Event Directory */}
      <section className="py-20 sm:py-24 bg-[#F3F4F8] text-[#0E0E10]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-black/[0.08]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0E0E10] tracking-tight">
              Event &amp; Session <span className="cnx-accent-gradient-light">Directory</span>
            </h2>

            <SlidingTabs
              value={filter}
              onChange={setFilter}
              options={[
                { id: "All", label: "All" },
                { id: "Upcoming", label: "Upcoming" },
                { id: "Completed", label: "Completed" },
                { id: "Workshops", label: "Workshops" },
              ]}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredEvents.map((evt, idx) => {
              const anchorId =
                evt.id === 'evt-neuraknockout-2026'
                  ? 'neuraknockout'
                  : evt.id === 'evt-algorush-2026'
                    ? 'algorush'
                    : undefined;

              return (
                <RevealBlock key={evt.id} delay={Math.min(idx * 0.03, 0.18)}>
                  <article
                    id={anchorId}
                    className="scroll-mt-24 h-full rounded-[26px] cnx-clay-light p-7 flex flex-col justify-between gap-6 group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-3">
                        <span
                          className={
                            evt.status === 'Upcoming' ? 'text-[#E1498A]' : 'text-[#4353FF]'
                          }
                        >
                          {evt.status} · {evt.mode}
                        </span>
                        <span className="text-neutral-500 font-medium">{evt.date}</span>
                      </div>

                      <h3 className="text-xl font-bold text-[#0E0E10] tracking-[-0.02em] leading-snug group-hover:text-[#4353FF] transition-colors">
                        {evt.title}
                      </h3>
                      <p className="mt-3 text-xs text-neutral-500">
                        {evt.venueOrPlatform} · <strong className="text-[#0E0E10]">{evt.attendeesOrTarget}</strong>
                      </p>
                    </div>

                    <div className="pt-4 border-t border-black/[0.07] flex items-center justify-between gap-4 text-xs">
                      <span className="text-neutral-500 truncate">
                        {evt.speaker ? evt.speaker : evt.category}
                      </span>

                      {evt.internalRoute === '/aispark' ? (
                        <Link
                          to="/aispark"
                          className="inline-flex items-center gap-1 font-semibold text-[#0E0E10] hover:text-[#4353FF] shrink-0 transition-colors"
                        >
                          <span>Open Microsite</span>
                          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setSelectedEvent(evt)}
                          className="inline-flex items-center gap-1 font-semibold text-[#0E0E10] hover:text-[#4353FF] shrink-0 transition-colors"
                        >
                          <span>{evt.status === 'Upcoming' ? 'Register' : 'View Brief'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </button>
                      )}
                    </div>
                  </article>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark Contrast Band: Guest Speakers + Clean Hairline Curriculum Grid */}
      <section className="py-20 bg-[#0E0E10] text-white border-t border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 space-y-20">
          <div>
            <SectionHeader
              title={
                <>
                  Guest speakers <span className="cnx-accent-gradient-dark">representing</span>
                </>
              }
              
            />

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { org: 'Google', note: 'Divanshi Jain · SWE Interview Prep' },
                { org: 'Amazon', note: 'Nidhi Singh · SWE & OA Strategy' },
                { org: 'Microsoft', note: 'Parth Thakrar · SDE & Ex-Intern' },
                { org: 'AOSSIE', note: 'Nidhi Singh · GSoC Mentorship' },
              ].map((item, idx) => (
                <RevealBlock key={item.org} delay={idx * 0.04}>
                  <div className="h-full rounded-[22px] cnx-clay-dark p-6">
                    <span className="text-2xl font-bold tracking-tight text-white">
                      {item.org}
                    </span>
                    <p className="mt-2 text-xs text-neutral-400">{item.note}</p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              title={
                <>
                  Six core tracks we <span className="cnx-accent-gradient-dark">teach</span> &amp;
                  practice
                </>
              }
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
              {TOPICS_WE_COVER.map((topic) => (
                <div key={topic.index} className="pt-6 border-t border-white/[0.1]">
                  <span className="text-xs font-semibold text-[#60A5FA]">{topic.index}</span>
                  <h3 className="mt-2 text-lg font-bold text-white">{topic.title}</h3>
                  <p className="mt-1.5 text-sm text-neutral-400 leading-relaxed">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <EventRegistrationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
};
