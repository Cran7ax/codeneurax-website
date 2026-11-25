import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  tone?: 'dark' | 'light';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  description,
  action,
  tone = 'dark',
  className = '',
}) => {
  const isLight = tone === 'light';

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-6 ${className}`}
    >
      <div className="max-w-2xl">
        {label && (
          <p
            className={`cnx-section-label mb-3 ${
              isLight ? 'text-[#4353FF]' : 'text-[#818CF8]'
            }`}
          >
            {label}
          </p>
        )}
        <h2
          className={`text-[clamp(1.95rem,3.4vw,3rem)] font-bold tracking-[-0.025em] leading-[1.12] pb-2 overflow-visible ${
            isLight ? 'text-[#0E0E10]' : 'text-white'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-2 text-[15px] sm:text-base leading-relaxed max-w-xl ${
              isLight ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
