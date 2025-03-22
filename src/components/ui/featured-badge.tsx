
import React from 'react';

interface FeaturedBadgeProps {
  text: string;
  className?: string;
}

const FeaturedBadge: React.FC<FeaturedBadgeProps> = ({ text, className = '' }) => {
  return (
    <div className={`inline-flex items-center px-2 py-0.5 text-xs font-medium text-white bg-primary/90 backdrop-blur-sm rounded ${className}`}>
      {text}
    </div>
  );
};

export default FeaturedBadge;
