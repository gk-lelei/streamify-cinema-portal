
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
} from "@/components/ui/dialog";
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Upload, 
  Film, 
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { adminService } from '@/services/adminService';
import { Movie } from '@/lib/movies';
import { toast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';

export const ContentManagement = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      toast({
        title: "Content deleted",
        description: "The content has been successfully removed.",
      });
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
    setIsSubmitting(true);
    
    try {
      if (isEditMode && selectedMovie) {
        await adminService.updateMovie(selectedMovie.id, formData);
        toast({
          title: "Content updated",
          description: "The content has been updated successfully."
        });
      } else {
        await adminService.addMovie(formData);
        toast({
          title: "Content added",
          description: "New content has been added successfully."
        });
      }
      
      loadMovies();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error saving content",
        description: "Failed to save the content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
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

  // Loading skeletons
  const ContentTableSkeleton = () => (
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
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-4 w-8" /></TableCell>
              <TableCell><Skeleton className="h-4 w-36" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-12" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-12" /></TableCell>
              <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-4 rounded-full" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

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
        <Button onClick={handleCreateNew} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add New Content
        </Button>
      </div>

      {isLoading ? (
        <ContentTableSkeleton />
      ) : (
        <>
          {filteredMovies.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center text-muted-foreground">
              <Film className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg">No content found</p>
              <p className="text-sm">Try adjusting your search or add new content</p>
              <Button variant="outline" className="mt-4" onClick={handleCreateNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Content
              </Button>
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
                    <TableRow key={movie.id} className="hover:bg-white/5 transition-colors">
                      <TableCell className="font-medium">{movie.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {movie.thumbnailUrl && (
                            <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={movie.thumbnailUrl} 
                                alt={movie.title} 
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                                }}
                              />
                            </div>
                          )}
                          <span>{movie.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{movie.year}</TableCell>
                      <TableCell className="hidden md:table-cell">{movie.duration}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {movie.genre.map((g, i) => (
                            <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded">
                              {g}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{movie.rating}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {movie.isFeatured ? (
                          <CheckCircle className="text-green-500 h-5 w-5" />
                        ) : null}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(movie)} title="Edit content">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(movie.id)} title="Delete content">
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Enter title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="2023"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="2h 30m"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  name="rating"
                  placeholder="PG-13, R, etc."
                  value={formData.rating}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="genre">Genres</Label>
                <Input
                  id="genre"
                  name="genre"
                  placeholder="Action, Drama, Comedy (comma separated)"
                  value={formData.genre?.join(', ')}
                  onChange={handleGenreChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="Enter a description of the content"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
                <Input
                  id="thumbnailUrl"
                  name="thumbnailUrl"
                  value={formData.thumbnailUrl}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="https://example.com/thumbnail.jpg"
                />
                {formData.thumbnailUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.thumbnailUrl}
                      alt="Thumbnail preview"
                      className="w-full h-20 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverUrl">Cover URL</Label>
                <Input
                  id="coverUrl"
                  name="coverUrl"
                  value={formData.coverUrl}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  placeholder="https://example.com/cover.jpg"
                />
                {formData.coverUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.coverUrl}
                      alt="Cover preview"
                      className="w-full h-20 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured || false}
                    onChange={handleFeaturedChange}
                    className="rounded"
                    disabled={isSubmitting}
                  />
                  <span className="text-sm font-medium">Featured Content</span>
                </label>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Saving...' : isEditMode ? 'Update Content' : 'Add Content'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
