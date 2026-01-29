import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', variant = 'rectangular' }) => {
  const baseClass = 'animate-pulse bg-brand-200';
  const variantClass =
    variant === 'circular'
      ? 'rounded-full'
      : variant === 'text'
        ? 'rounded h-4'
        : 'rounded';
  return <div className={`${baseClass} ${variantClass} ${className}`} aria-hidden="true" />;
};

interface SkeletonImageProps {
  aspectRatio?: string;
  className?: string;
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  aspectRatio = 'aspect-[4/5]',
  className = '',
}) => {
  return (
    <Skeleton className={`w-full ${aspectRatio} ${className}`} variant="rectangular" />
  );
};
