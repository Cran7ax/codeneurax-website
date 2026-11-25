import React from 'react';
import { ArrowUpRight, Bookmark, Calendar, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { OpportunityItem } from '../../types';

interface OpportunityCardProps {
  item: OpportunityItem;
  onSelect: (item: OpportunityItem) => void;
  tone?: 'dark' | 'light';
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  item,
  onSelect,
  tone = 'dark',
}) => {
  const { bookmarkedIds, toggleBookmark } = useApp();
  const isSaved = bookmarkedIds.includes(item.id);
  const isLight = tone === 'light';

  return (
    <article
      className={`group rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 border hover:-translate-y-1 ${
        isLight
          ? 'bg-[#F4F4F6] border-[#0E0E10]/[0.08] hover:border-[#0E0E10]/[0.18]'
          : 'bg-[#16161A] border-white/[0.08] hover:border-white/[0.18]'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <span
            className={`text-xs font-semibold ${
              isLight ? 'text-[#4353FF]' : 'text-[#818CF8]'
            }`}
          >
            {item.category}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleBookmark(item.id);
            }}
            aria-label={isSaved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
            className={`p-2 rounded-lg border transition-colors active:scale-[0.96] ${
              isSaved
                ? 'border-[#4353FF]/40 bg-[#4353FF]/15 text-[#818CF8]'
                : isLight
                  ? 'border-[#0E0E10]/[0.1] bg-white text-neutral-500 hover:text-[#0E0E10]'
                  : 'border-white/[0.08] bg-[#0E0E10] text-neutral-400 hover:text-white'
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`}
              strokeWidth={1.75}
            />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onSelect(item)}
          className="text-left w-full"
        >
          <h3
            className={`text-lg font-bold tracking-[-0.02em] leading-snug transition-colors ${
              isLight
                ? 'text-[#0E0E10] group-hover:text-[#4353FF]'
                : 'text-white group-hover:text-[#818CF8]'
            }`}
          >
            {item.title}
          </h3>
        </button>

        <p
          className={`mt-1.5 text-xs font-medium ${
            isLight ? 'text-neutral-600' : 'text-neutral-400'
          }`}
        >
          {item.organization}
        </p>

        <p
          className={`mt-3 text-sm leading-relaxed line-clamp-3 ${
            isLight ? 'text-neutral-600' : 'text-neutral-400'
          }`}
        >
          {item.summary}
        </p>
      </div>

      <div
        className={`mt-6 pt-4 border-t space-y-3 ${
          isLight ? 'border-[#0E0E10]/[0.08]' : 'border-white/[0.08]'
        }`}
      >
        <p
          className={`text-[11px] font-medium ${
            isLight ? 'text-neutral-500' : 'text-neutral-400'
          }`}
        >
          {item.tags.slice(0, 3).join(', ')}
        </p>

        <div className="flex items-center justify-between gap-2 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 font-medium truncate ${
              isLight ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
            {item.deadline}
          </span>
          <button
            type="button"
            onClick={() => onSelect(item)}
            className={`inline-flex items-center gap-1 font-semibold transition-colors shrink-0 ${
              isLight
                ? 'text-[#0E0E10] hover:text-[#4353FF]'
                : 'text-white hover:text-[#818CF8]'
            }`}
          >
            Details
            <ArrowUpRight
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </button>
        </div>

        <div
          className={`flex items-center gap-1.5 text-[11px] truncate ${
            isLight ? 'text-neutral-500' : 'text-neutral-500'
          }`}
        >
          <MapPin className="w-3 h-3 shrink-0" strokeWidth={1.75} />
          <span className="truncate">{item.locationOrMode}</span>
        </div>
      </div>
    </article>
  );
};
