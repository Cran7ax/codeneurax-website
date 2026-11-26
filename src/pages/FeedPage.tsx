import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Bookmark, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OPPORTUNITIES } from '../data/opportunities';
import type { OpportunityCategory, OpportunityItem } from '../types';
import { OpportunityDetailDrawer } from '../components/shared/OpportunityDetailDrawer';
import { HeroMount, RevealBlock } from '../components/ui/MotionPrimitives';
import { SlidingTabs } from '../components/ui/SlidingTabs';

type FeedCategory = 'All' | 'Saved' | OpportunityCategory;

export const FeedPage: React.FC = () => {
  const { bookmarkedIds, toggleBookmark } = useApp();
  const [activeCategory, setActiveCategory] = useState<FeedCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<OpportunityItem | null>(null);

  const tabOptions = useMemo(
    () => [
      { id: 'All' as const, label: 'All' },
      { id: 'Hackathons' as const, label: 'Hackathons' },
      { id: 'Internships' as const, label: 'Internships' },
      { id: 'Workshops' as const, label: 'Workshops' },
      { id: 'Tech Updates' as const, label: 'Tech Updates' },
      { id: 'Saved' as const, label: 'Saved', count: bookmarkedIds.length },
    ],
    [bookmarkedIds.length],
  );

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
    <div className="bg-[#F3F4F8] text-[#0E0E10] min-h-screen">
      <section className="cnx-prism-hero text-white border-b border-white/[0.08]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <HeroMount className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-[clamp(2.4rem,4.8vw,3.85rem)] font-bold tracking-[-0.035em] text-white leading-[1.06]">
                Opportunity <span className="cnx-accent-gradient-dark">Feed</span>
              </h1>
              <p className="mt-3.5 text-[15px] sm:text-base text-neutral-300 leading-relaxed">
                Verified hackathons, internships, and technical briefs.
              </p>
            </div>

            <div className="flex items-center gap-8 text-sm text-neutral-400 shrink-0">
              <div>
                <span className="text-2xl font-bold text-white">{OPPORTUNITIES.length}</span>
                <span className="block text-xs mt-0.5">Active listings</span>
              </div>
              <div className="h-8 w-px bg-white/[0.12]" />
              <div>
                <span className="text-2xl font-bold text-white">{bookmarkedIds.length}</span>
                <span className="block text-xs mt-0.5">Saved locally</span>
              </div>
            </div>
          </HeroMount>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-[#F3F4F8] text-[#0E0E10]">
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="pb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <SlidingTabs
              options={tabOptions}
              value={activeCategory}
              onChange={setActiveCategory}
            />

            <div className="relative w-full lg:w-80">
              <Search
                className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                strokeWidth={1.75}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search title, organizer, or stack..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-black/[0.08] text-xs text-[#0E0E10] placeholder:text-neutral-400 focus:border-[#4353FF] focus:outline-none"
              />
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <RevealBlock className="rounded-[28px] cnx-clay-light-static overflow-hidden divide-y divide-black/[0.07]">
              {filteredItems.map((item) => {
                const isSaved = bookmarkedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedItem(item);
                      }
                    }}
                    className="group px-6 sm:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center hover:bg-white/75 transition-colors cursor-pointer"
                  >
                    <div className="lg:col-span-6 min-w-0">
                      <h2 className="text-base sm:text-[17px] font-bold tracking-[-0.015em] text-[#0E0E10] group-hover:text-[#4353FF] transition-colors">
                        {item.title}
                      </h2>
                      <p className="mt-1 text-xs sm:text-sm text-neutral-600 truncate">
                        {item.organization}
                      </p>
                      {item.stipendOrPrize && (
                        <p className="mt-1 text-xs font-medium text-neutral-500">{item.stipendOrPrize}</p>
                      )}
                    </div>

                    <div className="lg:col-span-3 flex flex-wrap lg:flex-col gap-x-3 gap-y-0.5 text-xs">
                      <span className="font-semibold text-[#4353FF]">{item.category}</span>
                      <span className="text-neutral-500 truncate">{item.locationOrMode}</span>
                    </div>

                    <div className="lg:col-span-3 flex items-center justify-between lg:justify-end gap-4">
                      <span className="text-xs font-medium text-neutral-700">{item.deadline}</span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(item.id);
                          }}
                          aria-label={
                            isSaved ? `Remove ${item.title} from saved` : `Save ${item.title}`
                          }
                          className={`p-2 rounded-xl transition-colors ${
                            isSaved
                              ? 'bg-[#EEF0FF] text-[#4353FF]'
                              : 'text-neutral-400 hover:text-[#0E0E10] hover:bg-black/[0.04]'
                          }`}
                        >
                          <Bookmark
                            className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
                            strokeWidth={1.75}
                          />
                        </button>
                        <ArrowUpRight
                          className="w-4 h-4 text-neutral-400 group-hover:text-[#4353FF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-[transform,color]"
                          strokeWidth={1.75}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </RevealBlock>
          ) : (
            <div className="mt-4 p-12 rounded-[26px] cnx-clay-light-static text-center space-y-3">
              <p className="text-lg font-bold text-[#0E0E10]">
                {activeCategory === 'Saved'
                  ? 'No saved opportunities yet'
                  : 'No matching opportunities found'}
              </p>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                {activeCategory === 'Saved'
                  ? 'Bookmark any hackathon, internship, or engineering brief to keep it here.'
                  : 'Try broadening your search keyword or resetting category filters.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setSearchQuery('');
                }}
                className="cnx-clay-btn-dark px-5 py-2.5 rounded-xl text-xs font-semibold"
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
