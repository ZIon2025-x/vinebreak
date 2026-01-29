import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-8 py-4 transition-all duration-300 font-serif tracking-[0.1em] text-xs uppercase flex items-center justify-center gap-3 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-brand-950 text-brand-50 hover:bg-brand-800 shadow-xl hover:shadow-2xl border border-transparent",
    outline: "border border-brand-900 text-brand-900 hover:bg-brand-900 hover:text-brand-50 backdrop-blur-sm",
    ghost: "text-brand-900 hover:bg-brand-100"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};