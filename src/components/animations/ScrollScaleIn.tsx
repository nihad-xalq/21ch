'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface ScrollScaleInProps {
  children: ReactNode;
  duration?: number;
  className?: string;
  scale?: number;
  threshold?: number;
  rootMargin?: string;
}

const ScrollScaleIn = ({
  children,
  duration = 0.5,
  className = '',
  scale = 0.95,
  threshold = 0.1,
  rootMargin = '-50px'
}: ScrollScaleInProps) => {
  const { ref, isInView } = useInView({ threshold, rootMargin });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale }}
      animate={isInView 
        ? { opacity: 1, scale: 1 } 
        : { opacity: 0, scale }
      }
      transition={{ duration, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollScaleIn; 