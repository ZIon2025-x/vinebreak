export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  tags: string[];
  scentProfile: {
    top: string;
    heart: string;
    base: string;
  };
  benefits: string[];
  ritual: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export type PageView =
  | { type: 'home' }
  | { type: 'catalog' }
  | { type: 'product'; productId: string }
  | { type: 'story' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'cart' }
  | { type: 'checkout' }
  | { type: 'orderConfirmation'; orderId: string }
  | { type: 'privacy' }
  | { type: 'terms' }
  | { type: 'faq' };
