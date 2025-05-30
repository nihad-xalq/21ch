'use client';

import { useParallax, useParallaxImage } from '@/hooks/useParallax';
import ScrollSlideIn from '@/components/animations/ScrollSlideIn';
import CollectionCarousel from '@/components/CollectionCarousel';
import ScrollFadeIn from '@/components/animations/ScrollFadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingState from '@/components/LoadingState';
import Categories from '@/components/Categories';
import { collections } from '@/data/collections';
import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import CMap from '@/components/CMap';
import Image from 'next/image';

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const aboutImageParallax = useParallaxImage(1.15);
  const quoteParallax = useParallax({ offset: 40, direction: 'up' });

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log('Form submitted');
  // };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingState />}
      </AnimatePresence>

      <motion.div
        className="space-y-16 sm:space-y-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <Hero />

        {/* Collections Section */}
        <section id="collections" className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollFadeIn>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-12 sm:mb-16">Son Kolleksiyalarımız</h2>
            </ScrollFadeIn>
            <ScrollSlideIn direction="up">
              <CollectionCarousel items={collections} />
            </ScrollSlideIn>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-32 overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              transition={{ duration: 1 }}
              className="w-48 sm:w-64 h-48 sm:h-64 bg-gradient-to-br from-rose-100 via-white to-transparent rounded-full blur-3xl absolute -top-24 -left-24"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-56 sm:w-80 h-56 sm:h-80 bg-gradient-to-tr from-indigo-100 via-white to-transparent rounded-full blur-3xl absolute -bottom-32 -right-32"
            />
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center z-10">
            <motion.div
              ref={aboutImageParallax.ref}
              style={{ y: aboutImageParallax.y, scale: aboutImageParallax.scale }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-200">
                <Image
                  src="/atelier.jpg"
                  alt="Atelier"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-64 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-white/90 px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg text-gray-900 text-sm sm:text-base font-semibold backdrop-blur-lg flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19l-7-7 7-7"
                  />
                </svg>
                Atelyemizdə əl işləri ilə hazırlanmışdır.
              </div>
            </motion.div>
            <div className="relative">
              <ScrollFadeIn>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight mb-6 sm:mb-8 text-gray-900 text-center md:text-left tracking-tight leading-tight">
                  21 Couture House haqqında
                </h2>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.2}>
                <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-xl leading-relaxed font-light">
                  Sənətkarlığa və incəliyə olan dərin hörmətdən doğan atelyemiz, əbədi ənənələri müasir baxışla birləşdirir. Hər bir əsər ilhamlı eskizdən son, zərif tikişə qədər sədaqətlə hazırlanmış poetik bir səyahətdir.
                </p>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.4}>
                <ul className="mb-6 sm:mb-8 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-rose-400 rounded-full"></span>
                    <span className="text-gray-800 text-base sm:text-lg">Etik qaydada əldə edilmiş, yüksək keyfiyyətli materiallar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-indigo-400 rounded-full"></span>
                    <span className="text-gray-800 text-base sm:text-lg">Fərdi ölçüyə uyğunlaşdırma və məsləhətlər</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-amber-400 rounded-full"></span>
                    <span className="text-gray-800 text-base sm:text-lg">Mükafatlıq sənətkarlıq irsi</span>
                  </li>
                </ul>
              </ScrollFadeIn>
              <motion.div
                ref={quoteParallax.ref}
                style={{ y: quoteParallax.y }}
                className="relative"
              >
                <blockquote className="border-l-4 border-rose-300 pl-4 sm:pl-6 italic text-gray-500 text-base sm:text-lg font-light">
                  &quot;Moda gündəlik həyatın reallığı ilə yaşamaq üçün bir qalxandır.&quot;
                  <span className="block mt-2 text-gray-600 text-sm sm:text-base font-normal">
                    – Bill Cunningham
                  </span>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        {/* <ScrollFadeIn> */}
        <Categories />
        {/* </ScrollFadeIn> */}

        {/* Contact Section */}
        {/* <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <ScrollFadeIn>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4">
                Sualınız var?
              </h2>
            </ScrollFadeIn>
            <ScrollFadeIn delay={0.2}>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                Konsultasiya üçün görüş təyin edin və ya atelyemizi ziyarət edərək yüksək dərəcəli dəb sənətini yaşayın.
              </p>
            </ScrollFadeIn>
          </div>
          <ScrollScaleIn>
            <div className="max-w-xl mx-auto">
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Adınız"
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Mesajınız"
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500 text-sm sm:text-base"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white hover:bg-gray-800 transition-colors text-sm sm:text-base cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Mesaj Göndər
                </motion.button>
              </form>
            </div>
          </ScrollScaleIn>
        </section> */}

        <ScrollFadeIn>
          <section
            id="map"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
          >
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-3">
                Atelyemizə Gəlin
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                Ünvanımızı xəritədə tapın və bizi ziyarət edin. Sizi 21 Couture House-da görməkdən məmnun olarıq!
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                <CMap />
              </div>
              <div className="flex-1 w-full max-w-md mx-auto md:mx-0">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">Əlaqə Məlumatları</h3>
                  <ul className="text-gray-700 text-sm space-y-2 mb-4">
                    <li>
                      <span className="font-medium">Ünvan:</span> Bülbül prospekti 24, Bakı
                    </li>
                    <li>
                      <span className="font-medium">Telefon:</span>{" "}
                      <a href="tel:+994107172110" className="hover:underline text-pink-600">+994 10 717 21 10</a>
                    </li>
                    <li>
                      <span className="font-medium">Email:</span>{" "}
                      <a href="mailto:21couturehouse@gmail.com" className="hover:underline text-pink-600">21couturehouse@gmail.com</a>
                    </li>
                  </ul>
                  <a
                    href="https://www.google.com/maps/dir//40e+B%C3%BClb%C3%BCl+Ave,+Baku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Yol Tarifi Al
                  </a>
                </div>
              </div>
            </div>
          </section>
        </ScrollFadeIn>

      </motion.div>
    </>
  );
};

export default Homepage; 