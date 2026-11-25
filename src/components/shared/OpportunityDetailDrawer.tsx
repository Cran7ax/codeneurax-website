import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Bookmark, Calendar, Check, MapPin } from 'lucide-react';
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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/[0.12] bg-[#16161A] text-xs font-semibold text-white hover:border-white/[0.22] transition-colors active:scale-[0.97]"
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#4353FF] text-[#4353FF]' : ''}`}
              strokeWidth={1.75}
            />
            {isSaved ? 'Saved in Feed' : 'Bookmark'}
          </button>

          {isInternal ? (
            <Link
              to={item.externalUrl}
              onClick={onClose}
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold transition-colors active:scale-[0.97]"
            >
              {item.ctaLabel}
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            </Link>
          ) : (
            <a
              href={item.externalUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#4353FF] hover:bg-[#3442E6] text-white text-xs font-semibold transition-colors active:scale-[0.97]"
            >
              {item.ctaLabel}
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
            </a>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        <div className="p-4 rounded-xl bg-[#0E0E10] border border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="text-neutral-500 font-medium">Organizer</span>
            <span className="text-white font-semibold text-right">{item.organization}</span>
          </div>
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="text-neutral-500 font-medium">Location / Mode</span>
            <span className="text-neutral-300 inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} />
              {item.locationOrMode}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="text-neutral-500 font-medium">Deadline</span>
            <span className="text-white font-semibold inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#818CF8]" strokeWidth={1.75} />
              {item.deadline}
            </span>
          </div>
          {item.stipendOrPrize && (
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-neutral-500 font-medium">Reward / Compensation</span>
              <span className="text-[#818CF8] font-semibold">{item.stipendOrPrize}</span>
            </div>
          )}
        </div>

        <div>
          <p className="cnx-section-label text-neutral-500 mb-2">Overview</p>
          <p className="text-sm text-neutral-300 leading-relaxed">{item.summary}</p>
        </div>

        <div>
          <p className="cnx-section-label text-neutral-500 mb-3">Key Breakdown</p>
          <ul className="space-y-2.5">
            {item.details.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 text-sm text-neutral-300 leading-relaxed"
              >
                <Check className="w-4 h-4 text-[#4353FF] mt-0.5 shrink-0" strokeWidth={1.75} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="cnx-section-label text-neutral-500 mb-2.5">Signal Tags</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-[#0E0E10] border border-white/[0.08] text-xs font-medium text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};
