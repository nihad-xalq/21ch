'use client';

import { MdLocationOn, MdOpenInNew } from 'react-icons/md';
import { useState } from 'react';

const CMap = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleOpenMap = () => {
        window.open('https://maps.app.goo.gl/rGAZDnrHBRR5G8pbA', '_blank');
    };

    return (
        <div className="relative rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] group">
            <div
                className="relative w-full h-[300px] md:h-[400px] transition-transform duration-400 ease-out"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3030.123456789012!2d49.8417597!3d40.3963904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d002416e5af%3A0xddcfb6085e3a09b6!2s21%20Couture%20House!5e1!3m2!1sen!2saz!4v1747814921921!5m2!1sen!2saz"
                    width="100%"
                    height="100%"
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className={`w-full h-full border-0 rounded-2xl transition-transform duration-400 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
                    title="21 Couture House Location"
                ></iframe>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50 pointer-events-none" />
            </div>

            {/* Location badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-xl shadow-lg text-sm font-medium text-gray-800 flex items-center gap-2.5 transition-all duration-300 hover:bg-white cursor-pointer group/badge" onClick={handleOpenMap}>
                <MdLocationOn className="w-5 h-5 text-black" />
                <span>Bülbül prospekti 24, Bakı</span>
                <MdOpenInNew className="w-4 h-4 opacity-0 -translate-x-2 group-hover/badge:opacity-100 group-hover/badge:translate-x-0 transition-all duration-300" />
            </div>

            {/* Info card */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg transform transition-all duration-500 ease-out translate-y-[calc(100%+16px)] group-hover:translate-y-0">
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-900">21 Couture House</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>10:00 - 19:00</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>+994 10 717 21 10</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CMap;