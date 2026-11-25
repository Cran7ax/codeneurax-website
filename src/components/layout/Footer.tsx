import React from 'react';
import { Link } from 'react-router-dom';

const FOOTER_SOCIALS = [
  { label: 'WhatsApp', href: 'https://chat.whatsapp.com/FLV7r3tU8bO4tHhS2eD42x' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/codeneurax' },
  { label: 'Instagram', href: 'https://www.instagram.com/codeneurax' },
  { label: 'Unstop', href: 'https://unstop.com' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08080A] text-white border-t border-white/[0.08] pt-16 sm:pt-20 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Top Row: Brand + Community Summary | Bare Horizontal Links */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-11 border-b border-white/[0.08]">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2.5 group">
              <img
                src="/images/codeneurax-mark.jpg"
                alt="CodeNeuraX"
                className="w-7 h-7 rounded-md object-cover border border-white/[0.12]"
              />
              <span className="text-[17px] font-bold tracking-[-0.02em] text-white">
                CodeNeuraX
              </span>
            </Link>
            <p className="mt-3.5 text-sm text-neutral-400 leading-relaxed">
              A student-led engineering collective associated with Marwadi University, Rajkot —
              built around practical software, hackathons, AI, and peer mentorship.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-1" aria-label="Community links">
            {FOOTER_SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Middle: Clean 4-Column Sitemap Matching Reference Balance */}
        <div className="py-11 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 mb-4">
              Community
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link to="/feed" className="hover:text-white transition-colors">
                  Opportunity Feed
                </Link>
              </li>
              <li>
                <Link to="/buddykid" className="hover:text-white transition-colors">
                  BuddyKid
                </Link>
              </li>
              <li>
                <Link to="/campus-ambassadors" className="hover:text-white transition-colors">
                  Campus Ambassadors
                </Link>
              </li>
              <li>
                <Link to="/work-with-us" className="hover:text-white transition-colors">
                  Work With Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 mb-4">
              Programs
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link to="/aispark" className="hover:text-white transition-colors">
                  AI Sparks ’26
                </Link>
              </li>
              <li>
                <Link to="/events#neuraknockout" className="hover:text-white transition-colors">
                  NeuraKnockout ’26
                </Link>
              </li>
              <li>
                <Link to="/events#algorush" className="hover:text-white transition-colors">
                  AlgoRush 2026
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-white transition-colors">
                  All CNX Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 mb-4">
              Platform
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Overview
                </Link>
              </li>
              <li>
                <Link to="/library" className="hover:text-white transition-colors">
                  CNX Library
                </Link>
              </li>
              <li>
                <Link to="/library" className="hover:text-white transition-colors">
                  GATE CS &amp; DA PYQs
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500 mb-4">
              Contact
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              <li>
                <a
                  href="mailto:team@codeneurax.in"
                  className="hover:text-white transition-colors"
                >
                  team@codeneurax.in
                </a>
              </li>
              <li>
                <a
                  href="https://codeneurax.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  codeneurax.in
                </a>
              </li>
              <li>
                <span className="text-neutral-400">Marwadi University</span>
              </li>
              <li>
                <span className="text-neutral-400">Rajkot, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Meta Strip */}
        <div className="py-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} CodeNeuraX. All rights reserved.</p>
          <p>Associated with Marwadi University, Rajkot, Gujarat.</p>
        </div>
      </div>

      {/* Full-Width Responsive Vector Wordmark with Atmospheric Background Image & Bottom Dissolve */}
      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-6 pb-3 sm:pb-5 pt-2 select-none">
        <svg
          viewBox="0 0 1200 185"
          className="w-full h-auto block select-none overflow-visible"
          role="img"
          aria-label="CodeNeuraX"
        >
          <defs>
            <pattern
              id="cnx-footer-hatch"
              width="7"
              height="7"
              patternTransform="rotate(-24)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="7"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
            </pattern>

            <pattern
              id="cnx-footer-photo"
              patternUnits="userSpaceOnUse"
              width="1200"
              height="185"
            >
              <image
                href="/images/ai-sparks-stage.jpg"
                x="0"
                y="-115"
                width="1200"
                height="430"
                preserveAspectRatio="xMidYMid slice"
                style={{ filter: 'grayscale(30%) contrast(1.12)' }}
              />
              <rect width="1200" height="185" fill="url(#cnx-footer-hatch)" />
            </pattern>

            <linearGradient id="cnx-footer-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.54" />
              <stop offset="52%" stopColor="white" stopOpacity="0.26" />
              <stop offset="100%" stopColor="white" stopOpacity="0.06" />
            </linearGradient>

            <mask id="cnx-wordmark-mask">
              <rect x="0" y="0" width="1200" height="185" fill="url(#cnx-footer-fade)" />
            </mask>
          </defs>

          <text
            x="600"
            y="156"
            textAnchor="middle"
            fill="url(#cnx-footer-photo)"
            mask="url(#cnx-wordmark-mask)"
            fontFamily="'Manrope', sans-serif"
            fontWeight="800"
            fontSize="178"
            letterSpacing="-6"
            textLength="1168"
            lengthAdjust="spacing"
          >
            CodeNeuraX
          </text>
        </svg>
      </div>
    </footer>
  );
};
