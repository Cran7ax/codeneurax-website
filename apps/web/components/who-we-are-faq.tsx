"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, Minus, ArrowRight, CheckCircle2 } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: "What is CodeNeuraX (CNX)?",
    answer:
      "CodeNeuraX is a student-led technology community associated with Marwadi University in Rajkot, Gujarat.",
  },
  {
    question: "Is CodeNeuraX a WhatsApp community?",
    answer:
      "Yes. WhatsApp is a way to access the CodeNeuraX community. Use the Join CodeNeuraX link to open the current invitation and follow the instructions provided by the organizers.",
  },
  {
    question: "How do I become a member and join the WhatsApp community?",
    answer:
      "CodeNeuraX is a student technology community. For current participation details, use the official community invitation and follow the organizers’ guidance.",
  },
  {
    question: "Who can participate in CodeNeuraX activities?",
    answer:
      "The community is student-led and associated with Marwadi University. Contact the organizers through the community invitation for current eligibility and participation details.",
  },
  {
    question: "What happens after joining?",
    answer:
      "The invitation and community organizers provide the latest information about participation, activities, and community guidelines.",
  },
  {
    question: "Where can I find current activities and updates?",
    answer:
      "Join the WhatsApp community to see the latest information shared by the organizers. Specific schedules and activity details are updated by the community.",
  },
]

export function WhoWeAreFAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section id="who-we-are" className="border-t border-[#E5E5E5] bg-[#F4F4F0] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-sm font-medium text-[#606060]">Who we are</p>
            <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#171717] sm:text-4xl">
              A student-led technology community.
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-[#606060] sm:text-base">
              <p>CodeNeuraX brings students together around technology, shared learning, and collaboration.</p>
              <p>The community is associated with Marwadi University in Rajkot, Gujarat. For current activities and ways to participate, connect with the organizers through the community invitation.</p>
            </div>
            <div className="space-y-2.5">
              {["Student-led", "Focused on technology and shared learning", "Connected through a WhatsApp community"].map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-medium text-[#171717]">
                  <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-[#606060]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link href="#what-we-do" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#171717] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]">
              <span>Explore what we do</span><ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div id="faq" className="scroll-mt-28 space-y-5 lg:col-span-7">
            <div className="border-b border-[#E5E5E5] pb-4">
              <p className="text-sm text-[#606060]">Common questions</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-[#171717]">Frequently Asked Questions</h3>
            </div>
            <div className="divide-y divide-[#E5E5E5]">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <div key={faq.question} className="py-2">
                    <button
                      type="button"
                      id={`faq-btn-${index}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex min-h-12 w-full items-center justify-between gap-4 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171717]"
                    >
                      <span className={`font-display text-base font-semibold sm:text-lg ${isOpen ? "text-[#171717]" : "text-[#606060]"}`}>{faq.question}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#D8D8D4] text-[#171717]">
                        {isOpen ? <Minus aria-hidden="true" className="h-4 w-4" /> : <Plus aria-hidden="true" className="h-4 w-4" />}
                      </span>
                    </button>
                    <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-btn-${index}`} aria-hidden={!isOpen} inert={!isOpen} className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="min-h-0 overflow-hidden"><p className="pb-4 pr-8 text-sm leading-relaxed text-[#606060]">{faq.answer}</p></div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex items-center justify-between gap-4 pt-2 text-sm text-[#606060]"><span>Have another question?</span><a href="https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-[#171717] hover:underline">Reach team on WhatsApp →</a></div>
          </div>
        </div>
      </div>
    </section>
  )
}
