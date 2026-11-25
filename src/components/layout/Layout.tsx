import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SmoothScrollProvider } from '../../context/ScrollContext';
import { EDITORIAL_EASE } from '../ui/MotionPrimitives';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { ToastContainer } from '../ui/ToastContainer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#0E0E10] text-white relative">
        <Navbar />
        <main className="flex-1">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EDITORIAL_EASE }}
          >
            {children}
          </motion.div>
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </SmoothScrollProvider>
  );
};
