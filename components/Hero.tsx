import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { PageView } from '../types';

interface HeroProps {
  onNavigate: (view: PageView) => void;
}

// 本地 Hero 背景图（public/images/hero/ 下可选）：
// hero-1-grapes-on-vine.jpg  葡萄串与藤蔓（Napa）
// hero-2-grapevine-closeup.jpg  葡萄藤特写
// hero-3-vineyard-rows.jpg  葡萄园行
// hero-4-grapes.jpg  葡萄
const HERO_BG_IMAGE = '/images/hero/hero-2-grapevine-closeup.jpg';

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgError, setBgError] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(() => {
        if (heroRef.current) setScrollY(window.scrollY);
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
      {/* Parallax Background Image - 轻微虚化 + 透明度，便于融入背景色 */}
      <div
        className="absolute inset-0 z-0 overflow-hidden will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.15)` }}
      >
        {!bgError && (
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${bgLoaded ? 'opacity-90' : 'opacity-0'}`}
            style={{ filter: 'blur(3px)' }}
          >
            <img
              src={HERO_BG_IMAGE}
              alt=""
              role="presentation"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
              onLoad={() => setBgLoaded(true)}
              onError={() => setBgError(true)}
            />
          </div>
        )}
      </div>

      {/* 渐变遮罩：从四边融入背景色 brand-200，中间保留图片 */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: bgError
            ? 'linear-gradient(to bottom, rgba(243,239,233,0.6), rgba(243,239,233,0.3), rgba(243,239,233,0.95))'
            : undefined,
        }}
      >
        {!bgError && (
          <>
            {/* 上下左右向中心淡出，融入 #E6DDD0 (brand-200) */}
            <div
              className="absolute inset-0 opacity-90"
              style={{
                background: `
                  linear-gradient(to bottom, #E6DDD0 0%, transparent 25%),
                  linear-gradient(to top, #E6DDD0 0%, transparent 25%),
                  linear-gradient(to right, #E6DDD0 0%, transparent 22%),
                  linear-gradient(to left, #E6DDD0 0%, transparent 22%)
                `,
              }}
            />
            {/* 顶部略深、底部略深，保证文字可读 */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-100/40 via-transparent to-brand-100/80" />
          </>
        )}
      </div>
      
      {/* Content Layer - Moves slightly faster upwards (factor -0.3) */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto w-full"
           style={{ transform: `translateY(${scrollY * -0.3}px)` }} 
      >
        <div
          className="inline-block border border-brand-900/30 bg-brand-100/60 backdrop-blur-md px-8 py-3 rounded-full mb-6 opacity-0 animate-unblur"
          style={{ animationDelay: '0.2s' }}
        >
          <span className="text-brand-950 tracking-[0.4em] uppercase text-[10px] font-bold">
            Est. 2026 • Bordeaux
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl text-brand-950 mb-4 leading-none tracking-tight font-medium"
          style={{
            textShadow:
              '0 1px 2px rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)',
          }}
        >
          <span className="block opacity-0 animate-unblur" style={{ animationDelay: '0.5s' }}>Raw</span>
          <span className="block font-light italic text-brand-800 font-serif opacity-0 animate-unblur -mt-1 md:-mt-3" style={{ animationDelay: '0.8s' }}>Luxury</span>
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-brand-900 transition-opacity duration-500 px-4 py-3 rounded-full bg-brand-100/80 backdrop-blur-sm border border-brand-200/60"
        style={{ opacity: scrollY > 100 ? 0 : 1 }}
      >
        <span className="text-[10px] uppercase tracking-widest animate-pulse">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
};