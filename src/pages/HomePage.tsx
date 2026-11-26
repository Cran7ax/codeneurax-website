import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Cpu, Minus, Plus, Trophy, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UPCOMING_EVENTS } from '../data/events';
import {
  AI_SPARKS_SPEAKERS,
  COMMUNITY_PARTNERS,
  CORE_TEAM,
} from '../data/team';
import type { CnxEvent } from '../types';
import { EventRegistrationModal } from '../components/shared/EventRegistrationModal';
import { RoleApplicationModal } from '../components/shared/RoleApplicationModal';
import { EDITORIAL_EASE, HeroMount, RevealBlock } from '../components/ui/MotionPrimitives';
import { PartnerLogoMark } from '../components/ui/PartnerLogoMark';
import { SlidingTabs } from '../components/ui/SlidingTabs';
import { WhatsAppJoinModal } from '../components/ui/WhatsAppJoinModal';

interface PhotoBubble {
  id: string;
  name: string;
  sub: string;
  src: string;
  pos?: string;
}

const COMMUNITY_PHOTOS: PhotoBubble[] = [
  { id: 'c1', name: 'Dinesh Yadav', sub: 'Marwadi Univ.', src: '/images/dinesh-yadav.jpg', pos: '50% 15%' },
  { id: 'c2', name: 'Mitali Desai', sub: 'Operations', src: '/images/mitali-desai.jpg', pos: '50% 15%' },
  { id: 'c3', name: 'Isha Thaker', sub: 'Design Lead', src: '/images/isha-thaker.jpg', pos: '50% 15%' },
  { id: 'c4', name: 'Prachi Doshi', sub: 'Web Dev Lead', src: '/images/prachi-doshi.jpg', pos: '50% 15%' },
  { id: 'c5', name: 'Builders Cohort', sub: 'Rajkot', src: '/images/ai-sparks-stage.jpg', pos: '15% 42%' },
  { id: 'c6', name: 'AI Sparks Stage', sub: 'Marwadi Univ.', src: '/images/ai-sparks-speaker.jpg', pos: '50% 18%' },
  { id: 'c7', name: 'Summit Cohort', sub: 'AI Sparks ’26', src: '/images/ai-sparks-stage.jpg', pos: '36% 36%' },
  { id: 'c8', name: 'Intellify Squad', sub: 'Hackathon', src: '/images/intellify-win.jpg', pos: '30% 28%' },
  { id: 'c9', name: 'Parth Singh', sub: 'Agentic AI', src: '/images/speaker-parth.jpg', pos: '50% 18%' },
  { id: 'c10', name: 'Audience Front', sub: 'Rajkot Chapter', src: '/images/ai-sparks-audience.jpg', pos: '22% 45%' },
  { id: 'c11', name: 'Student Builders', sub: 'Marwadi Univ.', src: '/images/ai-sparks-stage.jpg', pos: '58% 36%' },
  { id: 'c12', name: 'Dev Anand', sub: 'AI/ML Session', src: '/images/speaker-dev.jpg', pos: '50% 18%' },
  { id: 'c13', name: 'Closing Ceremony', sub: 'AI Sparks ’26', src: '/images/ai-sparks-closing.jpg', pos: '42% 30%' },
  { id: 'c14', name: 'Campus Crew', sub: 'Gujarat Hub', src: '/images/ai-sparks-stage.jpg', pos: '78% 40%' },
  { id: 'c15', name: 'Varun Poladiya', sub: 'GDG Cloud', src: '/images/speaker-varun.jpg', pos: '50% 18%' },
  { id: 'c16', name: 'Hackathon Team', sub: 'Intellify', src: '/images/intellify-win.jpg', pos: '68% 28%' },
  { id: 'c17', name: 'Auditorium Builders', sub: '360+ Seats', src: '/images/ai-sparks-audience.jpg', pos: '55% 42%' },
  { id: 'c18', name: 'Prof. Akshay R.', sub: 'AI Faculty', src: '/images/speaker-akshay.jpg', pos: '50% 18%' },
  { id: 'c19', name: 'Summit Recognition', sub: 'Marwadi Univ.', src: '/images/ai-sparks-closing.jpg', pos: '65% 28%' },
  { id: 'c20', name: 'Builder Circle', sub: 'Rajkot', src: '/images/ai-sparks-stage.jpg', pos: '90% 42%' },
  { id: 'c21', name: 'AI Sparks Track', sub: 'Day 1 Labs', src: '/images/ai-sparks-audience.jpg', pos: '80% 44%' },
  { id: 'c22', name: 'Web Sprint', sub: 'Marwadi Univ.', src: '/images/dinesh-yadav.jpg', pos: '50% 22%' },
  { id: 'c23', name: 'Design Guild', sub: 'CNX Core', src: '/images/isha-thaker.jpg', pos: '50% 22%' },
  { id: 'c24', name: 'Chapter Builders', sub: 'Pan-India', src: '/images/ai-sparks-stage.jpg', pos: '25% 44%' },
  { id: 'c25', name: 'Ops & Hosting', sub: 'CNX Core', src: '/images/prachi-doshi.jpg', pos: '50% 22%' },
  { id: 'c26', name: 'Campus Squad', sub: 'Gujarat', src: '/images/ai-sparks-audience.jpg', pos: '40% 50%' },
  { id: 'c27', name: 'Convener Team', sub: 'CNX Core', src: '/images/mitali-desai.jpg', pos: '50% 22%' },
  { id: 'c28', name: 'Builders Meetup', sub: 'Rajkot', src: '/images/ai-sparks-stage.jpg', pos: '46% 38%' },
  { id: 'c29', name: 'Demo Showcase', sub: 'Intellify', src: '/images/intellify-win.jpg', pos: '48% 30%' },
  { id: 'c30', name: 'AI Sparks Crowd', sub: 'Marwadi Univ.', src: '/images/ai-sparks-closing.jpg', pos: '54% 32%' },
];

