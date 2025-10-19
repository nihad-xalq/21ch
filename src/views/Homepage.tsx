"use client";

import ScrollFadeIn from "@/components/animations/ScrollFadeIn";
import { motion, AnimatePresence } from "framer-motion";
import LoadingState from "@/components/LoadingState";
import Categories from "@/components/Categories";
import { videosArray } from "@/data/videos";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import CMap from "@/components/CMap";
import Link from "next/link";

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [videoErrors, setVideoErrors] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Detect mobile device
    const checkMobile = () => {
      if (typeof window !== "undefined" && navigator) {
        const userAgent =
          navigator.userAgent ||
          navigator.vendor ||
          (window as Window & { opera?: string }).opera ||
          "";
        const isMobileDevice =
          /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
            userAgent.toLowerCase()
          );
        setIsMobile(isMobileDevice);
      }
    };

    checkMobile();

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>{isLoading && <LoadingState />}</AnimatePresence>

      <motion.div
        className="space-y-16 sm:space-y-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <Hero />

        {/* Video Gallery section */}
        <ScrollFadeIn>
          <section
            id="video-gallery"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
          >
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-4">
                Our Recent Products
              </h2>
              {/* <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                2025 Collections videos
              </p> */}
            </div>
            {/* Desktop/Tablet Grid Layout */}
            <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {videosArray.map((video, index) => {
                const isHovered = hoveredVideoId === video.id;
                const isBlurred =
                  hoveredVideoId !== null && hoveredVideoId !== video.id;

                return (
                  <motion.div
                    key={video.id}
                    className="flex flex-col items-center cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      filter: isBlurred ? "blur(5px)" : "blur(0px)",
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                      delay: index * 0.1,
                    }}
                    onHoverStart={() => setHoveredVideoId(video.id)}
                    onHoverEnd={() => setHoveredVideoId(null)}
                  >
                    <Link
                      href={video.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-full"
                    >
                      {videoErrors.has(video.id) ? (
                        <div className="w-full h-64 rounded-2xl shadow-lg mb-3 bg-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <p className="text-sm text-gray-500">
                              Video unavailable
                            </p>
                          </div>
                        </div>
                      ) : (
                        <video
                          src={video.url}
                          controls={false}
                          autoPlay={!isMobile}
                          muted
                          loop
                          playsInline
                          preload={isMobile ? "none" : "metadata"}
                          controlsList="nodownload"
                          className="w-full rounded-2xl shadow-lg mb-3 bg-black"
                          onError={(e) => {
                            console.error(
                              "Video failed to load:",
                              video.url,
                              e
                            );
                            setVideoErrors(
                              (prev) => new Set([...prev, video.id])
                            );
                          }}
                          onLoadStart={() => {
                            console.log("Video loading started:", video.url);
                          }}
                          onCanPlay={() => {
                            console.log("Video can play:", video.url);
                          }}
                          onTouchStart={(e) => {
                            // Force play on mobile touch
                            if (isMobile) {
                              const videoElement = e.target as HTMLVideoElement;
                              videoElement.play().catch(console.error);
                            }
                          }}
                        />
                      )}
                    </Link>
                    <p className="text-gray-700 text-sm text-center">
                      {video.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Carousel Layout */}
            <div className="sm:hidden">
              <div
                className="relative overflow-hidden"
                onTouchStart={(e) => {
                  const touch = e.touches[0];
                  setTouchStart(touch.clientX);
                }}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  setTouchEnd(touch.clientX);
                }}
                onTouchEnd={() => {
                  if (!touchStart || !touchEnd) return;

                  const distance = touchStart - touchEnd;
                  const isLeftSwipe = distance > 50;
                  const isRightSwipe = distance < -50;

                  if (
                    isLeftSwipe &&
                    currentVideoIndex < videosArray.length - 1
                  ) {
                    setCurrentVideoIndex(currentVideoIndex + 1);
                  }
                  if (isRightSwipe && currentVideoIndex > 0) {
                    setCurrentVideoIndex(currentVideoIndex - 1);
                  }
                }}
              >
                <motion.div
                  className="flex"
                  animate={{
                    x: -currentVideoIndex * 66.67 + "%",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {videosArray.map((video, index) => (
                    <div key={video.id} className="w-2/3 flex-shrink-0 px-2">
                      <motion.div
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: "easeOut",
                        }}
                      >
                        <Link
                          href={video.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block w-full"
                        >
                          {videoErrors.has(video.id) ? (
                            <div className="w-full h-64 rounded-2xl shadow-lg mb-3 bg-gray-200 flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-12 h-12 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                                  <svg
                                    className="w-6 h-6 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                  </svg>
                                </div>
                                <p className="text-sm text-gray-500">
                                  Video unavailable
                                </p>
                              </div>
                            </div>
                          ) : (
                            <video
                              src={video.url}
                              controls={false}
                              autoPlay={!isMobile}
                              muted
                              loop
                              playsInline
                              preload={isMobile ? "none" : "metadata"}
                              controlsList="nodownload"
                              className="w-full h-full rounded-2xl shadow-lg mb-3 bg-black object-cover"
                              onError={(e) => {
                                console.error(
                                  "Mobile video failed to load:",
                                  video.url,
                                  e
                                );
                                setVideoErrors(
                                  (prev) => new Set([...prev, video.id])
                                );
                              }}
                              onLoadStart={() => {
                                console.log(
                                  "Mobile video loading started:",
                                  video.url
                                );
                              }}
                              onCanPlay={() => {
                                console.log(
                                  "Mobile video can play:",
                                  video.url
                                );
                              }}
                              onTouchStart={(e) => {
                                // Force play on mobile touch
                                if (isMobile) {
                                  const videoElement =
                                    e.target as HTMLVideoElement;
                                  videoElement.play().catch(console.error);
                                }
                              }}
                            />
                          )}
                        </Link>
                        <p className="text-gray-700 text-sm text-center">
                          {video.description}
                        </p>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </section>
        </ScrollFadeIn>

        {/* Collections Section */}
        {/* <section id="collections" className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollFadeIn>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-12 sm:mb-16">
                Our Recent Collections
              </h2>
            </ScrollFadeIn>
            <ScrollSlideIn direction="up">
              <CollectionCarousel items={collections} />
            </ScrollSlideIn>
          </div>
        </section> */}

        {/* About Section */}
        {/* <section
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
              style={{
                y: aboutImageParallax.y,
                scale: aboutImageParallax.scale,
              }}
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
                Made with love and care in our atelier.
              </div>
            </motion.div>
            <div className="relative">
              <ScrollFadeIn>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight mb-6 sm:mb-8 text-gray-900 text-center md:text-left tracking-tight leading-tight">
                  About 21 Couture House
                </h2>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.2}>
                <p className="text-gray-700 mb-6 sm:mb-8 text-base sm:text-xl leading-relaxed font-light">
                  Our atelier is a result of deep love and care for fashion. It
                  is a poetic journey from inspiration to the final stitch.
                </p>
              </ScrollFadeIn>
              <ScrollFadeIn delay={0.4}>
                <ul className="mb-6 sm:mb-8 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-rose-400 rounded-full"></span>
                    <span className="text-gray-800 text-base sm:text-lg">
                      Ethical and high-quality materials
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-indigo-400 rounded-full"></span>
                    <span className="text-gray-800 text-base sm:text-lg">
                      Custom measurements and recommendations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 bg-amber-400 rounded-full"></span>
                    <span className="text-gray-800 text-base sm:text-lg">
                      Responsible fashion production
                    </span>
                  </li>
                </ul>
              </ScrollFadeIn>
              <motion.div
                ref={quoteParallax.ref}
                style={{ y: quoteParallax.y }}
                className="relative"
              >
                <blockquote className="border-l-4 border-rose-300 pl-4 sm:pl-6 italic text-gray-500 text-base sm:text-lg font-light">
                  &quot;Fashion is the armor to survive the reality of everyday
                  life&quot;
                  <span className="block mt-2 text-gray-600 text-sm sm:text-base font-normal">
                    – Bill Cunningham
                  </span>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section> */}

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
                Visit Our Atelier
              </h2>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                Find our address on the map and visit us. We are looking forward
                to seeing you at 21 Couture House!
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 w-full">
                <CMap />
              </div>
              <div className="flex-1 w-full max-w-md mx-auto md:mx-0">
                <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">
                    Contact Information
                  </h3>
                  <ul className="text-gray-700 text-sm space-y-2 mb-4">
                    <li>
                      <span className="font-medium">Address:</span> Bulbul
                      Avenue 24, Baku
                    </li>
                    <li>
                      <span className="font-medium">Phone:</span>{" "}
                      <Link
                        href="tel:+994107172110"
                        className="hover:underline text-pink-600"
                      >
                        +994 10 717 21 10 (Azerbaijan)
                      </Link>
                    </li>
                    <li>
                      <span className="font-medium">Email:</span>{" "}
                      <Link
                        href="mailto:21couturehouse@gmail.com"
                        className="hover:underline text-pink-600"
                      >
                        21couturehouse@gmail.com
                      </Link>
                    </li>
                  </ul>
                  <Link
                    href="https://www.google.com/maps/dir//40e+B%C3%BClb%C3%BCl+Ave,+Baku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    Get Directions
                  </Link>
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
