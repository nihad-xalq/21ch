"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-[40rem] h-[40rem] bg-gradient-to-br from-rose-50 via-white to-transparent rounded-full blur-3xl opacity-60 absolute -top-40 -left-40"></div>
        <div className="w-[30rem] h-[30rem] bg-gradient-to-tr from-indigo-50 via-white to-transparent rounded-full blur-3xl opacity-50 absolute -bottom-20 -right-20"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-extralight text-gray-900 mb-4">404</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-8">
            Page not found
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-gray-600 text-lg mb-12 max-w-md mx-auto"
        >
          Sorry, the page you are looking for does not exist. The page may have
          been deleted or the address has been changed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link href="/">
            <motion.button
              className="px-8 py-3 bg-black text-white hover:bg-gray-900 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go to Homepage
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
