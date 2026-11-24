import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function VisionMission() {
  return (
    <section id="vision-mission" className="border-t border-[#E5E5E5] bg-[#FFFFFF]">
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28 lg:space-y-16">
        {/* Two-Column Narrative */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-4 lg:col-span-5">
            <p className="text-sm font-medium text-[#606060]">Vision &amp; Mission</p>
            <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#171717] sm:text-5xl">
              A community rooted in technology.
            </h2>
          </div>
          <div className="space-y-5 text-sm leading-relaxed text-[#606060] sm:text-base lg:col-span-7 lg:pt-8">
            <p>
              CodeNeuraX’s approved vision and mission statements are being confirmed with the organization. The community is student-led and associated with Marwadi University in Rajkot.
            </p>
            <p>
              Official statements will be shared here once confirmed.
            </p>
          </div>
        </div>

        {/* Four static identity facts; numeric claims remain unpublished until verified. */}
        <div className="rounded-lg border border-[#E5E5E5] bg-[#EEEEEC] p-5 sm:p-7 lg:p-8">
          <div className="grid grid-cols-1 divide-y divide-[#D8D8D4] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {[
              ["Student-led", "A technology community shaped by student participation."],
              ["Technology", "A shared interest that brings the community together."],
              ["Marwadi University", "CodeNeuraX is associated with the university."],
              ["Rajkot, Gujarat", "The community is based in Rajkot."],
            ].map(([title, description]) => (
              <div key={title} className="space-y-2 py-5 first:pt-0 sm:px-5 sm:py-0 sm:first:pl-0 lg:last:pr-0">
                <h3 className="font-display text-xl font-bold text-[#171717] sm:text-2xl">
                  {title}
                </h3>
                <p className="text-sm leading-relaxed text-[#606060]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Lower Area: Wide Showcase Panel (Contrasting Deep Neutral Black #050505) */}
        <div className="grid grid-cols-1 items-end gap-6 border-t border-[#E5E5E5] pt-10 sm:grid-cols-12">
          <div className="sm:col-span-8"><p className="text-sm text-[#606060]">Community in practice</p><h3 className="mt-2 font-display text-2xl font-bold text-[#171717] sm:text-3xl">Students learning and sharing together</h3></div>
          <Link
            href="#what-we-do"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#171717] sm:col-span-4 sm:justify-self-end"
          >
            <span>Explore all initiatives</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="relative aspect-[21/9] min-h-[300px] overflow-hidden rounded-lg border border-[#E5E5E5] bg-[#EEEEEC]">
          <Image
            src="/images/event-stage.jpg"
            alt="Students gathered at a CodeNeuraX community event"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default VisionMission