const MENTOR_PHOTOS: PhotoBubble[] = [
  { id: 'm1', name: 'Parth Singh', sub: 'Agentic AI', src: '/images/speaker-parth.jpg', pos: '50% 18%' },
  { id: 'm2', name: 'Dev Anand', sub: 'Unstop Speaker', src: '/images/speaker-dev.jpg', pos: '50% 18%' },
  { id: 'm3', name: 'Varun Poladiya', sub: 'navan.ai · GDG', src: '/images/speaker-varun.jpg', pos: '50% 18%' },
  { id: 'm4', name: 'Prof. Akshay R.', sub: 'Marwadi Univ.', src: '/images/speaker-akshay.jpg', pos: '50% 18%' },
  { id: 'm5', name: 'Dinesh Yadav', sub: 'Founder · CNX', src: '/images/dinesh-yadav.jpg', pos: '50% 15%' },
  { id: 'm6', name: 'Mitali Desai', sub: 'Convener', src: '/images/mitali-desai.jpg', pos: '50% 15%' },
  { id: 'm7', name: 'Isha Thaker', sub: 'Design Lead', src: '/images/isha-thaker.jpg', pos: '50% 15%' },
  { id: 'm8', name: 'Prachi Doshi', sub: 'Co-Web Dev', src: '/images/prachi-doshi.jpg', pos: '50% 15%' },
  { id: 'm9', name: 'Keynote Stage', sub: 'AI Sparks ’26', src: '/images/ai-sparks-speaker.jpg', pos: '50% 18%' },
  { id: 'm10', name: 'Panel Mentors', sub: 'AI Sparks ’26', src: '/images/ai-sparks-speakers-banner.webp', pos: '22% 35%' },
  { id: 'm11', name: 'Faculty Track', sub: 'AI & ML Dept.', src: '/images/ai-sparks-closing.jpg', pos: '45% 28%' },
  { id: 'm12', name: 'Industry Lead', sub: 'AI Sparks ’26', src: '/images/ai-sparks-speakers-banner.webp', pos: '42% 32%' },
  { id: 'm13', name: 'Tech Mentors', sub: 'AI Sparks ’26', src: '/images/ai-sparks-speakers-banner.webp', pos: '62% 32%' },
  { id: 'm14', name: 'Cloud Track', sub: 'AI Sparks ’26', src: '/images/ai-sparks-speakers-banner.webp', pos: '80% 35%' },
  { id: 'm15', name: 'Hackathon Jury', sub: 'Intellify', src: '/images/intellify-win.jpg', pos: '50% 25%' },
  { id: 'm16', name: 'Stage Leads', sub: 'Marwadi Univ.', src: '/images/ai-sparks-stage.jpg', pos: '48% 36%' },
  { id: 'm17', name: 'Workshop Host', sub: 'Rajkot', src: '/images/ai-sparks-closing.jpg', pos: '64% 30%' },
  { id: 'm18', name: 'Chapter Organizers', sub: 'CNX Core', src: '/images/ai-sparks-stage.jpg', pos: '68% 38%' },
  { id: 'm19', name: 'ML Mentorship', sub: 'Day 2 Track', src: '/images/speaker-akshay.jpg', pos: '50% 24%' },
  { id: 'm20', name: 'Automation Lab', sub: 'Day 1 Track', src: '/images/speaker-varun.jpg', pos: '50% 24%' },
  { id: 'm21', name: 'Applied AI', sub: 'Keynote', src: '/images/speaker-dev.jpg', pos: '50% 24%' },
  { id: 'm22', name: 'Agentic Systems', sub: 'Keynote', src: '/images/speaker-parth.jpg', pos: '50% 24%' },
  { id: 'm23', name: 'Community Ops', sub: 'Rajkot', src: '/images/mitali-desai.jpg', pos: '50% 20%' },
  { id: 'm24', name: 'Auditorium Clinic', sub: 'AI Sparks ’26', src: '/images/ai-sparks-audience.jpg', pos: '36% 42%' },
  { id: 'm25', name: 'Builder Mentors', sub: 'Pan-India', src: '/images/intellify-win.jpg', pos: '75% 30%' },
  { id: 'm26', name: 'Guest Clinic', sub: 'Engineering', src: '/images/ai-sparks-speaker.jpg', pos: '48% 24%' },
  { id: 'm27', name: 'Summit Panel', sub: 'Rajkot', src: '/images/ai-sparks-stage.jpg', pos: '32% 38%' },
  { id: 'm28', name: 'Core Mentors', sub: 'CNX', src: '/images/dinesh-yadav.jpg', pos: '50% 20%' },
  { id: 'm29', name: 'Design Reviews', sub: 'CNX Core', src: '/images/isha-thaker.jpg', pos: '50% 20%' },
  { id: 'm30', name: 'Live Host', sub: 'Marwadi Univ.', src: '/images/prachi-doshi.jpg', pos: '50% 20%' },
];

