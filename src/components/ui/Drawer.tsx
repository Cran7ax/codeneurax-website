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
  maxWidthClass?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  subtitle,
  maxWidthClass = 'max-w-[860px]',
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
        <div
          className="fixed inset-0 z-[65] flex items-center justify-center p-3 sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
            onClick={onClose}
            className="fixed inset-0 bg-[#07080F]/72 backdrop-blur-[7px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
            className={`relative z-10 w-full ${maxWidthClass} max-h-[calc(100vh-2rem)] rounded-[24px] cnx-bento-popout text-[#0E111B] flex flex-col overflow-hidden`}
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 shrink-0">
              <div className="min-w-0">
                {subtitle && (
                  <p className="text-xs font-semibold text-[#3242D6] mb-0.5 truncate">{subtitle}</p>
                )}
                <h3 className="text-lg sm:text-xl font-bold text-[#0E111B] tracking-[-0.025em] leading-snug">
                  {title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close panel"
                className="w-8 h-8 rounded-[11px] cnx-bento-close flex items-center justify-center shrink-0"
              >
                <X className="w-4 h-4" strokeWidth={2} />
              </button>
            </div>

            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain px-6 pb-5"
            >
              {children}
            </div>

            {footer && (
              <div className="px-6 py-3.5 border-t border-black/[0.08] bg-[#C6CDE0]/45 shrink-0">
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
