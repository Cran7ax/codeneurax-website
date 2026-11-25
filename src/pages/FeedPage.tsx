import React, { useMemo, useState } from 'react';
import { Bookmark, Search, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OPPORTUNITIES } from '../data/opportunities';
import type { OpportunityCategory, OpportunityItem } from '../types';
import { OpportunityCard } from '../components/shared/OpportunityCard';
import { OpportunityDetailDrawer } from '../components/shared/OpportunityDetailDrawer';
import { HeroMount } from '../components/ui/MotionPrimitives';

const CATEGORIES: Array<'All' | 'Saved' | OpportunityCategory> = [
  'All',
  'Hackathons',
  'Internships',
  'Workshops',
  'Tech Updates',
  'Saved',
];

export const FeedPage: React.FC = () => {
  const { bookmarkedIds } = useApp();
  const [activeCategory, setActiveCategory] = useState<'All' | 'Saved' | OpportunityCategory>(
    'All',
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<OpportunityItem | null>(null);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return OPPORTUNITIES.filter((item) => {
      const catMatch =
        activeCategory === 'All'
          ? true
          : activeCategory === 'Saved'
            ? bookmarkedIds.includes(item.id)
            : item.category === activeCategory;

      const qMatch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.organization.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return catMatch && qMatch;
    });
  }, [activeCategory, searchQuery, bookmarkedIds]);

  return (
    <div className="bg-[#0E0E10] text-white min-h-screen">
      {/* Header */}
      <section className="cnx-midnight-hero border-b border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
          <HeroMount className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="cnx-section-label text-[#818CF8] mb-3">Opportunity Feed</p>
              <h1 className="text-[clamp(2.35rem,4.6vw,3.9rem)] font-bold tracking-[-0.03em] text-white leading-[1.12] pb-2 overflow-visible">
                High-signal engineering{' '}
                <span className="font-editorial pr-1">opportunities</span>.
              </h1>
              <p className="mt-2 text-[15px] sm:text-base text-neutral-400 leading-relaxed">
                Search verified hackathons, coding contests (AlgoRush 2026, NeuraKnockout 2026,
                SIH prep), paid student internships, and practical AI tooling briefs.
              </p>
            </div>

            <div className="flex items-center gap-6 border-l border-white/[0.1] pl-6 shrink-0">
              <div>
                <p className="text-xs text-neutral-400 font-medium">Open listings</p>
                <p className="text-2xl font-bold text-white">{OPPORTUNITIES.length} total</p>
              </div>
              <div className="h-9 w-px bg-white/[0.08]" />
              <div>
                <p className="text-xs text-neutral-400 font-medium">Saved</p>
                <p className="text-2xl font-bold text-white flex items-center gap-1.5">
                  <Bookmark className="w-4 h-4 text-[#4353FF] fill-[#4353FF]" strokeWidth={1.75} />
                  {bookmarkedIds.length}
                </p>
              </div>
            </div>
          </HeroMount>
        </div>
      </section>

      {/* Filter Toolbar & Grid */}
      <section className="py-12">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="pb-6 border-b border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#4353FF] text-white'
                        : 'bg-[#16161A] text-neutral-400 hover:text-white border border-white/[0.08]'
                    }`}
                  >
                    {category}
                    {category === 'Saved' && (
                      <span className="ml-1.5 opacity-80">({bookmarkedIds.length})</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search
                  className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                  strokeWidth={1.75}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by title, organization, or skill tag..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#16161A] border border-white/[0.08] text-xs text-white placeholder:text-neutral-500 focus:border-[#4353FF] focus:outline-none"
                />
              </div>
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-neutral-400 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5" strokeWidth={1.75} />
                {filteredItems.length} shown
              </div>
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => (
                <OpportunityCard key={item.id} item={item} onSelect={setSelectedItem} />
              ))}
            </div>
          ) : (
            <div className="mt-10 p-12 rounded-2xl bg-[#16161A] border border-white/[0.08] text-center space-y-3">
              <p className="text-lg font-bold text-white">
                {activeCategory === 'Saved'
                  ? 'No saved opportunities yet'
                  : 'No matching opportunities found'}
              </p>
              <p className="text-sm text-neutral-400 max-w-md mx-auto">
                {activeCategory === 'Saved'
                  ? 'Bookmark any hackathon, internship, or engineering brief to persist it locally.'
                  : 'Try broadening your search keyword or resetting category filters.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 rounded-lg bg-white text-[#0E0E10] text-xs font-semibold"
              >
                Show all listings
              </button>
            </div>
          )}
        </div>
      </section>

      <OpportunityDetailDrawer item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
};
