'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const menuItems = [
    { name: 'Kolleksiyalar', href: '#collections' },
    { name: 'Haqqımızda', href: '#about' },
    { name: 'Məhsullar', href: '#products' },
    { name: 'Əlaqə', href: '#contact' },
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <header
        className={`fixed w-full z-40 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white shadow-sm' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className={`text-2xl font-light tracking-wider ${isScrolled || isMenuOpen ? 'text-black' : 'text-black'
                  }`}
              >
                21 COUTURE
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`text-sm tracking-wide hover:opacity-70 transition-opacity cursor-pointer ${isScrolled ? 'text-gray-900' : 'text-black'
                      }`}
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg ${isScrolled || isMenuOpen ? 'text-gray-900' : 'text-black'}`}
                aria-label="Menu"
              >
                <div className="relative w-6 h-5">
                  <motion.span
                    className={`absolute top-0 left-0 w-full h-0.5 transform-gpu transition-colors ${isScrolled || isMenuOpen ? 'bg-gray-900' : 'bg-black'
                      }`}
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 9 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className={`absolute top-[9px] left-0 w-full h-0.5 transition-colors ${isScrolled || isMenuOpen ? 'bg-gray-900' : 'bg-black'
                      }`}
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                      x: isMenuOpen ? 20 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className={`absolute bottom-0 left-0 w-full h-0.5 transform-gpu transition-colors ${isScrolled || isMenuOpen ? 'bg-gray-900' : 'bg-black'
                      }`}
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? -9 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-30 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center space-y-8">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className="text-3xl text-gray-900 hover:text-gray-600 transition-colors font-light tracking-wider"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 