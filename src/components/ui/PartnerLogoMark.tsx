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
  const isShield = partner.logo?.includes('marwadi');
  const isWideWordmark = partner.logo?.includes('devnovate');
  const isSquare = partner.logo?.includes('tensorturn');

  if (!partner.logo) {
    return (
      <div
        title={partner.name}
        className={`h-8 px-2.5 rounded-lg flex items-center justify-center font-bold text-[11px] tracking-tight shrink-0 ${
          surface === 'light'
            ? 'bg-[#0E0E10] text-white'
            : 'bg-white/[0.08] text-white border border-white/[0.12]'
        }`}
      >
        {partner.name}
      </div>
    );
  }

  if (isWideWordmark) {
    return (
      <div
        title={partner.name}
        className={`h-8 px-2.5 rounded-lg flex items-center justify-center shrink-0 ${
          surface === 'light'
            ? 'bg-[#0E0E10]'
            : 'bg-white/[0.06] border border-white/[0.1]'
        }`}
      >
        <img
          src={partner.logo}
          alt={partner.name}
          className="h-3.5 w-auto max-w-[78px] object-contain"
        />
      </div>
    );
  }

  if (isShield) {
    return (
      <div
        title={partner.name}
        className={`w-8 h-8 rounded-lg flex items-center justify-center p-1 shrink-0 ${
          surface === 'light'
            ? 'bg-[#F4F4F6] border border-[#0E0E10]/[0.08]'
            : 'bg-white/[0.08] border border-white/[0.1]'
        }`}
      >
        <img
          src={partner.logo}
          alt={partner.name}
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  if (isSquare) {
    return (
      <div
        title={partner.name}
        className="w-8 h-8 rounded-lg bg-[#0E0E10] border border-white/[0.1] flex items-center justify-center p-1 shrink-0 overflow-hidden"
      >
        <img
          src={partner.logo}
          alt={partner.name}
          className="w-full h-full object-contain rounded-[4px]"
        />
      </div>
    );
  }

  return (
    <div
      title={partner.name}
      className="h-8 px-2 rounded-lg bg-[#0E0E10] border border-white/[0.1] flex items-center justify-center shrink-0"
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="h-4.5 w-auto max-w-[64px] object-contain"
      />
    </div>
  );
};
