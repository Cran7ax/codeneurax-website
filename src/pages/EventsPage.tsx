import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, MapPin, Mic, Users } from 'lucide-react';
import {
  COMPLETED_EVENTS,
  TOPICS_WE_COVER,
  UPCOMING_EVENTS,
} from '../data/events';
import type { CnxEvent } from '../types';
import { EventRegistrationModal } from '../components/shared/EventRegistrationModal';
import { HeroMount } from '../components/ui/MotionPrimitives';
import { SectionHeader } from '../components/ui/SectionHeader';

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
      {/* Header + Featured Hero Spotlight Card */}
      <section className="cnx-midnight-hero border-b border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <HeroMount className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div className="max-w-2xl">
              <p className="cnx-section-label text-[#818CF8] mb-3">
                CNX Events · {allEvents.length} Sessions
              </p>
              <h1 className="text-[clamp(2.35rem,4.6vw,3.9rem)] font-bold tracking-[-0.03em] text-white leading-[1.12] pb-2 overflow-visible">
                Summits, sprints &amp; unfiltered{' '}
                <span className="font-editorial pr-1">engineering</span> sessions.
              </h1>
              <p className="mt-2 text-[15px] sm:text-base text-neutral-400 leading-relaxed">
                Flagship 2-day AI summits in Rajkot, 7-hour solo web challenges, national DSA
                contests, and career sessions from Google, Microsoft, and Amazon engineers.
              </p>
            </div>
          </HeroMount>

          {/* Featured Hero Spotlight Card */}
          <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#16161A] grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-6 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="cnx-section-label text-[#E1498A] mb-3">
                  Featured Flagship · Aug 7–8, 2026
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.025em] text-white">
                  AI Sparks ’26 Summit
                </h2>
                <p className="mt-3 text-sm sm:text-base text-neutral-400 leading-relaxed">
                  Hosted at Marwadi University in association with Dept. of AI, ML &amp; DS—360+
                  attendees, 4 technical keynotes, $30 Devnovate credits, and ₹4,999 GATE DA Prep
                  awards.
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  to="/aispark"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold transition-colors"
                >
                  Explore AI Sparks ’26
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedEvent(UPCOMING_EVENTS[0])}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold hover:bg-neutral-200 transition-colors"
                >
                  Register NeuraKnockout ’26
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative min-h-[260px] overflow-hidden group">
              <img
                src="/images/ai-sparks-closing.jpg"
                alt="AI Sparks 2026 at Marwadi University"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16161A]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs font-medium text-white">
                <span>360+ Attendees · 2 Days</span>
                <span>Marwadi University, Rajkot</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Poster / Session 4-Column Grid */}
      <section className="py-16 border-b border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Event &amp; Session Directory
            </h2>

            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', 'Upcoming', 'Completed', 'Workshops'] as GalleryFilter[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    filter === tab
                      ? 'bg-[#4353FF] text-white'
                      : 'bg-[#16161A] border border-white/[0.08] text-neutral-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredEvents.map((evt) => {
              const anchorId =
                evt.id === 'evt-neuraknockout-2026'
                  ? 'neuraknockout'
                  : evt.id === 'evt-algorush-2026'
                    ? 'algorush'
                    : undefined;

              return (
                <article
                  key={evt.id}
                  id={anchorId}
                  className="scroll-mt-24 rounded-2xl bg-[#16161A] border border-white/[0.08] hover:border-white/[0.18] transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2 text-[11px] font-semibold">
                      <span
                        className={
                          evt.status === 'Upcoming' ? 'text-[#E1498A]' : 'text-[#818CF8]'
                        }
                      >
                        {evt.status}
                      </span>
                      <span className="text-neutral-500">{evt.mode}</span>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight leading-snug group-hover:text-[#818CF8] transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">{evt.subtitle}</p>

                    <div className="pt-2 space-y-1.5 text-xs text-neutral-400">
                      <p className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-500 shrink-0" strokeWidth={1.75} />
                        <span className="truncate">{evt.date}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" strokeWidth={1.75} />
                        <span className="truncate">{evt.venueOrPlatform}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-neutral-300">
                        <Users className="w-3.5 h-3.5 text-[#4353FF] shrink-0" strokeWidth={1.75} />
                        <span className="truncate">{evt.attendeesOrTarget}</span>
                      </p>
                    </div>

                    {evt.speaker && (
                      <div className="pt-2 border-t border-white/[0.06] flex items-start gap-1.5 text-[11px] text-neutral-400">
                        <Mic className="w-3 h-3 text-[#818CF8] mt-0.5 shrink-0" strokeWidth={1.75} />
                        <span className="line-clamp-2">{evt.speaker}</span>
                      </div>
                    )}
                  </div>

                  <div className="mx-5 py-3.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold">
                    {evt.internalRoute === '/aispark' ? (
                      <Link
                        to="/aispark"
                        className="w-full flex items-center justify-between text-white hover:text-[#818CF8]"
                      >
                        <span>Open Microsite</span>
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedEvent(evt)}
                        className="w-full flex items-center justify-between text-white hover:text-[#818CF8]"
                      >
                        <span>{evt.status === 'Upcoming' ? 'Register' : 'View Brief'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pure White Contrast Band: Speakers From Top Companies & Curriculum Tracks */}
      <section className="py-16 sm:py-20 bg-white text-[#0E0E10]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 space-y-16">
          <div>
            <p className="cnx-section-label text-[#4353FF] mb-4">
              Speakers &amp; Mentors Representing
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { org: 'Google', note: 'Divanshi Jain · SWE Interview Prep' },
                { org: 'Amazon', note: 'Nidhi Singh · SWE & OA Strategy' },
                { org: 'Microsoft', note: 'Parth Thakrar · SDE & Ex-Intern' },
                { org: 'AOSSIE', note: 'Nidhi Singh · GSoC Mentorship' },
              ].map((item) => (
                <div
                  key={item.org}
                  className="rounded-xl bg-[#F4F4F6] border border-[#0E0E10]/[0.08] p-6"
                >
                  <span className="text-2xl font-bold tracking-tight text-[#0E0E10]">
                    {item.org}
                  </span>
                  <p className="mt-2 text-xs text-neutral-600">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader
              tone="light"
              label="Curriculum Tracks"
              title={
                <>
                  Six core tracks we <span className="font-editorial pr-1">teach</span> &amp;
                  practice.
                </>
              }
            />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TOPICS_WE_COVER.map((topic) => (
                <div
                  key={topic.index}
                  className="rounded-xl bg-[#F4F4F6] border border-[#0E0E10]/[0.08] p-6"
                >
                  <span className="text-xs font-bold text-[#4353FF]">Track {topic.index}</span>
                  <h3 className="mt-2 text-lg font-bold text-[#0E0E10]">{topic.title}</h3>
                  <p className="mt-1.5 text-sm text-neutral-600 leading-relaxed">
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
