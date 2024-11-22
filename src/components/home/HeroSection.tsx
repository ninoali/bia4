import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = window.innerHeight / 2;
      const progress = Math.min(scrollPosition / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[60vh] flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-light/5 rounded-full blur-[120px] animate-pulse-slow"></div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="space-y-4">
            <div className="overflow-hidden">
              <span className="block text-2xl sm:text-3xl tracking-tight text-white/40 font-light transform hover:scale-105 transition-transform duration-500 animate-fade-in-up">
                SECURE
              </span>
            </div>
            
            <div 
              className="overflow-hidden relative group"
              style={{
                '--scroll-progress': scrollProgress,
              } as React.CSSProperties}
            >
              <span className="block text-3xl sm:text-4xl tracking-tight font-light">
                <span 
                  className="relative z-10 text-transparent bg-clip-text animate-text-shimmer scroll-highlight"
                  style={{
                    backgroundImage: `linear-gradient(90deg, 
                      rgba(211,145,176,${0.2 + scrollProgress * 0.5}) 0%,
                      rgba(159,100,150,${0.4 + scrollProgress * 0.4}) 50%,
                      rgba(211,145,176,${0.2 + scrollProgress * 0.5}) 100%
                    )`,
                    transform: `scale(${1 + scrollProgress * 0.05})`,
                    transition: 'transform 0.3s ease-out',
                  }}
                >
                  DISCREET
                </span>
              </span>
            </div>
            
            <div className="overflow-hidden">
              <span className="block text-2xl sm:text-3xl tracking-tight text-white/40 font-light transform hover:scale-105 transition-transform duration-500 animate-fade-in-down">
                EXCLUSIVE
              </span>
            </div>
          </h1>
          
          <div className="space-y-8 relative">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/browse" 
                className="button-primary transform hover:scale-110 transition-all duration-500"
              >
                Browse Escorts
              </Link>
              
              <Link 
                to="/advertise" 
                className="button-secondary transform hover:scale-110 transition-all duration-500"
              >
                Start Advertising
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-lighter via-primary-light to-primary-lighter opacity-10 blur-xl"></div>
              <div className="relative inline-block glass-effect px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-500">
                <span className="text-primary-lighter text-sm font-light tracking-tight">
                  First Month Free • Code "DIXLAUNCH"
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};