
import { toast } from '@/components/ui/use-toast';
import { Movie } from '@/lib/movies';

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'pending';
  plan: 'basic' | 'standard' | 'premium';
  createdAt: Date;
  lastLogin: Date;
}

// Analytics types
export interface AnalyticsData {
  views: number[];
  users: number[];
  revenue: number[];
  retention: number[];
  dates: string[];
}

// Content Management
let mockMovies: Movie[] = []; // Will be populated from actual movies

// User Management
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    plan: 'premium',
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date('2023-06-10')
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    plan: 'standard',
    createdAt: new Date('2023-02-20'),
    lastLogin: new Date('2023-06-12')
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'suspended',
    plan: 'basic',
    createdAt: new Date('2023-03-10'),
    lastLogin: new Date('2023-05-05')
  },
  {
    id: '4',
    name: 'Sara Williams',
    email: 'sara@example.com',
    status: 'pending',
    plan: 'premium',
    createdAt: new Date('2023-05-25'),
    lastLogin: new Date('2023-06-14')
  }
];

// Mock analytics data
const generateAnalyticsData = (): AnalyticsData => {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (30 - i));
    return date.toISOString().split('T')[0];
  });

  // Generate some random data with upward trends
  const baseViews = 5000;
  const baseUsers = 1000;
  const baseRevenue = 10000;
  const baseRetention = 75;

  const views = dates.map((_, i) => Math.floor(baseViews + (baseViews * 0.05 * i) + (Math.random() * 1000)));
  const users = dates.map((_, i) => Math.floor(baseUsers + (baseUsers * 0.03 * i) + (Math.random() * 200)));
  const revenue = dates.map((_, i) => Math.floor(baseRevenue + (baseRevenue * 0.02 * i) + (Math.random() * 500)));
  const retention = dates.map((_, i) => Math.min(100, Math.floor(baseRetention + (0.2 * i) + (Math.random() * 5))));

  return { views, users, revenue, retention, dates };
};

// Admin service functions
export const adminService = {
  // Content Management
  getMovies: async (): Promise<Movie[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Use our movies from the lib
    return mockMovies;
  },
  
  addMovie: async (movie: Partial<Movie>): Promise<Movie> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newMovie = {
      ...movie,
      id: `${mockMovies.length + 1}`,
    } as Movie;
    
    mockMovies.push(newMovie);
    
    toast({
      title: "Content Added",
      description: `"${movie.title}" has been added to the library.`,
    });
    
    return newMovie;
  },
  
  updateMovie: async (id: string, updates: Partial<Movie>): Promise<Movie> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = mockMovies.findIndex(movie => movie.id === id);
    if (index === -1) throw new Error("Movie not found");
    
    const updatedMovie = { ...mockMovies[index], ...updates };
    mockMovies[index] = updatedMovie;
    
    toast({
      title: "Content Updated",
      description: `"${updatedMovie.title}" has been updated.`,
    });
    
    return updatedMovie;
  },
  
  deleteMovie: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const index = mockMovies.findIndex(movie => movie.id === id);
    if (index === -1) throw new Error("Movie not found");
    
    const title = mockMovies[index].title;
    mockMovies = mockMovies.filter(movie => movie.id !== id);
    
    toast({
      title: "Content Removed",
      description: `"${title}" has been removed from the library.`,
    });
  },
  
  // User Management
  getUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockUsers];
  },
  
  addUser: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser = {
      ...user,
      id: `${mockUsers.length + 1}`,
      createdAt: new Date(),
    } as User;
    
    mockUsers.push(newUser);
    
    toast({
      title: "User Added",
      description: `${user.name} has been added as a new user.`,
    });
    
    return newUser;
  },
  
  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error("User not found");
    
    const updatedUser = { ...mockUsers[index], ...updates };
    mockUsers[index] = updatedUser;
    
    toast({
      title: "User Updated",
      description: `${updatedUser.name}'s information has been updated.`,
    });
    
    return updatedUser;
  },
  
  deleteUser: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error("User not found");
    
    const name = mockUsers[index].name;
    mockUsers.splice(index, 1);
    
    toast({
      title: "User Removed",
      description: `${name} has been removed from the platform.`,
    });
  },
  
  // Analytics
  getAnalytics: async (): Promise<AnalyticsData> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateAnalyticsData();
  },
  
  // Security
  getSecurityLogs: async (): Promise<{ timestamp: Date, action: string, user: string, ip: string }[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate mock security logs
    return Array.from({ length: 20 }, (_, i) => {
      const date = new Date();
      date.setHours(date.getHours() - i);
      
      const actions = [
        "Login attempt",
        "Password changed",
        "Profile updated",
        "Admin panel accessed",
        "Content modified",
        "API key generated",
        "User permissions changed"
      ];
      
      const users = ["admin@netflix.com", "john@example.com", "jane@example.com", "mike@example.com"];
      
      return {
        timestamp: date,
        action: actions[Math.floor(Math.random() * actions.length)],
        user: users[Math.floor(Math.random() * users.length)],
        ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
      };
    });
  },
  
  // Initialize the service by importing movie data
  initialize: (movies: Movie[]) => {
    mockMovies = [...movies];
  }
};
