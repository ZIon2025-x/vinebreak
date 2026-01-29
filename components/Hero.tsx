import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { PageView } from '../types';

interface HeroProps {
  onNavigate: (view: PageView) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToConcierge = () => {
      document.getElementById('concierge')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-brand-200">
      {/* Parallax Background Image */}
      {/* Moves slightly slower than scroll (factor 0.5) to create depth */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 will-change-transform"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1596130495914-72750e605d21?q=80&w=2574&auto=format&fit=crop")',
          opacity: 0.85,
          transform: `translateY(${scrollY * 0.5}px) scale(1.1)`, 
        }}
      ></div>
      
      {/* Gradient Overlays for smooth blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-100/30 via-transparent to-brand-100/90 z-10"></div>
      
      {/* Content Layer - Moves slightly faster upwards (factor -0.3) */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto mt-16"
           style={{ transform: `translateY(${scrollY * -0.3}px)` }} 
      >
        <div className="inline-block border border-brand-900/30 bg-brand-100/60 backdrop-blur-md px-8 py-3 rounded-full mb-10 opacity-0 animate-[unblur_1.5s_ease-out_0.2s_forwards]">
            <span className="text-brand-950 tracking-[0.4em] uppercase text-[10px] font-bold">
            Est. 2024 • Bordeaux
            </span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl text-brand-950 mb-6 leading-none tracking-tight font-medium drop-shadow-sm mix-blend-overlay opacity-90">
          <span className="block opacity-0 animate-[unblur_1.5s_ease-out_0.5s_forwards]">Raw</span> 
          <span className="block font-light italic text-brand-800 font-serif opacity-0 animate-[unblur_1.5s_ease-out_0.8s_forwards] -mt-2 md:-mt-6">Luxury</span>
        </h1>

        <p className="text-brand-800/90 text-sm md:text-base tracking-[0.2em] uppercase font-medium mb-6 opacity-0 animate-[slide-up_1.2s_ease-out_0.9s_forwards]">
          Skincare from the vine
        </p>
        
        <p className="text-brand-900 text-xl md:text-2xl font-light mb-14 max-w-2xl mx-auto leading-relaxed opacity-0 animate-[slide-up_1.2s_ease-out_1s_forwards]">
          Unbleached linen. Sun-cured vines. <br className="hidden md:block" />
          A skincare ritual grounded in the elegance of the earth.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center opacity-0 animate-[slide-up_1.2s_ease-out_1.2s_forwards]">
          <Button 
            variant="outline" 
            className="border-brand-900 text-brand-950 hover:bg-brand-900 hover:text-brand-50 min-w-[180px] backdrop-blur-sm bg-brand-50/20"
            onClick={() => onNavigate({ type: 'catalog' })}
          >
            The Collection
          </Button>
          <Button 
            variant="primary" 
            className="bg-brand-950 hover:bg-brand-800 text-brand-50 border-none min-w-[180px] shadow-2xl hover:translate-y-[-2px]"
            onClick={scrollToConcierge}
          >
            Consult Terra <ArrowRight size={16} />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-brand-900 transition-opacity duration-500"
        style={{ opacity: scrollY > 100 ? 0 : 1 }}
      >
          <span className="text-[10px] uppercase tracking-widest animate-pulse">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
};