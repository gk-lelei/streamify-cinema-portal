
import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '@/lib/movies';
import MovieCard from './movie-card';

interface ContentCarouselProps {
  title: string;
  movies: Movie[];
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, movies }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
      setScrollPosition(scrollLeft);
    }
  };
  
  const scrollTo = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { clientWidth } = carouselRef.current;
      const scrollAmount = clientWidth * 0.75;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount) 
        : scrollPosition + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="relative group/carousel mb-8 px-4 md:px-12">
      <h2 className="text-xl font-medium mb-3 text-white">{title}</h2>
      
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-white border border-white/10 hover:bg-background hover:border-white/30 transition-all opacity-0 group-hover/carousel:opacity-100 ${canScrollLeft ? 'visible' : 'invisible'}`}
          onClick={() => scrollTo('left')}
          disabled={!canScrollLeft}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-white border border-white/10 hover:bg-background hover:border-white/30 transition-all opacity-0 group-hover/carousel:opacity-100 ${canScrollRight ? 'visible' : 'invisible'}`}
          onClick={() => scrollTo('right')}
          disabled={!canScrollRight}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        
        {/* Movie Cards Carousel */}
        <div 
          ref={carouselRef}
          className="flex space-x-2 md:space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
          onScroll={checkScrollButtons}
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="flex-none w-[180px] md:w-[240px]">
              <MovieCard movie={movie} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCarousel;
