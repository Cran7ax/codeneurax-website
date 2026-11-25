import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { AppProvider } from './context/AppContext';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { FeedPage } from './pages/FeedPage';
import { EventsPage } from './pages/EventsPage';
import { AiSparksPage } from './pages/AiSparksPage';
import { WorkWithUsPage } from './pages/WorkWithUsPage';
import { CampusAmbassadorsPage } from './pages/CampusAmbassadorsPage';
import { BuddyKidPage } from './pages/BuddyKidPage';
import { ServicesPage } from './pages/ServicesPage';
import { LibraryPage } from './pages/LibraryPage';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
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
          </Layout>
        </BrowserRouter>
      </AppProvider>
    </MotionConfig>
  );
}

export default App;
