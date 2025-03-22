
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Plus, ThumbsUp, Share2, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import ContentCarousel from '@/components/ui/content-carousel';
import { getMovieById, categories } from '@/lib/movies';
import FeaturedBadge from '@/components/ui/featured-badge';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const movie = getMovieById(id || '');
  
  // Similar movies based on genre
  const similarMovies = movie 
    ? categories.find(cat => 
        cat.movies.some(m => m.genre.some(g => movie.genre.includes(g)))
      )?.movies.filter(m => m.id !== movie.id).slice(0, 12) || []
    : [];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!movie) {
    return (
      <div className="min-h-screen bg-netflix-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
        <Link to="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      {/* Back button */}
      <div className="fixed top-20 left-4 z-20">
        <Link to="/">
          <button className="p-2 rounded-full bg-background/80 text-white backdrop-blur-xl hover:bg-background transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
      </div>
      
      {/* Hero Image */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <img 
          src={movie.coverUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 hero-gradient-overlay" />
        
        {/* Play button centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all border border-white/30 animate-scale-up">
            <Play className="w-8 h-8 text-white fill-current ml-1" />
          </button>
        </div>
      </div>
      
      {/* Movie Details */}
      <div className="px-4 md:px-12 relative -mt-24 z-10">
        <div className="bg-netflix-dark rounded-lg shadow-xl p-6 md:p-8 animate-slide-up">
          <div className="md:flex gap-8">
            {/* Poster */}
            <div className="md:w-1/4 mb-6 md:mb-0">
              <div className="aspect-[2/3] rounded-md overflow-hidden shadow-lg">
                <img 
                  src={movie.thumbnailUrl} 
                  alt={movie.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Details */}
            <div className="md:w-3/4">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-green-500 font-medium">98% Match</span>
                <span className="text-white/70">{movie.year}</span>
                <span className="text-white/70">{movie.duration}</span>
                <span className="px-1 py-0.5 text-xs border border-white/40 text-white/70">{movie.rating}</span>
                {movie.isFeatured && <FeaturedBadge text="Featured" />}
              </div>
              
              <p className="text-white/90 mb-6">
                {movie.description}
              </p>
              
              <div className="space-y-4">
                <div>
                  <span className="text-white/60">Genres: </span>
                  {movie.genre.map((g, i) => (
                    <span key={i}>
                      {g}{i < movie.genre.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="px-5 py-2 bg-white text-black rounded-sm flex items-center font-medium hover:bg-white/90 transition-colors">
                    <Play className="mr-2 w-5 h-5 fill-current" />
                    Play
                  </button>
                  
                  <button className="p-2 rounded-full bg-secondary/80 text-white border border-white/20 hover:border-white/60 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                  
                  <button className="p-2 rounded-full bg-secondary/80 text-white border border-white/20 hover:border-white/60 transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                  </button>
                  
                  <button className="p-2 rounded-full bg-secondary/80 text-white border border-white/20 hover:border-white/60 transition-colors ml-auto">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Content */}
      {similarMovies.length > 0 && (
        <div className="mt-8 pb-20">
          <ContentCarousel 
            title="More Like This" 
            movies={similarMovies} 
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
