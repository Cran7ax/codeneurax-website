import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Globe,
  Minus,
  Plus,
  Trophy,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UPCOMING_EVENTS } from '../data/events';
import { OPPORTUNITIES } from '../data/opportunities';
import {
  AI_SPARKS_SPEAKERS,
  COMMUNITY_PARTNERS,
  CORE_TEAM,
  WEBINAR_SPEAKERS,
} from '../data/team';
import type { CnxEvent } from '../types';
import { EventRegistrationModal } from '../components/shared/EventRegistrationModal';
import { RoleApplicationModal } from '../components/shared/RoleApplicationModal';
import { EDITORIAL_EASE, HeroMount, RevealBlock } from '../components/ui/MotionPrimitives';
import { PartnerLogoMark } from '../components/ui/PartnerLogoMark';
import { WhatsAppJoinModal } from '../components/ui/WhatsAppJoinModal';

const HOME_FAQS = [
  {
    q: 'Who can join CodeNeuraX and is membership free?',
    a: 'Any undergraduate, postgraduate, or early-career CS/AI student across India can join our WhatsApp groups, Opportunity Feed, BuddyKid Squad Finder, and CodeNeuraX Library completely free of cost.',
  },
  {
    q: 'What is CodeNeuraX’s relationship with Marwadi University?',
    a: 'CodeNeuraX was founded in June 2025 by Dinesh Yadav at Marwadi University in Rajkot and collaborates directly with the Department of AI, ML & Data Science on flagship summits like AI Sparks ’26 and NeuraKnockout 2026.',
  },
  {
    q: 'How does BuddyKid help with hackathon team formation?',
    a: 'Instead of losing requests in crowded chat groups, BuddyKid lets you browse verified squads by hackathon and skill gap, join instantly via invite code like CNX-ROACH, or create your own team and approve applicants.',
  },
  {
    q: 'How can I participate in NeuraKnockout 2026?',
    a: 'NeuraKnockout 2026 is an offline 7-hour individual Web Development Challenge at Marwadi University (deadline Dec 19, 2026) with a ₹4,700 prize pool. Register directly from the Flagship Stage switcher or Events page.',
  },
  {
    q: 'What is included in the CodeNeuraX Library?',
    a: 'Curated company-wise DSA problem sheets with direct LeetCode problem URLs (Google, Microsoft, Amazon, LinkedIn, Adobe, TCS), GATE CS & DA previous year archives, and concise system notes.',
  },
  {
    q: 'How do Campus Ambassador applications work?',
    a: 'Students across Indian engineering institutes can apply through the Campus Ambassadors or Work With Us pages before Dec 15, 2026 to launch study jams, events, and hackathon squads on campus.',
  },
];

