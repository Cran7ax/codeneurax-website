import React from 'react';
import type { PartnerItem } from '../../types';

interface PartnerLogoMarkProps {
  partner: PartnerItem;
  surface?: 'light' | 'dark';
}

export const PartnerLogoMark: React.FC<PartnerLogoMarkProps> = ({
  partner,
  surface = 'dark',
}) => {
  const isWideWordmark = partner.logo?.includes('devnovate');
  const isShield = partner.logo?.includes('marwadi');
  const isCubeOrMark =
    partner.logo?.includes('tensorturn') || partner.logo?.includes('codeneurax');
  const isGfg = partner.logo?.includes('gfg');

  if (!partner.logo) {
    return (
      <span
        title={partner.name}
        className={`inline-flex items-center text-[14px] font-bold tracking-[-0.02em] transition-opacity duration-200 hover:opacity-100 shrink-0 ${
          surface === 'light' ? 'text-[#0E0E10]/80' : 'text-white/85'
        }`}
      >
        {partner.name}
      </span>
    );
  }

  if (isWideWordmark) {
    return (
      <div
        title={partner.name}
        className="inline-flex items-center opacity-90 hover:opacity-100 transition-opacity duration-200 shrink-0"
      >
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          decoding="async"
          className={`h-6 w-auto max-w-[116px] object-contain ${
            surface === 'light' ? 'invert brightness-0' : ''
          }`}
        />
      </div>
    );
  }

  if (isShield) {
    return (
      <div
        title={partner.name}
        className="inline-flex items-center opacity-95 hover:opacity-100 transition-opacity duration-200 shrink-0"
      >
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          decoding="async"
          className="h-8 w-auto max-w-[40px] object-contain"
        />
      </div>
    );
  }

  if (isCubeOrMark) {
    return (
      <div
        title={partner.name}
        className="inline-flex items-center opacity-95 hover:opacity-100 transition-opacity duration-200 shrink-0"
      >
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          decoding="async"
          className="h-7 w-7 object-contain"
        />
      </div>
    );
  }

  if (isGfg) {
    return (
      <div
        title={partner.name}
        className="inline-flex items-center opacity-95 hover:opacity-100 transition-opacity duration-200 shrink-0"
      >
        <img
          src={partner.logo}
          alt={partner.name}
          loading="lazy"
          decoding="async"
          className="h-6 w-auto max-w-[82px] object-contain"
        />
      </div>
    );
  }

  return (
    <div
      title={partner.name}
      className="inline-flex items-center opacity-90 hover:opacity-100 transition-opacity duration-200 shrink-0"
    >
      <img
        src={partner.logo}
        alt={partner.name}
        loading="lazy"
        decoding="async"
        className="h-6 w-auto max-w-[88px] object-contain"
      />
    </div>
  );
};