const EVENT_POSTER_DECK = [
  { title: 'AI Sparks', src: '/images/speaker-parth.jpg', z: 'z-10', offset: '-mr-5 translate-y-3 scale-[0.86]' },
  { title: 'Keynotes', src: '/images/speaker-varun.jpg', z: 'z-20', offset: '-mr-4 translate-y-1.5 scale-[0.93]' },
  { title: 'AI Sparks ’26', src: '/images/ai-sparks-stage.jpg', z: 'z-30', offset: 'scale-100 shadow-[0_14px_28px_rgba(0,0,0,0.75)]' },
  { title: 'Workshops', src: '/images/speaker-dev.jpg', z: 'z-20', offset: '-ml-4 translate-y-1.5 scale-[0.93]' },
  { title: 'ML Labs', src: '/images/speaker-akshay.jpg', z: 'z-10', offset: '-ml-5 translate-y-3 scale-[0.86]' },
];

const SPECIALIST_TRACKS = [
  {
    name: 'AI Sparks',
    desc: 'Agentic AI & automation',
    icon: Cpu,
    tint: 'bg-[#4353FF]/18 text-[#818CF8] border-[#4353FF]/35',
    to: '/aispark',
  },
  {
    name: 'NeuraKnockout',
    desc: 'Web & DSA sprints',
    icon: Trophy,
    tint: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    to: '/events#neuraknockout',
  },
  {
    name: 'BuddyKid',
    desc: 'Hackathon squad finder',
    icon: Users,
    tint: 'bg-[#E1498A]/18 text-[#F472B6] border-[#E1498A]/30',
    to: '/buddykid',
  },
];

const PLATFORM_PREVIEWS = [
  { title: 'Feed', tag: '12 live', to: '/feed' },
  { title: 'BuddyKid', tag: '6 squads', to: '/buddykid' },
  { title: 'Library', tag: '150+ DSA', to: '/library' },
  { title: 'AI Sparks', tag: '360+ seats', to: '/aispark' },
  { title: 'Services', tag: 'Studio', to: '/services' },
];

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
    a: 'BuddyKid lets you browse verified squads by hackathon and skill gap, join instantly via invite code like CNX-ROACH, or create your own team and approve applicants.',
  },
  {
    q: 'How can I participate in NeuraKnockout 2026?',
    a: 'NeuraKnockout 2026 is an offline 7-hour individual Web Development Challenge at Marwadi University (deadline Dec 19, 2026) with a ₹4,700 prize pool. Register directly from the Flagship Stage or Events page.',
  },
  {
    q: 'What is included in the CodeNeuraX Library?',
    a: 'Curated company-wise DSA problem sheets with direct LeetCode URLs (Google, Microsoft, Amazon, LinkedIn, Adobe, TCS), GATE CS & DA previous year archives, and concise system notes.',
  },
  {
    q: 'How do Campus Ambassador applications work?',
    a: 'Students across Indian engineering institutes can apply through the Campus Ambassadors or Work With Us pages before Dec 15, 2026 to launch study jams, events, and hackathon squads on campus.',
  },
];

