import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICE_KPIS, SERVICE_OFFERINGS, SERVICE_PRINCIPLES } from '../data/services';
import type { ServiceOffering } from '../types';
import { Drawer } from '../components/ui/Drawer';
import { Modal } from '../components/ui/Modal';
import { HeroMount } from '../components/ui/MotionPrimitives';

export const ServicesPage: React.FC = () => {
  const { pushToast } = useApp();
  const [selectedService, setSelectedService] = useState<ServiceOffering | null>(null);
  const [consultOpen, setConsultOpen] = useState(false);

  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectScope, setProjectScope] = useState('AI & Automation');
  const [preferredDate, setPreferredDate] = useState('2026-12-05');
  const [brief, setBrief] = useState('');
  const [booked, setBooked] = useState(false);

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.includes('@') || brief.trim().length < 15) {
      pushToast({
        title: 'Complete consultation details',
        description: 'Enter your name, email, and at least 15 characters on project scope.',
        variant: 'warning',
      });
      return;
    }
    setBooked(true);
    pushToast({
      title: 'Consultation scheduled',
      description: `Architecture call requested for ${preferredDate} (${projectScope}).`,
      variant: 'success',
    });
  };

  return (
    <div className="bg-[#0E0E10] text-white min-h-screen">
      {/* Band 1 — Restrained Studio Hero (Pure #0E0E10, zero radial neon haze) */}
      <section className="bg-[#0E0E10] pt-28 pb-20">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <HeroMount>
            <h1 className="max-w-4xl text-[clamp(2.75rem,6vw,5rem)] font-semibold tracking-[-0.035em] text-white leading-[1.06] pb-2 overflow-visible">
              Engineering and design for{' '}
              <span className="font-editorial pr-1 font-normal">teams</span> that ship.
            </h1>

            <div className="border-t border-white/10 pt-8 mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <p className="lg:col-span-6 text-base text-neutral-400 leading-relaxed max-w-xl">
                Senior-led squads from CodeNeuraX build custom web products, AI workflow automation,
                cloud pipelines, and technical brand systems with clean handoff.
              </p>

              <div className="lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setBooked(false);
                    setConsultOpen(true);
                  }}
                  className="px-6 py-3 rounded-lg bg-white text-[#0E0E10] text-sm font-semibold hover:bg-neutral-200 transition-colors active:scale-[0.98]"
                >
                  Book a consultation
                </button>
                <a
                  href="#capabilities"
                  className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
                >
                  View capabilities ↓
                </a>
              </div>
            </div>
          </HeroMount>
        </div>
      </section>

      {/* Band 2 — Understated Typographic Proof Strip */}
      <section className="bg-[#0E0E10] border-y border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="py-10 lg:py-0 grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 lg:gap-0 lg:divide-x lg:divide-white/10">
            {SERVICE_KPIS.map((kpi) => (
              <div key={kpi.label} className="lg:py-10 lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <p className="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-white">
                  {kpi.value}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-snug">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 3 — Interactive Capabilities Ledger (Pure #FFFFFF Contrast Band) */}
      <section id="capabilities" className="scroll-mt-20 py-28 bg-white text-[#0E0E10]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sticky Left Rail */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start space-y-4">
            <h2 className="text-[clamp(2rem,3.4vw,3rem)] font-bold tracking-[-0.03em] text-[#0E0E10] leading-[1.08]">
              What we build.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              Every project runs on weekly reviewable staging sprints, direct repository access, and
              maintainable production architecture.
            </p>
          </div>

          {/* Right Interactive Ledger (Hairline-separated horizontal editorial rows) */}
          <div className="lg:col-span-8">
            {SERVICE_OFFERINGS.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => setSelectedService(service)}
                className="group w-full text-left border-t border-black/10 last:border-b py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-black/30 transition-colors"
              >
                <div className="max-w-xl">
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[#0E0E10] group-hover:text-[#4353FF] transition-colors">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-500 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <span className="text-xs sm:text-sm font-medium text-[#0E0E10] group-hover:text-[#4353FF] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5">
                  Inspect scope ↗
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Band 4 — How We Work (Calm Editorial 3-Column Strip on #F4F4F6) */}
      <section className="py-20 bg-[#F4F4F6] text-[#0E0E10] border-t border-black/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#0E0E10] mb-12">
            How we work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {SERVICE_PRINCIPLES.map((step) => (
              <div key={step.title} className="pt-6 border-t border-black/10">
                <h3 className="text-lg font-semibold tracking-[-0.015em] text-[#0E0E10]">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 5 — Clean Consultation Initiation Band (Pure #0E0E10) */}
      <section className="py-24 bg-[#0E0E10] text-white border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2rem,4vw,3.35rem)] font-bold tracking-[-0.03em] text-white leading-[1.08]">
              Have a product, workflow, or brand to build?
            </h2>
            <p className="mt-3 text-base text-neutral-400 leading-relaxed">
              Schedule a 30-minute technical scoping session or reach the engineering team directly
              at team@codeneurax.in.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setBooked(false);
              setConsultOpen(true);
            }}
            className="px-7 py-3.5 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-sm font-semibold transition-colors shrink-0 w-fit active:scale-[0.98]"
          >
            Book a free consultation
          </button>
        </div>
      </section>

      <Drawer
        open={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        subtitle={selectedService ? `Timeline: ${selectedService.timeline}` : ''}
        title={selectedService?.title || ''}
        footer={
          selectedService && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-neutral-400">
                Sprint window: {selectedService.timeline}
              </span>
              <button
                type="button"
                onClick={() => {
                  setProjectScope(selectedService.title);
                  setSelectedService(null);
                  setBooked(false);
                  setConsultOpen(true);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold"
              >
                Start a project
              </button>
            </div>
          )
        }
      >
        {selectedService && (
          <div className="space-y-7">
            <div>
              <p className="text-xs font-medium text-neutral-500 mb-2">Scope overview</p>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedService.shortDescription}
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <p className="text-xs font-medium text-neutral-500 mb-3">Concrete deliverables</p>
              <ul className="space-y-2.5 text-sm text-neutral-300">
                {selectedService.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4353FF] mt-0.5 shrink-0" strokeWidth={1.75} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <p className="text-xs font-medium text-neutral-500 mb-2">Core stack</p>
              <p className="text-sm text-neutral-200">{selectedService.stack.join(' · ')}</p>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <p className="text-xs font-medium text-neutral-500 mb-1.5">Ideal fit</p>
              <p className="text-sm text-neutral-300 leading-relaxed">{selectedService.idealFor}</p>
            </div>
          </div>
        )}
      </Drawer>

      <Modal
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
        subtitle="Architectural Scoping · 30 min"
        title="Book a Free Consultation"
      >
        {booked ? (
          <div className="py-4 space-y-4">
            <h4 className="text-base font-bold text-white">Consultation request received.</h4>
            <p className="text-sm text-neutral-300 leading-relaxed">
              A calendar invite and technical scoping worksheet for{' '}
              <strong className="text-white">{projectScope}</strong> ({preferredDate}) will be sent
              to {clientEmail}.
            </p>
            <button
              type="button"
              onClick={() => setConsultOpen(false)}
              className="px-5 py-2.5 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleBookConsultation} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Your name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Full name"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Work email
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="founder@company.com"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Service track
                </label>
                <select
                  value={projectScope}
                  onChange={(e) => setProjectScope(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                >
                  {SERVICE_OFFERINGS.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Preferred date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white focus:border-[#4353FF] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Project scope
              </label>
              <textarea
                rows={4}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Outline deliverables, target launch window, or existing architecture..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E0E10] border border-white/[0.1] text-sm text-white placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setConsultOpen(false)}
                className="px-4 py-2.5 rounded-lg border border-white/[0.1] text-xs font-medium text-neutral-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold"
              >
                Confirm booking
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};
