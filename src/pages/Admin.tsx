
import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Admin = () => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAiLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setAiResponse(`Analysis for "${aiPrompt}":\n\nThe requested content seems to align with our platform's guidelines. Based on our current library and user preferences, this would likely receive a 78% engagement rate. Consider featuring this prominently for users in the 25-34 demographic. Recommendation: Approve for production.`);
      setIsAiLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      <div className="pt-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="secondary" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-7 mb-8">
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
              <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                Interactive analytics chart would go here
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h2 className="text-xl font-semibold mb-4">Content Management</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg">All Movies and Shows</h3>
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Add New
                  </Button>
                </div>
                <div className="h-96 flex items-center justify-center text-muted-foreground">
                  Content table would go here
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <div className="h-96 flex items-center justify-center text-muted-foreground">
                User management interface would go here
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h2 className="text-xl font-semibold mb-4">Analytics Dashboard</h2>
              <div className="h-96 flex items-center justify-center text-muted-foreground">
                Detailed analytics dashboard would go here
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-tools" className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h2 className="text-xl font-semibold mb-4">AI Content Assistant</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <form onSubmit={handleAiSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="ai-prompt" className="block text-sm font-medium mb-2">
                        Ask the AI for content recommendations, analysis, or moderation
                      </label>
                      <div className="flex gap-2">
                        <Input
                          id="ai-prompt"
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder="e.g., Analyze this script for content rating..."
                          className="bg-background border-white/20"
                        />
                        <Button type="submit" disabled={isAiLoading || !aiPrompt.trim()}>
                          {isAiLoading ? "Processing..." : "Analyze"}
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Sample prompts:</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setAiPrompt("Suggest similar content to Inception")}
                        >
                          Suggest similar content
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setAiPrompt("Check this script for inappropriate content")}
                        >
                          Content moderation
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setAiPrompt("Predict viewer demographics for this trailer")}
                        >
                          Predict demographics
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">AI Response:</h3>
                  <div className="p-4 h-[220px] bg-background/50 border border-white/10 rounded-md overflow-y-auto">
                    {isAiLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-pulse text-primary">Processing your request...</div>
                      </div>
                    ) : aiResponse ? (
                      <pre className="whitespace-pre-wrap text-sm">{aiResponse}</pre>
                    ) : (
                      <div className="text-muted-foreground text-center h-full flex items-center justify-center">
                        <div>
                          <Bot className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p>AI responses will appear here</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h2 className="text-xl font-semibold mb-4">Automated Workflows</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg">Content Analysis Workflows</h3>
                  <Button variant="outline">
                    Create Workflow
                  </Button>
                </div>
                <div className="h-40 flex items-center justify-center text-muted-foreground">
                  AI workflow management interface would go here
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="uploads" className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h2 className="text-xl font-semibold mb-4">Content Upload</h2>
              <div className="h-96 flex items-center justify-center text-muted-foreground">
                Content upload and management interface would go here
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
              <div className="h-96 flex items-center justify-center text-muted-foreground">
                Security settings and logs would go here
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Dashboard Card Component
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

export default Admin;
