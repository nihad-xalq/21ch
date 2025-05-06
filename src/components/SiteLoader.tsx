'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SiteLoaderProps {
  isLoading?: boolean;
}

const SiteLoader = ({ isLoading = true }: SiteLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // When loading is complete, animate to 100%
      setProgress(100);
      // Then hide the loader after animation
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 800); // Match this with the progress bar duration
      return () => clearTimeout(timeout);
    } else {
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + Math.random() * 15;
          return next > 90 ? 90 : next; // Cap at 90% until actually loaded
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!showLoader) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
      animate={!isLoading ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Logo Animation */}
      <motion.div
        className="mb-12 text-3xl font-light tracking-[0.2em] text-black/80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        COUTURE
      </motion.div>

      {/* Main Loader Animation */}
      <div className="relative w-48">
        {/* Progress Bar */}
        <motion.div
          className="h-[1px] bg-black/80"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Progress Text */}
        <motion.div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-light tracking-widest text-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Corner */}
        <motion.div
          className="absolute top-0 left-0 w-24 h-24 border-l border-t border-black/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        
        {/* Bottom Right Corner */}
        <motion.div
          className="absolute bottom-0 right-0 w-24 h-24 border-r border-b border-black/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default SiteLoader; 