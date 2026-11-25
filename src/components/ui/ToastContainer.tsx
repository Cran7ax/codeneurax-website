import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EDITORIAL_EASE } from './MotionPrimitives';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  return (
    <div
      className="fixed bottom-5 right-5 z-[70] flex flex-col gap-2.5 w-[calc(100vw-2.5rem)] max-w-sm pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const Icon =
            toast.variant === 'success'
              ? CheckCircle2
              : toast.variant === 'warning'
                ? AlertCircle
                : Info;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
              className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-[#16161A] border border-white/[0.12] shadow-2xl"
            >
              <Icon
                className={`w-4 h-4 mt-0.5 shrink-0 ${
                  toast.variant === 'success'
                    ? 'text-[#4353FF]'
                    : toast.variant === 'warning'
                      ? 'text-[#E1498A]'
                      : 'text-neutral-400'
                }`}
                strokeWidth={1.75}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-snug">{toast.title}</p>
                {toast.description && (
                  <p className="mt-1 text-xs text-neutral-400 leading-relaxed">
                    {toast.description}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
                className="p-1 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.06] transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" strokeWidth={1.75} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
