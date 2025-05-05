'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface ScrollFadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  y?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

const ScrollFadeIn = ({ 
  children, 
  duration = 0.5,
  delay = 0,
  y = 20,
  className = '',
  threshold = 0.1,
  rootMargin = '-50px'
}: ScrollFadeInProps) => {
  const { ref, isInView } = useInView({ threshold, rootMargin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn; 