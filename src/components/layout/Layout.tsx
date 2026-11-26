import React from 'react';
import { SmoothScrollProvider } from '../../context/ScrollContext';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { ToastContainer } from '../ui/ToastContainer';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen flex flex-col bg-[#0E0E10] text-white relative">
        <Navbar />
        <main id="cnx-main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </SmoothScrollProvider>
  );
};
