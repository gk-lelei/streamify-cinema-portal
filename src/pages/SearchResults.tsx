
import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SearchX } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import MovieCard from '@/components/ui/movie-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Movie, movieData } from '@/lib/movies';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (query) {
      setIsLoading(true);
      
      // Simulate search API call
      setTimeout(() => {
        const results = movieData.filter(movie => {
          const searchLower = query.toLowerCase();
          return (
            movie.title.toLowerCase().includes(searchLower) ||
            movie.genre.some(g => g.toLowerCase().includes(searchLower))
          );
        });
        
        setMovies(results);
        setIsLoading(false);
      }, 600);
    } else {
      setMovies([]);
      setIsLoading(false);
    }
  }, [query]);
  
  // Filter movies based on active tab
  const filteredMovies = activeTab === 'all' 
    ? movies 
    : movies.filter(movie => movie.genre.includes(activeTab));
  
  // Get unique genres from search results
  const genres = Array.from(new Set(movies.flatMap(movie => movie.genre)));
  
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      <div className="container pt-24 pb-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {query ? `Search Results for "${query}"` : 'Search'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {movies.length} {movies.length === 1 ? 'result' : 'results'} found
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-video bg-card/20 rounded-md animate-pulse" />
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <SearchX className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-medium mb-2">No results found</h2>
            <p className="text-muted-foreground mb-6">
              We couldn't find any titles matching "{query}". Please try another search term.
            </p>
            <Link to="/browse">
              <Button>Browse All</Button>
            </Link>
          </div>
        ) : (
          <>
            {genres.length > 0 && (
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="overflow-x-auto pb-2">
                  <TabsTrigger value="all">All Results ({movies.length})</TabsTrigger>
                  {genres.map(genre => {
                    const count = movies.filter(m => m.genre.includes(genre)).length;
                    return (
                      <TabsTrigger key={genre} value={genre}>
                        {genre} ({count})
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Tabs>
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMovies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
