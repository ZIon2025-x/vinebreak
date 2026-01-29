import React, { useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';
import { ArrowUpRight } from 'lucide-react';

interface ProductsProps {
  onProductClick: (id: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onProductClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featuredProducts = PRODUCTS.slice(0, 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        },
        { 
          threshold: 0.15,
          rootMargin: "0px 0px -50px 0px" // Trigger slightly before full view
        }
    );

    const cards = sectionRef.current?.querySelectorAll('.reveal-element');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="collection" className="py-20 pb-32 bg-brand-100 relative z-10">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-brand-200/60 pb-12 reveal-element">
          <div>
             <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Small Batch Apothecary</span>
             <h2 className="text-5xl md:text-6xl text-brand-950 font-serif">The Harvest</h2>
          </div>
          <p className="text-brand-800 max-w-md font-light leading-relaxed text-right md:text-left text-lg">
            Crafted in harmony with the seasons. Aged in linen wraps to preserve potency, texture, and the raw scent of the earth.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, idx) => (
            <div 
                key={product.id} 
                className="group cursor-pointer reveal-element"
                style={{ transitionDelay: `${idx * 200}ms` }}
                onClick={() => onProductClick(product.id)}
            >
              {/* Image Container with Curtain Effect */}
              <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-brand-50 border border-brand-200 transition-colors duration-500 hover:border-brand-400">
                
                {/* THE CURTAIN: This div sits on top and scales away when .is-visible is added to parent */}
                <div className="curtain-mask absolute inset-0 bg-brand-200 z-30 pointer-events-none"></div>
                
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[1.5s] ease-out grayscale-[20%] group-hover:grayscale-0"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand-950/0 group-hover:bg-brand-950/5 transition-colors duration-500 z-10"></div>
                
                {/* Floating Tags (Fade in on Hover) */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                    {product.tags.map((tag, tIdx) => (
                        <span 
                            key={tag} 
                            className="bg-brand-50/90 backdrop-blur text-brand-950 text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border border-brand-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                            style={{ transitionDelay: `${tIdx * 100}ms` }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* View Button (Slide up on Hover) */}
                <div className="absolute bottom-4 right-4 w-12 h-12 bg-brand-950 text-brand-50 flex items-center justify-center shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-20">
                    <ArrowUpRight size={20} strokeWidth={1.5} />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-2xl text-brand-950 font-serif group-hover:text-brand-600 transition-colors duration-300">{product.name}</h3>
                <span className="text-lg font-sans text-brand-900 font-light">${product.price}</span>
              </div>
              <p className="text-brand-700 font-light text-sm leading-relaxed pr-4 border-l border-transparent pl-0 group-hover:border-brand-400 group-hover:pl-4 transition-all duration-300">
                  {product.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};