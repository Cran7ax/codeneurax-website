import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { WhoWeAreFAQ } from "@/components/who-we-are-faq"
import { WhatWeDo } from "@/components/what-we-do"
import { VisionMission } from "@/components/vision-mission"
import { WhyChooseCNX } from "@/components/why-choose-cnx"
import { CommunityPartners } from "@/components/community-partners"
import { OurTeam } from "@/components/our-team"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex-col bg-[#050505] text-[#F5F5F5] selection:bg-white/20 selection:text-white">
      {/* Global Navigation (Interactive Mega-Menu) */}
      <Navbar />

      {/* Main Content Sections (Strictly ordered 01 to 09) */}
      <main id="main-content" tabIndex={-1} className="w-full outline-none">
        {/* 01 — Cinematic Video Hero */}
        <Hero />

        {/* 02 — Who We Are + Frequently Asked Questions */}
        <WhoWeAreFAQ />

        {/* 03 — What We Do (Alternating Editorial Rhythm) */}
        <WhatWeDo />

        {/* 04 — Our Vision & Mission (Upper Tonal Band + Lower Showcase) */}
        <VisionMission />

        {/* 05 — Why Choose CodeNeuraX (Asymmetric Information Mosaic) */}
        <WhyChooseCNX />

        {/* 06 — Community Partners */}
        <CommunityPartners />

        {/* 07 — Our Team (Bespoke Editorial Leadership Spotlight) */}
        <OurTeam />
      </main>

      {/* 08 — Structured Multi-Column Website Footer */}
      <Footer />
    </div>
  )
}
