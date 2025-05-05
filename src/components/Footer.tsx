'use client';

import ScrollSlideIn from './animations/ScrollSlideIn';
import ScrollFadeIn from './animations/ScrollFadeIn';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Twitter', href: '#' }
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ScrollSlideIn direction="up" rootMargin="-100px">
            <div>
              <h3 className="text-lg font-light mb-4">Əlaqə</h3>
              <p className="text-gray-600">Email: info@couture.com</p>
              <p className="text-gray-600">Telefon: +1 (555) 123-4567</p>
              <p className="text-gray-600">Ünvan: 123 Fashion Street, City</p>
            </div>
          </ScrollSlideIn>
          
          <ScrollSlideIn direction="up" rootMargin="-100px">
            <div>
              <h3 className="text-lg font-light mb-4">Bizi izləyin</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="text-gray-600 hover:text-gray-900"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollSlideIn>
          
          <ScrollSlideIn direction="up" rootMargin="-100px">
            <div>
              <h3 className="text-lg font-light mb-4">Xəbərlərimiz</h3>
              <p className="text-gray-600 mb-4">Xəbərlərimizə abonə olun və təkliflərimizə baxın.</p>
              <form className="flex">
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-500"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Abonə ol
                </motion.button>
              </form>
            </div>
          </ScrollSlideIn>
        </div>
        
        <ScrollFadeIn delay={0.2} rootMargin="-50px">
          <div className="mt-12 pt-8 border-t border-gray-100 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} 21 Couture House. Bütün hüquqlar qorunur.</p>
          </div>
        </ScrollFadeIn>
      </div>
    </footer>
  );
};

export default Footer; 