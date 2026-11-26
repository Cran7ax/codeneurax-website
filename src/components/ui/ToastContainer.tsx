import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Check, Info, X } from 'lucide-react';
import { useToasts } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToasts();

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] flex flex-col items-center gap-2.5 px-4 pointer-events-none"
      aria-live="polite"
    >
      <AnimatePresence initial={false} mode="popLayout">
        {toasts.map((toast) => {
          const isSuccess = toast.variant === 'success';
          const isWarning = toast.variant === 'warning';

          const Icon = isSuccess ? Check : isWarning ? AlertCircle : Info;
          const orbStyle: React.CSSProperties = isSuccess
            ? {
                background: 'linear-gradient(145deg, #34D399 0%, #059669 100%)',
                boxShadow:
                  'inset 0 1.5px 2px rgba(255,255,255,0.45), inset 0 -3px 5px rgba(4,90,62,0.55), 0 4px 12px rgba(16,185,129,0.4)',
              }
            : isWarning
              ? {
                  background: 'linear-gradient(145deg, #FB7185 0%, #E11D48 100%)',
                  boxShadow:
                    'inset 0 1.5px 2px rgba(255,255,255,0.45), inset 0 -3px 5px rgba(136,19,55,0.55), 0 4px 12px rgba(244,63,94,0.4)',
                }
              : {
                  background: 'linear-gradient(145deg, #60A5FA 0%, #4353FF 100%)',
                  boxShadow:
                    'inset 0 1.5px 2px rgba(255,255,255,0.45), inset 0 -3px 5px rgba(26,35,140,0.55), 0 4px 12px rgba(67,83,255,0.42)',
                };

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 20, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 440, damping: 30 }}
              style={{
                background:
                  'linear-gradient(155deg, rgba(24,27,38,0.92) 0%, rgba(12,13,19,0.95) 100%)',
                backdropFilter: 'blur(24px) saturate(185%)',
                WebkitBackdropFilter: 'blur(24px) saturate(185%)',
              }}
              className="pointer-events-auto cnx-toast-liquid-clay relative overflow-hidden rounded-[22px] pl-3 pr-3.5 py-2.5 flex items-center gap-3.5 max-w-[92vw] sm:max-w-[430px] text-white"
            >
              {/* Liquid-glass top specular streak */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />

              {/* Sculpted 3D Clay Status Orb */}
              <span
                style={orbStyle}
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white"
              >
                <Icon className="w-4 h-4" strokeWidth={2.5} />
              </span>

              <div className="min-w-0 pr-1">
                <p className="text-[13.5px] font-semibold text-white leading-tight tracking-[-0.01em] truncate">
                  {toast.title}
                </p>
                {toast.description && (
                  <p className="mt-0.5 text-[12px] text-white/70 leading-snug truncate">
                    {toast.description}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                aria-label="Dismiss notification"
                className="w-7 h-7 rounded-full bg-white/[0.08] hover:bg-white/[0.16] text-white/65 hover:text-white flex items-center justify-center transition-colors shrink-0 active:scale-[0.92]"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2.2} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
