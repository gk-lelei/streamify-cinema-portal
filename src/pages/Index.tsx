
import React, { useEffect } from 'react';
import Navbar from '@/components/ui/navbar';
import Hero from '@/components/ui/hero';
import ContentCarousel from '@/components/ui/content-carousel';
import { getFeaturedMovie, categories } from '@/lib/movies';

const Index = () => {
  // Get featured movie for the hero section
  const featuredMovie = getFeaturedMovie();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      {featuredMovie && (
        <Hero movie={featuredMovie} />
      )}
      
      {/* Content Sections */}
      <div className="relative z-10 -mt-16 pb-20">
        {categories.map((category) => (
          <ContentCarousel
            key={category.id}
            title={category.name}
            movies={category.movies}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
