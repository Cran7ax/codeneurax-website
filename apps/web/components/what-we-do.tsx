import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ActivityBlock {
  category: string
  title: string
  subtitle: string
  description: string
  points: string[]
  image: string
  imageAlt: string
}

const activities: ActivityBlock[] = [
  {
    category: "Community events",
    title: "A place to learn together",
    subtitle: "Students meet to explore ideas and share interests in technology.",
    description:
      "CodeNeuraX brings students together around technology and shared learning. Event formats and schedules are announced by the community organizers.",
    points: [
      "Student-led participation",
      "Shared learning and discussion",
      "A community connected through technology",
    ],
    image: "/images/event-stage.jpg",
    imageAlt: "Students gathered at a CodeNeuraX event",
  },
  {
    category: "Shared learning",
    title: "Explore technology together",
    subtitle: "Explore technology by taking part and learning alongside peers.",
    description:
      "Students can meet around practical topics, exchange ideas, and learn together. Check the community for current activities and details.",
    points: [
      "Explore technical topics",
      "Learn through participation",
      "Share questions and ideas",
    ],
    image: "/images/event-audience.jpg",
    imageAlt: "Students attending a CodeNeuraX event",
  },
  {
    category: "Collaboration",
    title: "Ideas are better shared",
    subtitle: "Students come together to explore ideas and make things with technology.",
    description:
      "Collaborative events give students a chance to exchange perspectives and work through ideas together. Follow the community for confirmed event information.",
    points: [
      "Shared problem-solving",
      "Ideas explored as a team",
      "Technology at the center",
    ],
    image: "/images/event-felicitation.jpg",
    imageAlt: "Students attending a CodeNeuraX community session",
  },
]

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="border-t border-white/[0.08] bg-[#1B1B1B] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl space-y-14 px-4 sm:px-6 lg:px-8 lg:space-y-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-[#A3A3A3]">What we do</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#F5F5F5] sm:text-5xl">
            Learn, connect, and build with the community.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#A3A3A3]">
            CodeNeuraX brings students together around technology and shared learning. Current event details are shared by the community organizers.
          </p>
        </header>

        <div className="space-y-14 lg:space-y-20">
          {activities.map((item, index) => {
            const isEven = index % 2 === 1
            return (
              <div key={item.title} className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className={`relative overflow-hidden rounded-lg border border-white/[0.08] bg-[#101010] lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover brightness-[0.88] contrast-[1.06] transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                </div>
                <div className={`space-y-5 lg:col-span-6 lg:p-2 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#A3A3A3]">{item.category}</p>
                    <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-[#F5F5F5] sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="text-base font-medium text-[#D4D4D4]">{item.subtitle}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-[#A3A3A3] sm:text-base">{item.description}</p>
                  <ul className="space-y-2 border-t border-white/[0.08] pt-4">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-[#A3A3A3]">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="#our-team" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#F5F5F5] hover:underline">
                    <span>Connect with the community</span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
