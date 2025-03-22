
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart as BarChartIcon, TrendingUp, Users, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { adminService, AnalyticsData } from '@/services/adminService';
import { toast } from '@/components/ui/use-toast';

const formatCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

const DashboardCard = ({ title, value, change, icon, iconClassName }: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ReactNode;
  iconClassName?: string;
}) => {
  const isPositive = change.startsWith('+');
  
  return (
    <div className="p-6 rounded-lg border border-white/10 bg-card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'} mt-1`}>
            {change} from last period
          </span>
        </div>
        <div className={`p-2 rounded-full ${iconClassName || 'bg-primary/10 text-primary'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('month');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getAnalytics();
      setAnalyticsData(data);
    } catch (error) {
      toast({
        title: "Error loading analytics",
        description: "Failed to load analytics data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter data based on the selected time range
  const filterDataByTimeRange = () => {
    if (!analyticsData) return { views: [], users: [], revenue: [], retention: [], dates: [] };
    
    const { views, users, revenue, retention, dates } = analyticsData;
    
    if (timeRange === 'week') {
      // Get the last 7 days of data
      return {
        views: views.slice(-7),
        users: users.slice(-7),
        revenue: revenue.slice(-7),
        retention: retention.slice(-7),
        dates: dates.slice(-7)
      };
    }
    
    // Return all data for month view
    return analyticsData;
  };

  const filteredData = filterDataByTimeRange();
  
  // Calculate totals and averages
  const calculateStats = () => {
    if (!filteredData.views.length) return { 
      totalViews: 0, 
      totalUsers: 0, 
      totalRevenue: 0, 
      avgRetention: 0,
      viewsChange: '0%',
      usersChange: '0%',
      revenueChange: '0%',
      retentionChange: '0%'
    };
    
    const totalViews = filteredData.views.reduce((sum, val) => sum + val, 0);
    const totalUsers = filteredData.users.reduce((sum, val) => sum + val, 0);
    const totalRevenue = filteredData.revenue.reduce((sum, val) => sum + val, 0);
    const avgRetention = filteredData.retention.reduce((sum, val) => sum + val, 0) / filteredData.retention.length;
    
    // Calculate changes (simplified for demo)
    const viewsChange = '+12.5%';
    const usersChange = '+8.3%';
    const revenueChange = '+15.7%';
    const retentionChange = '+3.2%';
    
    return {
      totalViews,
      totalUsers,
      totalRevenue,
      avgRetention,
      viewsChange,
      usersChange,
      revenueChange,
      retentionChange
    };
  };
  
  const stats = calculateStats();
  
  // Format the filtered data for the charts
  const chartData = filteredData.dates.map((date, index) => ({
    date,
    views: filteredData.views[index],
    users: filteredData.users[index],
    revenue: filteredData.revenue[index],
    retention: filteredData.retention[index]
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analytics Overview</h2>
        <div className="flex space-x-2">
          <Button 
            variant={timeRange === 'week' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('week')}
          >
            Last Week
          </Button>
          <Button 
            variant={timeRange === 'month' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeRange('month')}
          >
            Last Month
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading analytics data...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <DashboardCard 
              title="Total Views" 
              value={stats.totalViews.toLocaleString()} 
              change={stats.viewsChange} 
              icon={<BarChartIcon />} 
            />
            <DashboardCard 
              title="Active Users" 
              value={stats.totalUsers.toLocaleString()} 
              change={stats.usersChange} 
              icon={<Users />} 
              iconClassName="bg-blue-500/10 text-blue-500"
            />
            <DashboardCard 
              title="Revenue" 
              value={formatCurrency.format(stats.totalRevenue)} 
              change={stats.revenueChange} 
              icon={<DollarSign />} 
              iconClassName="bg-green-500/10 text-green-500"
            />
            <DashboardCard 
              title="Retention Rate" 
              value={`${stats.avgRetention.toFixed(1)}%`} 
              change={stats.retentionChange} 
              icon={<TrendingUp />} 
              iconClassName="bg-purple-500/10 text-purple-500"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h3 className="text-lg font-semibold mb-4">Viewing Statistics</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#888' }} 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      }}
                    />
                    <YAxis tick={{ fill: '#888' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }} 
                      itemStyle={{ color: '#fff' }}
                      formatter={(value: number) => [value.toLocaleString(), 'Views']}
                    />
                    <Legend />
                    <Bar dataKey="views" name="Content Views" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="p-6 rounded-lg border border-white/10 bg-card">
              <h3 className="text-lg font-semibold mb-4">User Growth</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fill: '#888' }}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      }}  
                    />
                    <YAxis tick={{ fill: '#888' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }} 
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="users" name="Active Users" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="retention" name="Retention %" stroke="#a855f7" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="p-6 rounded-lg border border-white/10 bg-card">
            <h3 className="text-lg font-semibold mb-4">Revenue Trends</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#888' }}
                    tickFormatter={(value) => {
                      const date = new Date(value);
                      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }}
                  />
                  <YAxis 
                    tick={{ fill: '#888' }}
                    tickFormatter={(value) => formatCurrency.format(value)}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', border: 'none', borderRadius: '4px' }} 
                    itemStyle={{ color: '#fff' }}
                    formatter={(value: number) => [formatCurrency.format(value), 'Revenue']}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
