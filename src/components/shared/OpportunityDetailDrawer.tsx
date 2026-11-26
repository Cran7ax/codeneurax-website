import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

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
            className="cnx-bento-btn-muted px-4 py-2 rounded-xl text-xs font-semibold"
          >
            {isSaved ? 'Saved' : 'Save'}
          </button>

          {isInternal ? (
            <Link
              to={item.externalUrl}
              onClick={onClose}
              className="group cnx-clay-btn-primary inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold"
            >
              <span>{item.ctaLabel}</span>
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
              className="group cnx-clay-btn-primary inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-semibold"
            >
              <span>{item.ctaLabel}</span>
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          )}
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* Left Column (5 cols): Focal Reward Tile + Meta + Tags */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[18px] cnx-bento-accent p-4 flex flex-col justify-between">
              <p className="text-[11px] font-medium text-white/75">
                {item.stipendOrPrize ? 'Reward' : 'Track'}
              </p>
              <p className="mt-2 text-xs sm:text-sm font-bold text-white leading-snug">
                {item.stipendOrPrize || item.category}
              </p>
            </div>

            <div className="rounded-[18px] cnx-bento-tile p-4 flex flex-col justify-between">
              <p className="text-[11px] font-semibold text-neutral-500">Deadline</p>
              <p className="mt-2 text-xs sm:text-sm font-bold text-[#0E111B]">{item.deadline}</p>
            </div>
          </div>

          <div className="flex-1 rounded-[18px] cnx-bento-tile p-4 flex flex-col justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold text-neutral-500">Organizer</p>
              <p className="mt-1 text-xs font-bold text-[#0E111B] leading-snug">
                {item.organization}
              </p>
            </div>
            <div className="pt-2.5 border-t border-black/[0.07]">
              <p className="text-[11px] font-semibold text-neutral-500">Format</p>
              <p className="mt-0.5 text-xs font-medium text-neutral-700">{item.locationOrMode}</p>
            </div>
          </div>

          <div className="rounded-xl cnx-bento-well px-3.5 py-2.5 text-xs font-medium text-neutral-700">
            {item.tags.join('  ·  ')}
          </div>
        </div>

        {/* Right Column (7 cols): Overview + Clean Hairline Details */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="rounded-[18px] cnx-bento-tile p-4 sm:p-5">
            <p className="text-[11px] font-semibold text-neutral-500 mb-1.5">Overview</p>
            <p className="text-[13.5px] text-neutral-700 leading-relaxed">{item.summary}</p>
          </div>

          <div className="flex-1 rounded-[18px] cnx-bento-tile p-4 sm:p-5">
            <p className="text-[11px] font-semibold text-neutral-500 mb-2">Key details</p>
            <ul className="divide-y divide-black/[0.07] text-xs sm:text-[13px] text-neutral-700 leading-relaxed">
              {item.details.map((line) => (
                <li key={line} className="py-2 first:pt-0 last:pb-0">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
