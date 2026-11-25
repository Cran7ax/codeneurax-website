import React, { useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Code2,
  Download,
  Eye,
  Search,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEETCODE_COMPANY_ROWS, LIBRARY_RESOURCES } from '../data/library';
import type { LibraryCategory, LibraryResource } from '../types';
import { Drawer } from '../components/ui/Drawer';
import { Modal } from '../components/ui/Modal';
import { HeroMount } from '../components/ui/MotionPrimitives';

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
    <div className="bg-[#0E0E10] text-white min-h-screen">
      {/* Header */}
      <section className="cnx-midnight-hero border-b border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <HeroMount className="max-w-2xl">
            <p className="cnx-section-label text-[#818CF8] mb-3">
              CodeNeuraX Econtent · Open Archive
            </p>
            <h1 className="text-[clamp(2.35rem,4.6vw,3.9rem)] font-bold tracking-[-0.03em] text-white leading-[1.12] pb-2 overflow-visible">
              CodeNeuraX <span className="font-editorial pr-1">Library</span>
            </h1>
            <p className="mt-2 text-[15px] sm:text-base text-neutral-300 leading-relaxed">
              Curated company-wise interview archives, official GATE CS &amp; DA previous year
              papers, and concise systems engineering notes—free for every student builder.
            </p>
          </HeroMount>
        </div>
      </section>

      {/* Featured Silk Spotlight Banner for Company-Wise LeetCode Questions */}
      <section className="py-10 border-b border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="rounded-2xl cnx-silk-spotlight border border-white/[0.12] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.08] border border-white/[0.14] flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5 text-white" strokeWidth={1.75} />
              </div>
              <div>
                <p className="cnx-section-label text-white/80 mb-1">
                  Featured Interactive Index
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Company-Wise LeetCode Questions (with Direct LeetCode Links)
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-white/80 max-w-2xl">
                  Filter high-frequency DSA problems across Google, Amazon, Microsoft, LinkedIn,
                  Adobe, and TCS with direct LeetCode problem URLs.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setLeetcodeModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold hover:bg-neutral-200 transition-colors shrink-0 w-fit active:scale-[0.98]"
            >
              Open Problem Table
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </section>

      {/* Search + 3 Category Tabs */}
      <section className="py-12">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="pb-6 border-b border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {LIBRARY_TABS.map((tab) => {
                const active = activeTab === tab;
                const count = LIBRARY_RESOURCES.filter((r) => r.category === tab).length;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      active
                        ? 'bg-[#4353FF] text-white'
                        : 'bg-[#16161A] border border-white/[0.08] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab} ({count})
                  </button>
                );
              })}
            </div>

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
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#16161A] border border-white/[0.08] text-xs text-white placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none"
              />
            </div>
          </div>

          {filteredResources.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredResources.map((res) => (
                <article
                  key={res.id}
                  className="rounded-2xl bg-[#16161A] border border-white/[0.08] hover:border-white/[0.16] transition-colors p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-xs font-semibold text-[#818CF8]">
                        {res.countLabel}
                      </span>
                      <span className="text-xs font-medium text-neutral-500">{res.updatedAt}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">{res.title}</h3>
                    <p className="mt-1 text-xs font-medium text-neutral-400">{res.format}</p>
                    <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {res.summary}
                    </p>

                    <p className="mt-4 text-[11px] font-medium text-neutral-400">
                      {res.tags.join(', ')}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={() => setPreviewResource(res)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/[0.1] bg-[#0E0E10] text-xs font-semibold text-white hover:border-white/[0.2]"
                    >
                      <Eye className="w-3.5 h-3.5" strokeWidth={1.75} />
                      Preview
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDownloadPack(res)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold transition-colors active:scale-[0.98]"
                    >
                      <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                      Download
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 p-10 rounded-2xl bg-[#16161A] border border-white/[0.08] text-center">
              <p className="text-sm text-neutral-400">
                No resources matched &ldquo;{searchQuery}&rdquo; in {activeTab}.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-3 px-5 py-2 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold"
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
          previewResource ? `${previewResource.category} · ${previewResource.countLabel}` : ''
        }
        title={previewResource?.title || ''}
        footer={
          previewResource && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium text-neutral-400">{previewResource.format}</span>
              <button
                type="button"
                onClick={() => handleDownloadPack(previewResource)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" strokeWidth={1.75} />
                Download Study Pack
              </button>
            </div>
          )
        }
      >
        {previewResource && (
          <div className="space-y-6">
            <div>
              <p className="cnx-section-label text-neutral-500 mb-2">Overview</p>
              <p className="text-sm text-neutral-300 leading-relaxed">{previewResource.summary}</p>
            </div>

            <div>
              <p className="cnx-section-label text-neutral-500 mb-2.5">
                Included Modules &amp; Patterns
              </p>
              <ul className="space-y-2 text-sm text-neutral-300">
                {previewResource.sampleTopics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#4353FF] mt-0.5 shrink-0" strokeWidth={1.75} />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="cnx-section-label text-neutral-500 mb-2">Excerpt / Key Checkpoint</p>
              <div className="p-4 rounded-xl bg-[#0E0E10] border border-white/[0.08] text-xs text-neutral-200 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {previewResource.previewSnippet}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0E0E10] border border-white/[0.08] flex items-center gap-3">
              <BookOpen className="w-4 h-4 text-[#4353FF] shrink-0" strokeWidth={1.75} />
              <p className="text-xs text-neutral-300">
                Pair this pack with weekly problem drills in the CodeNeuraX DSA WhatsApp group.
              </p>
            </div>
          </div>
        )}
      </Drawer>

      <Modal
        open={leetcodeModalOpen}
        onClose={() => setLeetcodeModalOpen(false)}
        subtitle="Interactive Problem Sheet · Direct Links"
        title="Company-Wise LeetCode Questions"
        maxWidthClass="max-w-4xl"
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Google', 'Amazon', 'Microsoft', 'LinkedIn', 'Adobe', 'TCS'].map((comp) => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => setLcCompanyFilter(comp)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                    lcCompanyFilter === comp
                      ? 'bg-white text-[#0E0E10] border-white'
                      : 'bg-[#0E0E10] text-neutral-300 border-white/[0.08] hover:border-white/[0.2]'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>

            <div className="flex gap-1.5">
              {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setLcDifficultyFilter(diff)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                    lcDifficultyFilter === diff
                      ? 'bg-[#4353FF] text-white border-[#4353FF]'
                      : 'bg-[#0E0E10] text-neutral-400 border-white/[0.08]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-white/[0.08] rounded-xl overflow-hidden overflow-x-auto bg-[#0E0E10]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-[#16161A] cnx-section-label text-neutral-400">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Problem</th>
                  <th className="py-3 px-4">Topic</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Companies</th>
                  <th className="py-3 px-4 text-right">Solve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.08]">
                {filteredLeetCode.map((row) => (
                  <tr key={row.id} className="hover:bg-[#16161A] transition-colors">
                    <td className="py-3 px-4 font-semibold text-neutral-500">{row.number}</td>
                    <td className="py-3 px-4 font-semibold text-white">{row.title}</td>
                    <td className="py-3 px-4 text-neutral-400">{row.topic}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs font-semibold ${
                          row.difficulty === 'Hard'
                            ? 'text-[#E1498A]'
                            : row.difficulty === 'Medium'
                              ? 'text-[#818CF8]'
                              : 'text-neutral-200'
                        }`}
                      >
                        {row.difficulty}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-neutral-300">
                      {row.companies.join(', ')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a
                        href={row.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[#818CF8] hover:text-white font-semibold"
                      >
                        LeetCode
                        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.75} />
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
