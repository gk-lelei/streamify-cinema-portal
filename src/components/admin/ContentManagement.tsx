
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Upload, 
  Film, 
  CheckCircle 
} from 'lucide-react';
import { adminService } from '@/services/adminService';
import { Movie } from '@/lib/movies';
import { toast } from '@/components/ui/use-toast';

export const ContentManagement = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Movie>>({
    title: '',
    description: '',
    thumbnailUrl: '',
    coverUrl: '',
    year: new Date().getFullYear(),
    duration: '',
    genre: [],
    rating: 'PG-13'
  });

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getMovies();
      setMovies(data);
    } catch (error) {
      toast({
        title: "Error loading content",
        description: "Failed to load movies. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateNew = () => {
    setSelectedMovie(null);
    setFormData({
      title: '',
      description: '',
      thumbnailUrl: '',
      coverUrl: '',
      year: new Date().getFullYear(),
      duration: '',
      genre: [],
      rating: 'PG-13'
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.title,
      description: movie.description,
      thumbnailUrl: movie.thumbnailUrl,
      coverUrl: movie.coverUrl,
      year: movie.year,
      duration: movie.duration,
      genre: movie.genre,
      rating: movie.rating,
      isFeatured: movie.isFeatured
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;
    
    try {
      await adminService.deleteMovie(id);
      loadMovies();
    } catch (error) {
      toast({
        title: "Error deleting content",
        description: "Failed to delete the movie. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditMode && selectedMovie) {
        await adminService.updateMovie(selectedMovie.id, formData);
      } else {
        await adminService.addMovie(formData);
      }
      
      loadMovies();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error saving content",
        description: "Failed to save the movie. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genres = e.target.value.split(',').map(g => g.trim());
    setFormData(prev => ({ ...prev, genre: genres }));
  };

  const handleFeaturedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, isFeatured: e.target.checked }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            className="pl-8"
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Content
        </Button>
      </div>

      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading content...</div>
        </div>
      ) : (
        <>
          {filteredMovies.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center text-muted-foreground">
              <Film className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg">No content found</p>
              <p className="text-sm">Try adjusting your search or add new content</p>
            </div>
          ) : (
            <div className="border border-white/10 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Year</TableHead>
                    <TableHead className="hidden md:table-cell">Duration</TableHead>
                    <TableHead className="hidden md:table-cell">Genre</TableHead>
                    <TableHead className="hidden md:table-cell">Rating</TableHead>
                    <TableHead className="hidden md:table-cell">Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMovies.map((movie) => (
                    <TableRow key={movie.id}>
                      <TableCell className="font-medium">{movie.id}</TableCell>
                      <TableCell>{movie.title}</TableCell>
                      <TableCell className="hidden md:table-cell">{movie.year}</TableCell>
                      <TableCell className="hidden md:table-cell">{movie.duration}</TableCell>
                      <TableCell className="hidden md:table-cell">{movie.genre.join(', ')}</TableCell>
                      <TableCell className="hidden md:table-cell">{movie.rating}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {movie.isFeatured ? (
                          <CheckCircle className="text-green-500 h-5 w-5" />
                        ) : null}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(movie)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(movie.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Content' : 'Add New Content'}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? 'Update the information for this content item.' 
                : 'Fill in the details to add new content to the platform.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">Title</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="year" className="block text-sm font-medium">Year</label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="duration" className="block text-sm font-medium">Duration</label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="2h 30m"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="rating" className="block text-sm font-medium">Rating</label>
                <Input
                  id="rating"
                  name="rating"
                  placeholder="PG-13, R, etc."
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="genre" className="block text-sm font-medium">Genres</label>
                <Input
                  id="genre"
                  name="genre"
                  placeholder="Action, Drama, Comedy (comma separated)"
                  value={formData.genre?.join(', ')}
                  onChange={handleGenreChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="thumbnailUrl" className="block text-sm font-medium">Thumbnail URL</label>
                <Input
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  value={formData.thumbnailUrl}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="coverUrl" className="block text-sm font-medium">Cover URL</label>
                <Input
                  id="coverUrl"
                  name="coverUrl"
                  value={formData.coverUrl}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured || false}
                    onChange={handleFeaturedChange}
                    className="rounded"
                  />
                  <span className="text-sm font-medium">Featured Content</span>
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? 'Update Content' : 'Add Content'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
