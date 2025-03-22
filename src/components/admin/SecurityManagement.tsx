
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
import { 
  Search, 
  Shield, 
  RefreshCw, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Key, 
  Lock 
} from 'lucide-react';
import { adminService } from '@/services/adminService';
import { toast } from '@/components/ui/use-toast';

interface SecurityLog {
  timestamp: Date;
  action: string;
  user: string;
  ip: string;
}

export const SecurityManagement = () => {
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSecurityLogs();
  }, []);

  const loadSecurityLogs = async () => {
    setIsLoading(true);
    try {
      const logs = await adminService.getSecurityLogs();
      setSecurityLogs(logs);
    } catch (error) {
      toast({
        title: "Error loading security logs",
        description: "Failed to load security logs. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLogs = securityLogs.filter(log => 
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.includes(searchTerm)
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Login')) return <Key className="h-4 w-4 text-blue-500" />;
    if (action.includes('Password')) return <Lock className="h-4 w-4 text-yellow-500" />;
    if (action.includes('access')) return <AlertTriangle className="h-4 w-4 text-orange-500" />;
    if (action.includes('modified') || action.includes('changed')) return <RefreshCw className="h-4 w-4 text-purple-500" />;
    return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const exportLogs = () => {
    // Create CSV string
    const csvHeader = "Timestamp,Action,User,IP Address\n";
    const csvContent = filteredLogs.map(log => {
      return `"${formatDate(log.timestamp)}","${log.action}","${log.user}","${log.ip}"`;
    }).join("\n");
    
    const csv = csvHeader + csvContent;
    
    // Create and download file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `security_logs_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Logs Exported",
      description: "Security logs have been exported to CSV."
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg border border-white/10 bg-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Security Status</p>
              <h3 className="text-xl font-bold mt-1 text-green-500">Secure</h3>
            </div>
            <div className="p-2 rounded-full bg-green-500/10 text-green-500">
              <Shield />
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border border-white/10 bg-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Last Security Scan</p>
              <h3 className="text-xl font-bold mt-1">Today, 03:45 AM</h3>
            </div>
            <div className="p-2 rounded-full bg-blue-500/10 text-blue-500">
              <RefreshCw />
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border border-white/10 bg-card">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Security Events (24h)</p>
              <h3 className="text-xl font-bold mt-1">24 events</h3>
            </div>
            <div className="p-2 rounded-full bg-yellow-500/10 text-yellow-500">
              <AlertTriangle />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            className="pl-8"
            placeholder="Search security logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadSecurityLogs}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={exportLogs}>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading security logs...</div>
        </div>
      ) : (
        <>
          {filteredLogs.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center text-muted-foreground">
              <Shield className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg">No security logs found</p>
              <p className="text-sm">Try adjusting your search or check back later</p>
            </div>
          ) : (
            <div className="border border-white/10 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="hidden md:table-cell">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell className="whitespace-nowrap">{formatDate(log.timestamp)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(log.action)}
                          <span>{log.action}</span>
                        </div>
                      </TableCell>
                      <TableCell>{log.user}</TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-xs">{log.ip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg border border-white/10 bg-card">
          <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Require 2FA for admin access</p>
              </div>
              <div className="h-6 w-11 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">IP Restriction</p>
                <p className="text-sm text-muted-foreground">Limit admin access to specific IPs</p>
              </div>
              <div className="h-6 w-11 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Automated Security Scans</p>
                <p className="text-sm text-muted-foreground">Run security scans daily</p>
              </div>
              <div className="h-6 w-11 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 bg-white h-4 w-4 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 rounded-lg border border-white/10 bg-card">
          <h3 className="text-lg font-semibold mb-4">API Security</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Current API Key</p>
              <div className="flex mt-1">
                <div className="bg-background border border-white/10 px-3 py-2 rounded-l-md font-mono text-xs flex-1 truncate">
                  *************************Kg7PzQ
                </div>
                <Button variant="secondary" className="rounded-l-none">
                  Regenerate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Last regenerated on June 15, 2023</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">Rate Limiting</p>
              <div className="flex mt-1 items-center space-x-2">
                <Input 
                  type="number" 
                  className="w-24" 
                  value="100" 
                  min="10" 
                  max="1000"
                />
                <span>requests per minute</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
