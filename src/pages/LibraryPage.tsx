import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Download, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEETCODE_COMPANY_ROWS, LIBRARY_RESOURCES } from '../data/library';
import type { LibraryCategory, LibraryResource } from '../types';
import { Drawer } from '../components/ui/Drawer';
import { Modal } from '../components/ui/Modal';
import { HeroMount, RevealBlock } from '../components/ui/MotionPrimitives';
import { SlidingTabs } from '../components/ui/SlidingTabs';

const LIBRARY_TABS: LibraryCategory[] = [
  'Previous Year Questions',
  'Notes',
  'Problem Statements',
];

export const LibraryPage: React.FC = () => {
  const { pushToast } = useApp();
  const [activeTab, setActiveTab] = useState<LibraryCategory>('Previous Year Questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewResource, setPreviewResource] = useState<LibraryResource | null>(null);
  const [leetcodeModalOpen, setLeetcodeModalOpen] = useState(false);
  const [lcCompanyFilter, setLcCompanyFilter] = useState<string>('All');
  const [lcDifficultyFilter, setLcDifficultyFilter] = useState<string>('All');

  const filteredResources = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return LIBRARY_RESOURCES.filter((res) => {
      const tabMatch = res.category === activeTab;
      const qMatch =
        !q ||
        res.title.toLowerCase().includes(q) ||
        res.summary.toLowerCase().includes(q) ||
        res.tags.some((t) => t.toLowerCase().includes(q));
      return tabMatch && qMatch;
    });
  }, [activeTab, searchQuery]);

  const filteredLeetCode = useMemo(() => {
    return LEETCODE_COMPANY_ROWS.filter((row) => {
      const compOk =
        lcCompanyFilter === 'All' || row.companies.includes(lcCompanyFilter);
      const diffOk =
        lcDifficultyFilter === 'All' || row.difficulty === lcDifficultyFilter;
      return compOk && diffOk;
    });
  }, [lcCompanyFilter, lcDifficultyFilter]);

  const handleDownloadPack = (res: LibraryResource) => {
    const content = [
      `# ${res.title}`,
      `Category: ${res.category} | Volume: ${res.countLabel}`,
      `Format: ${res.format} | Updated: ${res.updatedAt}`,
      ``,
      `## Overview`,
      res.summary,
      ``,
      `## Core Modules & Topics`,
      ...res.sampleTopics.map((t) => `- ${t}`),
      ``,
      `## Technical Checkpoint`,
      res.previewSnippet,
      ``,
      `Curated by CodeNeuraX Library — https://codeneurax.in/library`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${res.id}.md`;
    a.click();
    URL.revokeObjectURL(url);

    pushToast({
      title: `Downloaded ${res.title}`,
      description: `${res.countLabel} study reference saved locally.`,
      variant: 'success',
    });
  };

  return (
    <div className="bg-[#F3F4F8] text-[#0E0E10] min-h-screen">
      {/* Clean Prism Hero + Sleek LeetCode Index Bar */}
      <section className="cnx-prism-hero text-white border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20 space-y-10">
          <HeroMount className="max-w-2xl">
            <h1 className="text-[clamp(2.35rem,4.6vw,3.75rem)] font-bold tracking-[-0.035em] text-white leading-[1.08]">
              CodeNeuraX <span className="cnx-accent-gradient-dark">Library</span>
            </h1>
            <p className="mt-3.5 text-[15px] sm:text-base text-neutral-300 leading-relaxed">
              Company DSA sheets, GATE archives, and concise systems notes.
            </p>
          </HeroMount>

          <RevealBlock className="rounded-[26px] cnx-prism-surface p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Company-Wise LeetCode Problem Index
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-white/75 max-w-2xl">
                Direct LeetCode links filtered by company and difficulty.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setLeetcodeModalOpen(true)}
              className="cnx-clay-btn-white inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold shrink-0 w-fit"
            >
              Open Problem Table
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </RevealBlock>
        </div>
      </section>

      {/* Porcelain Ceramic Clay Archive — Spacious 2-Column Editorial Index */}
      <section className="py-16 sm:py-20 bg-[#F3F4F8] text-[#0E0E10]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="pb-6 border-b border-black/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <SlidingTabs
              value={activeTab}
              onChange={setActiveTab}
              options={LIBRARY_TABS.map((tab) => ({
                id: tab,
                label: tab,
                count: LIBRARY_RESOURCES.filter((r) => r.category === tab).length,
              }))}
            />

            <div className="relative w-full lg:w-80">
              <Search
                className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                strokeWidth={1.75}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search company, GATE, OS, DBMS..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs text-[#0E0E10] placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none"
              />
            </div>
          </div>

          {filteredResources.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredResources.map((res, idx) => (
                <RevealBlock key={res.id} delay={Math.min(idx * 0.03, 0.18)}>
                  <article className="h-full rounded-[26px] cnx-clay-light p-7 flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-[#0E0E10] tracking-[-0.02em]">
                            {res.title}
                          </h3>
                          <p className="mt-1 text-xs font-medium text-[#4353FF]">
                            {res.countLabel} · <span className="text-neutral-500">{res.format}</span>
                          </p>
                        </div>
                        <span className="text-xs text-neutral-500 shrink-0">{res.updatedAt}</span>
                      </div>

                      
                    </div>

                    <div className="pt-4 border-t border-black/[0.07] flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-neutral-500">
                        {res.tags.slice(0, 3).join(' · ')}
                      </span>

                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setPreviewResource(res)}
                          className="text-xs font-semibold text-neutral-600 hover:text-[#0E0E10] transition-colors"
                        >
                          Preview
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadPack(res)}
                          className="cnx-clay-btn-primary inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
                        >
                          <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                          Download
                        </button>
                      </div>
                    </div>
                  </article>
                </RevealBlock>
              ))}
            </div>
          ) : (
            <div className="mt-8 p-10 rounded-[26px] cnx-clay-light-static text-center">
              <p className="text-sm text-neutral-600">
                No resources matched &ldquo;{searchQuery}&rdquo; in {activeTab}.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="cnx-clay-btn-dark mt-3 px-5 py-2 rounded-xl text-xs font-semibold"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      <Drawer
        open={Boolean(previewResource)}
        onClose={() => setPreviewResource(null)}
        subtitle={
          previewResource ? `${previewResource.category} · ${previewResource.countLabel}` : ""
        }
        title={previewResource?.title || ""}
        footer={
          previewResource && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold text-neutral-600">
                {previewResource.format}
              </span>
              <button
                type="button"
                onClick={() => handleDownloadPack(previewResource)}
                className="cnx-clay-btn-primary inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" strokeWidth={1.85} />
                <span>Download pack</span>
              </button>
            </div>
          )
        }
      >
        {previewResource && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[18px] cnx-bento-accent p-4">
                  <p className="text-[11px] font-medium text-white/75">Volume</p>
                  <p className="mt-1.5 text-sm font-bold text-white">
                    {previewResource.countLabel}
                  </p>
                </div>

                <div className="rounded-[18px] cnx-bento-tile p-4">
                  <p className="text-[11px] font-semibold text-neutral-500">Updated</p>
                  <p className="mt-1.5 text-sm font-bold text-[#0E111B]">
                    {previewResource.updatedAt}
                  </p>
                </div>
              </div>

              <div className="flex-1 rounded-[18px] cnx-bento-tile p-4">
                <p className="text-[11px] font-semibold text-neutral-500 mb-1.5">Overview</p>
                <p className="text-[13px] text-neutral-700 leading-relaxed">
                  {previewResource.summary}
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="rounded-[18px] cnx-bento-tile p-4 sm:p-5">
                <p className="text-[11px] font-semibold text-neutral-500 mb-2">Included modules</p>
                <ul className="divide-y divide-black/[0.07] text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
                  {previewResource.sampleTopics.map((topic) => (
                    <li key={topic} className="py-2 first:pt-0 last:pb-0">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1 rounded-[16px] bg-[#141620] text-neutral-200 p-4 space-y-1.5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.5)]">
                <p className="text-[11px] font-medium text-neutral-400">Technical checkpoint</p>
                <pre className="font-mono text-[11.5px] text-neutral-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {previewResource.previewSnippet}
                </pre>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      <Modal
        open={leetcodeModalOpen}
        onClose={() => setLeetcodeModalOpen(false)}
        subtitle="Direct LeetCode problem links"
        title="Company-Wise LeetCode Sheet"
        maxWidthClass="max-w-4xl"
      >
        <div className="space-y-3.5">
          <div className="rounded-[16px] cnx-bento-well p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5">
              {["All", "Google", "Amazon", "Microsoft", "LinkedIn", "Adobe", "TCS"].map((comp) => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => setLcCompanyFilter(comp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    lcCompanyFilter === comp
                      ? "cnx-clay-btn-dark"
                      : "text-neutral-600 hover:text-[#0E111B] hover:bg-white/60"
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>

            <div className="flex gap-1.5">
              {["All", "Easy", "Medium", "Hard"].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setLcDifficultyFilter(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    lcDifficultyFilter === diff
                      ? "cnx-clay-btn-primary"
                      : "text-neutral-600 hover:text-[#0E111B] hover:bg-white/60"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div
            data-lenis-prevent
            className="rounded-[18px] cnx-bento-tile overflow-auto max-h-[52vh] overscroll-contain"
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead className="sticky top-0 z-10 bg-[#DFE4F0]">
                <tr className="border-b border-black/[0.06] text-neutral-500 font-semibold">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-4">Topic</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Companies</th>
                  <th className="py-3 px-4 text-right">Solve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.05]">
                {filteredLeetCode.map((row) => (
                  <tr key={row.id} className="hover:bg-[#E2E7F4] transition-colors">
                    <td className="py-2.5 px-4 font-semibold text-neutral-500">{row.number}</td>
                    <td className="py-2.5 px-4 font-bold text-[#0E111B]">{row.title}</td>
                    <td className="py-2.5 px-4 text-neutral-600">{row.topic}</td>
                    <td className="py-2.5 px-4">
                      <span
                        className={`text-xs font-semibold ${
                          row.difficulty === "Hard"
                            ? "text-[#E1498A]"
                            : row.difficulty === "Medium"
                              ? "text-[#4353FF]"
                              : "text-emerald-600"
                        }`}
                      >
                        {row.difficulty}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-xs text-neutral-600">
                      {row.companies.join(", ")}
                    </td>
                    <td className="py-2.5 px-4 text-right">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#4353FF] hover:text-[#0E111B] font-semibold transition-colors"
                      >
                        <span>LeetCode</span>
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.85} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Modal>
    </div>
  );
};
