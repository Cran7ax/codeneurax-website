import { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { useSmoothScroll } from './context/ScrollContext';
import { Layout } from './components/layout/Layout';
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

function AnimatedRoutes() {
  const location = useLocation();
  const { scrollToTopInstant, scrollToElement, syncScrollLayout } = useSmoothScroll();
  const prevPathRef = useRef(location.pathname);

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
      <AppProvider>
        <BrowserRouter>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </MotionConfig>
  );
}

export default App;
