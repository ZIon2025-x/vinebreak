import React, { useEffect, useRef, useState } from 'react';

export const Ingredients: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        // Calculate offset relative to viewport center
        const centerOffset = window.innerHeight / 2 - (rect.top + rect.height / 2);
        setOffset(centerOffset);
        
        // Handle reveal animations
        const reveals = sectionRef.current.querySelectorAll('.reveal-element');
        reveals.forEach((el) => {
            const elRect = el.getBoundingClientRect();
            if (elRect.top < window.innerHeight * 0.85) {
                el.classList.add('is-visible');
            }
        });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="ingredients" className="py-32 bg-brand-50 overflow-hidden relative z-10">
      {/* Top Gradient Blend */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-brand-100 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content - Left Side on Desktop */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="reveal-element text-brand-600 uppercase tracking-[0.2em] text-xs font-bold mb-6 block">From Soil to Skin</span>
            <h2 className="reveal-element text-5xl md:text-6xl text-brand-950 mb-12 leading-[1.1]" style={{ transitionDelay: '100ms' }}>
              Radical <br/> <span className="italic text-brand-500 font-serif">Transparency</span>
            </h2>
            
            <div className="space-y-12">
              {[
                  { id: '01', title: 'Organic Vitis Vinifera', desc: 'Sourced from sustainable vineyards in Bordeaux. Rich in Resveratrol, a powerful antioxidant that combats aging.' },
                  { id: '02', title: 'Cold-Pressed Flax', desc: 'Extracted at low temperatures to preserve 100% of the linoleic acid and Omega-3s, creating a moisture barrier that heals.' },
                  { id: '03', title: 'Zero Synthetics', desc: 'No parabens, sulfates, or artificial fragrances. Our scents come purely from essential oils, crushed petals, and wood bark.' }
              ].map((item, idx) => (
                  <div key={item.id} className="group reveal-element" style={{ transitionDelay: `${200 + (idx * 150)}ms` }}>
                    <div className="flex items-baseline gap-6 mb-3 border-b border-brand-200 pb-2 group-hover:border-brand-400 transition-colors duration-500">
                      <span className="text-brand-400 font-serif text-2xl font-light italic transition-transform duration-500 group-hover:-translate-y-1">{item.id}</span>
                      <h4 className="text-xl font-serif text-brand-950">{item.title}</h4>
                    </div>
                    <p className="text-brand-800 font-light leading-relaxed pl-12 opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.desc}
                    </p>
                  </div>
              ))}
            </div>
          </div>

          {/* Image Composition - Right Side with Deep Parallax */}
          <div className="lg:col-span-7 order-1 lg:order-2 relative h-[600px] flex items-center justify-center perspective-1000">
             {/* Decorative Circle */}
             <div className="absolute w-[500px] h-[500px] bg-brand-100 rounded-full -z-10 opacity-60 animate-[spin-slow_40s_linear_infinite]">
                 <div className="w-4 h-4 bg-brand-300 rounded-full absolute top-10 left-1/2"></div>
             </div>
             
             {/* Image 1 - Main (Moves Up strongly) */}
             <div 
                className="absolute right-0 top-0 w-3/5 h-[480px] z-10 shadow-2xl rounded-sm overflow-hidden will-change-transform"
                style={{ 
                    transform: `translateY(${offset * -0.2}px)`,
                    transition: 'transform 0.1s linear'
                }}
             >
                <div className="curtain-mask absolute inset-0 bg-brand-200 z-20"></div>
                <img 
                    src="https://images.unsplash.com/photo-1594056986854-34fd77bc956c?q=80&w=1400&auto=format&fit=crop" 
                    alt="Grape Vine" 
                    className="w-full h-full object-cover sepia-[20%] hover:scale-105 transition-transform duration-1000"
                />
             </div>
             
             {/* Image 2 - Overlap (Moves Down strongly) */}
             <div 
                className="absolute left-4 bottom-4 w-3/5 h-[420px] z-20 shadow-xl rounded-sm border-8 border-brand-50 overflow-hidden will-change-transform"
                style={{ 
                    transform: `translateY(${offset * 0.15}px)`,
                    transition: 'transform 0.1s linear'
                }}
             >
                 <div className="curtain-mask absolute inset-0 bg-brand-200 z-20" style={{ transitionDelay: '0.2s' }}></div>
                 <img 
                    src="https://images.unsplash.com/photo-1628102491629-778571d893a3?q=80&w=1000&auto=format&fit=crop" 
                    alt="Oil Texture" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000" 
                />
             </div>

             {/* Badge - Parallax Speed neutral */}
             <div className="absolute top-1/2 left-1/2 z-30 pointer-events-none" style={{ transform: `translate(-50%, -50%) translateY(${offset * 0.05}px)` }}>
                 <div className="bg-brand-950 text-brand-100 w-28 h-28 rounded-full flex items-center justify-center text-center p-2 text-xs uppercase tracking-widest font-bold shadow-2xl border border-brand-800 rotate-12">
                    100%<br/>Natural
                 </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};