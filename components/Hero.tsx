import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { PageView } from '../types';

interface HeroProps {
  onNavigate: (view: PageView) => void;
}

// 本地 Hero 背景图（暂未使用，可选）：
// hero-1-grapes-on-vine.jpg  hero-2-grapevine-closeup.jpg

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(scrollYRef.current);
        rafRef.current = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToConcierge = () => {
      document.getElementById('concierge')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      aria-label="Welcome to Vinebreak"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-brand-200"
    >
      {/* 葡萄藤图案背景 - 平铺、低透明度融入背景色 */}
      <div
        className="absolute inset-0 z-0 opacity-[0.55]"
        style={{
          backgroundImage: 'url(/images/hero-pattern.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
        }}
        aria-hidden="true"
      />
      {/* Content Layer - 无视差，避免滚动抖动 */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto w-full">
        <div
          className="inline-block border border-brand-900/30 bg-brand-100/60 backdrop-blur-md px-8 py-3 rounded-full mb-6 opacity-0 animate-unblur"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-brand-950 tracking-[0.4em] uppercase text-[10px] font-bold">
            Est. 2026 • Bordeaux
          </span>
        </div>

        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl text-brand-950 mb-4 leading-[1.05] tracking-[0.02em] font-normal"
          style={{
            textShadow:
              '0 1px 2px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          }}
        >
          <span className="block opacity-0 animate-unblur font-medium" style={{ animationDelay: '0.5s' }}>Raw</span>
          <span className="block font-light italic text-brand-800 opacity-0 animate-unblur -mt-1 md:-mt-3" style={{ animationDelay: '0.8s' }}>Luxury</span>
        </h1>

        <p
          className="text-brand-800/90 text-sm md:text-base tracking-[0.2em] uppercase font-medium mb-4 opacity-0 animate-slide-up"
          style={{ animationDelay: '0.9s' }}
        >
          Skincare from the vine
        </p>

        <p
          className="text-brand-900 text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto leading-relaxed opacity-0 animate-slide-up"
          style={{ animationDelay: '1s' }}
        >
          Unbleached linen. Sun-cured vines. <br className="hidden md:block" />
          A skincare ritual grounded in the elegance of the earth.
        </p>

        <div
          className="flex flex-col md:flex-row gap-6 justify-center items-center opacity-0 animate-slide-up"
          style={{ animationDelay: '1.2s' }}
        >
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

      {/* Scroll Indicator - decorative, hidden from screen readers */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-brand-900 transition-opacity duration-500"
        style={{ opacity: scrollY > 100 ? 0 : 1 }}
      >
        <span className="text-[10px] uppercase tracking-widest animate-pulse">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
};