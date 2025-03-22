
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Admin user interface
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin: Date;
  permissions: string[];
  avatar?: string;
}

// Mock admin users for demo
const MOCK_ADMIN_USERS: AdminUser[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@netflix.com',
    role: 'admin',
    lastLogin: new Date(),
    permissions: ['read', 'write', 'delete', 'publish', 'manage_users', 'manage_roles', 'system_settings'],
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=random'
  },
  {
    id: '2',
    username: 'editor',
    email: 'editor@netflix.com',
    role: 'editor',
    lastLogin: new Date(),
    permissions: ['read', 'write', 'publish'],
    avatar: 'https://ui-avatars.com/api/?name=Editor&background=random'
  },
  {
    id: '3',
    username: 'viewer',
    email: 'viewer@netflix.com',
    role: 'viewer',
    lastLogin: new Date(),
    permissions: ['read'],
    avatar: 'https://ui-avatars.com/api/?name=Viewer&background=random'
  }
];

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionExpiry, setSessionExpiry] = useState<Date | null>(null);

  // Check if user has a specific permission
  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false;
    return currentUser.permissions.includes(permission);
  };

  useEffect(() => {
    // Mock authentication check
    const checkAuth = () => {
      setIsLoading(true);
      
      // Check for saved auth in localStorage (in a real app, you'd check JWT, etc.)
      const savedAuth = localStorage.getItem('adminAuth');
      let user: AdminUser | null = null;
      
      if (savedAuth) {
        try {
          const parsedAuth = JSON.parse(savedAuth);
          const foundUser = MOCK_ADMIN_USERS.find(u => u.id === parsedAuth.userId);
          
          if (foundUser) {
            user = {
              ...foundUser,
              lastLogin: new Date()
            };
          }
        } catch (error) {
          console.error('Failed to parse saved auth:', error);
        }
      }
      
      // Simulate API delay
      setTimeout(() => {
        // For demo purposes, default to admin if no saved auth
        if (!user) {
          user = MOCK_ADMIN_USERS[0];
          
          // Save to localStorage
          localStorage.setItem('adminAuth', JSON.stringify({
            userId: user.id,
            timestamp: new Date().toISOString()
          }));
        }
        
        // Set session expiry (4 hours from now)
        const expiry = new Date();
        expiry.setHours(expiry.getHours() + 4);
        setSessionExpiry(expiry);
        
        setCurrentUser(user);
        setIsAuthenticated(true);
        setIsLoading(false);
      }, 800);
    };

    checkAuth();
    
    // Set up session check interval
    const interval = setInterval(() => {
      if (sessionExpiry && new Date() > sessionExpiry) {
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive"
        });
        logout();
      }
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate login API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find matching user
        const user = MOCK_ADMIN_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        if (user && password) {
          // Success - in a real app, you'd validate the password
          setCurrentUser(user);
          setIsAuthenticated(true);
          
          // Set session expiry (4 hours from now)
          const expiry = new Date();
          expiry.setHours(expiry.getHours() + 4);
          setSessionExpiry(expiry);
          
          // Save to localStorage
          localStorage.setItem('adminAuth', JSON.stringify({
            userId: user.id,
            timestamp: new Date().toISOString()
          }));
          
          toast({
            title: "Logged in successfully",
            description: `Welcome back, ${user.username}!`,
          });
          
          resolve(true);
        } else {
          // Failed login
          setCurrentUser(null);
          setIsAuthenticated(false);
          
          toast({
            title: "Login failed",
            description: "Invalid email or password. Please try again.",
            variant: "destructive"
          });
          
          resolve(false);
        }
        
        setIsLoading(false);
      }, 1200);
    });
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    // Simulate logout API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Clear auth state
        setCurrentUser(null);
        setIsAuthenticated(false);
        setSessionExpiry(null);
        
        // Clear localStorage
        localStorage.removeItem('adminAuth');
        
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account.",
        });
        
        setIsLoading(false);
        resolve();
      }, 500);
    });
  };

  // Switch user role - for demo purposes
  const switchRole = (role: 'admin' | 'editor' | 'viewer'): void => {
    const newUser = MOCK_ADMIN_USERS.find(u => u.role === role);
    
    if (newUser) {
      setCurrentUser(newUser);
      
      toast({
        title: "Role switched",
        description: `You are now using the ${role} role.`,
      });
      
      // Update localStorage
      localStorage.setItem('adminAuth', JSON.stringify({
        userId: newUser.id,
        timestamp: new Date().toISOString()
      }));
    }
  };

  return {
    isAuthenticated,
    currentUser,
    isLoading,
    sessionExpiry,
    login,
    logout,
    hasPermission,
    switchRole
  };
};
