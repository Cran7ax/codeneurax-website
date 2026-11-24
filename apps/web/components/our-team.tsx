interface TeamProfile { name: string; role: string; initials: string }

const team: TeamProfile[] = [
  { name: "Dinesh Yadav", role: "Founder", initials: "DY" },
  { name: "Mitali Desai", role: "Convener", initials: "MD" },
  { name: "Isha Thaker", role: "Content Head", initials: "IT" },
  { name: "Prachi Doshi", role: "Host & Content Creator", initials: "PD" },
  { name: "Divya Thakur", role: "Video Editor", initials: "DT" },
]

export function OurTeam() {
  return (
    <section id="our-team" className="border-t border-[#E5E5E5] bg-[#FFFFFF] py-20 sm:py-24">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-2xl">
          <p className="text-sm text-[#606060]">Our team</p>
          <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-[#171717] sm:text-4xl">
            The people behind CodeNeuraX.
          </h2>
        </header>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((person) => (
            <article key={person.name} className="flex min-h-52 flex-col items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#EEEEEC] px-6 py-8 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#D8D8D4] bg-[#FFFFFF] font-display text-xl font-bold text-[#171717]" aria-label={`${person.name} initials`}>
                {person.initials}
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#171717]">{person.name}</h3>
              <p className="mt-1 text-sm text-[#606060]">{person.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
