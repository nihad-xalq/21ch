"use client";

import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa";
import ScrollSlideIn from "./animations/ScrollSlideIn";
import ScrollFadeIn from "./animations/ScrollFadeIn";
import { motion } from "framer-motion";
import Logo from "./Logo";
import Link from "next/link";

const currentYear = new Date().getFullYear();

const Footer = () => {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/21couturehouse/",
      icon: FaInstagram,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61567001126314",
      icon: FaFacebookF,
    },
    {
      name: "Tiktok",
      href: "https://www.tiktok.com/@21couturehouse",
      icon: FaTiktok,
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <ScrollSlideIn direction="up" rootMargin="-100px">
            <div>
              <Logo />
            </div>
          </ScrollSlideIn>

          <ScrollSlideIn direction="up" rootMargin="-100px">
            <div>
              <h3 className="text-xl font-medium mb-2 md:mb-6 text-gray-900">
                Quick links
              </h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <Link
                    href="#collections"
                    className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#about"
                    className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
                  >
                    About 21
                  </Link>
                </li>
                <li>
                  <Link
                    href="#products"
                    className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
                  >
                    Products
                  </Link>
                </li>
                {/* <li>
                  <Link href="#contact" className="text-gray-500 hover:text-gray-900 transition-colors text-sm">
                    Contact
                  </Link>
                </li> */}
              </ul>
            </div>
          </ScrollSlideIn>

          <ScrollSlideIn direction="up" rootMargin="-100px">
            <div>
              <h3 className="text-xl font-medium mb-2 md:mb-6 text-gray-900">
                Contact
              </h3>
              <div className="space-y-3">
                <p className="text-gray-500 text-sm">
                  Email: 21couturehouse@gmail.com
                </p>
                <p className="text-gray-500 text-sm">
                  Phone: +994 10 717 21 10 (Azerbaijan)
                </p>
                <p className="text-gray-500 text-sm">
                  Address: Bulbul Avenue 24, Baku
                </p>
              </div>
            </div>
          </ScrollSlideIn>

          {/* <ScrollSlideIn direction="up" rootMargin="-100px" className='md:justify-self-end'> */}
          <div>
            <h3 className="text-xl font-medium mb-2 md:mb-6 text-gray-900">
              Follow us
            </h3>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-900 text-xl transition-colors"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* </ScrollSlideIn> */}
        </div>

        <ScrollFadeIn delay={0.2} rootMargin="-50px">
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              {currentYear} &copy; 21 Couture House. All rights reserved.
            </p>
          </div>
        </ScrollFadeIn>
      </div>
    </footer>
  );
};

export default Footer;
