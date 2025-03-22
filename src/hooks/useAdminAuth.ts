
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Simple mock admin auth hook
export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  lastLogin: Date;
}

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Mock authentication check
    const checkAuth = () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        // Default admin user
        setCurrentUser({
          id: '1',
          username: 'admin',
          email: 'admin@netflix.com',
          role: 'admin',
          lastLogin: new Date()
        });
        setIsAuthenticated(true);
        setIsLoading(false);
      }, 500);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Always succeed in this mock version
    setCurrentUser({
      id: '1',
      username: 'admin',
      email,
      role: 'admin',
      lastLogin: new Date()
    });
    setIsAuthenticated(true);
    setIsLoading(false);
    toast({
      title: "Logged in successfully",
      description: `Welcome back, ${email}!`,
    });
    
    return true;
  };

  const logout = async () => {
    setIsLoading(true);
    
    // Simulate logout API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  return {
    isAuthenticated,
    currentUser,
    isLoading,
    login,
    logout
  };
};
