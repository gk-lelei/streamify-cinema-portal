
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import ContentCarousel from '@/components/ui/content-carousel';
import { categories, movieData } from '@/lib/movies';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState('Browse All');
  const [filteredMovies, setFilteredMovies] = useState(movieData);
  
  const categoryParam = searchParams.get('category');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (categoryParam) {
      switch (categoryParam.toLowerCase()) {
        case 'tv':
          setTitle('TV Shows');
          break;
        case 'movies':
          setTitle('Movies');
          break;
        case 'new':
          setTitle('New & Popular');
          break;
        default:
          setTitle('Browse All');
      }
    }
  }, [categoryParam]);
  
  // Group movies by genre for display
  const genreGroups = React.useMemo(() => {
    const genres = new Set<string>();
    filteredMovies.forEach(movie => {
      movie.genre.forEach(genre => genres.add(genre));
    });
    
    return Array.from(genres).map(genre => ({
      name: genre,
      movies: filteredMovies.filter(movie => movie.genre.includes(genre))
    }));
  }, [filteredMovies]);
  
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      {/* Page Header */}
      <div className="pt-24 pb-4 px-4 md:px-12">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
      </div>
      
      {/* Content Section */}
      <div className="pb-20">
        {categoryParam === 'new' ? (
          <ContentCarousel
            title="Latest Releases"
            movies={filteredMovies.sort((a, b) => b.year - a.year).slice(0, 8)}
          />
        ) : (
          <>
            {/* Display categories */}
            {categories.map((category) => (
              <ContentCarousel
                key={category.id}
                title={category.name}
                movies={category.movies}
              />
            ))}
            
            {/* Display genre-based groups */}
            {genreGroups.map((group) => (
              <ContentCarousel
                key={group.name}
                title={group.name}
                movies={group.movies}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;
