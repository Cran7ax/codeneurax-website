import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  tone?: 'dark' | 'light';
  align?: 'left' | 'center';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  action,
  tone = 'dark',
  align = 'left',
}) => {
  const isLight = tone === 'light';
  const isCentered = align === 'center';

  return (
    <div
      className={
        isCentered
          ? 'text-center max-w-2xl mx-auto'
          : 'flex flex-col sm:flex-row sm:items-end justify-between gap-6'
      }
    >
      <div className={isCentered ? '' : 'max-w-2xl'}>
        <h2
          className={`text-[clamp(1.95rem,3.4vw,2.85rem)] font-bold tracking-[-0.03em] leading-[1.12] ${
            isLight ? 'text-[#0E0E10]' : 'text-white'
          }`}
        >
          {title}
        </h2>
        {description && (
          <p
            className={`mt-2.5 text-sm sm:text-[15px] leading-relaxed ${
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
