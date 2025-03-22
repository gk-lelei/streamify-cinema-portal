
import React, { useState } from 'react';
import { Play, Info, Plus, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Movie } from '@/lib/movies';
import FeaturedBadge from './featured-badge';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <div 
      className={`relative group rounded-md overflow-hidden transition-all-smooth movie-card-shadow transform ${isHovered ? 'scale-110 z-10' : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail Image */}
      <div className="aspect-video bg-secondary/40 relative">
        <img 
          src={movie.thumbnailUrl} 
          alt={movie.title}
          className="w-full h-full object-cover object-center transition-all duration-500"
          loading="lazy"
        />
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex flex-col transition-opacity animate-fade-in">
            {/* Preview Video would go here in a real implementation */}
            
            {/* Movie Info */}
            <div className="mt-auto p-3 space-y-2 opacity-0 animate-slide-up" style={{ animationDelay: '150ms' }}>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </button>
                
                <button className="w-8 h-8 rounded-full bg-secondary/80 text-white flex items-center justify-center border border-white/20 hover:border-white/60 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
                
                <button className="w-8 h-8 rounded-full bg-secondary/80 text-white flex items-center justify-center border border-white/20 hover:border-white/60 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                
                <Link to={`/movie/${movie.id}`} className="ml-auto">
                  <button className="w-8 h-8 rounded-full bg-secondary/80 text-white flex items-center justify-center border border-white/20 hover:border-white/60 transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </Link>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-white line-clamp-1">{movie.title}</h3>
                
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-green-500 font-medium">98% Match</span>
                  <span className="text-white/70">{movie.duration}</span>
                  <span className="px-1 text-[10px] border border-white/40 text-white/70">{movie.rating}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {movie.genre.slice(0, 2).map((genre, i) => (
                    <span key={i} className="text-[10px] text-white/70">
                      {genre}{i < Math.min(movie.genre.length, 2) - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
