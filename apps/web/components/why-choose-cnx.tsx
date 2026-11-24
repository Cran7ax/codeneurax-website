import Image from "next/image"

const block = "relative overflow-hidden rounded-lg border border-white/[0.08]"

export function WhyChooseCNX() {
  return (
    <section id="why-choose-cnx" className="border-t border-white/[0.08] bg-[#050505] py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] space-y-9 px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-[#A3A3A3]">The student experience</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-tight text-[#F5F5F5] sm:text-4xl">
            Why Student Engineers Choose CodeNeuraX.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#A3A3A3] sm:text-base">
            Community, practical learning, and technical growth in one student-led space.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[180px_160px_170px]">
          <article className={`${block} min-h-[260px] bg-[#101010] sm:min-h-0 lg:col-span-7 lg:row-start-1`}>
            <Image
              src="/images/event-stage.jpg"
              alt="Students gathered at a CodeNeuraX event"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[center_42%] brightness-[0.72]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/35 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-[68%] flex-col justify-center p-5 sm:p-6">
              <p className="text-sm text-white/70">Community</p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-white">
                Cross-campus student community
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Students connect through technology, shared learning, and collaboration.
              </p>
            </div>
          </article>

          <article className={`${block} min-h-[200px] bg-[#1B1B1B] p-5 sm:min-h-0 lg:col-span-5 lg:row-start-1`}>
            <p className="text-sm text-[#A3A3A3]">Hackathons</p>
            <h3 className="mt-3 max-w-[17rem] font-display text-xl font-bold leading-snug text-[#F5F5F5]">
              Hackathons and real-world building
            </h3>
            <p className="mt-3 max-w-[21rem] text-sm leading-relaxed text-[#A3A3A3]">
              Explore ideas through practical teamwork and collaborative problem-solving.
            </p>
            <Image
              src="/images/event-workshop.jpg"
              alt="Students taking part in a community workshop"
              width={220}
              height={150}
              className="absolute bottom-0 right-0 h-28 w-40 object-cover object-center opacity-75 sm:h-32 sm:w-44"
            />
          </article>

          <article className={`${block} min-h-[160px] bg-[#101010] p-5 lg:col-span-4 lg:row-start-2`}>
            <p className="text-sm text-[#A3A3A3]">Emerging technology</p>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug text-[#F5F5F5]">
              AI and emerging technology
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
              Community learning around the technologies shaping modern engineering.
            </p>
          </article>

          <article className={`${block} min-h-[160px] bg-[#242424] p-5 lg:col-span-4 lg:row-start-2`}>
            <p className="text-sm text-[#A3A3A3]">Peer learning</p>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug text-[#F5F5F5]">
              Senior peer mentorship
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
              Questions, ideas, and experience shared with one another.
            </p>
          </article>

          <article className={`${block} min-h-[160px] bg-[#101010] p-5 lg:col-span-4 lg:row-start-2`}>
            <p className="text-sm text-[#A3A3A3]">Access</p>
            <h3 className="mt-3 font-display text-lg font-bold leading-snug text-[#F5F5F5]">
              Open, volunteer-driven community
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#A3A3A3]">
              A student-led community connected through a WhatsApp invitation.
            </p>
          </article>

          <article className={`${block} min-h-[170px] bg-[#1B1B1B] p-5 lg:col-span-5 lg:row-start-3`}>
            <p className="text-sm text-[#A3A3A3]">Career growth</p>
            <h3 className="mt-3 max-w-[20rem] font-display text-xl font-bold leading-snug text-[#F5F5F5]">
              Technical growth and career preparation
            </h3>
            <p className="mt-3 max-w-[24rem] text-sm leading-relaxed text-[#A3A3A3]">
              Connect interests in engineering, projects, and technical learning.
            </p>
          </article>

          <article className={`${block} min-h-[170px] bg-[#101010] lg:col-span-7 lg:row-start-3`}>
            <Image
              src="/images/ai-sparks-banner.webp"
              alt="CNX community event visual"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[center_38%] brightness-[0.68]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/35 to-transparent" />
            <div className="absolute inset-y-0 left-0 flex max-w-[70%] flex-col justify-center p-5">
              <p className="text-sm text-white/70">Events</p>
              <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white">
                Events, knowledge sharing and collaboration
              </h3>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseCNX
