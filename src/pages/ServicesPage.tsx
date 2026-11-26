import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SERVICE_KPIS, SERVICE_OFFERINGS, SERVICE_PRINCIPLES } from '../data/services';
import type { ServiceOffering } from '../types';
import { Drawer } from '../components/ui/Drawer';
import { Modal } from '../components/ui/Modal';
import { HeroMount, RevealBlock } from '../components/ui/MotionPrimitives';

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
      {/* Band 1 — Restrained Studio Hero */}
      <section className="cnx-prism-hero pt-32 pb-20 sm:pt-36">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <HeroMount>
            <h1 className="max-w-4xl text-[clamp(2.65rem,5.6vw,4.65rem)] font-bold tracking-[-0.035em] text-white leading-[1.06]">
              Engineering and design for{' '}
              <span className="cnx-accent-gradient-dark">teams</span> that ship.
            </h1>

            <div className="border-t border-white/10 pt-8 mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <p className="lg:col-span-6 text-base text-neutral-300 leading-relaxed max-w-xl">
                Web products, AI automation, cloud infrastructure, and brand systems.
              </p>

              <div className="lg:col-span-6 flex flex-wrap items-center lg:justify-end gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setBooked(false);
                    setConsultOpen(true);
                  }}
                  className="cnx-clay-btn-white px-6 py-3 rounded-xl text-sm font-semibold"
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

      {/* Band 3 — Static "What we build" Header + Balanced 2-Column Sculpted Clay Grid */}
      <section id="capabilities" className="scroll-mt-20 py-24 sm:py-28 bg-[#F3F4F8] text-[#0E0E10]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          {/* Completely static, full-width balanced editorial header (zero sticky drift) */}
          <RevealBlock className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-12 mb-12 border-b border-black/[0.08]">
            <div className="lg:col-span-6">
              <h2 className="text-[clamp(2.1rem,3.8vw,3.15rem)] font-bold tracking-[-0.03em] text-[#0E0E10] leading-[1.08]">
                What we <span className="cnx-accent-gradient-light">build.</span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl">
                Weekly staging sprints and clean handoff. Select any track to inspect scope.
              </p>
            </div>
          </RevealBlock>

          {/* Spacious 2-Column Ceramic Clay Capabilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICE_OFFERINGS.map((service, idx) => (
              <RevealBlock key={service.id} delay={Math.min(idx * 0.04, 0.2)}>
                <button
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="group w-full h-full text-left rounded-[26px] cnx-clay-light p-7 sm:p-8 flex flex-col justify-between gap-7"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#0E0E10] group-hover:text-[#4353FF] transition-colors">
                        {service.title}
                      </h3>
                      <ArrowUpRight
                        className="w-5 h-5 text-neutral-400 group-hover:text-[#4353FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[transform,color] shrink-0 mt-1"
                        strokeWidth={1.75}
                      />
                    </div>
                    <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-black/[0.07] flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-neutral-500 font-medium">
                      {service.stack.slice(0, 3).join(' · ')}
                    </span>
                    <span className="font-semibold text-[#0E0E10] group-hover:text-[#4353FF] transition-colors shrink-0">
                      {service.timeline}
                    </span>
                  </div>
                </button>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Band 4 — How We Work (Calm 3-Column Strip) */}
      <section className="py-20 bg-[#EAECEF] text-[#0E0E10] border-t border-black/[0.08]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <RevealBlock className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#0E0E10]">
              How we <span className="cnx-accent-gradient-light">work</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICE_PRINCIPLES.map((step, idx) => (
              <RevealBlock key={step.title} delay={idx * 0.05}>
                <div className="h-full rounded-[24px] cnx-clay-light p-7">
                  <span className="text-xs font-semibold text-[#4353FF]">0{idx + 1}</span>
                  <h3 className="mt-3 text-lg font-bold tracking-[-0.015em] text-[#0E0E10]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Band 5 — Clean Consultation Initiation Band */}
      <section className="py-24 bg-[#0E0E10] text-white border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(2rem,4vw,3.35rem)] font-bold tracking-[-0.03em] text-white leading-[1.08]">
              Have a product, workflow, or brand to{' '}
              <span className="cnx-accent-gradient-dark">build</span>?
            </h2>
            <p className="mt-3 text-base text-neutral-400 leading-relaxed">
              Book a 30-minute scoping call or write to team@codeneurax.in.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setBooked(false);
              setConsultOpen(true);
            }}
            className="cnx-clay-btn-primary px-7 py-3.5 rounded-xl text-sm font-semibold shrink-0 w-fit"
          >
            Book a free consultation
          </button>
        </div>
      </section>

      <Drawer
        open={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        subtitle={selectedService ? `Sprint window · ${selectedService.timeline}` : ""}
        title={selectedService?.title || ""}
        footer={
          selectedService && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-neutral-400">
                Typical delivery: {selectedService.timeline}
              </span>
              <button
                type="button"
                onClick={() => {
                  setProjectScope(selectedService.title);
                  setSelectedService(null);
                  setBooked(false);
                  setConsultOpen(true);
                }}
                className="cnx-clay-btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold"
              >
                Start a project
              </button>
            </div>
          )
        }
      >
        {selectedService && (
          <div className="space-y-4">
            <div className="rounded-xl cnx-popout-tile p-4">
              <p className="text-[11px] font-medium text-neutral-500 mb-1.5">Overview</p>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedService.shortDescription}
              </p>
            </div>

            <div className="rounded-xl cnx-popout-tile p-4">
              <p className="text-[11px] font-medium text-neutral-500 mb-2.5">Deliverables</p>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {selectedService.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-[#60A5FA] mt-1 shrink-0" strokeWidth={2.25} />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl cnx-popout-tile p-4">
                <p className="text-[11px] font-medium text-neutral-500 mb-2">Core stack</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md bg-white/[0.05] text-[11px] font-medium text-neutral-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl cnx-popout-tile p-4">
                <p className="text-[11px] font-medium text-neutral-500 mb-1.5">Best fit</p>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {selectedService.idealFor}
                </p>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <Modal
        open={consultOpen}
        onClose={() => setConsultOpen(false)}
        subtitle="30-minute scoping call"
        title="Book a Free Consultation"
        maxWidthClass="max-w-lg"
      >
        {booked ? (
          <div className="space-y-5">
            <div className="rounded-xl cnx-popout-tile p-5 flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-4 h-4" strokeWidth={2.25} />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">Consultation scheduled</h4>
                <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                  Scoping invite for <strong className="text-white">{projectScope}</strong> (
                  {preferredDate}) queued to {clientEmail}.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setConsultOpen(false)}
                className="cnx-clay-btn-white px-5 py-2 rounded-lg text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookConsultation} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Your name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Full name"
                  className="cnx-popout-input"
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
                  className="cnx-popout-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                  Service track
                </label>
                <select
                  value={projectScope}
                  onChange={(e) => setProjectScope(e.target.value)}
                  className="cnx-popout-input"
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
                  className="cnx-popout-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-400 mb-1.5">
                Project scope
              </label>
              <textarea
                rows={3}
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Outline deliverables, target launch window, or existing stack..."
                className="cnx-popout-input resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setConsultOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cnx-clay-btn-primary px-5 py-2.5 rounded-xl text-xs font-semibold"
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