const CircularPhotoMosaic: React.FC<{ items: PhotoBubble[] }> = ({ items }) => (
  <div className="grid grid-cols-5 gap-2">
    {items.map((person) => (
      <div
        key={person.id}
        title={`${person.name} · ${person.sub}`}
        className="relative aspect-square rounded-full overflow-hidden ring-1 ring-white/[0.12] hover:ring-white/[0.32] transition-[transform,box-shadow] duration-200 hover:scale-[1.08] hover:z-10 bg-[#1C1D24] shadow-[0_6px_14px_rgba(0,0,0,0.45)]"
      >
        <img
          src={person.src}
          alt={person.name}
          loading="lazy"
          decoding="async"
          style={{ objectPosition: person.pos || '50% 20%' }}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
);

export const HomePage: React.FC = () => {
  const { pushToast, squads } = useApp();
  const [flagshipMode, setFlagshipMode] = useState<'neuraknockout' | 'aisparks'>('neuraknockout');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedEvent, setSelectedEvent] = useState<CnxEvent | null>(null);
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [ambassadorModalOpen, setAmbassadorModalOpen] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Community & Campus Chapter');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], ['0%', '12%']);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.75], [1, 0.2]);

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
      {/* 1. CINEMATIC 100SVH FULL-BLEED HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#0E0E10]"
      >
        <motion.div
          style={{ y: heroBgY }}
          className="absolute inset-0 -top-4 -bottom-10 will-change-transform"
        >
          <img
            src="/images/ai-sparks-stage.jpg"
            alt="CodeNeuraX builders and speakers on stage at Marwadi University"
            loading="eager"
            decoding="sync"
            className="w-full h-full object-cover object-[center_36%]"
          />
        </motion.div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(14,14,16,0.58) 0%, rgba(14,14,16,0.16) 30%, rgba(14,14,16,0.44) 64%, rgba(14,14,16,0.96) 100%)',
          }}
        />

        <motion.div
          style={{ opacity: heroContentOpacity }}
          className="relative z-10 max-w-[1160px] w-full mx-auto px-5 sm:px-8 pt-36 pb-16 sm:pb-24 text-center"
        >
          <HeroMount>
            <h1 className="font-bold tracking-[-0.035em] text-white leading-[1.02] overflow-visible">
              <span className="block text-[clamp(3.15rem,6.8vw,5.75rem)] drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                Build with
              </span>
              <span className="block font-editorial text-[clamp(3.6rem,7.8vw,6.5rem)] leading-[1.06] pb-2 pr-1 overflow-visible text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
                Community
              </span>
            </h1>

            <p className="mt-4 max-w-md mx-auto text-sm sm:text-[15px] text-white/80 font-normal leading-relaxed">
              India’s student-led engineering &amp; AI collective.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setWhatsAppOpen(true)}
                className="cnx-clay-btn-white inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold"
              >
                Join Us
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
              </button>

              <Link
                to="/events"
                className="group inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-white/85 hover:text-white transition-colors"
              >
                <span>Explore events</span>
                <ArrowUpRight
                  className="w-4 h-4 opacity-80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                />
              </Link>
            </div>
          </HeroMount>
        </motion.div>
      </section>

      {/* 2. REFERENCE-MATCHED 4-COLUMN CLAY BENTO GRID ("Why CodeNeuraX") */}
      <section className="py-28 sm:py-32 bg-[#0E0E10]">
        <div className="max-w-[1220px] mx-auto px-5 sm:px-8">
          <RevealBlock className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-[clamp(2rem,3.6vw,2.9rem)] font-bold tracking-[-0.03em] text-white leading-[1.1]">
              Why <span className="cnx-accent-gradient-dark">CodeNeuraX</span>
            </h2>
            <p className="mt-2.5 text-sm sm:text-[15px] text-neutral-400">
              Find your people. Learn by doing. Build together.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            {/* Col 1 (Tall Left, 3 cols): Dense 5x6 Photo Mosaic + Grounded Bottom Strip */}
            <RevealBlock className="lg:col-span-3 lg:row-span-2 rounded-[26px] cnx-clay-dark p-6 flex flex-col justify-between gap-5">
              <div>
                <p className="text-4xl font-extrabold tracking-[-0.035em] text-white leading-none">
                  7,000+
                </p>
                <p className="mt-2 text-sm text-neutral-400">Students in the community</p>
              </div>

              <CircularPhotoMosaic items={COMMUNITY_PHOTOS} />

              <div className="pt-3.5 border-t border-white/[0.07] flex items-center justify-between gap-2 text-[11px] text-neutral-400">
                <span className="truncate">Rajkot · Noida · Hyderabad</span>
                <span className="font-semibold text-white/85 shrink-0">8+ Hubs</span>
              </div>
            </RevealBlock>

            {/* Col 2–3 Top (Wide Center-Top, 6 cols) */}
            <RevealBlock
              delay={0.04}
              className="md:col-span-2 lg:col-span-6 rounded-[26px] cnx-clay-dark p-6 flex flex-col justify-between gap-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-4xl font-extrabold tracking-[-0.035em] text-white leading-none">
                    360+
                  </p>
                  <p className="mt-2 text-sm text-neutral-400">Flagship summit builders</p>
                </div>
                <Link
                  to="/aispark"
                  className="text-xs font-medium text-neutral-400 hover:text-white inline-flex items-center gap-1 transition-colors shrink-0"
                >
                  <span>AI Sparks ’26</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                {['Google', 'Amazon', 'Microsoft', 'Unstop', 'GfG'].map((org) => (
                  <div
                    key={org}
                    className="h-12 rounded-xl bg-[#101014] border border-white/[0.06] shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)] flex items-center justify-center px-2"
                  >
                    <span className="text-xs font-semibold tracking-tight text-neutral-300">
                      {org}
                    </span>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Col 4 (Tall Right, 3 cols): Matching 5x6 Photo Mosaic + Grounded Bottom Strip */}
            <RevealBlock
              delay={0.08}
              className="lg:col-span-3 lg:row-span-2 rounded-[26px] cnx-clay-dark p-6 flex flex-col justify-between gap-5"
            >
              <div>
                <p className="text-4xl font-extrabold tracking-[-0.035em] text-white leading-none">
                  15+
                </p>
                <p className="mt-2 text-sm text-neutral-400">Industry mentors &amp; leads</p>
              </div>

              <CircularPhotoMosaic items={MENTOR_PHOTOS} />

              <div className="pt-3.5 border-t border-white/[0.07] flex items-center justify-between gap-2 text-[11px] text-neutral-400">
                <span className="truncate">Google · Amazon · Microsoft</span>
                <span className="font-semibold text-white/85 shrink-0">Live Clinics</span>
              </div>
            </RevealBlock>

            {/* Col 2 Mid (3 cols): Fanned Event Poster Deck */}
            <RevealBlock delay={0.1} className="lg:col-span-3">
              <Link
                to="/events"
                className="group h-full rounded-[26px] cnx-clay-dark p-6 flex flex-col justify-between gap-6"
              >
                <div>
                  <p className="text-4xl font-extrabold tracking-[-0.035em] text-white leading-none">
                    10+
                  </p>
                  <p className="mt-2 text-sm text-neutral-400">Community events</p>
                </div>

                <div className="flex items-end justify-center pt-2 pb-1">
                  {EVENT_POSTER_DECK.map((poster) => (
                    <div
                      key={poster.title}
                      className={`relative w-[62px] sm:w-[68px] aspect-[3/4] rounded-xl overflow-hidden border border-white/[0.14] bg-[#111115] transition-transform duration-300 group-hover:-translate-y-1.5 ${poster.z} ${poster.offset}`}
                    >
                      <img
                        src={poster.src}
                        alt={poster.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    </div>
                  ))}
                </div>
              </Link>
            </RevealBlock>

            {/* Col 3 Mid (3 cols): 3 Specialist Tracks */}
            <RevealBlock
              delay={0.12}
              className="lg:col-span-3 rounded-[26px] cnx-clay-dark p-6 flex flex-col justify-between gap-5"
            >
              <div>
                <p className="text-4xl font-extrabold tracking-[-0.035em] text-white leading-none">
                  3
                </p>
                <p className="mt-2 text-sm text-neutral-400">Specialist tracks</p>
              </div>

              <div className="space-y-3">
                {SPECIALIST_TRACKS.map((track) => {
                  const Icon = track.icon;
                  return (
                    <Link
                      key={track.name}
                      to={track.to}
                      className="group flex items-center gap-3 transition-transform duration-200 hover:translate-x-1"
                    >
                      <span
                        className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${track.tint}`}
                      >
                        <Icon className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white group-hover:text-[#818CF8] transition-colors truncate">
                          {track.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 truncate">{track.desc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </RevealBlock>
          </div>

          {/* Bottom Twin Wide Cards */}
          <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Smooth Infinite Looping Partner Logo Marquee */}
            <RevealBlock
              delay={0.14}
              className="lg:col-span-6 rounded-[26px] cnx-clay-dark p-6 flex flex-col justify-between gap-5 overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-bold text-white">Campus chapters &amp; partners</h3>
                <Link
                  to="/campus-ambassadors"
                  className="text-xs font-medium text-neutral-400 hover:text-white inline-flex items-center gap-1 shrink-0 transition-colors"
                >
                  <span>Directory</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
              </div>

              <div className="cnx-marquee-wrap cnx-marquee-mask overflow-hidden -mx-1 py-0.5">
                <div className="cnx-marquee-track gap-3">
                  {[0, 1].map((dup) => (
                    <div key={dup} className="flex items-center gap-3 pr-3" aria-hidden={dup === 1}>
                      {COMMUNITY_PARTNERS.map((partner) => (
                        <div
                          key={`${dup}-${partner.id}`}
                          className="h-14 min-w-[120px] px-4 rounded-xl bg-[#101014] border border-white/[0.06] shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)] flex items-center justify-center shrink-0"
                        >
                          <PartnerLogoMark partner={partner} surface="dark" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Clean Builder Tools Strip */}
            <RevealBlock
              delay={0.16}
              className="lg:col-span-6 rounded-[26px] cnx-clay-dark p-6 flex flex-col justify-between gap-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-base font-bold text-white">Student tools &amp; library</h3>
                <Link
                  to="/library"
                  className="text-xs font-medium text-neutral-400 hover:text-white inline-flex items-center gap-1 shrink-0 transition-colors"
                >
                  <span>Library</span>
                  <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {PLATFORM_PREVIEWS.map((card) => (
                  <Link
                    key={card.title}
                    to={card.to}
                    className="group h-14 rounded-xl bg-[#101014] border border-white/[0.06] hover:border-white/[0.18] shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)] px-3 flex flex-col justify-center transition-colors"
                  >
                    <span className="text-xs font-semibold text-white truncate group-hover:text-[#818CF8] transition-colors">
                      {card.title}
                    </span>
                    <span className="text-[10px] text-neutral-500 truncate mt-0.5">{card.tag}</span>
                  </Link>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* 3. FLAGSHIP EVENTS STAGE */}
      <section className="py-28 sm:py-32 cnx-prism-hero border-t border-white/[0.06]">
        <div className="max-w-[1220px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <RevealBlock className="lg:col-span-6 space-y-8">
              <h2 className="text-[clamp(2.1rem,3.8vw,3.15rem)] font-bold tracking-[-0.03em] text-white leading-[1.1]">
                Learn from builders{' '}
                <span className="cnx-accent-gradient-dark">shipping at scale</span>
              </h2>

              <SlidingTabs
                variant="underline-dark"
                value={flagshipMode}
                onChange={setFlagshipMode}
                options={[
                  { id: 'neuraknockout', label: 'NeuraKnockout 2026' },
                  { id: 'aisparks', label: 'AI Sparks ’26' },
                ]}
              />

              <div className="flex items-center gap-3.5">
                <div className="flex -space-x-2">
                  {AI_SPARKS_SPEAKERS.map((spk) => (
                    <img
                      key={spk.id}
                      src={spk.avatar}
                      alt={spk.name}
                      loading="lazy"
                      decoding="async"
                      className="w-9 h-9 rounded-full object-cover object-top ring-2 ring-[#0E0E10]"
                    />
                  ))}
                </div>
                <span className="text-xs text-neutral-400">
                  Parth Singh · Dev Anand · Varun Poladiya · Prof. Akshay
                </span>
              </div>
            </RevealBlock>

            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {flagshipMode === 'neuraknockout' ? (
                  <motion.div
                    key="poster-nk"
                    initial={{ opacity: 0, y: 12, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.985 }}
                    transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                    className="rounded-[28px] overflow-hidden cnx-clay-dark-static"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src="/images/ai-sparks-closing.jpg"
                        alt="NeuraKnockout 2026 at Marwadi University"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#16161B] via-[#16161B]/25 to-transparent" />
                      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-medium text-neutral-200">
                        <span>Dec 19, 2026</span>
                        <span className="text-white font-semibold">₹4,700 Prize Pool</span>
                      </div>
                    </div>

                    <div className="p-7 space-y-5">
                      <div>
                        <h3 className="text-2xl font-bold tracking-[-0.02em] text-white">
                          NeuraKnockout 2026
                        </h3>
                        <p className="text-sm text-neutral-400 mt-1.5 leading-relaxed">
                          7-hour offline Web Dev Challenge at Marwadi University.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setSelectedEvent(neuraKnockout)}
                          className="cnx-clay-btn-white inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold"
                        >
                          Register now
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </button>
                        <Link
                          to="/events"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                        >
                          All Events
                          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="poster-ais"
                    initial={{ opacity: 0, y: 12, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.985 }}
                    transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
                    className="rounded-[28px] overflow-hidden cnx-clay-dark-static"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src="/images/ai-sparks-speakers-banner.webp"
                        alt="AI Sparks 2026 Speakers"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-7 space-y-5">
                      <div>
                        <h3 className="text-2xl font-bold tracking-[-0.02em] text-white">
                          AI Sparks ’26 Summit
                        </h3>
                        <p className="text-sm text-neutral-400 mt-1.5 leading-relaxed">
                          360+ builders, Agentic AI labs, $30 Devnovate credits &amp; GATE DA awards.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <Link
                          to="/aispark"
                          className="cnx-clay-btn-white inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold"
                        >
                          Explore AI Sparks ’26
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </Link>
                        <Link
                          to="/events"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                        >
                          Archive
                          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
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

      {/* 4. PORCELAIN CERAMIC CLAY ECOSYSTEM SECTION */}
      <section className="py-28 sm:py-32 bg-[#F3F4F8] text-[#0E0E10]">
        <div className="max-w-[1220px] mx-auto px-5 sm:px-8">
          <RevealBlock className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-bold tracking-[-0.03em] text-[#0E0E10] leading-[1.1]">
              Built for <span className="cnx-accent-gradient-light">signal</span>, not noise
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <RevealBlock className="group rounded-[26px] cnx-clay-light p-9 flex flex-col justify-between min-h-[250px]">
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#0E0E10]">
                  Opportunity Feed
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  Daily vetted hackathons, internships, and technical briefs filtered by deadline.
                </p>
              </div>

              <Link
                to="/feed"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#0E0E10] underline underline-offset-4 hover:text-[#4353FF] transition-colors w-fit"
              >
                <span>Explore Feed</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </RevealBlock>

            <RevealBlock
              delay={0.06}
              className="group rounded-[26px] cnx-clay-light p-9 flex flex-col justify-between min-h-[250px]"
            >
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#0E0E10]">BuddyKid</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  {squads.length} active squads across Indian campuses. Match by role or join via
                  invite code.
                </p>
              </div>

              <Link
                to="/buddykid"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#0E0E10] underline underline-offset-4 hover:text-[#4353FF] transition-colors w-fit"
              >
                <span>Open BuddyKid</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </RevealBlock>

            <RevealBlock
              delay={0.12}
              className="group rounded-[26px] cnx-clay-light p-9 flex flex-col justify-between min-h-[250px]"
            >
              <div>
                <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#0E0E10]">
                  Engineering Library
                </h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                  150+ company DSA sheets, direct LeetCode links, and official GATE CS &amp; DA
                  papers.
                </p>
              </div>

              <Link
                to="/library"
                className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-[#0E0E10] underline underline-offset-4 hover:text-[#4353FF] transition-colors w-fit"
              >
                <span>Browse Library</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1.5">
                  →
                </span>
              </Link>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* 5. OUR TEAM ONLY (Spacious & Minimal) */}
      <section className="py-28 sm:py-32 bg-[#0E0E10]">
        <div className="max-w-[1220px] mx-auto px-5 sm:px-8">
          <RevealBlock className="text-center max-w-xl mx-auto mb-14">
            <h2 className="text-[clamp(2rem,3.6vw,2.9rem)] font-bold tracking-[-0.03em] text-white leading-[1.1]">
              Our <span className="cnx-accent-gradient-dark">Team</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {CORE_TEAM.map((member, idx) => (
              <RevealBlock key={member.id} delay={idx * 0.04}>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group h-full rounded-[24px] cnx-clay-dark p-7 flex flex-col items-center text-center justify-between gap-5"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-1 ring-white/[0.14] group-hover:ring-white/[0.28] transition-all duration-300 shadow-[0_12px_26px_rgba(0,0,0,0.55)] shrink-0">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top cnx-portrait-grade group-hover:scale-[1.06]"
                      />
                    ) : (
                      <div className="w-full h-full cnx-silk-spotlight flex items-center justify-center text-xl font-extrabold text-white">
                        {member.initials}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white inline-flex items-center justify-center gap-1">
                      <span>{member.name}</span>
                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors"
                        strokeWidth={1.75}
                      />
                    </p>
                    <p className="text-xs font-medium text-neutral-400 leading-snug">
                      {member.role}
                    </p>
                  </div>
                </a>
              </RevealBlock>
            ))}
          </div>
        </div>

        {/* 6. SCULPTED CERAMIC WHITE EDITORIAL SPREAD (Campus Ambassador) */}
        <div className="max-w-[1220px] mx-auto px-5 sm:px-8 mt-24">
          <RevealBlock className="rounded-[28px] cnx-clay-light-static text-[#0E0E10] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 p-9 sm:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <h2 className="text-[clamp(2rem,3.5vw,2.9rem)] font-bold tracking-[-0.03em] text-[#0E0E10] leading-[1.1]">
                  Become a <span className="cnx-accent-gradient-light">Campus Ambassador</span>
                </h2>
                <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-lg">
                  Lead workshops, organize hackathon squads, and represent CodeNeuraX on your
                  campus.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => setAmbassadorModalOpen(true)}
                  className="cnx-clay-btn-dark px-6 py-3 rounded-xl text-sm font-semibold"
                >
                  Apply Now
                </button>
                <Link
                  to="/campus-ambassadors"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E0E10] underline underline-offset-4 hover:text-[#4353FF] transition-colors"
                >
                  <span>View directory</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                    strokeWidth={1.75}
                  />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-[360px] bg-[#0E0E10]">
              <img
                src="/images/ai-sparks-speaker.jpg"
                alt="CodeNeuraX campus leader speaking on stage"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* 7. PORCELAIN FAQ ACCORDION + QUIET STUDIO CONTACT BAND */}
      <section className="py-28 sm:py-32 bg-[#F3F4F8] text-[#0E0E10]">
        <div className="max-w-[900px] mx-auto px-5 sm:px-8">
          <RevealBlock className="text-center mb-14">
            <h2 className="text-[clamp(2rem,3.5vw,2.9rem)] font-bold tracking-[-0.03em] text-[#0E0E10]">
              Frequently asked <span className="cnx-accent-gradient-light">questions</span>
            </h2>
          </RevealBlock>

          <div className="rounded-[26px] cnx-clay-light-static px-6 sm:px-10 py-2 divide-y divide-black/[0.08]">
            {HOME_FAQS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-semibold text-[#0E0E10] group-hover:text-[#4353FF] transition-colors">
                      {item.q}
                    </span>
                    <span className="text-[#0E0E10] shrink-0">
                      {isOpen ? (
                        <Minus className="w-4 h-4" strokeWidth={1.75} />
                      ) : (
                        <Plus className="w-4 h-4" strokeWidth={1.75} />
                      )}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 text-sm text-neutral-600 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quiet Editorial Contact Band */}
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 mt-28 pt-24 border-t border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16">
            <RevealBlock className="lg:col-span-5 flex flex-col justify-between space-y-10">
              <div>
                <h3 className="text-[clamp(2rem,3.6vw,2.9rem)] font-bold tracking-[-0.03em] text-[#0E0E10] leading-[1.08]">
                  Let’s <span className="cnx-accent-gradient-light">talk.</span>
                </h3>
                <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-sm">
                  Chapters, sponsorships, or events. Write directly to the core team.
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
                  <dt className="text-xs font-medium text-neutral-500">Location</dt>
                  <dd className="mt-1 text-neutral-700">Marwadi University, Rajkot</dd>
                </div>
              </dl>
            </RevealBlock>

            <RevealBlock delay={0.08} className="lg:col-span-7">
              {contactSent ? (
                <div className="py-12 border-t border-black/15 space-y-4">
                  <h4 className="text-xl font-bold text-[#0E0E10]">Message received.</h4>
                  <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
                    Your note has been routed to team@codeneurax.in.
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
                      className="cnx-clay-btn-dark px-7 py-3 rounded-xl text-sm font-medium"
                    >
                      Send inquiry
                    </button>
                  </div>
                </form>
              )}
            </RevealBlock>
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
