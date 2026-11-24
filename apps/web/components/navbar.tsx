"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from "lucide-react"
import { cn } from "@workspace/ui/lib/utils"
import { JoinButton } from "./join-button"

interface NavCategory {
  id: string
  label: string
  heading: string
  description: string
  cards: {
    title: string
    description: string
    href: string
  }[]
  featured: {
    title: string
    description: string
    image: string
    href: string
  }
}

const navCategories: Record<string, NavCategory> = {
  about: {
    id: "about",
    label: "About",
    heading: "About CodeNeuraX",
    description: "A student-led technology community associated with Marwadi University in Rajkot.",
    cards: [
      {
        title: "Who We Are",
        description: "Our student-led community.",
        href: "#who-we-are",
      },
      {
        title: "Vision & Mission",
        description: "What guides the community.",
        href: "#vision-mission",
      },
      {
        title: "Our Team",
        description: "Meet the people behind CNX.",
        href: "#our-team",
      },
    ],
    featured: {
      title: "A student community in Rajkot",
      description: "CodeNeuraX is associated with Marwadi University in Gujarat.",
      image: "/images/event-students.jpg",
      href: "#who-we-are",
    },
  },
  "what-we-do": {
    id: "what-we-do",
    label: "What We Do",
    heading: "Community activities",
    description: "Technology learning, collaboration, and shared community experiences.",
    cards: [
      {
        title: "Shared learning",
        description: "Learn through shared discussion.",
        href: "#what-we-do",
      },
      {
        title: "Collaborative learning",
        description: "Explore ideas and build together.",
        href: "#what-we-do",
      },
      {
        title: "Events and discussions",
        description: "Current activities and events.",
        href: "#what-we-do",
      },
    ],
    featured: {
      title: "Learn and build together",
      description: "Connect with students who share an interest in technology.",
      image: "/images/event-workshop.jpg",
      href: "#what-we-do",
    },
  },
  community: {
    id: "community",
    label: "Community",
    heading: "The community",
    description: "Find out how to connect with CodeNeuraX and its organizers.",
    cards: [
      {
        title: "WhatsApp community",
        description: "Connect with the CNX community.",
        href: "#why-choose-cnx",
      },
      {
        title: "Community partners",
        description: "Organizations connected with CNX.",
        href: "#community-partners",
      },
      {
        title: "Our Team",
        description: "The people behind CodeNeuraX.",
        href: "#our-team",
      },
    ],
    featured: {
      title: "Students connected through technology",
      description: "A student-led community associated with Marwadi University.",
      image: "/images/event-students.jpg",
      href: "#why-choose-cnx",
    },
  },
}

// Static derived data, computed once at module load instead of on every render
const navList = Object.values(navCategories)

// Which scroll-spy sections highlight which top-level trigger
const triggerSections: Record<string, readonly string[]> = {
  about: ["who-we-are", "vision-mission", "our-team"],
  "what-we-do": ["what-we-do"],
  community: ["why-choose-cnx", "community-partners"],
}

const spySections = [
  "who-we-are",
  "what-we-do",
  "vision-mission",
  "why-choose-cnx",
  "community-partners",
  "our-team",
] as const

const EXIT_MS = 180
const triggerBase =
  "flex min-h-11 items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 select-none"

const prefersReducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

