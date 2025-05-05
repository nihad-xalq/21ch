'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface ScrollSlideInProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

const ScrollSlideIn = ({
  children,
  direction = 'left',
  duration = 0.5,
  className = '',
  threshold = 0.1,
  rootMargin = '-50px'
}: ScrollSlideInProps) => {
  const { ref, isInView } = useInView({ threshold, rootMargin });

  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 }
  };

  const initial = directions[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...initial }}
      animate={isInView 
        ? { opacity: 1, x: 0, y: 0 } 
        : { opacity: 0, ...initial }
      }
      transition={{ duration, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollSlideIn; 