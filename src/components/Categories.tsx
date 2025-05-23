'use client';

import { useParallax } from '@/hooks/useParallax';
import { products } from '@/data/products';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const categories = [
  'Hamısı',
  'Köynəklər',
  'Donlar',
  'Gödəkçələr',
  'Svitrlər',
  'Ətəklər',
  'Kostyumlar',
];

const categoryMapping = {
  'Köynəklər': 'T-Shirts',
  'Donlar': 'Dresses',
  'Gödəkçələr': 'Jackets',
  'Svitrlər': 'Sweaters',
  'Ətəklər': 'Skirts',
  'Kostyumlar': 'Suits',
};

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState('Hamısı');
  const titleParallax = useParallax({ offset: 30 });

  // Create individual parallax refs for each possible position
  const parallaxRefs = [
    useParallax({ offset: 20, direction: 'up' }),
    useParallax({ offset: 20, direction: 'down' }),
    useParallax({ offset: 20, direction: 'up' }),
    useParallax({ offset: 20, direction: 'down' }),
    useParallax({ offset: 20, direction: 'up' }),
    useParallax({ offset: 20, direction: 'down' }),
    useParallax({ offset: 20, direction: 'up' }),
    useParallax({ offset: 20, direction: 'down' }),
    useParallax({ offset: 20, direction: 'up' }),
    useParallax({ offset: 20, direction: 'down' })
  ];

  const filteredProducts = activeCategory === 'Hamısı'
    ? products
    : products.filter(product => product.category === categoryMapping[activeCategory as keyof typeof categoryMapping]);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto overflow-hidden" id="products">
      <div className="mb-12">
        <motion.h2
          ref={titleParallax.ref}
          style={{ y: titleParallax.y }}
          className="text-3xl font-bold text-center mb-8"
        >
          Məhsullarımız
        </motion.h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 min-h-[44px] min-w-[44px] rounded-full transition-all cursor-pointer text-base ${
                activeCategory === category
                ? 'bg-black text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => {
          const parallax = parallaxRefs[index % parallaxRefs.length];

          return (
            <motion.div
              key={product.id}
              ref={parallax.ref}
              style={{ y: parallax.y }}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src="/collections/6.jpg"
                  alt={product.name}
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                {(product.isNew || product.isBestseller) && (
                  <div className="absolute top-2 left-2 flex gap-2">
                    {product.isNew && (
                      <span className="inline-block bg-black text-white text-sm px-3 py-1.5 rounded min-h-[32px] min-w-[44px]">
                        Yeni
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="inline-block bg-rose-600 text-white text-sm font-medium px-3 py-1.5 rounded min-h-[32px] min-w-[44px]">
                        Bestseller
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 text-center">{product.name}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Categories; 