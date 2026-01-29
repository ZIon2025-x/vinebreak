import React from 'react';

export const StoryPage: React.FC = () => {
  return (
    <div className="bg-brand-50 min-h-screen pt-32 pb-20 animate-fadeIn">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-24">
                <span className="text-brand-600 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Our Philosophy</span>
                <h1 className="text-5xl md:text-7xl text-brand-950 font-serif mb-8 leading-tight">
                    "We do not invent.<br/> We <span className="italic text-brand-500">unearth</span>."
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32">
                <div className="relative h-[600px] bg-brand-200">
                    <img src="https://images.unsplash.com/photo-1535585209527-3db8f3523f67?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover grayscale-[30%]" alt="Vineyard" />
                    <div className="absolute inset-0 bg-brand-900/10 mix-blend-multiply"></div>
                </div>
                <div className="space-y-8">
                    <h3 className="text-3xl font-serif text-brand-950">The Cycle of the Vine</h3>
                    <p className="text-brand-800 font-light leading-relaxed text-lg">
                        Vinebreak began in a small vineyard in Bordeaux, observing the wasted potential of the harvest byproducts. 
                        The seeds, the skins, the stems—all rich in polyphenols, yet often discarded.
                    </p>
                    <p className="text-brand-800 font-light leading-relaxed text-lg">
                        We developed a cold-process method to integrate these raw materials into a soap base of olive oil and shea butter. 
                        The result is a bar that feels alive. It changes with the seasons, just as the wine does.
                    </p>
                </div>
            </div>

            <div className="bg-brand-100 p-12 md:p-24 text-center border border-brand-200">
                <h3 className="text-2xl font-serif text-brand-950 mb-6">Sustainable by Nature</h3>
                <p className="max-w-2xl mx-auto text-brand-800 font-light leading-relaxed mb-8">
                    Our packaging is made from recycled linen pulp. Our water is filtered through charcoal. 
                    We are 100% plastic-free, aiming to leave no trace but the vitality of your skin.
                </p>
                <img src="https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?q=80&w=2000&auto=format&fit=crop" className="w-32 h-32 rounded-full object-cover mx-auto opacity-80 mix-blend-multiply" alt="Texture" />
            </div>
        </div>
    </div>
  );
};
