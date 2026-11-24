import type { Metadata } from "next"
import { Archivo, DM_Sans } from "next/font/google"
import "@workspace/ui/globals.css"
import { cn } from "@workspace/ui/lib/utils"

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CodeNeuraX — Student-led Technology Community",
  description:
    "CodeNeuraX is a student-led technology community associated with Marwadi University in Rajkot, Gujarat.",
  icons: {
    icon: "/images/cnx-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark antialiased scroll-smooth",
        archivo.variable,
        dmSans.variable,
        "font-sans bg-[#050505] text-[#F5F5F5] selection:bg-white/20 selection:text-white"
      )}
    >
      <body className="min-h-screen bg-[#050505] text-[#F5F5F5]">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-md bg-[#F5F5F5] px-4 py-3 text-sm font-semibold text-[#050505] transition-transform focus:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
