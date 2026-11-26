import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import type { OpportunityItem } from '../../types';
import { Drawer } from '../ui/Drawer';

interface OpportunityDetailDrawerProps {
  item: OpportunityItem | null;
  onClose: () => void;
}

export const OpportunityDetailDrawer: React.FC<OpportunityDetailDrawerProps> = ({
  item,
  onClose,
}) => {
  const { bookmarkedIds, toggleBookmark } = useApp();
  if (!item) return null;

  const isSaved = bookmarkedIds.includes(item.id);
  const isInternal = item.externalUrl.startsWith('/');

  return (
    <Drawer
      open={Boolean(item)}
      onClose={onClose}
      subtitle={`${item.category} · ${item.deadline}`}
      title={item.title}
      footer={
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => toggleBookmark(item.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-colors ${
              isSaved
                ? 'bg-[#4353FF]/18 border-[#60A5FA]/35 text-[#818CF8]'
                : 'cnx-popout-tile text-neutral-300 hover:text-white'
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`}
              strokeWidth={1.75}
            />
            {isSaved ? 'Saved' : 'Save'}
          </button>

          {isInternal ? (
            <Link
              to={item.externalUrl}
              onClick={onClose}
              className="group cnx-clay-btn-primary inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold"
            >
              {item.ctaLabel}
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          ) : (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="group cnx-clay-btn-primary inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold"
            >
              {item.ctaLabel}
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          )}
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl cnx-popout-tile p-3.5">
            <p className="text-[11px] font-medium text-neutral-500">Organizer</p>
            <p className="mt-1 text-xs font-semibold text-white leading-snug">
              {item.organization}
            </p>
          </div>
          <div className="rounded-xl cnx-popout-tile p-3.5">
            <p className="text-[11px] font-medium text-neutral-500">Deadline</p>
            <p className="mt-1 text-xs font-semibold text-white">{item.deadline}</p>
          </div>
          <div className="rounded-xl cnx-popout-tile p-3.5">
            <p className="text-[11px] font-medium text-neutral-500">Mode</p>
            <p className="mt-1 text-xs font-medium text-neutral-300">{item.locationOrMode}</p>
          </div>
          {item.stipendOrPrize && (
            <div className="rounded-xl cnx-popout-tile p-3.5">
              <p className="text-[11px] font-medium text-neutral-500">Reward</p>
              <p className="mt-1 text-xs font-semibold text-[#60A5FA]">{item.stipendOrPrize}</p>
            </div>
          )}
        </div>

        <div className="rounded-xl cnx-popout-tile p-4">
          <p className="text-[11px] font-medium text-neutral-500 mb-1.5">Overview</p>
          <p className="text-sm text-neutral-300 leading-relaxed">{item.summary}</p>
        </div>

        <div className="rounded-xl cnx-popout-tile p-4">
          <p className="text-[11px] font-medium text-neutral-500 mb-2.5">Key details</p>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            {item.details.map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check className="w-3.5 h-3.5 text-[#60A5FA] mt-1 shrink-0" strokeWidth={2.25} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg cnx-popout-tile text-[11px] font-medium text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Drawer>
  );
};