export const HomePage: React.FC = () => {
  const { pushToast, squads } = useApp();
  const [flagshipMode, setFlagshipMode] = useState<'neuraknockout' | 'aisparks'>('neuraknockout');
  const [peopleTab, setPeopleTab] = useState<'speakers' | 'team'>('speakers');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedEvent, setSelectedEvent] = useState<CnxEvent | null>(null);
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [ambassadorModalOpen, setAmbassadorModalOpen] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Community & Campus Chapter');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const featuredSpeakers = [...AI_SPARKS_SPEAKERS, WEBINAR_SPEAKERS[0]];
  const neuraKnockout = UPCOMING_EVENTS[0];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.includes('@') || contactMessage.trim().length < 10) {
      pushToast({
        title: 'Complete contact form',
        description: 'Enter your name, valid email, and a brief note on what you need.',
        variant: 'warning',
      });
      return;
    }
    setContactSent(true);
    pushToast({
      title: 'Inquiry sent to CodeNeuraX',
      description: `Confirmation sent to ${contactEmail}.`,
      variant: 'success',
    });
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <div className="bg-[#0E0E10] text-white">
      {/* 1. FULL-BLEED PHOTOGRAPHY HERO */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden border-b border-white/[0.08]">
        <img
          src="/images/ai-sparks-stage.jpg"
          alt="CodeNeuraX builders and speakers on stage at Marwadi University"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(14,14,16,0.54), rgba(14,14,16,0.82))',
          }}
        />

        <div className="relative z-10 max-w-[1160px] mx-auto px-5 sm:px-8 py-24 text-center">
          <HeroMount>
            <h1 className="font-bold tracking-[-0.03em] text-white leading-[1.06] overflow-visible">
              <span className="block text-[clamp(3rem,6.2vw,5.2rem)]">Build with</span>
              <span className="block font-editorial text-[clamp(3.4rem,7vw,5.8rem)] leading-[1.12] pb-2 pr-1 overflow-visible text-white">
                Community
              </span>
            </h1>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-xs sm:text-sm font-medium text-neutral-100">
              <span className="inline-flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#818CF8]" strokeWidth={1.75} />
                AI &amp; Engineering
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-[#E1498A]" strokeWidth={1.75} />
                Hackathons
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#818CF8]" strokeWidth={1.75} />
                Pan-India Network
              </span>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setWhatsAppOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-white text-[#0E0E10] text-sm font-semibold hover:bg-neutral-200 transition-all hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Join Us
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </HeroMount>
        </div>
      </section>

      {/* 2. PHOTO-RICH ARCHITECTURAL BENTO GRID (Single-Layer Surfaces) */}
      <section className="py-20 sm:py-24 bg-[#0E0E10]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-[clamp(2rem,3.6vw,3.1rem)] font-bold tracking-[-0.025em] text-white leading-[1.12] pb-1">
              CodeNeuraX in numbers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400">
              Student-built momentum spanning Rajkot, partner colleges, and technical tracks
              across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tile 1: Tall Left — 7,000+ Student Builders */}
            <div className="lg:row-span-2 rounded-2xl bg-[#16161A] border border-white/[0.08] hover:border-white/[0.16] transition-colors p-6 flex flex-col justify-between min-h-[380px]">
              <div>
                <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  7,000+
                </p>
                <p className="mt-2 text-sm font-medium text-neutral-400">
                  Student Builders Across India
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                {[
                  { src: '/images/dinesh-yadav.jpg', name: 'Dinesh Yadav' },
                  { src: '/images/mitali-desai.jpg', name: 'Mitali Desai' },
                  { src: '/images/isha-thaker.jpg', name: 'Isha Thaker' },
                  { src: '/images/prachi-doshi.jpg', name: 'Prachi Doshi' },
                ].map((person) => (
                  <div
                    key={person.name}
                    className="aspect-square rounded-xl overflow-hidden group"
                  >
                    <img
                      src={person.src}
                      alt={person.name}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Tile 2: Wide Center-Top — 360+ Flagship Attendees */}
            <div className="md:col-span-2 rounded-2xl bg-[#16161A] border border-white/[0.08] hover:border-white/[0.16] transition-colors p-6 flex flex-col justify-between">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <p className="text-4xl font-extrabold tracking-tight text-white">360+</p>
                  <p className="mt-1 text-sm font-medium text-neutral-400">
                    Flagship Summit Attendees (AI Sparks ’26)
                  </p>
                </div>
                <Link
                  to="/aispark"
                  className="text-xs font-semibold text-[#4353FF] hover:text-[#6B78FF] inline-flex items-center gap-1"
                >
                  Summit Recap
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
              </div>

              <div className="mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-3 sm:grid-cols-5 gap-3 items-center text-center">
                {['Google', 'Amazon', 'Microsoft', 'Unstop', 'GeeksforGeeks'].map((org) => (
                  <span
                    key={org}
                    className="text-xs font-semibold tracking-tight text-neutral-400 hover:text-white transition-colors"
                  >
                    {org}
                  </span>
                ))}
              </div>
            </div>

            {/* Tile 3: Tall Right — 8+ Campus Chapters */}
            <div className="lg:row-span-2 rounded-2xl bg-[#16161A] border border-white/[0.08] hover:border-white/[0.16] transition-colors p-6 flex flex-col justify-between min-h-[380px]">
              <div>
                <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">8+</p>
                <p className="mt-2 text-sm font-medium text-neutral-400">
                  Partner Campus Chapters Nationwide
                </p>
              </div>

              <div className="mt-6 space-y-2.5">
                <div className="aspect-[16/10] rounded-xl overflow-hidden group">
                  <img
                    src="/images/ai-sparks-audience.jpg"
                    alt="CodeNeuraX auditorium session"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="aspect-[16/10] rounded-xl overflow-hidden group">
                  <img
                    src="/images/ai-sparks-closing.jpg"
                    alt="CodeNeuraX certificate handover"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Tile 4: Center-Mid Left — 150+ DSA & GATE Resources (Hairline List, No Nested Boxes) */}
            <Link
              to="/library"
              className="rounded-2xl bg-[#16161A] border border-white/[0.08] hover:border-white/[0.18] transition-colors p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-extrabold tracking-tight text-white">150+</p>
                  <ArrowUpRight
                    className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="mt-1 text-xs font-medium text-neutral-400">
                  DSA &amp; GATE Resources
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.08] divide-y divide-white/[0.08] text-xs text-neutral-300">
                <div className="py-2 flex justify-between">
                  <span>Google &amp; Microsoft</span>
                  <span className="text-neutral-500">DSA</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span>GATE CS &amp; DA</span>
                  <span className="text-neutral-500">PYQs</span>
                </div>
              </div>
            </Link>

            {/* Tile 5: Center-Mid Right — 4 Core Tracks (Dot-Free, Box-Free) */}
            <div className="rounded-2xl bg-[#16161A] border border-white/[0.08] hover:border-white/[0.16] transition-colors p-6 flex flex-col justify-between">
              <div>
                <p className="text-3xl font-extrabold tracking-tight text-white">4</p>
                <p className="mt-1 text-xs font-medium text-neutral-400">Core Community Tracks</p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/[0.08] grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs font-medium text-neutral-200">
                <span>AI Sparks</span>
                <span>NeuraKnockout</span>
                <span>AlgoRush</span>
                <span>BuddyKid</span>
              </div>
            </div>
          </div>

          {/* Bottom Twin Strip: Official Partners + Community Channels */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-[#16161A] border border-white/[0.08] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-medium text-neutral-400 shrink-0">
                Official Partners
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {COMMUNITY_PARTNERS.map((partner) => (
                  <PartnerLogoMark key={partner.id} partner={partner} surface="dark" />
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-[#16161A] border border-white/[0.08] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-medium text-neutral-400 shrink-0">
                Community Channels
              </span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-neutral-300">
                {['WhatsApp', 'Unstop', 'Luma', 'YouTube'].map((platform) => (
                  <span key={platform}>{platform}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP EVENTS STAGE (Dark #0E0E10 Band) */}
      <section className="py-20 sm:py-24 bg-[#0E0E10] border-t border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold text-[#818CF8]">Flagship Stage</p>
              <h2 className="text-[clamp(2.1rem,4vw,3.3rem)] font-bold tracking-[-0.025em] text-white leading-[1.12] pb-2 overflow-visible">
                Learn from builders shipping at{' '}
                <span className="font-editorial pr-1">scale</span>
              </h2>

              <p className="text-base text-neutral-400 leading-relaxed max-w-xl">
                Switch between our upcoming 7-hour offline web engineering sprint and our 360+
                attendee flagship AI summit hosted at Marwadi University.
              </p>

              {/* Speaker Avatar Stack */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {AI_SPARKS_SPEAKERS.map((spk) => (
                    <img
                      key={spk.id}
                      src={spk.avatar}
                      alt={spk.name}
                      className="w-9 h-9 rounded-full object-cover object-top ring-2 ring-[#0E0E10]"
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-neutral-300">
                  Parth Singh, Dev Anand, Varun Poladiya &amp; Prof. Akshay Ranpariya
                </span>
              </div>

              {/* Clean Typographic Metadata List */}
              <p className="text-xs text-neutral-400 pt-1">
                Agentic AI, 7-Hr Solo Web Sprint, Tool Calling Labs, ₹4,700 Prize Pool
              </p>

              {/* Interactive Switcher */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFlagshipMode('neuraknockout')}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    flagshipMode === 'neuraknockout'
                      ? 'bg-[#4353FF] text-white'
                      : 'bg-[#16161A] border border-white/[0.08] text-neutral-300 hover:text-white'
                  }`}
                >
                  NeuraKnockout 2026
                </button>
                <button
                  type="button"
                  onClick={() => setFlagshipMode('aisparks')}
                  className={`px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    flagshipMode === 'aisparks'
                      ? 'bg-[#4353FF] text-white'
                      : 'bg-[#16161A] border border-white/[0.08] text-neutral-300 hover:text-white'
                  }`}
                >
                  AI Sparks ’26
                </button>
              </div>
            </div>

            {/* Right Framed Poster Card */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {flagshipMode === 'neuraknockout' ? (
                  <motion.div
                    key="poster-nk"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
                    className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#16161A]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src="/images/ai-sparks-stage.jpg"
                        alt="NeuraKnockout 2026 at Marwadi University"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16161A] via-[#16161A]/25 to-transparent" />
                      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-medium text-neutral-200">
                        <span>Deadline: Dec 19, 2026</span>
                        <span className="text-white font-semibold">₹4,700 Prize Pool</span>
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-[#818CF8]">
                          Marwadi University · Dept. of AI, ML &amp; DS
                        </p>
                        <h3 className="text-2xl font-bold text-white mt-1">
                          NeuraKnockout 2026
                        </h3>
                        <p className="text-sm text-neutral-400 mt-1.5">
                          Offline 7-hour individual Web Dev Challenge. Awards: ₹2,100 Winner,
                          ₹1,500 Runner-Up, ₹1,100 Second Runner-Up.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedEvent(neuraKnockout)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold hover:bg-neutral-200 transition-colors"
                        >
                          Register now
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </button>
                        <Link
                          to="/events"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/[0.1] text-xs font-medium text-neutral-300 hover:text-white"
                        >
                          All CNX Events
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="poster-ais"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
                    className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#16161A]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src="/images/ai-sparks-speakers-banner.webp"
                        alt="AI Sparks 2026 Speakers"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-6 sm:p-7 space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-[#818CF8]">
                          Aug 7–8, 2026 · 360+ Attendees
                        </p>
                        <h3 className="text-2xl font-bold text-white mt-1">AI Sparks ’26 Summit</h3>
                        <p className="text-sm text-neutral-400 mt-1.5">
                          2-day flagship summit covering Agentic AI, Python Colab labs, $30 USD
                          Devnovate credits, and ₹4,999 GATE DA Prep scholarships.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Link
                          to="/aispark"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold hover:bg-neutral-200 transition-colors"
                        >
                          Explore AI Sparks ’26
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </Link>
                        <Link
                          to="/events"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/[0.1] text-xs font-medium text-neutral-300 hover:text-white"
                        >
                          Event Archive
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PURE WHITE ARCHITECTURAL EDITORIAL LEDGER (#FFFFFF — Zero Nested Boxes) */}
      <section className="py-24 sm:py-28 bg-white text-[#0E0E10]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          {/* Top Half: Asymmetric Statement */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end pb-14">
            <div className="lg:col-span-6">
              <h2 className="text-[clamp(2.25rem,4.2vw,3.5rem)] font-bold tracking-[-0.03em] text-[#0E0E10] leading-[1.06]">
                Built for signal, not noise.
              </h2>
            </div>

            <div className="lg:col-span-6">
              <p className="text-base text-neutral-600 leading-relaxed max-w-xl">
                Founded in June 2025 by Dinesh Yadav at Marwadi University in Rajkot, CodeNeuraX
                gives Indian student engineers verified internships, serious hackathon teammates,
                and structured preparation without the college-group spam.
              </p>
            </div>
          </div>

          {/* Bottom Half: 3-Column Architectural Ledger Divided Only by Hairlines */}
          <div className="border-t border-black/10 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-black/10">
            {/* Col 1: Opportunity Feed */}
            <div className="group py-10 lg:pr-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#0E0E10]">
                  Opportunity Feed
                </h3>
                <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                  Daily vetted hackathons, paid student internships, and engineering briefs filtered
                  by skill and deadline.
                </p>

                <ul className="mt-6 space-y-2 text-sm text-[#0E0E10]">
                  <li className="font-medium">
                    {OPPORTUNITIES[0].title.split('—')[0].trim()}{' '}
                    <span className="text-neutral-500 font-normal">
                      — {OPPORTUNITIES[0].deadline}
                    </span>
                  </li>
                  <li className="font-medium">
                    {OPPORTUNITIES[1].title.split('—')[0].trim()}{' '}
                    <span className="text-neutral-500 font-normal">
                      — {OPPORTUNITIES[1].deadline}
                    </span>
                  </li>
                </ul>
              </div>

              <Link
                to="/feed"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0E0E10] underline underline-offset-4 hover:text-[#4353FF] transition-colors w-fit"
              >
                <span>Explore Feed</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>

            {/* Col 2: BuddyKid */}
            <div className="group py-10 lg:px-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#0E0E10]">BuddyKid</h3>
                <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                  Find hackathon teammates across campuses by missing role, or coordinate applicants
                  with direct invite codes.
                </p>

                <p className="mt-6 text-sm font-medium text-[#0E0E10]">
                  {squads.length} squads open across campuses{' '}
                  <span className="block text-neutral-500 font-normal mt-1">
                    Create a team or join immediately via invite code
                  </span>
                </p>
              </div>

              <Link
                to="/buddykid"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0E0E10] underline underline-offset-4 hover:text-[#4353FF] transition-colors w-fit"
              >
                <span>Open BuddyKid</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>

            {/* Col 3: Engineering Library */}
            <div className="group py-10 lg:pl-10 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#0E0E10]">
                  Engineering Library
                </h3>
                <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                  Over 150 company-tagged DSA problem archives and official GATE CS &amp; DA
                  previous year papers for free.
                </p>

                <p className="mt-6 text-sm font-medium text-[#0E0E10]">
                  Google, Microsoft, Amazon DSA sets{' '}
                  <span className="block text-neutral-500 font-normal mt-1">
                    Direct LeetCode problem index &amp; systems notes
                  </span>
                </p>
              </div>

              <Link
                to="/library"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0E0E10] underline underline-offset-4 hover:text-[#4353FF] transition-colors w-fit"
              >
                <span>Browse Library</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SPEAKERS & CORE TEAM SHOWCASE (Dark #0E0E10 Band) */}
      <section className="py-20 sm:py-24 bg-[#0E0E10]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold text-[#818CF8] mb-2">People Behind CNX</p>
              <h2 className="text-[clamp(1.95rem,3.4vw,3rem)] font-bold tracking-[-0.025em] text-white leading-[1.12] pb-1">
                Speakers &amp; Core Team
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPeopleTab('speakers')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  peopleTab === 'speakers'
                    ? 'bg-white text-[#0E0E10]'
                    : 'bg-[#16161A] border border-white/[0.08] text-neutral-300 hover:text-white'
                }`}
              >
                Speakers
              </button>
              <button
                type="button"
                onClick={() => setPeopleTab('team')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  peopleTab === 'team'
                    ? 'bg-white text-[#0E0E10]'
                    : 'bg-[#16161A] border border-white/[0.08] text-neutral-300 hover:text-white'
                }`}
              >
                Team CodeNeuraX
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {peopleTab === 'speakers' ? (
              <motion.div
                key="tab-speakers"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
              >
                {featuredSpeakers.map((spk) => (
                  <a
                    key={spk.id}
                    href={spk.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#16161A] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-end"
                  >
                    {spk.avatar ? (
                      <img
                        src={spk.avatar}
                        alt={spk.name}
                        className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 cnx-silk-spotlight flex items-center justify-center">
                        <span className="text-3xl font-extrabold tracking-tight text-white/90">
                          {spk.initials}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/70 to-transparent" />
                    <div className="relative z-10 p-4">
                      <p className="text-sm font-bold text-white flex items-center justify-between gap-2">
                        <span>{spk.name}</span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white shrink-0"
                          strokeWidth={1.75}
                        />
                      </p>
                      <p className="text-xs text-neutral-200 line-clamp-2 leading-snug mt-0.5">
                        {spk.organization}
                      </p>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-snug mt-0.5">
                        {spk.role}
                      </p>
                    </div>
                  </a>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="tab-team"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
              >
                {CORE_TEAM.map((member) => (
                  <a
                    key={member.id}
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#16161A] border border-white/[0.08] hover:border-white/[0.2] transition-colors flex flex-col justify-end"
                  >
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 cnx-silk-spotlight flex items-center justify-center">
                        <span className="text-3xl font-extrabold tracking-tight text-white/90">
                          {member.initials}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/70 to-transparent" />
                    <div className="relative z-10 p-4">
                      <p className="text-sm font-bold text-white flex items-center justify-between gap-2">
                        <span>{member.name}</span>
                        <ArrowUpRight
                          className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white shrink-0"
                          strokeWidth={1.75}
                        />
                      </p>
                      <p className="text-xs text-[#818CF8] font-medium line-clamp-2 leading-snug mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-snug mt-0.5">
                        {member.affiliation}
                      </p>
                    </div>
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 6. HIGH-CONTRAST WHITE INSET BANNER CARD (Inside Dark #0E0E10 Band) */}
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 mt-16">
          <RevealBlock className="rounded-2xl bg-white text-[#0E0E10] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-[#4353FF] mb-3">Chapter Leadership</p>
                <h2 className="text-[clamp(1.9rem,3.4vw,2.9rem)] font-bold tracking-[-0.025em] text-[#0E0E10] leading-[1.12] pb-1">
                  Become a Campus Ambassador
                </h2>
                <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
                  Lead technical workshops, organize local BuddyKid hackathon squads, and represent
                  CodeNeuraX across engineering campuses in India.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setAmbassadorModalOpen(true)}
                  className="px-6 py-3 rounded-lg bg-[#0E0E10] text-white text-sm font-semibold hover:bg-neutral-800 transition-colors"
                >
                  Apply Now
                </button>
                <Link
                  to="/campus-ambassadors"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E0E10] hover:text-[#4353FF] transition-colors"
                >
                  View Directory
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#4353FF] p-6 sm:p-8 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src="/images/ai-sparks-speaker.jpg"
                  alt="CodeNeuraX campus leader speaking on stage"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* 7. CLEAN PURE WHITE FAQ ACCORDION + QUIET STUDIO CONTACT BAND */}
      <section className="py-20 sm:py-24 bg-white text-[#0E0E10]">
        <div className="max-w-[920px] mx-auto px-5 sm:px-8">
          <h2 className="text-center text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-[-0.025em] text-[#0E0E10] mb-12">
            Frequently asked questions
          </h2>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {HOME_FAQS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-[#0E0E10]">{item.q}</span>
                    <span className="text-[#0E0E10] shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4" strokeWidth={1.75} />
                      ) : (
                        <Plus className="w-4 h-4" strokeWidth={1.75} />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm text-neutral-600 leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiet Editorial Contact Band directly on #FFFFFF */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 mt-24 pt-24 border-t border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
            {/* Left (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
              <div>
                <h3 className="text-[clamp(2rem,3.6vw,3rem)] font-bold tracking-[-0.03em] text-[#0E0E10] leading-[1.08]">
                  Let’s talk.
                </h3>
                <p className="mt-3 text-base text-neutral-600 leading-relaxed max-w-md">
                  Questions about chapters, partnerships, sponsorships, or events? Write directly to
                  the core team.
                </p>
              </div>

              <dl className="space-y-5 text-sm">
                <div>
                  <dt className="text-xs font-medium text-neutral-500">Email</dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:team@codeneurax.in"
                      className="font-medium text-[#0E0E10] underline underline-offset-4 hover:text-[#4353FF] transition-colors"
                    >
                      team@codeneurax.in
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-neutral-500">Based at</dt>
                  <dd className="mt-1 text-neutral-700">Marwadi University, Rajkot, Gujarat</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-neutral-500">Hackathon teams</dt>
                  <dd className="mt-1">
                    <Link
                      to="/buddykid"
                      className="font-semibold text-[#0E0E10] underline underline-offset-4 hover:text-[#4353FF] transition-colors"
                    >
                      Find teammates on BuddyKid →
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Right (7 cols): Bottom-Hairline Inputs Directly on Surface */}
            <div className="lg:col-span-7">
              {contactSent ? (
                <div className="py-12 border-t border-black/15 space-y-4">
                  <h4 className="text-xl font-bold text-[#0E0E10]">Message received.</h4>
                  <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
                    Your inquiry has been routed to the CodeNeuraX Core Team at
                    team@codeneurax.in.
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactSent(false)}
                    className="text-sm font-semibold text-[#0E0E10] underline underline-offset-4 hover:text-[#4353FF] transition-colors"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div>
                      <label
                        htmlFor="cnx-contact-name"
                        className="block text-xs font-medium text-neutral-500 mb-1"
                      >
                        Your name
                      </label>
                      <input
                        id="cnx-contact-name"
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Dinesh Yadav"
                        className="w-full bg-transparent border-0 border-b border-black/15 focus:border-[#0E0E10] rounded-none px-0 py-3.5 text-[15px] text-[#0E0E10] placeholder:text-black/35 transition-colors outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cnx-contact-email"
                        className="block text-xs font-medium text-neutral-500 mb-1"
                      >
                        Email address
                      </label>
                      <input
                        id="cnx-contact-email"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@college.edu"
                        className="w-full bg-transparent border-0 border-b border-black/15 focus:border-[#0E0E10] rounded-none px-0 py-3.5 text-[15px] text-[#0E0E10] placeholder:text-black/35 transition-colors outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cnx-contact-topic"
                      className="block text-xs font-medium text-neutral-500 mb-1"
                    >
                      Topic
                    </label>
                    <select
                      id="cnx-contact-topic"
                      value={contactTopic}
                      onChange={(e) => setContactTopic(e.target.value)}
                      className="w-full bg-transparent border-0 border-b border-black/15 focus:border-[#0E0E10] rounded-none px-0 py-3.5 text-[15px] text-[#0E0E10] transition-colors outline-none"
                    >
                      <option>Community &amp; Campus Chapter</option>
                      <option>Speaker / Mentorship Proposal</option>
                      <option>Event Sponsorship &amp; Partner Credits</option>
                      <option>Engineering Services Inquiry</option>
                      <option>Library / Technical Support</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="cnx-contact-message"
                      className="block text-xs font-medium text-neutral-500 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="cnx-contact-message"
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Tell us what you're working on..."
                      className="w-full bg-transparent border-0 border-b border-black/15 focus:border-[#0E0E10] rounded-none px-0 py-3.5 text-[15px] text-[#0E0E10] placeholder:text-black/35 transition-colors outline-none resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-7 py-3 rounded-lg bg-[#0E0E10] hover:bg-[#4353FF] text-white text-sm font-medium transition-colors duration-200 active:scale-[0.98]"
                    >
                      Send inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <EventRegistrationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <WhatsAppJoinModal open={whatsAppOpen} onClose={() => setWhatsAppOpen(false)} />
      <RoleApplicationModal
        open={ambassadorModalOpen}
        roleId="role-campus-ambassador-2027"
        roleTitle="CodeNeuraX Campus Ambassador 2027"
        onClose={() => setAmbassadorModalOpen(false)}
      />
    </div>
  );
};
