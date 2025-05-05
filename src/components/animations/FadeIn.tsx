'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  y?: number;
  className?: string;
}

const FadeIn = ({ 
  children, 
  duration = 0.5, 
  delay = 0, 
  y = 20,
  className = '' 
}: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn; 