import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useScrollLock } from '../../context/ScrollContext';
import { EDITORIAL_EASE } from '../ui/MotionPrimitives';
import { WhatsAppJoinModal } from '../ui/WhatsAppJoinModal';

type MegaMenuKey = 'community' | 'events' | null;

const COMMUNITY_EXPLORE = [
  { title: 'Opportunity Feed', to: '/feed' },
  { title: 'BuddyKid', to: '/buddykid' },
];

const COMMUNITY_CHAPTERS = [
  { title: 'Campus Ambassadors', to: '/campus-ambassadors' },
  { title: 'Work With Us', to: '/work-with-us' },
];

const EVENTS_FLAGSHIPS = [
  { title: 'AI Sparks ’26', to: '/aispark' },
  { title: 'NeuraKnockout ’26', to: '/events#neuraknockout' },
  { title: 'AlgoRush ’26', to: '/events#algorush' },
];

const EVENTS_ARCHIVE = [{ title: 'All CNX Events', to: '/events' }];

const NAV_POP_STYLE: React.CSSProperties = {
  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

const TOP_NAV_POP_CLASS =
  'transition-all duration-200 origin-center hover:text-white hover:scale-[1.055] hover:-translate-y-[1px]';

export const Navbar: React.FC = () => {
  const { user, toggleSignIn, bookmarkedIds, incomingRequests } = useApp();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState<MegaMenuKey>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);

  const hoverTimeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useScrollLock(mobileOpen);

  const pendingCount = incomingRequests.filter((r) => r.status === 'Pending').length;

  const clearHoverTimer = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const openMenuWithIntent = (key: MegaMenuKey) => {
    clearHoverTimer();
    setProfileOpen(false);
    setActiveMenu(key);
  };

  const scheduleCloseMenu = () => {
    clearHoverTimer();
    hoverTimeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 120);
  };

  useEffect(() => {
    setActiveMenu(null);
    setProfileOpen(false);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
        setProfileOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setProfileOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      window.removeEventListener('keydown', onKeyDown);
      clearHoverTimer();
    };
  }, []);

  const isEventsActive =
    location.pathname === '/events' || location.pathname === '/aispark';
  const isCommunityActive =
    location.pathname === '/feed' ||
    location.pathname === '/buddykid' ||
    location.pathname === '/campus-ambassadors' ||
    location.pathname === '/work-with-us';

  const renderPopLink = (item: { title: string; to: string }) => (
    <Link
      key={item.title}
      to={item.to}
      onClick={() => setActiveMenu(null)}
      style={NAV_POP_STYLE}
      className="group inline-flex items-center gap-2 text-[16px] font-medium text-white/[0.68] hover:text-white hover:scale-[1.055] hover:-translate-y-[1px] origin-left transition-all duration-200 w-fit"
    >
      <span>{item.title}</span>
      <span
        aria-hidden="true"
        style={NAV_POP_STYLE}
        className="text-sm text-white/80 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
      >
        ↗
      </span>
    </Link>
  );

  return (
    <>
      <div ref={headerRef} className="sticky top-0 z-50 w-full">
        <header className="relative z-50 h-[68px] w-full bg-[#0E0E10] border-b border-white/[0.08]">
          <div className="max-w-[1240px] mx-auto h-full px-5 sm:px-8 flex items-center justify-between gap-4">
            {/* Left: Mark + Wordmark */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <img
                src="/images/codeneurax-mark.jpg"
                alt="CodeNeuraX"
                className="w-7 h-7 rounded-md object-cover border border-white/[0.12] transition-transform duration-200 group-hover:scale-[1.04]"
              />
              <span className="text-[17px] font-bold tracking-[-0.02em] text-white">
                CodeNeuraX
              </span>
            </Link>

            {/* Center: 4 Clean Unboxed Triggers with Sleek Hover Pop */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
              <button
                type="button"
                onMouseEnter={() => openMenuWithIntent('community')}
                onMouseLeave={scheduleCloseMenu}
                onClick={() =>
                  setActiveMenu((prev) => (prev === 'community' ? null : 'community'))
                }
                aria-expanded={activeMenu === 'community'}
                style={NAV_POP_STYLE}
                className={`inline-flex items-center gap-1.5 py-2 text-sm ${TOP_NAV_POP_CLASS} ${
                  isCommunityActive || activeMenu === 'community'
                    ? 'text-white font-semibold'
                    : 'text-white/[0.68] font-medium'
                }`}
              >
                Community
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'community' ? 'rotate-180 text-white' : ''
                  }`}
                  strokeWidth={1.75}
                />
              </button>

              <button
                type="button"
                onMouseEnter={() => openMenuWithIntent('events')}
                onMouseLeave={scheduleCloseMenu}
                onClick={() => setActiveMenu((prev) => (prev === 'events' ? null : 'events'))}
                aria-expanded={activeMenu === 'events'}
                style={NAV_POP_STYLE}
                className={`inline-flex items-center gap-1.5 py-2 text-sm ${TOP_NAV_POP_CLASS} ${
                  isEventsActive || activeMenu === 'events'
                    ? 'text-white font-semibold'
                    : 'text-white/[0.68] font-medium'
                }`}
              >
                Events
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeMenu === 'events' ? 'rotate-180 text-white' : ''
                  }`}
                  strokeWidth={1.75}
                />
              </button>

              <NavLink
                to="/library"
                onMouseEnter={() => scheduleCloseMenu()}
                style={NAV_POP_STYLE}
                className={({ isActive }) =>
                  `py-2 text-sm ${TOP_NAV_POP_CLASS} ${
                    isActive ? 'text-white font-semibold' : 'text-white/[0.68] font-medium'
                  }`
                }
              >
                Library
              </NavLink>

              <NavLink
                to="/services"
                onMouseEnter={() => scheduleCloseMenu()}
                style={NAV_POP_STYLE}
                className={({ isActive }) =>
                  `py-2 text-sm ${TOP_NAV_POP_CLASS} ${
                    isActive ? 'text-white font-semibold' : 'text-white/[0.68] font-medium'
                  }`
                }
              >
                Services
              </NavLink>
            </nav>

            {/* Right: 2 Crisp Dot-Free, Icon-Free Actions */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setWhatsAppOpen(true)}
                className="px-4 py-2 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-[13.5px] font-medium transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Join WhatsApp
              </button>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen((p) => !p);
                    setActiveMenu(null);
                  }}
                  aria-expanded={profileOpen}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-[#0E0E10] text-[13.5px] font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  {user.signedIn ? 'Dev Parmar' : 'BuddyKid'}
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: EDITORIAL_EASE }}
                      style={{ transformOrigin: 'top right' }}
                      className="absolute right-0 mt-2.5 w-60 rounded-xl bg-[#16161A] border border-white/[0.1] shadow-2xl overflow-hidden z-50"
                    >
                      <div className="px-4 py-3.5 border-b border-white/[0.08]">
                        <p className="text-xs font-semibold text-white">
                          {user.signedIn ? user.name : 'Guest session'}
                        </p>
                        <p className="text-xs text-neutral-400 truncate mt-0.5">
                          {user.signedIn ? user.college : 'Sign in to manage squads'}
                        </p>
                      </div>

                      <div className="py-1.5 divide-y divide-white/[0.06]">
                        <div className="px-1.5 pb-1.5 space-y-0.5">
                          <Link
                            to="/buddykid"
                            className="flex items-center justify-between px-2.5 py-2 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                          >
                            <span>BuddyKid</span>
                            {pendingCount > 0 && (
                              <span className="text-[11px] font-semibold text-[#818CF8]">
                                {pendingCount} pending
                              </span>
                            )}
                          </Link>

                          <Link
                            to="/feed"
                            className="flex items-center justify-between px-2.5 py-2 text-xs font-medium text-neutral-300 hover:text-white transition-colors"
                          >
                            <span>Saved opportunities</span>
                            <span className="text-[11px] text-neutral-400">
                              {bookmarkedIds.length}
                            </span>
                          </Link>
                        </div>

                        <div className="px-1.5 pt-1.5">
                          <button
                            type="button"
                            onClick={toggleSignIn}
                            className="w-full px-2.5 py-2 text-xs font-medium text-neutral-300 hover:text-white transition-colors text-left"
                          >
                            {user.signedIn ? 'Switch to guest mode' : 'Sign in as Dev Parmar'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setWhatsAppOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-[#4353FF] text-white text-xs font-medium"
              >
                Join WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                className="p-2 rounded-lg border border-white/[0.1] bg-[#16161A] text-white"
              >
                <Menu className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </header>

        {/* Full-Width Opaque Mega-Menu + Soft Page Dim Backdrop */}
        <AnimatePresence>
          {activeMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                onClick={() => setActiveMenu(null)}
                className="hidden lg:block fixed inset-0 top-[68px] bg-black/55 backdrop-blur-[2px] z-30"
              />

              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: EDITORIAL_EASE }}
                onMouseEnter={clearHoverTimer}
                onMouseLeave={scheduleCloseMenu}
                className="hidden lg:block absolute left-0 right-0 top-[68px] bg-[#0E0E10] border-b border-white/[0.1] shadow-2xl z-40"
              >
                {activeMenu === 'events' ? (
                  <div className="max-w-[1160px] mx-auto px-8 py-10 grid grid-cols-[1fr_1fr_320px] gap-12 items-start">
                    {/* Col 1: Flagships */}
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-5">Flagships</p>
                      <div className="flex flex-col gap-3.5">
                        {EVENTS_FLAGSHIPS.map(renderPopLink)}
                      </div>
                    </div>

                    {/* Col 2: Archive */}
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-5">Archive</p>
                      <div className="flex flex-col gap-3.5">
                        {EVENTS_ARCHIVE.map(renderPopLink)}
                      </div>
                    </div>

                    {/* Col 3: Minimal Dark Editorial Photo Spotlight */}
                    <Link
                      to="/aispark"
                      onClick={() => setActiveMenu(null)}
                      className="group relative rounded-xl overflow-hidden border border-white/[0.1] bg-[#16161A] min-h-[210px] flex flex-col justify-end"
                    >
                      <img
                        src="/images/ai-sparks-stage.jpg"
                        alt="AI Sparks 2026 summit at Marwadi University"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(14,14,16,0.94) 12%, rgba(14,14,16,0.48) 58%, rgba(14,14,16,0.22) 100%)',
                        }}
                      />
                      <div className="relative z-10 p-5">
                        <h4 className="text-xl font-bold tracking-tight text-white">
                          AI Sparks ’26
                        </h4>
                        <p className="mt-1 text-xs text-neutral-300">
                          360+ builders · Marwadi University
                        </p>
                        <span className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#818CF8] transition-colors">
                          Explore summit
                          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </span>
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="max-w-[1160px] mx-auto px-8 py-10 grid grid-cols-[1fr_1fr_320px] gap-12 items-start">
                    {/* Col 1: Explore */}
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-5">Explore</p>
                      <div className="flex flex-col gap-3.5">
                        {COMMUNITY_EXPLORE.map(renderPopLink)}
                      </div>
                    </div>

                    {/* Col 2: Chapters */}
                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-5">Chapters</p>
                      <div className="flex flex-col gap-3.5">
                        {COMMUNITY_CHAPTERS.map(renderPopLink)}
                      </div>
                    </div>

                    {/* Col 3: Minimal Dark Editorial Photo Spotlight */}
                    <Link
                      to="/campus-ambassadors"
                      onClick={() => setActiveMenu(null)}
                      className="group relative rounded-xl overflow-hidden border border-white/[0.1] bg-[#16161A] min-h-[210px] flex flex-col justify-end"
                    >
                      <img
                        src="/images/ai-sparks-speaker.jpg"
                        alt="Campus Ambassador representing CodeNeuraX"
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            'linear-gradient(to top, rgba(14,14,16,0.95) 14%, rgba(14,14,16,0.52) 60%, rgba(14,14,16,0.22) 100%)',
                        }}
                      />
                      <div className="relative z-10 p-5">
                        <h4 className="text-xl font-bold tracking-tight text-white">
                          Campus Ambassador 2027
                        </h4>
                        <p className="mt-1 text-xs text-neutral-300">
                          Applications open through Dec 15, 2026
                        </p>
                        <span className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#818CF8] transition-colors">
                          View directory &amp; apply
                          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
              className="relative z-10 w-full max-w-sm bg-[#0E0E10] border-l border-white/[0.08] h-full flex flex-col text-white"
            >
              <div className="h-[68px] px-5 flex items-center justify-between border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/codeneurax-mark.jpg"
                    alt="CodeNeuraX"
                    className="w-7 h-7 rounded-md object-cover"
                  />
                  <span className="font-bold text-base tracking-[-0.02em]">CodeNeuraX</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-lg border border-white/[0.1] bg-[#16161A] text-neutral-300"
                >
                  <X className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                <div>
                  <p className="text-xs font-medium text-neutral-500 mb-3">Community</p>
                  <div className="space-y-1">
                    <Link
                      to="/feed"
                      className="flex items-center justify-between py-2.5 text-sm font-medium text-neutral-200 hover:text-white"
                    >
                      <span>Opportunity Feed</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500" strokeWidth={1.75} />
                    </Link>
                    <Link
                      to="/buddykid"
                      className="flex items-center justify-between py-2.5 text-sm font-medium text-neutral-200 hover:text-white"
                    >
                      <span>BuddyKid</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500" strokeWidth={1.75} />
                    </Link>
                    <Link
                      to="/campus-ambassadors"
                      className="flex items-center justify-between py-2.5 text-sm font-medium text-neutral-200 hover:text-white"
                    >
                      <span>Campus Ambassadors</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500" strokeWidth={1.75} />
                    </Link>
                    <Link
                      to="/work-with-us"
                      className="flex items-center justify-between py-2.5 text-sm font-medium text-neutral-200 hover:text-white"
                    >
                      <span>Work With Us</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500" strokeWidth={1.75} />
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-neutral-500 mb-3">Events</p>
                  <div className="space-y-1">
                    <Link
                      to="/aispark"
                      className="flex items-center justify-between py-2.5 text-sm font-medium text-neutral-200 hover:text-white"
                    >
                      <span>AI Sparks ’26</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500" strokeWidth={1.75} />
                    </Link>
                    <Link
                      to="/events"
                      className="flex items-center justify-between py-2.5 text-sm font-medium text-neutral-200 hover:text-white"
                    >
                      <span>All CNX Events</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500" strokeWidth={1.75} />
                    </Link>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-neutral-500 mb-3">Resources &amp; Studio</p>
                  <div className="space-y-1">
                    <Link
                      to="/library"
                      className="flex items-center justify-between py-2.5 text-sm font-medium text-neutral-200 hover:text-white"
                    >
                      <span>Library</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500" strokeWidth={1.75} />
                    </Link>
                    <Link
                      to="/services"
                      className="flex items-center justify-between py-2.5 text-sm font-medium text-neutral-200 hover:text-white"
                    >
                      <span>Services</span>
                      <ArrowRight className="w-4 h-4 text-neutral-500" strokeWidth={1.75} />
                    </Link>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white">
                      {user.signedIn ? user.name : 'Guest session'}
                    </p>
                    <p className="text-[11px] text-neutral-400 truncate">{user.college}</p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleSignIn}
                    className="px-3.5 py-1.5 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold shrink-0"
                  >
                    {user.signedIn ? 'Sign out' : 'Sign in'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <WhatsAppJoinModal open={whatsAppOpen} onClose={() => setWhatsAppOpen(false)} />
    </>
  );
};
