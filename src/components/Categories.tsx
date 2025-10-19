"use client";

import { collections } from "@/data/collections";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

const categories = ["All", "All long", "The Midi edit", "Short edition"];

const categoryMapping = {
  All: "All",
  "All long": "Alllong",
  "The Midi edit": "TheMidiedit",
  "Short edition": "Short edition",
};

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCollections =
    activeCategory === "All"
      ? collections
      : collections.filter(
          (collection) =>
            collection.category ===
            categoryMapping[activeCategory as keyof typeof categoryMapping]
        );

  return (
    <section
      className="py-12 px-4 max-w-7xl mx-auto overflow-hidden"
      id="products"
    >
      <div className="mb-12">
        <motion.h2
          className="text-3xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          Products
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center w-full md:w-3/4 xl:w-1/2 md:mx-auto">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-2 py-3 min-h-[64px] md:min-h-[44px] min-w-[44px] rounded-3xl transition-all cursor-pointer text-base ${
                activeCategory === category
                  ? "bg-slate-900 text-white"
                  : "bg-transparent border border-slate-200 hover:bg-gray-200 text-gray-800"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCollections.map((collection, index) => (
          <motion.div
            key={collection.id}
            className="group relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: "easeOut",
            }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src="/collections/6.webp"
                alt={collection.name}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              {(collection.isNew || collection.isBestseller) && (
                <div className="absolute top-2 left-2 flex gap-2">
                  {collection.isNew && (
                    <span className="inline-block bg-black text-white text-sm px-3 py-1.5 rounded min-h-[32px] min-w-[44px]">
                      New
                    </span>
                  )}
                  {collection.isBestseller && (
                    <span className="inline-block bg-rose-600 text-white text-sm font-medium px-3 py-1.5 rounded min-h-[32px] min-w-[44px]">
                      Best Seller
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900 text-center">
                {collection.name}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
