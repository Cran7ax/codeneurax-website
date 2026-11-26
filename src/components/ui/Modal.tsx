import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useScrollLock } from '../../context/ScrollContext';
import { EDITORIAL_EASE } from './MotionPrimitives';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidthClass?: string;
  hero?: React.ReactNode;
  hideDefaultHeader?: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  maxWidthClass = 'max-w-xl',
  hero,
  hideDefaultHeader = false,
  footer,
  children,
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
          className="fixed inset-0 z-[65] flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
            onClick={onClose}
            className="fixed inset-0 bg-[#060608]/80"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
            className={`relative z-10 w-full ${maxWidthClass} max-h-[calc(100vh-2.5rem)] flex flex-col rounded-2xl cnx-popout-shell text-white overflow-hidden`}
          >
            {hero && <div className="shrink-0 relative">{hero}</div>}

            {!hideDefaultHeader && (
              <div className="relative flex items-start justify-between gap-4 px-6 sm:px-7 pt-6 pb-5 border-b border-white/[0.08] shrink-0 cnx-prism-hero">
                <div className="min-w-0">
                  {subtitle && (
                    <p className="text-xs font-medium text-[#818CF8] mb-1 truncate">{subtitle}</p>
                  )}
                  <h3 className="text-xl sm:text-[22px] font-bold text-white tracking-[-0.025em] leading-snug">
                    {title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="w-8 h-8 rounded-lg cnx-popout-tile text-neutral-400 hover:text-white hover:border-white/[0.2] flex items-center justify-center transition-colors shrink-0 active:scale-[0.94]"
                >
                  <X className="w-4 h-4" strokeWidth={1.85} />
                </button>
              </div>
            )}

            <div className="px-6 sm:px-7 py-6 overflow-y-auto flex-1">{children}</div>

            {footer && (
              <div className="px-6 sm:px-7 py-4 border-t border-white/[0.08] bg-[#0D0D11] shrink-0">
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
