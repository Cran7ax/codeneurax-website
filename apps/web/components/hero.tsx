"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Pause, Play } from "lucide-react"
import { JoinButton } from "./join-button"

export function Hero() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isPaused, setIsPaused] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handlePreferenceChange = () => {
      setIsPaused(mediaQuery.matches)
    }

    handlePreferenceChange()
    mediaQuery.addEventListener("change", handlePreferenceChange)
    return () => mediaQuery.removeEventListener("change", handlePreferenceChange)
  }, [])

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0]?.isIntersecting ?? false),
      { threshold: 0.05 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPaused || !isVisible) {
      video.pause()
    } else {
      void video.play().catch(() => setIsPaused(true))
    }
  }, [isPaused, isVisible])

  return (
    <section className="relative w-full min-h-screen flex flex-col lg:block overflow-hidden bg-[#050505]">
      {/* Background Video Montage — On mobile: top half block; On desktop: absolute full-viewport with presenter in upper-right */}
      <div className="relative w-full h-[42vh] min-h-[280px] sm:h-[46vh] lg:h-full lg:absolute lg:inset-0 z-0 overflow-hidden bg-[#050505] shrink-0">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
          className="w-full h-full object-cover object-[center_28%] lg:object-[center_30%] brightness-[0.92] contrast-[1.04]"
        >
          <source src="/video/cnx-hero.webm" type="video/webm" />
          <source src="/video/cnx-hero.mp4" type="video/mp4" />
        </video>

        {/* Directional scrims for seamless transition to pure black */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent lg:hidden pointer-events-none z-10" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#050505]/40 to-transparent pointer-events-none z-10" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none z-10" />
        <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-label={isPaused ? "Play background video" : "Pause background video"}
          className="absolute bottom-4 right-4 z-20 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/20 bg-[#050505]/70 text-white backdrop-blur-sm transition-colors hover:bg-[#171717] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {isPaused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
        </button>
      </div>

      {/* Hero Content Group — Strictly in bottom-left negative space with ZERO card wrapper */}
      <div className="relative z-20 flex-1 flex flex-col justify-end px-5 sm:px-8 pb-9 pt-5 lg:absolute lg:left-[clamp(28px,4.5vw,76px)] lg:bottom-[clamp(42px,7vh,88px)] lg:max-w-[410px] lg:px-0 lg:pb-0 lg:pt-0 space-y-4 text-left pointer-events-auto">
        {/* Subtle Typographic Eyebrow */}
        <span className="text-xs font-mono uppercase tracking-wider text-[#A3A3A3] font-medium block">
          Student-led technology community · Rajkot, Gujarat
        </span>

        {/* Major Editorial Headline in Archivo */}
        <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[54px] tracking-tight text-[#F5F5F5] leading-[1.04]">
          Students building with technology.
        </h1>

        {/* Concise Supporting Description in DM Sans */}
        <p className="text-sm sm:text-base text-[#A3A3A3] leading-relaxed font-sans font-normal max-w-md">
          CodeNeuraX is a student-led technology community associated with Marwadi University. It brings students together to learn, collaborate, and explore technology.
        </p>

        {/* Primary CTA (White Sheen) + Text-Only Secondary Link */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <JoinButton size="lg" />

          <Link
            href="#who-we-are"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors py-2 px-1 group"
          >
            <span>Explore initiatives</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#8A8A8A] group-hover:translate-x-0.5 group-hover:text-white transition-all" />
          </Link>
        </div>

        {/* Verified location and community format, without unsubstantiated metrics */}
        <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8A8A8A]">
          <span>Student-led</span>
          <span aria-hidden="true">·</span>
          <span>Marwadi University</span>
          <span aria-hidden="true">·</span>
          <span>WhatsApp community</span>
        </div>
      </div>
    </section>
  )
}

export default Hero
