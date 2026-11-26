import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useScrollLock, useSmoothScroll } from '../../context/ScrollContext';
import { EDITORIAL_EASE } from '../ui/MotionPrimitives';
import { WhatsAppJoinModal } from '../ui/WhatsAppJoinModal';

type MegaMenuKey = 'community' | 'events' | null;
type NavKey = 'community' | 'events' | 'library' | 'services';

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

const NAV_EASE_STYLE: React.CSSProperties = {
  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
};

export const Navbar: React.FC = () => {
  const { user, toggleSignIn, bookmarkedIds, incomingRequests } = useApp();
  const { scrollToTopSmooth, scrollToElement } = useSmoothScroll();
  const location = useLocation();

  const [activeMenu, setActiveMenu] = useState<MegaMenuKey>(null);
  const [hoveredNav, setHoveredNav] = useState<NavKey | null>(null);
  const [menuDirection, setMenuDirection] = useState<number>(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [whatsAppOpen, setWhatsAppOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const hoverTimeoutRef = useRef<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const labelRefs = useRef<Record<NavKey, HTMLSpanElement | null>>({
    community: null,
    events: null,
    library: null,
    services: null,
  });
  const scrolledRef = useRef(false);
  const wasIndicatorVisibleRef = useRef(false);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    visible: false,
    glide: false,
  });

  useScrollLock(mobileOpen);

  const pendingCount = incomingRequests.filter((r) => r.status === 'Pending').length;

  useEffect(() => {
    const updateScroll = () => {
      const next = window.scrollY > 24;
      if (next !== scrolledRef.current) {
        scrolledRef.current = next;
        setIsScrolled(next);
      }
    };
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, [location.pathname]);

  const clearHoverTimer = () => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const openMenuWithIntent = (key: MegaMenuKey) => {
    clearHoverTimer();
    setProfileOpen(false);
    setActiveMenu((prev) => {
      if (prev && key && prev !== key) {
        setMenuDirection(key === 'events' ? 1 : -1);
      } else {
        setMenuDirection(0);
      }
      return key;
    });
  };

  const scheduleCloseMenu = () => {
    clearHoverTimer();
    hoverTimeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  useEffect(() => {
    setActiveMenu(null);
    setProfileOpen(false);
    setMobileOpen(false);
    setHoveredNav(null);
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
  const isLibraryActive = location.pathname === '/library';
  const isServicesActive = location.pathname === '/services';

  const activeRouteKey: NavKey | null = isCommunityActive
    ? 'community'
    : isEventsActive
      ? 'events'
      : isLibraryActive
        ? 'library'
        : isServicesActive
          ? 'services'
          : null;

  const indicatorKey: NavKey | null = hoveredNav ?? activeMenu ?? activeRouteKey;

  const updateIndicator = useCallback(
    (allowGlide: boolean) => {
      const navEl = navRef.current;
      if (!indicatorKey || !navEl) {
        wasIndicatorVisibleRef.current = false;
        setIndicator((prev) => ({ ...prev, visible: false, glide: false }));
        return;
      }
      const labelEl = labelRefs.current[indicatorKey];
      if (!labelEl) return;

      const navRect = navEl.getBoundingClientRect();
      const labelRect = labelEl.getBoundingClientRect();
      const left = Math.round(labelRect.left - navRect.left);
      const width = Math.round(labelRect.width);

      const shouldGlide = allowGlide && wasIndicatorVisibleRef.current;
      wasIndicatorVisibleRef.current = true;
      setIndicator({
        left,
        width,
        visible: true,
        glide: shouldGlide,
      });
    },
    [indicatorKey],
  );

  useLayoutEffect(() => {
    updateIndicator(true);
  }, [updateIndicator]);

  useEffect(() => {
    const onResize = () => updateIndicator(false);
    window.addEventListener('resize', onResize, { passive: true });
    document.fonts?.ready?.then(() => updateIndicator(false));
    return () => window.removeEventListener('resize', onResize);
  }, [updateIndicator]);

  const showScrollFill = isScrolled;
  const showMenuSolidLock = Boolean(activeMenu) || profileOpen || mobileOpen;
  const isSolid = showScrollFill || showMenuSolidLock;

  const handleMenuLinkClick = (to: string) => {
    setActiveMenu(null);
    const [targetPath, targetHash] = to.split('#');
    if (targetPath === location.pathname) {
      if (targetHash) {
        window.setTimeout(() => scrollToElement(targetHash, -92), 60);
      } else {
        scrollToTopSmooth();
      }
    }
  };

  const renderPopLink = (item: { title: string; to: string }, idx: number) => (
    <motion.div
      key={item.title}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: idx * 0.035, ease: EDITORIAL_EASE }}
    >
      <Link
        to={item.to}
        onClick={() => handleMenuLinkClick(item.to)}
        style={NAV_EASE_STYLE}
        className="group inline-flex items-center gap-2 text-[16px] font-medium text-white/[0.66] hover:text-white hover:translate-x-1.5 transition-[transform,color] duration-300 w-fit"
      >
        <span>{item.title}</span>
        <span
          aria-hidden="true"
          style={NAV_EASE_STYLE}
          className="text-sm text-[#818CF8] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[transform,opacity] duration-300"
        >
          ↗
        </span>
      </Link>
    </motion.div>
  );

  return (
    <>
      <div ref={headerRef} className="fixed top-0 left-0 right-0 z-50 w-full">
        <header className="relative z-50 h-[68px] w-full">
          {/* Layer 1: Smooth downward flow-in solid #0E0E10 on scroll */}
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            <motion.div
              initial={false}
              animate={{ y: showScrollFill ? '0%' : '-102%' }}
              transition={{ duration: 0.4, ease: EDITORIAL_EASE }}
              className="w-full h-full bg-[#0E0E10] border-b border-white/[0.08] will-change-transform"
            />
          </div>

          {/* Layer 2: Synchronized solid #0E0E10 lock when dropdown opens */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[#0E0E10] pointer-events-none transition-opacity duration-200"
            style={{ opacity: showMenuSolidLock ? 1 : 0 }}
          />

          <div className="relative z-10 max-w-[1280px] mx-auto h-full px-5 sm:px-8 flex items-center justify-between gap-4">
            {/* Left: Mark + Wordmark */}
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === '/') scrollToTopSmooth();
              }}
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <img
                src="/images/codeneurax-mark.png"
                alt="CodeNeuraX"
                decoding="async"
                className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-[1.06]"
              />
              <span className="text-[17px] font-bold tracking-[-0.02em] text-white">
                CodeNeuraX
              </span>
            </Link>

            {/* Center: 4 Clean Triggers */}
            <nav
              ref={navRef}
              className="relative hidden lg:flex items-center gap-8"
              aria-label="Main navigation"
              onMouseLeave={() => setHoveredNav(null)}
            >
              <button
                type="button"
                onMouseEnter={() => {
                  setHoveredNav('community');
                  openMenuWithIntent('community');
                }}
                onMouseLeave={scheduleCloseMenu}
                onClick={() =>
                  openMenuWithIntent(activeMenu === 'community' ? null : 'community')
                }
                aria-expanded={activeMenu === 'community'}
                style={NAV_EASE_STYLE}
                className={`group inline-flex items-center gap-1.5 py-2.5 text-[14px] font-medium transition-colors duration-250 ${
                  isCommunityActive || activeMenu === 'community' || hoveredNav === 'community'
                    ? 'text-white'
                    : isSolid
                      ? 'text-white/[0.7]'
                      : 'text-white/90'
                }`}
              >
                <span
                  ref={(el) => {
                    labelRefs.current.community = el;
                  }}
                  style={NAV_EASE_STYLE}
                  className="inline-block transition-transform duration-250 group-hover:-translate-y-[1.5px]"
                >
                  Community
                </span>
                <ChevronDown
                  style={NAV_EASE_STYLE}
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    activeMenu === 'community' ? 'rotate-180 text-white opacity-100' : 'opacity-70'
                  }`}
                  strokeWidth={1.75}
                />
              </button>

              <button
                type="button"
                onMouseEnter={() => {
                  setHoveredNav('events');
                  openMenuWithIntent('events');
                }}
                onMouseLeave={scheduleCloseMenu}
                onClick={() => openMenuWithIntent(activeMenu === 'events' ? null : 'events')}
                aria-expanded={activeMenu === 'events'}
                style={NAV_EASE_STYLE}
                className={`group inline-flex items-center gap-1.5 py-2.5 text-[14px] font-medium transition-colors duration-250 ${
                  isEventsActive || activeMenu === 'events' || hoveredNav === 'events'
                    ? 'text-white'
                    : isSolid
                      ? 'text-white/[0.7]'
                      : 'text-white/90'
                }`}
              >
                <span
                  ref={(el) => {
                    labelRefs.current.events = el;
                  }}
                  style={NAV_EASE_STYLE}
                  className="inline-block transition-transform duration-250 group-hover:-translate-y-[1.5px]"
                >
                  Events
                </span>
                <ChevronDown
                  style={NAV_EASE_STYLE}
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    activeMenu === 'events' ? 'rotate-180 text-white opacity-100' : 'opacity-70'
                  }`}
                  strokeWidth={1.75}
                />
              </button>

              <NavLink
                to="/library"
                onMouseEnter={() => {
                  setHoveredNav('library');
                  scheduleCloseMenu();
                }}
                onClick={() => {
                  if (location.pathname === '/library') scrollToTopSmooth();
                }}
                style={NAV_EASE_STYLE}
                className={({ isActive }) =>
                  `group py-2.5 text-[14px] font-medium transition-colors duration-250 ${
                    isActive || hoveredNav === 'library'
                      ? 'text-white'
                      : isSolid
                        ? 'text-white/[0.7]'
                        : 'text-white/90'
                  }`
                }
              >
                <span
                  ref={(el) => {
                    labelRefs.current.library = el;
                  }}
                  style={NAV_EASE_STYLE}
                  className="inline-block transition-transform duration-250 group-hover:-translate-y-[1.5px]"
                >
                  Library
                </span>
              </NavLink>

              <NavLink
                to="/services"
                onMouseEnter={() => {
                  setHoveredNav('services');
                  scheduleCloseMenu();
                }}
                onClick={() => {
                  if (location.pathname === '/services') scrollToTopSmooth();
                }}
                style={NAV_EASE_STYLE}
                className={({ isActive }) =>
                  `group py-2.5 text-[14px] font-medium transition-colors duration-250 ${
                    isActive || hoveredNav === 'services'
                      ? 'text-white'
                      : isSolid
                        ? 'text-white/[0.7]'
                        : 'text-white/90'
                  }`
                }
              >
                <span
                  ref={(el) => {
                    labelRefs.current.services = el;
                  }}
                  style={NAV_EASE_STYLE}
                  className="inline-block transition-transform duration-250 group-hover:-translate-y-[1.5px]"
                >
                  Services
                </span>
              </NavLink>

              {/* Label-Locked Gliding Underline */}
              <span
                aria-hidden="true"
                style={{
                  width: `${indicator.width}px`,
                  transform: `translate3d(${indicator.left}px, 0, 0)`,
                  opacity: indicator.visible ? 1 : 0,
                  transition: indicator.glide
                    ? 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), width 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease'
                    : 'opacity 200ms ease',
                }}
                className="pointer-events-none absolute left-0 bottom-0.5 h-[1.5px] rounded-full bg-white will-change-transform"
              />
            </nav>

            {/* Right: 2 Clean Sculpted Actions (Search Removed) */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setWhatsAppOpen(true)}
                className="cnx-clay-btn-primary px-4 py-2 rounded-xl text-[13.5px] font-medium"
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
                  className="cnx-clay-btn-white px-4 py-2 rounded-xl text-[13.5px] font-semibold"
                >
                  {user.signedIn ? 'Dev Parmar' : 'BuddyKid'}
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.97 }}
                      transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
                      style={{ transformOrigin: 'top right' }}
                      className="absolute right-0 mt-3 w-64 rounded-[22px] cnx-bento-popout-dark overflow-hidden z-50 p-3"
                    >
                      <div className="rounded-[14px] cnx-bento-well-dark px-3.5 py-3 mb-2.5">
                        <p className="text-xs font-semibold text-white">
                          {user.signedIn ? user.name : 'Guest session'}
                        </p>
                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                          {user.signedIn ? user.college : 'Sign in to manage squads'}
                        </p>
                      </div>

                      <div className="space-y-0.5">
                        <Link
                          to="/buddykid"
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <span>BuddyKid</span>
                          {pendingCount > 0 && (
                            <span className="text-[11px] font-semibold text-[#60A5FA]">
                              {pendingCount} pending
                            </span>
                          )}
                        </Link>

                        <Link
                          to="/feed"
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <span>Saved opportunities</span>
                          <span className="text-[11px] text-neutral-400">
                            {bookmarkedIds.length}
                          </span>
                        </Link>
                      </div>

                      <div className="mt-1.5 pt-1.5 border-t border-white/[0.08]">
                        <button
                          type="button"
                          onClick={toggleSignIn}
                          className="w-full px-3 py-2 rounded-lg text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.06] transition-colors text-left"
                        >
                          {user.signedIn ? 'Switch to guest mode' : 'Sign in as Dev Parmar'}
                        </button>
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
                className="cnx-clay-btn-primary px-3.5 py-1.5 rounded-xl text-xs font-medium"
              >
                Join WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              >
                <Menu className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </header>

        {/* Full-Width Opaque Mega-Menu */}
        <AnimatePresence>
          {activeMenu && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
                onClick={() => setActiveMenu(null)}
                className="hidden lg:block fixed inset-0 top-[68px] bg-black/65 z-30"
              />

              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
                onMouseEnter={clearHoverTimer}
                onMouseLeave={scheduleCloseMenu}
                className="hidden lg:block absolute left-0 right-0 top-[68px] bg-[#0E0E10] border-t border-white/[0.06] border-b border-white/[0.08] shadow-[0_28px_60px_-16px_rgba(0,0,0,0.88)] z-40 overflow-hidden"
              >
                <AnimatePresence initial={false} mode="wait">
                  {activeMenu === 'events' ? (
                    <motion.div
                      key="menu-events"
                      initial={{ opacity: 0, x: menuDirection * 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: menuDirection * -16 }}
                      transition={{ duration: 0.26, ease: EDITORIAL_EASE }}
                      className="max-w-[1160px] mx-auto px-8 py-10 grid grid-cols-[1fr_1fr_320px] gap-12 items-start"
                    >
                      <div>
                        <p className="text-xs font-medium text-neutral-500 mb-5">Flagships</p>
                        <div className="flex flex-col gap-3.5">
                          {EVENTS_FLAGSHIPS.map((item, idx) => renderPopLink(item, idx))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-neutral-500 mb-5">Archive</p>
                        <div className="flex flex-col gap-3.5">
                          {EVENTS_ARCHIVE.map((item, idx) => renderPopLink(item, idx))}
                        </div>
                      </div>

                      <Link
                        to="/aispark"
                        onClick={() => handleMenuLinkClick('/aispark')}
                        className="group relative rounded-2xl overflow-hidden cnx-clay-dark min-h-[210px] flex flex-col justify-end"
                      >
                        <img
                          src="/images/ai-sparks-stage.jpg"
                          alt="AI Sparks 2026 summit at Marwadi University"
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(to top, rgba(14,14,16,0.94) 12%, rgba(14,14,16,0.45) 58%, rgba(14,14,16,0.18) 100%)',
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
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu-community"
                      initial={{ opacity: 0, x: menuDirection * 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: menuDirection * -16 }}
                      transition={{ duration: 0.26, ease: EDITORIAL_EASE }}
                      className="max-w-[1160px] mx-auto px-8 py-10 grid grid-cols-[1fr_1fr_320px] gap-12 items-start"
                    >
                      <div>
                        <p className="text-xs font-medium text-neutral-500 mb-5">Explore</p>
                        <div className="flex flex-col gap-3.5">
                          {COMMUNITY_EXPLORE.map((item, idx) => renderPopLink(item, idx))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-medium text-neutral-500 mb-5">Chapters</p>
                        <div className="flex flex-col gap-3.5">
                          {COMMUNITY_CHAPTERS.map((item, idx) => renderPopLink(item, idx))}
                        </div>
                      </div>

                      <Link
                        to="/campus-ambassadors"
                        onClick={() => handleMenuLinkClick('/campus-ambassadors')}
                        className="group relative rounded-2xl overflow-hidden cnx-clay-dark min-h-[210px] flex flex-col justify-end"
                      >
                        <img
                          src="/images/ai-sparks-speaker.jpg"
                          alt="Campus Ambassador representing CodeNeuraX"
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(to top, rgba(14,14,16,0.95) 14%, rgba(14,14,16,0.48) 60%, rgba(14,14,16,0.18) 100%)',
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Slide-Over Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end p-2" role="dialog" aria-modal="true">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-[#060608]/75 backdrop-blur-[5px]"
            />
            <motion.div
              initial={{ x: '104%' }}
              animate={{ x: 0 }}
              exit={{ x: '104%' }}
              transition={{ duration: 0.36, ease: EDITORIAL_EASE }}
              className="relative z-10 w-full max-w-sm rounded-[26px] cnx-bento-popout-dark h-full flex flex-col text-white overflow-hidden"
            >
              <div className="h-[64px] px-5 flex items-center justify-between border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/codeneurax-mark.png"
                    alt="CodeNeuraX"
                    decoding="async"
                    className="w-7 h-7 object-contain"
                  />
                  <span className="font-bold text-base tracking-[-0.02em]">CodeNeuraX</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-8 h-8 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-neutral-300 hover:text-white flex items-center justify-center"
                >
                  <X className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>

              <div data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 space-y-6">
                <div>
                  <p className="text-xs font-medium text-neutral-500 mb-3">Community</p>
                  <div className="space-y-1">
                    {[
                      { label: 'Opportunity Feed', to: '/feed' },
                      { label: 'BuddyKid', to: '/buddykid' },
                      { label: 'Campus Ambassadors', to: '/campus-ambassadors' },
                      { label: 'Work With Us', to: '/work-with-us' },
                    ].map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        className="flex items-center justify-between py-2.5 text-sm font-medium text-neutral-200 hover:text-white"
                      >
                        <span>{l.label}</span>
                        <ArrowRight className="w-4 h-4 text-neutral-500" strokeWidth={1.75} />
                      </Link>
                    ))}
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
                    className="cnx-clay-btn-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0"
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
