
import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const updatePosition = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      setIsScrolled(position > 50);
    };
    
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    
    return () => window.removeEventListener('scroll', updatePosition);
  }, []);
  
  return { scrollPosition, isScrolled };
}
