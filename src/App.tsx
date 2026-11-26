import { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { useSmoothScroll } from './context/ScrollContext';
import { Layout } from './components/layout/Layout';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { EDITORIAL_EASE } from './components/ui/MotionPrimitives';
import { HomePage } from './pages/HomePage';
import {
  loadAiSparksPage,
  loadBuddyKidPage,
  loadCampusAmbassadorsPage,
  loadEventsPage,
  loadFeedPage,
  loadLibraryPage,
  loadServicesPage,
  loadWorkWithUsPage,
} from './routes/preload';

const FeedPage = lazy(loadFeedPage);
const EventsPage = lazy(loadEventsPage);
const AiSparksPage = lazy(loadAiSparksPage);
const WorkWithUsPage = lazy(loadWorkWithUsPage);
const CampusAmbassadorsPage = lazy(loadCampusAmbassadorsPage);
const BuddyKidPage = lazy(loadBuddyKidPage);
const ServicesPage = lazy(loadServicesPage);
const LibraryPage = lazy(loadLibraryPage);

const ROUTE_TITLES: Record<string, string> = {
  '/': 'CodeNeuraX | Student Engineering & AI Collective',
  '/feed': 'Opportunity Feed | CodeNeuraX',
  '/events': 'Events | CodeNeuraX',
  '/aispark': "AI Sparks '26 | CodeNeuraX",
  '/work-with-us': 'Work With Us | CodeNeuraX',
  '/campus-ambassadors': 'Campus Ambassadors | CodeNeuraX',
  '/buddykid': 'BuddyKid Squads | CodeNeuraX',
  '/services': 'Services | CodeNeuraX',
  '/library': 'Library | CodeNeuraX',
};

function AnimatedRoutes() {
  const location = useLocation();
  const { scrollToTopInstant, scrollToElement, syncScrollLayout } = useSmoothScroll();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    document.title = ROUTE_TITLES[location.pathname] || 'CodeNeuraX';
  }, [location.pathname]);

  useEffect(() => {
    const pathChanged = prevPathRef.current !== location.pathname;
    prevPathRef.current = location.pathname;

    if (!location.hash) return;
    const id = location.hash.slice(1);
    const delay = pathChanged ? 320 : 40;
    const timer = window.setTimeout(() => {
      scrollToElement(id, -92);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash, scrollToElement]);

  return (
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => {
        if (!location.hash) {
          scrollToTopInstant();
        }
      }}
    >
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.34, ease: EDITORIAL_EASE },
        }}
        onAnimationComplete={syncScrollLayout}
        exit={{
          opacity: 0,
          y: -5,
          transition: { duration: 0.18, ease: EDITORIAL_EASE },
        }}
      >
        <Suspense fallback={<div className="min-h-screen bg-[#0E0E10]" />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/aispark" element={<AiSparksPage />} />
            <Route path="/work-with-us" element={<WorkWithUsPage />} />
            <Route path="/campus-ambassadors" element={<CampusAmbassadorsPage />} />
            <Route path="/buddykid" element={<BuddyKidPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ErrorBoundary>
        <AppProvider>
          <BrowserRouter>
            <Layout>
              <AnimatedRoutes />
            </Layout>
          </BrowserRouter>
        </AppProvider>
      </ErrorBoundary>
    </MotionConfig>
  );
}

export default App;
