'use client';

import { motion } from 'framer-motion';

const LoadingState = () => {
    return (
        <motion.div 
            className="fixed inset-0 bg-white z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative w-24 h-24"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <motion.span 
                    className="absolute w-full h-full border-2 border-black rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.span 
                    className="absolute w-full h-full border-2 border-black rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span 
                    className="absolute w-full h-full border-2 border-black rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.4 }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
            </motion.div>
        </motion.div>
    );
};

export default LoadingState; 