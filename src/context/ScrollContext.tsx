import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

interface ScrollContextValue {
  acquireLock: () => void;
  releaseLock: () => void;
}

const ScrollContext = createContext<ScrollContextValue>({
  acquireLock: () => {},
  releaseLock: () => {},
});

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname, hash } = useLocation();
  const lenisRef = useRef<Lenis | null>(null);
  const [lockCount, setLockCount] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
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
    if (hash) {
      const id = hash.slice(1);
      window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -92 });
          } else {
            const top = el.getBoundingClientRect().top + window.scrollY - 92;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }
      }, 80);
      return;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

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

  return (
    <ScrollContext.Provider value={{ acquireLock, releaseLock }}>
      {children}
    </ScrollContext.Provider>
  );
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
