
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
  Bot
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

const Admin = () => {
  const { isAuthenticated, currentUser, isLoading, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Initialize admin service with movie data
    adminService.initialize(movieData);
  }, []);

  // Dashboard card component (used in overview tab)
  const DashboardCard = ({ title, value, change, icon }: { 
    title: string; 
    value: string; 
    change: string; 
    icon: React.ReactNode 
  }) => {
    const isPositive = change.startsWith('+');
    
    return (
      <div className="p-6 rounded-lg border border-white/10 bg-card">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'} mt-1`}>
              {change} from last month
            </span>
          </div>
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
      </div>
    );
  };

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
            <Button variant="secondary" size="sm" onClick={logout}>
              <Settings className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <DashboardCard 
                title="Total Streams" 
                value="245,678" 
                change="+12.5%" 
                icon={<PlayCircle />} 
              />
              <DashboardCard 
                title="Active Users" 
                value="89,412" 
                change="+7.2%" 
                icon={<Users />} 
              />
              <DashboardCard 
                title="Content Items" 
                value="5,249" 
                change="+32" 
                icon={<Film />} 
              />
              <DashboardCard 
                title="Revenue" 
                value="$1.7M" 
                change="+15.8%" 
                icon={<BarChart />} 
              />
            </div>
            
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h2 className="text-xl font-semibold mb-4">Quick Navigation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4"
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
                  className="justify-start h-auto py-4"
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
                  className="justify-start h-auto py-4"
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
                  className="justify-start h-auto py-4"
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
                  className="justify-start h-auto py-4"
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
                  className="justify-start h-auto py-4"
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
