import React from 'react';
import { motion } from 'framer-motion';

export const EDITORIAL_EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const RevealBlock: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.46, delay, ease: EDITORIAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HeroMount: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EDITORIAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
