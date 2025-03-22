
import React, { useState, useEffect } from 'react';
import { Heart, Trash2, Filter, Search } from 'lucide-react';
import Navbar from '@/components/ui/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { Movie, movieData } from '@/lib/movies';

const MyList = () => {
  const { toast } = useToast();
  const [myList, setMyList] = useState<Movie[]>([]);
  const [filteredList, setFilteredList] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Load saved list from localStorage
  useEffect(() => {
    const loadMyList = () => {
      setIsLoading(true);
      
      // Simulate API call to get user's list
      setTimeout(() => {
        // For demo purposes, let's use some random movies from the movieData
        const savedList = localStorage.getItem('myList');
        
        if (savedList) {
          try {
            const parsedList = JSON.parse(savedList);
            const movies = parsedList.map((id: string) => 
              movieData.find(movie => movie.id === id)
            ).filter(Boolean);
            setMyList(movies);
            setFilteredList(movies);
          } catch (error) {
            console.error('Failed to parse saved list:', error);
            
            // Fallback to random movies
            const randomMovies = [...movieData]
              .sort(() => 0.5 - Math.random())
              .slice(0, 6);
            setMyList(randomMovies);
            setFilteredList(randomMovies);
          }
        } else {
          // If no saved list, use random movies for demo
          const randomMovies = [...movieData]
            .sort(() => 0.5 - Math.random())
            .slice(0, 6);
          setMyList(randomMovies);
          setFilteredList(randomMovies);
          
          // Save to localStorage for future demo
          localStorage.setItem('myList', JSON.stringify(randomMovies.map(m => m.id)));
        }
        
        setIsLoading(false);
      }, 800);
    };
    
    loadMyList();
  }, []);
  
  // Filter movies based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredList(myList);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = myList.filter(movie => 
        movie.title.toLowerCase().includes(term) || 
        movie.genre.some(g => g.toLowerCase().includes(term))
      );
      setFilteredList(filtered);
    }
  }, [searchTerm, myList]);
  
  const handleRemoveMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  
  const confirmRemove = () => {
    if (!selectedMovie) return;
    
    const updatedList = myList.filter(m => m.id !== selectedMovie.id);
    setMyList(updatedList);
    setFilteredList(updatedList);
    
    // Update localStorage
    localStorage.setItem('myList', JSON.stringify(updatedList.map(m => m.id)));
    
    toast({
      title: 'Removed from My List',
      description: `"${selectedMovie.title}" has been removed from your list.`,
    });
    
    setSelectedMovie(null);
  };
  
  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      <div className="container pt-24 pb-16 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My List</h1>
            <p className="text-muted-foreground mt-1">{myList.length} {myList.length === 1 ? 'title' : 'titles'}</p>
          </div>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search in My List"
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card/20 rounded-md overflow-hidden">
                <div className="aspect-video bg-card/20 animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-card/30 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-card/30 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-medium mb-2">
              {searchTerm ? 'No matching titles found' : 'Your list is empty'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? 'Try a different search term or clear your search.' 
                : 'Add movies and TV shows to your list to watch them later.'}
            </p>
            {searchTerm ? (
              <Button onClick={() => setSearchTerm('')}>Clear Search</Button>
            ) : (
              <Link to="/browse">
                <Button>Browse Movies & Shows</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredList.map((movie) => (
              <Card key={movie.id} className="overflow-hidden bg-card/20 border-white/5 group hover:border-white/20 transition-all">
                <div className="relative">
                  <img 
                    src={movie.thumbnailUrl} 
                    alt={movie.title}
                    className="w-full aspect-video object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Link to={`/movie/${movie.id}`}>
                        <Button variant="outline" size="sm" className="rounded-full">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="rounded-full"
                        onClick={() => handleRemoveMovie(movie)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium line-clamp-1">{movie.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Confirmation Dialog */}
      <Dialog open={!!selectedMovie} onOpenChange={(open) => !open && setSelectedMovie(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove from My List</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove "{selectedMovie?.title}" from your list?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedMovie(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmRemove}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyList;
