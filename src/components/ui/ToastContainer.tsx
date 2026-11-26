import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  return (
    <div
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] flex flex-col items-center gap-2.5 w-[calc(100vw-2rem)] max-w-[400px] pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {toasts.map((toast) => {
          const isSuccess = toast.variant === 'success';
          const isWarning = toast.variant === 'warning';

          const Icon = isSuccess ? Check : isWarning ? AlertCircle : Info;
          const badgeClass = isSuccess
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-400/25'
            : isWarning
              ? 'bg-rose-500/15 text-rose-400 border border-rose-400/25'
              : 'bg-[#4353FF]/18 text-[#818CF8] border border-[#60A5FA]/25';

          const barClass = isSuccess
            ? 'bg-emerald-400/80'
            : isWarning
              ? 'bg-rose-400/80'
              : 'bg-gradient-to-r from-[#60A5FA] to-[#5B6BFF]';

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              className="pointer-events-auto relative w-full overflow-hidden rounded-xl cnx-popout-shell text-white"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${badgeClass}`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={2.25} />
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-white leading-snug tracking-[-0.01em] truncate">
                    {toast.title}
                  </p>
                  {toast.description && (
                    <p className="mt-0.5 text-[12px] text-neutral-400 leading-snug line-clamp-2">
                      {toast.description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  aria-label="Dismiss notification"
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-white/[0.08] transition-colors shrink-0"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </div>

              <motion.span
                aria-hidden="true"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 4.1, ease: 'linear' }}
                className={`block h-[2px] w-full origin-left ${barClass}`}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
