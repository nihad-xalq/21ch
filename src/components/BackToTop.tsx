'use client';

import { MdKeyboardArrowUp } from 'react-icons/md';
import { useEffect, useState } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 
        bg-black
        hover:bg-black/60
        text-white/70
        p-2.5
        rounded-full 
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        backdrop-blur-sm
        border border-black/5 
        transform hover:scale-110
        transition-all duration-300 ease-out
        group
        z-50
        cursor-pointer
        ${isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12 pointer-events-none'
        }
      `}
      aria-label="Back to top"
    >
      <MdKeyboardArrowUp className="w-7 h-7 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
    </button>
  );
};

export default BackToTop; 