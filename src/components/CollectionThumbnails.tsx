'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CollectionItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface CollectionThumbnailsProps {
  items: CollectionItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
  loadedImages: Set<number>;
}

const CollectionThumbnails = ({
  items,
  currentIndex,
  onSelect,
  loadedImages
}: CollectionThumbnailsProps) => {
  return (
    <div className="relative mt-4 px-4">
      <div className="flex justify-center space-x-4 overflow-x-auto py-4 scrollbar-hide">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={`relative w-24 h-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg 
              ${index === currentIndex ? 'ring-2 ring-white' : 'ring-1 ring-white/20'}`}
            onClick={() => onSelect(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {!loadedImages.has(index) ? (
              <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                <motion.div
                  className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            ) : (
              <>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  // fill
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-black/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentIndex ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                />
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollectionThumbnails; 