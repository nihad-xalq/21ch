'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Base64 encoded tiny placeholder image
const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LS0yMi4qLkE6Kh4uLUEwMkROOTo+Pj4uLkg1RD5AQz4+Pj7/2wBDAR';

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [, setLoadedImages] = useState<Set<number>>(new Set());

    // Array of hero images
    const heroImages = Array.from({ length: 4 }, (_, i) => `/hero/hero-${i + 1}.jpg`);

    // Preload images
    useEffect(() => {
        const preloadImages = async () => {
            // Only preload the first image initially
            const loadImage = (index: number) => {
                return new Promise((resolve) => {
                    const img = new window.Image();
                    img.src = heroImages[index];
                    img.onload = () => {
                        setLoadedImages(prev => new Set([...prev, index]));
                        resolve(true);
                    };
                    img.onerror = () => resolve(false);
                });
            };

            // Load first image immediately
            await loadImage(0);
            setIsLoading(false);

            // Load other images in the background
            const loadRemainingImages = async () => {
                const remainingIndices = [1, 2, 3];
                await Promise.all(remainingIndices.map(loadImage));
            };
            loadRemainingImages();
        };

        preloadImages();
    }, [heroImages]);

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [heroImages.length]);

    return (
        <div className="relative h-[40vh] sm:h-[50vh] md:h-[92vh] w-full overflow-hidden">
            {/* Loading placeholder */}
            {isLoading && (
                <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-black/20 border-t-black/80 rounded-full animate-spin" />
                </div>
            )}

            <AnimatePresence mode="sync">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={heroImages[currentIndex]}
                        alt="Hero image"
                        fill
                        priority={currentIndex === 0}
                        quality={90}
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
                        loading={currentIndex === 0 ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL={blurDataURL}
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/30" />
                </motion.div>
            </AnimatePresence>

            {/* Hero Content */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center text-white px-4"
                >
                    <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wider">21 COUTURE</h1>
                    <p className="text-lg md:text-xl font-light tracking-wide mb-8">Yeni kolleksiyamızı kəşf edin</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-white text-black text-sm uppercase tracking-wider hover:bg-black hover:text-white hover:border hover:border-white transition-colors duration-200 cursor-pointer"
                    >
                        Kolleksiyaya baxın
                    </motion.button>
                </motion.div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
                {heroImages.map((_, index) => (
                    <motion.button
                        key={index}
                        name="heroImages-carousel-dot"
                        title="heroImages-carousel-dot"
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero; 