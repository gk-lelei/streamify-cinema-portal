
import React from 'react';
import VideoPlayer from './video-player';
import { Movie } from '@/lib/movies';

interface HeroProps {
  movie: Movie;
}

const Hero: React.FC<HeroProps> = ({ movie }) => {
  return (
    <div className="relative">
      <VideoPlayer 
        title={movie.title}
        description={movie.description}
        videoUrl={movie.trailerUrl}
        backdropUrl={movie.coverUrl}
        movieId={movie.id}
      />
    </div>
  );
};

export default Hero;
