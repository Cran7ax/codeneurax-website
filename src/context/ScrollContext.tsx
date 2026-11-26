import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

interface ScrollContextValue {
  acquireLock: () => void;
  releaseLock: () => void;
  scrollToTopInstant: () => void;
  scrollToTopSmooth: () => void;
  scrollToElement: (id: string, offset?: number) => void;
  syncScrollLayout: () => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  acquireLock: () => {},
  releaseLock: () => {},
  scrollToTopInstant: () => {},
  scrollToTopSmooth: () => {},
  scrollToElement: () => {},
  syncScrollLayout: () => {},
});

const QUARTIC_OUT = (t: number) => 1 - Math.pow(1 - t, 4);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const rafIdRef = useRef<number>(0);
  const resizeRafRef = useRef<number>(0);
  const lockedRef = useRef<boolean>(false);
  const [lockCount, setLockCount] = useState(0);

  const stopRaf = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = 0;
    }
  }, []);

  const startRaf = useCallback(() => {
    if (rafIdRef.current || lockedRef.current || document.hidden || !lenisRef.current) return;
    const tick = (time: number) => {
      lenisRef.current?.raf(time);
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);
  }, []);

  const syncScrollLayout = useCallback(() => {
    if (resizeRafRef.current) return;
    resizeRafRef.current = requestAnimationFrame(() => {
      resizeRafRef.current = 0;
      lenisRef.current?.resize();
    });
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.085,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.15,
      smoothWheel: true,
      syncTouch: false,
      autoResize: true,
    });
    lenisRef.current = lenis;
    startRaf();

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopRaf();
      } else if (!lockedRef.current) {
        lenis.resize();
        startRaf();
      }
    };

    // Observe main content height changes from route switches, tabs, filters, and accordions
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => syncScrollLayout());
      const mainEl = document.getElementById('cnx-main-content');
      if (mainEl) ro.observe(mainEl);
      ro.observe(document.body);
    }

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      ro?.disconnect();
      if (resizeRafRef.current) {
        cancelAnimationFrame(resizeRafRef.current);
        resizeRafRef.current = 0;
      }
      stopRaf();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [startRaf, stopRaf, syncScrollLayout]);

  // Keep Lenis scroll limits synchronized after every route change
  useEffect(() => {
    syncScrollLayout();
    const t1 = window.setTimeout(syncScrollLayout, 180);
    const t2 = window.setTimeout(syncScrollLayout, 450);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname, syncScrollLayout]);

  useEffect(() => {
    const isLocked = lockCount > 0;
    lockedRef.current = isLocked;

    if (isLocked) {
      lenisRef.current?.stop();
      stopRaf();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
      syncScrollLayout();
      startRaf();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [lockCount, startRaf, stopRaf, syncScrollLayout]);

  const acquireLock = useCallback(() => {
    setLockCount((c) => c + 1);
  }, []);

  const releaseLock = useCallback(() => {
    setLockCount((c) => Math.max(0, c - 1));
  }, []);

  const scrollToTopInstant = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true, force: true });
      lenisRef.current.resize();
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const scrollToTopSmooth = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 0.95, easing: QUARTIC_OUT });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const scrollToElement = useCallback((id: string, offset = -92) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.resize();
      lenisRef.current.scrollTo(el, { offset, duration: 1.05, easing: QUARTIC_OUT });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

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
      syncScrollLayout,
    }),
    [
      acquireLock,
      releaseLock,
      scrollToTopInstant,
      scrollToTopSmooth,
      scrollToElement,
      syncScrollLayout,
    ],
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
