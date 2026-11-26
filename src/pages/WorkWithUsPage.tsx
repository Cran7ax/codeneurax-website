import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_ROLES } from '../data/careers';
import type { CareerRole } from '../types';
import { RoleApplicationModal } from '../components/shared/RoleApplicationModal';
import { Drawer } from '../components/ui/Drawer';
import { HeroMount, RevealBlock } from '../components/ui/MotionPrimitives';
import { SlidingTabs } from '../components/ui/SlidingTabs';

type DeptFilter = 'All' | CareerRole['department'];

export const WorkWithUsPage: React.FC = () => {
  const { appliedRoles } = useApp();
  const [department, setDepartment] = useState<DeptFilter>('All');
  const [detailRole, setDetailRole] = useState<CareerRole | null>(null);
  const [applyRole, setApplyRole] = useState<CareerRole | null>(null);

  const departments: DeptFilter[] = ['All', 'Community', 'Engineering', 'Design', 'Content'];

  const filteredRoles = useMemo(() => {
    if (department === 'All') return CAREER_ROLES;
    return CAREER_ROLES.filter((r) => r.department === department);
  }, [department]);

  return (
    <div className="bg-[#F3F4F8] text-[#0E0E10] min-h-screen">
      {/* Clean Typographic Prism Hero */}
      <section className="cnx-prism-hero text-white border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <HeroMount className="max-w-2xl">
            <h1 className="text-[clamp(2.35rem,4.6vw,3.75rem)] font-bold tracking-[-0.035em] text-white leading-[1.08]">
              Build India&apos;s student{' '}
              <span className="cnx-accent-gradient-dark">engineering</span> infrastructure.
            </h1>
            <p className="mt-3.5 text-[15px] sm:text-base text-neutral-300 leading-relaxed">
              Open core team tracks and campus ambassador roles.
            </p>
          </HeroMount>
        </div>
      </section>

      {/* Porcelain Ceramic Clay Open Roles Directory */}
      <section className="py-20 bg-[#F3F4F8] text-[#0E0E10]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
            <SlidingTabs
              value={department}
              onChange={setDepartment}
              options={departments.map((d) => ({ id: d, label: d }))}
            />

            <span className="text-xs font-semibold text-neutral-500">
              {filteredRoles.length} open role{filteredRoles.length === 1 ? '' : 's'}
            </span>
          </div>

          <RevealBlock className="rounded-[28px] cnx-clay-light-static divide-y divide-black/[0.07] overflow-hidden">
            {filteredRoles.map((role) => {
              const isApplied = appliedRoles.includes(role.id);
              return (
                <div
                  key={role.id}
                  className="p-6 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center hover:bg-white/75 transition-colors group"
                >
                  <div className="lg:col-span-5 space-y-1.5">
                    <h2 className="text-lg font-bold text-[#0E0E10] tracking-[-0.015em] group-hover:text-[#4353FF] transition-colors">
                      {role.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {role.summary}
                    </p>
                    
                  </div>

                  <div className="lg:col-span-2 text-xs">
                    <p className="font-semibold text-[#0E0E10]">{role.department}</p>
                    <p className="text-neutral-500 mt-0.5">{role.location}</p>
                  </div>

                  <div className="lg:col-span-2 text-xs space-y-0.5">
                    <p className="text-neutral-600">{role.type}</p>
                    <p className="font-semibold text-[#4353FF]">By {role.deadline}</p>
                  </div>

                  <div className="lg:col-span-3 flex items-center lg:justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setDetailRole(role)}
                      className="text-xs font-semibold text-neutral-600 hover:text-[#0E0E10] transition-colors"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setApplyRole(role)}
                      className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold ${
                        isApplied
                          ? 'bg-[#EEF0FF] text-[#4353FF] border border-[#4353FF]/25'
                          : 'cnx-clay-btn-dark'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" strokeWidth={1.75} />
                          Applied
                        </>
                      ) : (
                        <>
                          Apply Now
                          <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </RevealBlock>
        </div>
      </section>

      <Drawer
        open={Boolean(detailRole)}
        onClose={() => setDetailRole(null)}
        subtitle={detailRole ? `${detailRole.department} · ${detailRole.type}` : ""}
        title={detailRole?.title || ""}
        footer={
          detailRole && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-neutral-400">
                Apply by {detailRole.deadline}
              </span>
              <button
                type="button"
                onClick={() => {
                  const target = detailRole;
                  setDetailRole(null);
                  setApplyRole(target);
                }}
                className="cnx-clay-btn-primary inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold"
              >
                Apply Now
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
            </div>
          )
        }
      >
        {detailRole && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-xl cnx-popout-tile p-3.5">
                <p className="text-[11px] font-medium text-neutral-500">Department</p>
                <p className="mt-1 text-xs font-semibold text-white">{detailRole.department}</p>
              </div>
              <div className="rounded-xl cnx-popout-tile p-3.5">
                <p className="text-[11px] font-medium text-neutral-500">Type</p>
                <p className="mt-1 text-xs font-medium text-neutral-300">{detailRole.type}</p>
              </div>
              <div className="rounded-xl cnx-popout-tile p-3.5">
                <p className="text-[11px] font-medium text-neutral-500">Deadline</p>
                <p className="mt-1 text-xs font-semibold text-[#60A5FA]">{detailRole.deadline}</p>
              </div>
            </div>

            <div className="rounded-xl cnx-popout-tile p-4">
              <p className="text-[11px] font-medium text-neutral-500 mb-1.5">Overview</p>
              <p className="text-sm text-neutral-300 leading-relaxed">{detailRole.summary}</p>
            </div>

            <div className="rounded-xl cnx-popout-tile p-4">
              <p className="text-[11px] font-medium text-neutral-500 mb-2.5">Responsibilities</p>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                {detailRole.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-[#60A5FA] mt-1 shrink-0" strokeWidth={2.25} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl cnx-popout-tile p-4">
                <p className="text-[11px] font-medium text-neutral-500 mb-2">Perks</p>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {detailRole.perks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl cnx-popout-tile p-4">
                <p className="text-[11px] font-medium text-neutral-500 mb-2">Eligibility</p>
                <ul className="space-y-1.5 text-xs text-neutral-300">
                  {detailRole.eligibility.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <RoleApplicationModal
        open={Boolean(applyRole)}
        roleId={applyRole?.id || ""}
        roleTitle={applyRole?.title || ""}
        onClose={() => setApplyRole(null)}
      />
    </div>
  );
};
