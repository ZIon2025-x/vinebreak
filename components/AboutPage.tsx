import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-50 min-h-screen pt-32 pb-20 animate-fadeIn">
        <div className="container mx-auto px-6">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-20">
                <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">The Estate</span>
                <h1 className="text-5xl md:text-7xl text-brand-950 font-serif mb-8">Rooted in Bordeaux</h1>
                <p className="text-brand-800 font-light leading-relaxed text-lg">
                    Vinebreak is not just a brand; it is a living ecosystem. Located on the edge of a historic vineyard, 
                    we work hand-in-hand with viticulturists to give new purpose to the harvest.
                </p>
            </div>

            {/* Split Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-32">
                 <div className="relative">
                     <div className="aspect-[4/5] bg-brand-200 overflow-hidden">
                         <img 
                            src="https://images.unsplash.com/photo-1565553587040-5a953bc96562?q=80&w=1974&auto=format&fit=crop" 
                            alt="The Founders" 
                            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700" 
                         />
                     </div>
                     <div className="absolute -bottom-8 -right-8 bg-brand-100 p-8 border border-brand-200 shadow-lg max-w-xs hidden md:block">
                         <p className="font-serif italic text-brand-950 text-xl mb-2">"We measure time in seasons, not seconds."</p>
                         <p className="text-xs uppercase tracking-widest text-brand-500">— Elena & Marc, Founders</p>
                     </div>
                 </div>
                 
                 <div className="space-y-12 lg:pt-12">
                     <div>
                         <h3 className="text-2xl font-serif text-brand-950 mb-4">The Atelier</h3>
                         <p className="text-brand-800 font-light leading-relaxed">
                             Our soap-curing room is built with limestone walls to maintain constant humidity. 
                             Here, soaps rest for six weeks on reclaimed oak racks. This slow process allows water to evaporate 
                             gradually, resulting in a milder, longer-lasting bar.
                         </p>
                     </div>
                     <div>
                         <h3 className="text-2xl font-serif text-brand-950 mb-4">Community</h3>
                         <p className="text-brand-800 font-light leading-relaxed">
                             We partner exclusively with small-yield vineyards that practice regenerative farming. 
                             Every purchase supports the preservation of heritage vines and the soil that feeds them.
                         </p>
                     </div>
                     <div className="border-t border-brand-200 pt-8">
                         <div className="grid grid-cols-3 gap-8 text-center">
                             <div>
                                 <span className="block text-4xl font-serif text-brand-900 mb-2">2024</span>
                                 <span className="text-[10px] uppercase tracking-widest text-brand-500">Established</span>
                             </div>
                             <div>
                                 <span className="block text-4xl font-serif text-brand-900 mb-2">100%</span>
                                 <span className="text-[10px] uppercase tracking-widest text-brand-500">Plant-Based</span>
                             </div>
                             <div>
                                 <span className="block text-4xl font-serif text-brand-900 mb-2">Fr</span>
                                 <span className="text-[10px] uppercase tracking-widest text-brand-500">Origin</span>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>

            {/* Quote */}
            <div className="bg-brand-950 py-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <p className="font-serif text-3xl md:text-5xl text-brand-50 italic leading-snug mb-8">
                        "Luxury is the time it takes to create something simple."
                    </p>
                    <div className="w-16 h-px bg-brand-700 mx-auto"></div>
                </div>
            </div>

        </div>
    </div>
  );
};