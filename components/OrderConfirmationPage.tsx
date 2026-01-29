import React from 'react';
import { Button } from './Button';
import { CheckCircle } from 'lucide-react';
import { PageView } from '../types';

interface OrderConfirmationPageProps {
  orderId: string;
  onNavigate: (view: PageView) => void;
}

export const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId, onNavigate }) => {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-brand-50 flex flex-col items-center justify-center text-center px-6 animate-fadeIn">
      <div className="max-w-lg mx-auto">
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-brand-200 flex items-center justify-center text-brand-700">
          <CheckCircle size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-brand-950 mb-4">Thank you</h1>
        <p className="text-brand-800 font-light mb-2">
          Your order has been placed successfully.
        </p>
        <p className="text-sm text-brand-500 uppercase tracking-widest mb-8">Order number</p>
        <p className="font-serif text-2xl text-brand-950 mb-12 tracking-wide">{orderId}</p>
        <p className="text-brand-700 font-light text-sm mb-10 max-w-md">
          A confirmation email would be sent to you in a live environment. All shipments are packed in recycled linen and shipped carbon-neutral from Bordeaux.
        </p>
        <Button onClick={() => onNavigate({ type: 'catalog' })}>Continue shopping</Button>
      </div>
    </div>
  );
};
