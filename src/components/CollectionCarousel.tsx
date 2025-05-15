'use client';

import CollectionThumbnails from './CollectionThumbnails';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingState from './LoadingState';
import Image from 'next/image';

interface CollectionItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface CollectionCarouselProps {
  items: CollectionItem[];
  autoPlayInterval?: number;
}

const CollectionCarousel = ({
  items,
  autoPlayInterval = 5000
}: CollectionCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const overlayVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -10 }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePosition({ x, y });
  };

  // Add preloading logic
  useEffect(() => {
    const preloadImages = async () => {
      const imagesToLoad = [
        currentIndex,
        (currentIndex + 1) % items.length,
        (currentIndex - 1 + items.length) % items.length
      ];

      const loadImage = (index: number) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = items[index].image;
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]));
            resolve(true);
          };
          img.onerror = () => resolve(false);
        });
      };

      setIsLoading(true);
      await Promise.all(imagesToLoad.map(loadImage));
      setIsLoading(false);
    };

    preloadImages();
  }, [currentIndex, items]);

  // Modify the paginate function to handle loading state
  const paginate = useCallback((newDirection: number) => {
    if (isZoomed || isLoading) return;
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = items.length - 1;
      if (nextIndex >= items.length) nextIndex = 0;
      return nextIndex;
    });
  }, [items.length, isZoomed, isLoading]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'Space') setIsAutoPlaying(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [paginate]);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      paginate(1);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, paginate, autoPlayInterval]);

  const currentItem = items[currentIndex];

  return (
    <div className="space-y-4">
      <div
        className="relative w-full h-[600px] overflow-hidden bg-gray-50 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsZoomed(false);
        }}
      >
        {isLoading && <LoadingState />}

        {/* Progress bar */}
        {isAutoPlaying && !isLoading && (
          <motion.div
            className="absolute top-0 left-0 h-1 bg-white/50 z-20"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: autoPlayInterval / 1000,
              ease: "linear",
              repeat: Infinity
            }}
          />
        )}

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag={!isZoomed && !isLoading && "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className={`absolute w-full h-full cursor-${isZoomed ? 'zoom-out' : 'grab'} active:cursor-${isZoomed ? 'zoom-out' : 'grabbing'}`}
            onClick={() => !isLoading && setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
          >
            <div className="relative w-full h-full">
              <motion.div
                className="relative w-full h-full"
                animate={isZoomed ? {
                  scale: 2,
                  x: (mousePosition.x - 0.5) * -500,
                  y: (mousePosition.y - 0.5) * -500
                } : {
                  scale: 1,
                  x: 0,
                  y: 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Image
                  src={currentItem.image}
                  alt={currentItem.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </motion.div>
              <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isZoomed ? 'opacity-0' : 'group-hover:opacity-20'}`} />
              {!isZoomed && (
                <motion.div
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/70"
                >
                  <h3 className="text-2xl font-light mb-2">{currentItem.title}</h3>
                  <p className="text-sm opacity-80">{currentItem.description}</p>
                  <p className="text-sm mt-2 font-light">{currentItem.category}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons - only show when not loading */}
        {!isLoading && (
          <>
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors flex items-center justify-center text-white z-10 opacity-0 group-hover:opacity-100 cursor-pointer"
              name="collection-carousel-prev"
              title="collection-carousel-prev"
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors flex items-center justify-center text-white z-10 opacity-0 group-hover:opacity-100 cursor-pointer"
              name="collection-carousel-next"
              title="collection-carousel-next"
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </>
        )}

        {/* Autoplay control */}
        <motion.button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors flex items-center justify-center text-white z-10 opacity-0 group-hover:opacity-100"
          name="collection-carousel-autoplay"
          title="collection-carousel-autoplay"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isAutoPlaying ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </motion.button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {items.map((_, index) => (
            <motion.button
              key={index}
              name="collection-carousel-dot"
              title="collection-carousel-dot"
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Zoom indicator */}
        <motion.div
          className="absolute top-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isZoomed ? 'Click to zoom out' : 'Click to zoom in'}
        </motion.div>
      </div>

      {/* Thumbnails - pass loading state */}
      <CollectionThumbnails
        items={items}
        currentIndex={currentIndex}
        onSelect={(index) => {
          if (!isLoading) {
            setDirection(index > currentIndex ? 1 : -1);
            setCurrentIndex(index);
          }
        }}
        loadedImages={loadedImages}
      />
    </div>
  );
};

export default CollectionCarousel; 