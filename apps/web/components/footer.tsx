import Image from "next/image"
import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { GithubIcon, LinkedinIcon, YoutubeIcon } from "@/components/icons"

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#1B1B1B] text-[#A3A3A3]">
      <div className="mx-auto max-w-[1200px] px-4 pb-8 pt-12 sm:px-6 lg:px-8 lg:pb-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <div className="relative h-9 w-9"><Image src="/images/cnx-logo.png" alt="CodeNeuraX Logo" fill sizes="36px" className="object-contain" /></div>
              <div><p className="font-display text-base font-bold text-[#F5F5F5]">CodeNeuraX</p><p className="text-xs text-[#A3A3A3]">Student-led technology community</p></div>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#A3A3A3]">CodeNeuraX brings students together around technology, shared learning, and collaboration.</p>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-8">
              <nav aria-label="Community"><h2 className="mb-2.5 text-xs font-semibold text-[#F5F5F5]">Community</h2><ul className="space-y-2 text-sm"><li><Link href="#who-we-are" className="hover:text-white">Who We Are</Link></li><li><a href="https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x" target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp Community</a></li><li><Link href="#our-team" className="hover:text-white">Our team</Link></li></ul></nav>
              <nav aria-label="Programs"><h2 className="mb-2.5 text-xs font-semibold text-[#F5F5F5]">Programs</h2><ul className="space-y-2 text-sm"><li><Link href="#what-we-do" className="hover:text-white">Community activities</Link></li><li><Link href="#why-choose-cnx" className="hover:text-white">Why CodeNeuraX</Link></li><li><Link href="#community-partners" className="hover:text-white">Community association</Link></li></ul></nav>
              <nav aria-label="Organization" className="col-span-2 sm:col-span-1"><h2 className="mb-2.5 text-xs font-semibold text-[#F5F5F5]">Organization</h2><ul className="space-y-2 text-sm"><li><Link href="#vision-mission" className="hover:text-white">Vision &amp; Mission</Link></li><li><Link href="#faq" className="hover:text-white">FAQ</Link></li><li><Link href="mailto:contact@codeneurax.in" className="break-all hover:text-white sm:break-normal">Contact</Link></li></ul></nav>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-white/[0.08] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#8A8A8A]">&copy; {new Date().getFullYear()} CodeNeuraX (CNX).</p>
          <div className="flex items-center gap-2">
            {[{icon: LinkedinIcon,label:"LinkedIn",href:"https://www.linkedin.com/company/codeneurax"},{icon: YoutubeIcon,label:"YouTube",href:"https://www.youtube.com/@codeneurax"},{icon: GithubIcon,label:"GitHub",href:"https://github.com/codeneurax"},{icon: MessageCircle,label:"WhatsApp",href:"https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x"}].map(({icon:Icon,label,href}) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.08] text-[#A3A3A3] hover:bg-[#242424] hover:text-white"><Icon className="h-4 w-4" /></Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
