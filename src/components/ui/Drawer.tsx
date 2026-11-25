import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useScrollLock } from '../../context/ScrollContext';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
}) => {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.34, ease: EDITORIAL_EASE }}
            className="relative z-10 w-full max-w-xl bg-[#16161A] border-l border-white/[0.08] h-full flex flex-col shadow-2xl text-white"
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-white/[0.08]">
              <div className="min-w-0">
                {subtitle && (
                  <p className="cnx-section-label text-[#818CF8] mb-1.5 truncate">{subtitle}</p>
                )}
                <h3 className="text-xl font-bold text-white tracking-[-0.02em] leading-snug">
                  {title}
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="p-2 rounded-lg border border-white/[0.08] bg-[#0E0E10] text-neutral-400 hover:text-white hover:border-white/[0.16] transition-colors shrink-0 active:scale-[0.96]"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
            {footer && (
              <div className="px-6 py-4 border-t border-white/[0.08] bg-[#0E0E10]">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
