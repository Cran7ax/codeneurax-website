import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface SlidingTabOption<T extends string> {
  id: T;
  label: string;
  count?: number;
}

interface SlidingTabsProps<T extends string> {
  options: SlidingTabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  variant?: 'pill-light' | 'underline-dark';
  className?: string;
}

interface IndicatorBox {
  left: number;
  top: number;
  width: number;
  height: number;
  ready: boolean;
}

export function SlidingTabs<T extends string>({
  options,
  value,
  onChange,
  variant = 'pill-light',
  className = '',
}: SlidingTabsProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const hasMeasuredRef = useRef(false);

  const [box, setBox] = useState<IndicatorBox>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ready: false,
  });
  const [animate, setAnimate] = useState(false);

  const measure = useCallback(
    (shouldAnimate: boolean) => {
      const btn = buttonRefs.current[value];
      if (!btn) return;
      setAnimate(shouldAnimate && hasMeasuredRef.current);
      setBox({
        left: btn.offsetLeft,
        top: btn.offsetTop,
        width: btn.offsetWidth,
        height: btn.offsetHeight,
        ready: true,
      });
      hasMeasuredRef.current = true;
    },
    [value],
  );

  useLayoutEffect(() => {
    measure(true);
  }, [measure, options]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measure(false));
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  if (variant === 'underline-dark') {
    return (
      <div
        ref={containerRef}
        className={`relative flex items-center gap-7 border-b border-white/[0.1] overflow-x-auto no-scrollbar ${className}`}
      >
        {options.map((opt) => {
          const active = opt.id === value;
          return (
            <button
              key={opt.id}
              ref={(el) => {
                buttonRefs.current[opt.id] = el;
              }}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`relative pb-3.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-200 flex items-center gap-2 ${
                active ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>{opt.label}</span>
              {opt.count !== undefined && (
                <span className="text-xs font-medium text-neutral-500">{opt.count}</span>
              )}
            </button>
          );
        })}

        {box.ready && (
          <span
            aria-hidden="true"
            style={{
              width: `${box.width}px`,
              transform: `translate3d(${box.left}px, 0, 0)`,
              transition: animate
                ? 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), width 260ms cubic-bezier(0.22, 1, 0.36, 1)'
                : 'none',
            }}
            className="pointer-events-none absolute left-0 bottom-0 h-[2px] rounded-full bg-gradient-to-r from-[#60A5FA] to-[#5B6BFF] will-change-transform"
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-wrap items-center gap-1.5 ${className}`}
    >
      {box.ready && (
        <span
          aria-hidden="true"
          style={{
            width: `${box.width}px`,
            height: `${box.height}px`,
            transform: `translate3d(${box.left}px, ${box.top}px, 0)`,
            transition: animate
              ? 'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), width 260ms cubic-bezier(0.22, 1, 0.36, 1)'
              : 'none',
          }}
          className="pointer-events-none absolute left-0 top-0 rounded-xl cnx-clay-pill-fill will-change-transform"
        />
      )}

      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            ref={(el) => {
              buttonRefs.current[opt.id] = el;
            }}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`relative z-10 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors duration-200 ${
              active ? 'text-white' : 'text-neutral-600 hover:text-[#0E0E10]'
            }`}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span className="ml-1.5 opacity-80">({opt.count})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
