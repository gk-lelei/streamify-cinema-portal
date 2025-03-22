
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/navbar';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  BarChart,
  Users,
  Film,
  Settings,
  MessageSquare,
  PlayCircle,
  Upload,
  Database,
  Shield,
  Bot,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ContentManagement } from '@/components/admin/ContentManagement';
import { UserManagement } from '@/components/admin/UserManagement';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { SecurityManagement } from '@/components/admin/SecurityManagement';
import { ContentUploader } from '@/components/admin/ContentUploader';
import { AiTools } from '@/components/admin/AiTools';
import { adminService } from '@/services/adminService';
import { movieData } from '@/lib/movies';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Skeleton } from '@/components/ui/skeleton';

const Admin = () => {
  const { isAuthenticated, currentUser, isLoading, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDataInitializing, setIsDataInitializing] = useState(true);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initialize admin service with movie data
    const initializeData = async () => {
      setIsDataInitializing(true);
      try {
        adminService.initialize(movieData);
      } catch (error) {
        console.error('Failed to initialize admin data:', error);
      } finally {
        setIsDataInitializing(false);
      }
    };
    
    initializeData();
  }, []);

  // Dashboard card component (used in overview tab)
  const DashboardCard = ({ title, value, change, icon, isLoading = false }: { 
    title: string; 
    value: string; 
    change: string; 
    icon: React.ReactNode;
    isLoading?: boolean;
  }) => {
    const isPositive = change.startsWith('+');
    
    return (
      <div className="p-6 rounded-lg border border-white/10 bg-card transition-all hover:bg-card/80">
        <div className="flex justify-between items-start">
          <div className="w-full">
            <p className="text-sm text-muted-foreground">{title}</p>
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-28 mt-1" />
                <Skeleton className="h-4 w-20 mt-2" />
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mt-1">{value}</h3>
                <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'} mt-1`}>
                  {change} from last month
                </span>
              </>
            )}
          </div>
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-netflix-black text-white">
        <Navbar />
        <div className="pt-24 px-4 md:px-12 max-w-7xl mx-auto pb-20">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-10 w-32" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-36 w-full" />
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-12 max-w-7xl mx-auto pb-20">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden md:block text-right">
                <p className="font-medium">{currentUser.username}</p>
                <p className="text-sm text-muted-foreground">{currentUser.role}</p>
              </div>
            )}
            <Button variant="outline" size="sm" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <TabsList className="inline-flex min-w-full md:w-auto mb-8">
              <TabsTrigger value="overview" className="gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="content" className="gap-2">
                <Film className="h-4 w-4" />
                <span className="hidden sm:inline">Content</span>
              </TabsTrigger>
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Users</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="ai-tools" className="gap-2">
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">AI Tools</span>
              </TabsTrigger>
              <TabsTrigger value="uploads" className="gap-2">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Uploads</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DashboardCard 
                title="Total Streams" 
                value="245,678" 
                change="+12.5%" 
                icon={<PlayCircle />} 
                isLoading={isDataInitializing}
              />
              <DashboardCard 
                title="Active Users" 
                value="89,412" 
                change="+7.2%" 
                icon={<Users />} 
                isLoading={isDataInitializing}
              />
              <DashboardCard 
                title="Content Items" 
                value="5,249" 
                change="+32" 
                icon={<Film />} 
                isLoading={isDataInitializing}
              />
              <DashboardCard 
                title="Revenue" 
                value="$1.7M" 
                change="+15.8%" 
                icon={<BarChart />} 
                isLoading={isDataInitializing}
              />
            </div>
            
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 transition-all hover:border-primary/50"
                  onClick={() => setActiveTab('content')}
                >
                  <Film className="mr-2 h-5 w-5 text-primary" />
                  <div className="text-left">
                    <div className="font-medium">Manage Content</div>
                    <div className="text-xs text-muted-foreground">Add or edit movies and shows</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 transition-all hover:border-blue-500/50"
                  onClick={() => setActiveTab('users')}
                >
                  <Users className="mr-2 h-5 w-5 text-blue-500" />
                  <div className="text-left">
                    <div className="font-medium">User Management</div>
                    <div className="text-xs text-muted-foreground">Manage platform users</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 transition-all hover:border-yellow-500/50"
                  onClick={() => setActiveTab('analytics')}
                >
                  <BarChart className="mr-2 h-5 w-5 text-yellow-500" />
                  <div className="text-left">
                    <div className="font-medium">View Analytics</div>
                    <div className="text-xs text-muted-foreground">Track performance metrics</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 transition-all hover:border-purple-500/50"
                  onClick={() => setActiveTab('ai-tools')}
                >
                  <Bot className="mr-2 h-5 w-5 text-purple-500" />
                  <div className="text-left">
                    <div className="font-medium">AI Tools</div>
                    <div className="text-xs text-muted-foreground">Content analysis and insights</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 transition-all hover:border-green-500/50"
                  onClick={() => setActiveTab('uploads')}
                >
                  <Upload className="mr-2 h-5 w-5 text-green-500" />
                  <div className="text-left">
                    <div className="font-medium">Upload Content</div>
                    <div className="text-xs text-muted-foreground">Add new media files</div>
                  </div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 transition-all hover:border-red-500/50"
                  onClick={() => setActiveTab('security')}
                >
                  <Shield className="mr-2 h-5 w-5 text-red-500" />
                  <div className="text-left">
                    <div className="font-medium">Security Center</div>
                    <div className="text-xs text-muted-foreground">Monitor and protect</div>
                  </div>
                </Button>
              </div>
            </div>
            
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              {isDataInitializing ? (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="w-full">
                      <Skeleton className="h-5 w-48" />
                      <Skeleton className="h-4 w-60 mt-1" />
                      <Skeleton className="h-3 w-16 mt-2" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="w-full">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-72 mt-1" />
                      <Skeleton className="h-3 w-16 mt-2" />
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="w-full">
                      <Skeleton className="h-5 w-52" />
                      <Skeleton className="h-4 w-64 mt-1" />
                      <Skeleton className="h-3 w-16 mt-2" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-1 rounded-full text-primary">
                      <Film className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">New content added</p>
                      <p className="text-sm text-muted-foreground">
                        "The Last Journey" was added to the library
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-500/10 p-1 rounded-full text-blue-500">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">User milestone reached</p>
                      <p className="text-sm text-muted-foreground">
                        Platform surpassed 90,000 active users
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-500/10 p-1 rounded-full text-yellow-500">
                      <Database className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Database maintenance</p>
                      <p className="text-sm text-muted-foreground">
                        Scheduled backup and optimization completed
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <ContentManagement />
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="ai-tools" className="space-y-4">
            <AiTools />
          </TabsContent>

          <TabsContent value="uploads" className="space-y-4">
            <ContentUploader />
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <SecurityManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