export function Navbar() {
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string>("hero")
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  const [isPanelVisible, setIsPanelVisible] = React.useState(false)

  const panelRef = React.useRef<HTMLDivElement | null>(null)
  const mobileToggleRef = React.useRef<HTMLButtonElement | null>(null)
  const openingFrameRef = React.useRef<number | null>(null)
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const closingRef = React.useRef(false)
  const exitTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Mirror state into refs so callbacks and global listeners stay stable
  // (no re-subscribing document/window listeners on every menu change)
  const activeMenuRef = React.useRef<string | null>(null)
  const mobileOpenRef = React.useRef(false)
  activeMenuRef.current = activeMenu
  mobileOpenRef.current = mobileMenuOpen

  const cancelCloseTimeout = React.useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }, [])

  // Scroll detection: only touches state when the threshold is actually crossed
  React.useEffect(() => {
    let last: boolean | null = null
    const handleScroll = () => {
      const next = window.scrollY > 20
      if (next !== last) {
        last = next
        setIsScrolled(next)
      }
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const cancelClosing = React.useCallback(() => {
    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current)
      exitTimeoutRef.current = null
    }
    closingRef.current = false
    setIsClosing(false)
  }, [])

  const openMenu = React.useCallback((menuId: string) => {
    cancelCloseTimeout()
    cancelClosing()
    if (openingFrameRef.current) cancelAnimationFrame(openingFrameRef.current)

    if (activeMenuRef.current !== menuId) {
      setIsPanelVisible(false)
      setActiveMenu(menuId)
      openingFrameRef.current = requestAnimationFrame(() => {
        openingFrameRef.current = null
        setIsPanelVisible(true)
      })
    } else {
      setIsPanelVisible(true)
    }
  }, [cancelCloseTimeout, cancelClosing])

  // Fade the compact menu out, then unmount it after its CSS transition.
  const closeMenu = React.useCallback(() => {
    cancelCloseTimeout()
    if (activeMenuRef.current && !closingRef.current) {
      if (prefersReducedMotion()) {
        setActiveMenu(null)
        setIsPanelVisible(false)
      } else {
        closingRef.current = true
        setIsClosing(true)
        setIsPanelVisible(false)
        exitTimeoutRef.current = setTimeout(() => {
          exitTimeoutRef.current = null
          closingRef.current = false
          setIsClosing(false)
          setActiveMenu(null)
        }, EXIT_MS)
      }
    }
    setMobileMenuOpen(false)
  }, [cancelCloseTimeout])

  const scheduleClose = React.useCallback(
    (delay = 100) => {
      cancelCloseTimeout()
      closeTimeoutRef.current = setTimeout(closeMenu, delay)
    },
    [cancelCloseTimeout, closeMenu]
  )

  // Clean up transition timers and the single opening frame on unmount.
  React.useEffect(() => {
    return () => {
      if (openingFrameRef.current) cancelAnimationFrame(openingFrameRef.current)
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current)
    }
  }, [])

  // Close on Escape (single stable listener)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      const wasMobileOpen = mobileOpenRef.current
      const menuToRestore = activeMenuRef.current
      if (!wasMobileOpen && !menuToRestore) return

      closeMenu()
      requestAnimationFrame(() => {
        if (wasMobileOpen) {
          mobileToggleRef.current?.focus()
        } else if (menuToRestore) {
          document.querySelector<HTMLButtonElement>(`[data-menu-trigger="${menuToRestore}"]`)?.focus()
        }
      })
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [closeMenu])

  // Close on outside click (single stable listener, skips work when nothing is open)
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!activeMenuRef.current && !mobileOpenRef.current) return
      const nav = document.getElementById("main-nav-header")
      if (nav && !nav.contains(e.target as Node)) closeMenu()
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [closeMenu])

  // Active section scroll spy
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    )
    spySections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Hover triggers for desktop
  const handleTriggerPointerEnter = (menuId: string) => {
    openMenu(menuId)
  }

  const handleTriggerPointerLeave = () => {
    if (!panelRef.current?.contains(document.activeElement)) scheduleClose()
  }

  // Panel hover bridge
  const handlePanelMouseEnter = () => {
    cancelCloseTimeout()
    if (closingRef.current) openMenu(activeMenuRef.current ?? "about")
  }

  const handlePanelMouseLeave = () => {
    if (!panelRef.current?.contains(document.activeElement)) scheduleClose()
  }

  const handleMenuTriggerClick = (menuId: string) => {
    cancelCloseTimeout()
    if (activeMenuRef.current === menuId && !closingRef.current) {
      closeMenu()
    } else {
      openMenu(menuId)
    }
  }

  const handleLinkClick = () => {
    closeMenu()
  }

  const handleFaqClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu()
    const faqElement = document.getElementById("faq")
    if (faqElement) {
      e.preventDefault()
      faqElement.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      })
      window.history.pushState(null, "", "#faq")
    }
  }

  // Navbar appearance state: transparent at top of homepage when menu is closed; solid on scroll or when menu open
  const isSolid = isScrolled || activeMenu !== null || mobileMenuOpen
  const activeCategory = activeMenu ? navCategories[activeMenu] : undefined

  return (
    <header
      id="main-nav-header"
      className={cn(
        "fixed left-0 right-0 top-0 z-50 w-full transition-colors duration-200 ease-out motion-reduce:transition-none",
        isSolid
          ? "bg-[#050505] border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.65)]"
          : "bg-transparent border-b border-transparent shadow-none"
      )}
    >
      {/* 80px Full-Width Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* LEFT: Genuine CNX Logo & Full Wordmark (Always Far-Left) */}
        <Link
          href="/"
          onClick={handleLinkClick}
          className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg py-1 px-1"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
            <Image
              src="/images/cnx-logo.png"
              alt="CodeNeuraX Logo"
              fill
              sizes="40px"
              className="object-contain"
              priority
            />
          </div>
          <span className="font-display font-extrabold text-lg sm:text-xl text-[#F5F5F5] tracking-tight group-hover:text-white transition-colors">
            CodeNeuraX
          </span>
        </Link>

        {/* CENTRE: Text Navigation Links with Hover & Focus Accessibility */}
        <nav
          className="hidden lg:flex h-full items-center gap-1"
          aria-label="Main Navigation"
          onPointerLeave={handleTriggerPointerLeave}
        >
          {navList.map((category) => {
            const isOpen = activeMenu === category.id
            const isSpyActive = triggerSections[category.id]?.includes(activeSection)
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => handleMenuTriggerClick(category.id)}
                onPointerEnter={() => handleTriggerPointerEnter(category.id)}
                data-menu-trigger={category.id}
                id={`${category.id}-trigger`}
                aria-expanded={isOpen}
                aria-controls="megamenu-panel"
                className={cn(
                  triggerBase,
                  isOpen
                    ? "text-[#F5F5F5] bg-white/[0.08]"
                    : isSpyActive
                    ? "text-[#F5F5F5]"
                    : "text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-white/[0.04]"
                )}
              >
                <span>{category.label}</span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 text-[#8A8A8A] transition-transform duration-200",
                    isOpen ? "rotate-180 text-white" : ""
                  )}
                />
              </button>
            )
          })}

          {/* FAQ Direct Link */}
          <Link
            href="#faq"
            onClick={handleFaqClick}
            onFocus={closeMenu}
            className="px-4 py-2 text-sm font-medium text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-white/[0.04] rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 select-none"
          >
            FAQ
          </Link>
        </nav>

        {/* RIGHT: Join CodeNeuraX CTA with Reflective Sheen */}
        <div className="flex items-center gap-3">
          <JoinButton size="sm" className="hidden sm:inline-flex" />

          {/* Mobile Menu Toggle */}
          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-panel"
            className="lg:hidden min-h-11 min-w-11 p-2 text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-white/[0.06] rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 cursor-pointer motion-reduce:transition-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* FULL-WIDTH CARDNAV MEGA-MENU PANEL (Spans 100vw immediately below navbar with safe hover bridge) */}
      {activeCategory && (
        <div
          id="megamenu-panel"
          role="region"
          aria-labelledby={`${activeCategory.id}-trigger`}
          ref={panelRef}
          onMouseEnter={handlePanelMouseEnter}
          onMouseLeave={handlePanelMouseLeave}
          className={cn(
            "hidden lg:block absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-[#0A0A0A] border-b border-white/[0.08] z-40 transition-[opacity,transform] duration-[180ms] ease-out motion-reduce:transition-none",
            isClosing || !isPanelVisible ? "translate-y-[-6px] opacity-0" : "translate-y-0 opacity-100"
          )}
        >
          <div className="mx-auto max-w-7xl px-5 py-5 sm:px-7 lg:px-8 lg:py-6">
            <div className="mb-4 max-w-2xl">
              <h2 className="font-display text-sm font-semibold text-[#F5F5F5]">{activeCategory.heading}</h2>
              <p className="mt-1 text-xs leading-relaxed text-[#8A8A8A]">{activeCategory.description}</p>
            </div>

            <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:gap-6">
              <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-4">
                {activeCategory.cards.map((card, idx) => {
                  return (
                    <Link
                      key={card.title}
                      href={card.href}
                      onClick={handleLinkClick}
                      className="group/link flex min-h-16 items-start justify-between gap-3 border-b border-white/[0.08] py-3 transition-[opacity,transform,color] duration-[180ms] ease-out motion-reduce:transition-none hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      style={{
                        opacity: isPanelVisible && !isClosing ? 1 : 0,
                        transform: isPanelVisible && !isClosing ? "translateY(0)" : "translateY(10px)",
                        transitionDelay: prefersReducedMotion() ? "0ms" : `${idx * 18}ms`,
                      }}
                    >
                      <div className="min-w-0">
                        <h3 className="font-display text-sm font-semibold text-[#F5F5F5]">{card.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-[#8A8A8A]">{card.description}</p>
                      </div>
                      <ArrowRight aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#8A8A8A] transition-transform duration-200 group-hover/link:translate-x-0.5 motion-reduce:transition-none" />
                    </Link>
                  )
                })}
              </div>

              <div
                key={activeCategory.id}
                className="group/feature flex items-center gap-4 border-t border-white/[0.08] pt-4 transition-[opacity,transform] duration-[180ms] ease-out motion-reduce:transition-none sm:col-span-2 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0"
                style={{
                  opacity: isPanelVisible && !isClosing ? 1 : 0,
                  transform: isPanelVisible && !isClosing ? "translateY(0)" : "translateY(10px)",
                  transitionDelay: `${activeCategory.cards.length * 18}ms`,
                }}
              >
                <div className="relative aspect-[16/10] w-32 shrink-0 overflow-hidden rounded-md bg-[#101010] sm:w-40">
                  <Image
                    src={activeCategory.featured.image}
                    alt={activeCategory.featured.title}
                    fill
                    sizes="(min-width: 1280px) 160px, 33vw"
                    className="object-cover transition-transform duration-300 group-hover/feature:scale-[1.02] motion-reduce:transition-none"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-semibold leading-snug text-[#F5F5F5]">
                    {activeCategory.featured.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#8A8A8A]">
                    {activeCategory.featured.description}
                  </p>
                  <Link
                    href={activeCategory.featured.href}
                    onClick={handleLinkClick}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#F5F5F5] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <span>Explore</span>
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL-WIDTH MOBILE ACCORDION PANEL */}
      <nav
        id="mobile-nav-panel"
        aria-label="Mobile navigation"
        hidden={!mobileMenuOpen}
        className="lg:hidden w-full bg-[#0A0A0A] border-b border-white/[0.08] px-4 py-6 space-y-6 max-h-[80vh] overflow-y-auto"
      >
        {navList.map((group) => (
          <div key={group.id} className="space-y-2 border-b border-white/[0.06] pb-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A8A] block">
              {group.label}
            </span>
            <div className="space-y-1">
              {group.cards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  onClick={handleLinkClick}
                  className="flex min-h-11 items-center justify-between py-2 text-sm font-medium text-[#F5F5F5] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{card.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8A8A8A]" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-2">
          <Link
            href="#faq"
            onClick={handleFaqClick}
            className="flex min-h-11 items-center justify-between py-2 text-sm font-medium text-[#F5F5F5] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span>Frequently Asked Questions</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8A8A8A]" />
          </Link>
        </div>

        <div className="pt-4">
          <JoinButton size="md" className="w-full" />
        </div>
      </nav>
    </header>
  )
}

export default Navbar