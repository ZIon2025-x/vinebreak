import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Deep Roots',
    price: 42,
    description: 'Intense exfoliation with crushed vine seeds and activated charcoal for renewal.',
    longDescription: 'A vigorous exfoliant born from the vineyard floor. We crush dried Cabernet seeds and blend them with activated charcoal to create a bar that scrubs away the old to reveal the new. Dark, grounding, and intensely renewing.',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=2070&auto=format&fit=crop',
    gallery: [
       'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=2070&auto=format&fit=crop',
       'https://images.unsplash.com/photo-1596144869809-58b9015822f7?q=80&w=2000&auto=format&fit=crop'
    ],
    tags: ['Renewal', 'Earthy', 'Exfoliant'],
    scentProfile: {
      top: 'Dried Sage',
      heart: 'Black Pepper',
      base: 'Charcoal & Vetiver'
    },
    benefits: ['Deep Exfoliation', 'Detoxifying', 'Circulation Boost'],
    ritual: 'Massage firmly into wet skin in circular motions, focusing on elbows and heels. Rinse with cool water to seal the pores.'
  },
  {
    id: '2',
    name: 'Linen Pure',
    price: 38,
    description: 'Our gentlest bar. Infused with flax oil and white grape essence for a silk-like finish.',
    longDescription: 'Inspired by the fresh linens used to wrap our cured soaps. This bar is stripped of all harshness, relying on cold-pressed flax oil to restore the skin\'s lipid barrier. A whisper of white grape adds a faint, clean sweetness.',
    image: 'https://images.unsplash.com/photo-1614806687006-259169fa12ba?q=80&w=1974&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1614806687006-259169fa12ba?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516053327668-3e42125f4648?q=80&w=2000&auto=format&fit=crop'
    ],
    tags: ['Sensitive', 'Softening', 'Hydrating'],
    scentProfile: {
      top: 'Fresh Hay',
      heart: 'White Grape',
      base: 'Unbleached Cotton'
    },
    benefits: ['Barrier Repair', 'Soothing', 'Ultra-Hydrating'],
    ritual: 'Lather between palms until a creamy foam appears. Apply gently to face and body. Safe for the most sensitive skin types.'
  },
  {
    id: '3',
    name: 'Golden Harvest',
    price: 40,
    description: 'A radiant blend of amber, honey, and late-harvest grape extract.',
    longDescription: 'Capturing the golden hour in the vineyard. This bar is rich in natural sugars from late-harvest grapes and raw wild honey, acting as a natural humectant that draws moisture into the skin. Warm, glowing, and opulent.',
    image: 'https://images.unsplash.com/photo-1607006412351-51ae7d8d2d6d?q=80&w=1974&auto=format&fit=crop',
    gallery: [
        'https://images.unsplash.com/photo-1607006412351-51ae7d8d2d6d?q=80&w=1974&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1615486511484-92e172cc416d?q=80&w=2000&auto=format&fit=crop'
    ],
    tags: ['Radiance', 'Vitamin E', 'Rich'],
    scentProfile: {
      top: 'Bergamot',
      heart: 'Wild Honey',
      base: 'Golden Amber'
    },
    benefits: ['Brightening', 'Moisture Lock', 'Antioxidant Rich'],
    ritual: 'Use in a hot bath. Allow the steam to release the amber notes. Let the lather sit on the skin for a moment before rinsing.'
  },
  {
      id: '4',
      name: 'Night Vine',
      price: 45,
      description: 'A midnight blend of jasmine and dark grape skin.',
      longDescription: 'For the evening ritual. Heavy with the scent of night-blooming jasmine and the tannins of dark grape skins. This bar is designed to calm the mind and prepare the body for rest.',
      image: 'https://images.unsplash.com/photo-1617066827299-b1d51a6659c2?q=80&w=2000&auto=format&fit=crop',
      gallery: [
          'https://images.unsplash.com/photo-1617066827299-b1d51a6659c2?q=80&w=2000&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1605265058694-55444a778b40?q=80&w=2000&auto=format&fit=crop'
      ],
      tags: ['Relaxing', 'Floral', 'Night'],
      scentProfile: {
          top: 'Moonflower',
          heart: 'Jasmine',
          base: 'Dark Musk'
      },
      benefits: ['Calming', 'Softening', 'Aromatherapeutic'],
      ritual: 'Best used before sleep. Inhale deeply while lathering to engage the olfactory senses.'
  }
];