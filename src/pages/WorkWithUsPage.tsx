import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Check, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREER_ROLES } from '../data/careers';
import type { CareerRole } from '../types';
import { RoleApplicationModal } from '../components/shared/RoleApplicationModal';
import { Drawer } from '../components/ui/Drawer';
import { HeroMount } from '../components/ui/MotionPrimitives';

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
    <div className="bg-white text-[#0E0E10] min-h-screen">
      {/* Dark Editorial Header */}
      <section className="cnx-midnight-hero text-white border-b border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <HeroMount className="max-w-2xl">
            <p className="cnx-section-label text-[#818CF8] mb-3">Careers &amp; Core Team</p>
            <h1 className="text-[clamp(2.35rem,4.6vw,3.9rem)] font-bold tracking-[-0.03em] text-white leading-[1.12] pb-2 overflow-visible">
              Build India&apos;s student{' '}
              <span className="font-editorial pr-1">engineering</span> infrastructure.
            </h1>
            <p className="mt-2 text-[15px] sm:text-base text-neutral-400 leading-relaxed">
              Open volunteer leadership tracks and campus ambassador cohorts. Ship real community
              tooling, design flagship summits, and lead builders on your campus.
            </p>
          </HeroMount>
        </div>
      </section>

      {/* Pure White Tabular Hairline Roles Directory */}
      <section className="py-16 bg-white text-[#0E0E10]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
            <div className="flex flex-wrap items-center gap-1.5">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setDepartment(dept)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    department === dept
                      ? 'bg-[#0E0E10] text-white'
                      : 'bg-[#F4F4F6] border border-[#0E0E10]/[0.08] text-neutral-600 hover:text-[#0E0E10]'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            <span className="text-xs font-semibold text-neutral-500">
              {filteredRoles.length} open role{filteredRoles.length === 1 ? '' : 's'}
            </span>
          </div>

          <div className="rounded-2xl border border-[#0E0E10]/[0.08] divide-y divide-[#0E0E10]/[0.08] overflow-hidden bg-white">
            <div className="hidden lg:grid grid-cols-12 gap-4 px-7 py-3.5 bg-[#F4F4F6] cnx-section-label text-neutral-500">
              <div className="col-span-5">Role &amp; Focus</div>
              <div className="col-span-2">Department</div>
              <div className="col-span-2">Type &amp; Deadline</div>
              <div className="col-span-3 text-right">Action</div>
            </div>

            {filteredRoles.map((role) => {
              const isApplied = appliedRoles.includes(role.id);
              return (
                <div
                  key={role.id}
                  className="p-6 sm:px-7 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center hover:bg-[#F4F4F6]/60 transition-colors group"
                >
                  <div className="lg:col-span-5 space-y-1.5">
                    <h2 className="text-lg font-bold text-[#0E0E10] tracking-[-0.015em] group-hover:text-[#4353FF] transition-colors">
                      {role.title}
                    </h2>
                    <p className="text-xs text-neutral-600 leading-relaxed">{role.summary}</p>
                    <p className="text-[11px] font-medium text-neutral-500 pt-0.5">
                      {role.tags.join(', ')}
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    <p className="text-xs font-semibold text-[#0E0E10]">{role.department}</p>
                    <p className="text-xs text-neutral-600 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" strokeWidth={1.75} />
                      {role.location}
                    </p>
                  </div>

                  <div className="lg:col-span-2 space-y-0.5">
                    <p className="text-xs text-neutral-600">{role.type}</p>
                    <p className="text-xs font-semibold text-[#4353FF]">
                      Apply by: {role.deadline}
                    </p>
                  </div>

                  <div className="lg:col-span-3 flex items-center lg:justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setDetailRole(role)}
                      className="px-4 py-2 rounded-lg border border-[#0E0E10]/[0.12] bg-white text-xs font-semibold text-[#0E0E10] hover:bg-[#F4F4F6] transition-colors"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => setApplyRole(role)}
                      className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-lg text-xs font-semibold transition-colors active:scale-[0.98] ${
                        isApplied
                          ? 'bg-[#EEF0FF] text-[#4353FF] border border-[#4353FF]/25'
                          : 'bg-[#0E0E10] text-white hover:bg-neutral-800'
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
          </div>
        </div>
      </section>

      <Drawer
        open={Boolean(detailRole)}
        onClose={() => setDetailRole(null)}
        subtitle={detailRole ? `${detailRole.department} · ${detailRole.type}` : ''}
        title={detailRole?.title || ''}
        footer={
          detailRole && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-neutral-400">
                Deadline: {detailRole.deadline}
              </span>
              <button
                type="button"
                onClick={() => {
                  const target = detailRole;
                  setDetailRole(null);
                  setApplyRole(target);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold"
              >
                Apply Now
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
            </div>
          )
        }
      >
        {detailRole && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-[#0E0E10] border border-white/[0.08] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500">Department</span>
                <span className="font-semibold text-white">{detailRole.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Engagement</span>
                <span className="font-medium text-neutral-300">{detailRole.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Apply By</span>
                <span className="font-semibold text-[#818CF8]">{detailRole.deadline}</span>
              </div>
            </div>

            <div>
              <p className="cnx-section-label text-neutral-500 mb-2">Role Overview</p>
              <p className="text-sm text-neutral-300 leading-relaxed">{detailRole.summary}</p>
            </div>

            <div>
              <p className="cnx-section-label text-neutral-500 mb-2.5">Responsibilities</p>
              <ul className="space-y-2 text-sm text-neutral-300">
                {detailRole.responsibilities.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4353FF] mt-0.5 shrink-0" strokeWidth={1.75} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-500 mb-2.5">Perks &amp; growth</p>
              <ul className="space-y-2 text-sm text-neutral-300 border-l border-white/[0.12] pl-3.5">
                {detailRole.perks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-medium text-neutral-500 mb-2.5">Eligibility</p>
              <ul className="space-y-2 text-sm text-neutral-300 border-l border-white/[0.12] pl-3.5">
                {detailRole.eligibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Drawer>

      <RoleApplicationModal
        open={Boolean(applyRole)}
        roleId={applyRole?.id || ''}
        roleTitle={applyRole?.title || ''}
        onClose={() => setApplyRole(null)}
      />
    </div>
  );
};
