import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CornerDownLeft, Search } from 'lucide-react';
import { useScrollLock } from '../../context/ScrollContext';
import { COMPLETED_EVENTS, UPCOMING_EVENTS } from '../../data/events';
import { LIBRARY_RESOURCES } from '../../data/library';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface CommandItem {
  id: string;
  label: string;
  group: 'Pages' | 'Events' | 'Library';
  meta: string;
  to: string;
}

const STATIC_PAGES: CommandItem[] = [
  { id: 'pg-home', label: 'Home', group: 'Pages', meta: 'Overview', to: '/' },
  { id: 'pg-feed', label: 'Opportunity Feed', group: 'Pages', meta: 'Hackathons & internships', to: '/feed' },
  { id: 'pg-buddykid', label: 'BuddyKid Squad Finder', group: 'Pages', meta: 'Find teammates', to: '/buddykid' },
  { id: 'pg-events', label: 'CNX Events', group: 'Pages', meta: 'Sessions & archive', to: '/events' },
  { id: 'pg-aispark', label: 'AI Sparks ’26', group: 'Pages', meta: 'Flagship summit', to: '/aispark' },
  { id: 'pg-library', label: 'CodeNeuraX Library', group: 'Pages', meta: 'DSA & GATE packs', to: '/library' },
  { id: 'pg-ambassadors', label: 'Campus Ambassadors', group: 'Pages', meta: '8 college chapters', to: '/campus-ambassadors' },
  { id: 'pg-careers', label: 'Work With Us', group: 'Pages', meta: 'Open roles', to: '/work-with-us' },
  { id: 'pg-services', label: 'Services Studio', group: 'Pages', meta: 'Engineering & design', to: '/services' },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useScrollLock(open);

  const allItems = useMemo<CommandItem[]>(() => {
    const eventItems: CommandItem[] = [...UPCOMING_EVENTS, ...COMPLETED_EVENTS.slice(0, 4)].map(
      (evt) => ({
        id: `cmd-${evt.id}`,
        label: evt.title,
        group: 'Events',
        meta: evt.date,
        to:
          evt.internalRoute === '/aispark'
            ? '/aispark'
            : evt.id === 'evt-neuraknockout-2026'
              ? '/events#neuraknockout'
              : evt.id === 'evt-algorush-2026'
                ? '/events#algorush'
                : '/events',
      }),
    );

    const libraryItems: CommandItem[] = LIBRARY_RESOURCES.slice(0, 6).map((res) => ({
      id: `cmd-${res.id}`,
      label: res.title,
      group: 'Library',
      meta: res.countLabel,
      to: '/library',
    }));

    return [...STATIC_PAGES, ...eventItems, ...libraryItems];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return STATIC_PAGES;
    return allItems
      .filter(
        (item) =>
          item.label.toLowerCase().includes(q) ||
          item.meta.toLowerCase().includes(q) ||
          item.group.toLowerCase().includes(q),
      )
      .slice(0, 9);
  }, [query, allItems]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setSelectedIndex(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0,
        );
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        navigate(filtered[selectedIndex].to);
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, filtered, selectedIndex, navigate, onClose]);

  const handleSelect = (item: CommandItem) => {
    navigate(item.to);
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center pt-[13vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Quick navigation"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#060608]/80"
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
            className="relative z-10 w-full max-w-lg rounded-2xl cnx-popout-shell text-white overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.08]">
              <Search className="w-4 h-4 text-neutral-400 shrink-0" strokeWidth={1.75} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a page, event, or DSA pack..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none"
              />
              <kbd className="text-[11px] font-medium text-neutral-400 px-2 py-0.5 rounded-md cnx-popout-tile">
                ESC
              </kbd>
            </div>

            <div className="max-h-[340px] overflow-y-auto p-2">
              {filtered.length > 0 ? (
                filtered.map((item, idx) => {
                  const active = idx === selectedIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => handleSelect(item)}
                      className={`w-full px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-4 text-left transition-colors ${
                        active
                          ? 'bg-white/[0.08] text-white'
                          : 'text-neutral-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{item.label}</p>
                        <p className="text-[11px] text-neutral-500 truncate">
                          {item.group} · {item.meta}
                        </p>
                      </div>
                      {active ? (
                        <CornerDownLeft className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" strokeWidth={2} />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 shrink-0" strokeWidth={1.75} />
                      )}
                    </button>
                  );
                })
              ) : (
                <p className="px-4 py-8 text-center text-xs text-neutral-500">
                  No matches for &ldquo;{query}&rdquo;
                </p>
              )}
            </div>

            <div className="px-5 py-2.5 border-t border-white/[0.08] bg-[#0C0D11] flex items-center justify-between text-[11px] text-neutral-500">
              <span>Use ↑ ↓ to navigate</span>
              <span>↵ to open</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
