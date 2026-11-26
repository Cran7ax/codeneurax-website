import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Lenis from 'lenis';

interface ScrollContextValue {
  acquireLock: () => void;
  releaseLock: () => void;
  scrollToTopInstant: () => void;
  scrollToTopSmooth: () => void;
  scrollToElement: (id: string, offset?: number) => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  acquireLock: () => {},
  releaseLock: () => {},
  scrollToTopInstant: () => {},
  scrollToTopSmooth: () => {},
  scrollToElement: () => {},
});

const QUARTIC_OUT = (t: number) => 1 - Math.pow(1 - t, 4);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lockCount, setLockCount] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.095,
      wheelMultiplier: 0.92,
      smoothWheel: true,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lockCount > 0) {
      lenisRef.current?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lockCount]);

  const acquireLock = useCallback(() => {
    setLockCount((c) => c + 1);
  }, []);

  const releaseLock = useCallback(() => {
    setLockCount((c) => Math.max(0, c - 1));
  }, []);

  const scrollToTopInstant = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const scrollToTopSmooth = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.0, easing: QUARTIC_OUT });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const scrollToElement = useCallback((id: string, offset = -92) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset, duration: 1.15, easing: QUARTIC_OUT });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  // Intercept same-page #anchor links (e.g., "View capabilities ↓") for smooth Lenis glide
  useEffect(() => {
    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const id = href.slice(1);
      if (document.getElementById(id)) {
        e.preventDefault();
        scrollToElement(id, -88);
      }
    };
    document.addEventListener('click', onAnchorClick);
    return () => document.removeEventListener('click', onAnchorClick);
  }, [scrollToElement]);

  const value = useMemo(
    () => ({
      acquireLock,
      releaseLock,
      scrollToTopInstant,
      scrollToTopSmooth,
      scrollToElement,
    }),
    [acquireLock, releaseLock, scrollToTopInstant, scrollToTopSmooth, scrollToElement],
  );

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
};

export function useScrollLock(active: boolean): void {
  const { acquireLock, releaseLock } = useContext(ScrollContext);

  useEffect(() => {
    if (!active) return;
    acquireLock();
    return () => {
      releaseLock();
    };
  }, [active, acquireLock, releaseLock]);
}

export function useSmoothScroll() {
  return useContext(ScrollContext);
}
