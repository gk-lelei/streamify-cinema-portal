
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
  Users, 
  Ban, 
  User, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { adminService, User } from '@/services/adminService';
import { toast } from '@/components/ui/use-toast';

export const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    status: 'active',
    plan: 'standard',
    lastLogin: new Date()
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (error) {
      toast({
        title: "Error loading users",
        description: "Failed to load users. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.plan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNew = () => {
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      status: 'active',
      plan: 'standard',
      lastLogin: new Date()
    });
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      status: user.status,
      plan: user.plan,
      lastLogin: user.lastLogin
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await adminService.deleteUser(id);
      loadUsers();
    } catch (error) {
      toast({
        title: "Error deleting user",
        description: "Failed to delete the user. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditMode && selectedUser) {
        await adminService.updateUser(selectedUser.id, formData);
      } else {
        // For new user, we need a complete user object
        await adminService.addUser(formData as Omit<User, 'id' | 'createdAt'>);
      }
      
      loadUsers();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error saving user",
        description: "Failed to save the user. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="text-green-500 h-4 w-4" />;
      case 'suspended':
        return <Ban className="text-red-500 h-4 w-4" />;
      case 'pending':
        return <Clock className="text-yellow-500 h-4 w-4" />;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            className="pl-8"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading users...</div>
        </div>
      ) : (
        <>
          {filteredUsers.length === 0 ? (
            <div className="h-96 flex flex-col items-center justify-center text-muted-foreground">
              <Users className="h-16 w-16 mb-4 opacity-30" />
              <p className="text-lg">No users found</p>
              <p className="text-sm">Try adjusting your search or add new users</p>
            </div>
          ) : (
            <div className="border border-white/10 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60px]">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Plan</TableHead>
                    <TableHead className="hidden md:table-cell">Created</TableHead>
                    <TableHead className="hidden md:table-cell">Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="flex items-center space-x-1">
                        {getStatusIcon(user.status)}
                        <span className="capitalize">{user.status}</span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell capitalize">{user.plan}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(user.createdAt)}</TableCell>
                      <TableCell className="hidden md:table-cell">{formatDate(user.lastLogin)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogDescription>
              {isEditMode 
                ? 'Update the information for this user.' 
                : 'Fill in the details to add a new user to the platform.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium">Status</label>
                <select
                  id="status"
                  name="status"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="plan" className="block text-sm font-medium">Subscription Plan</label>
                <select
                  id="plan"
                  name="plan"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.plan}
                  onChange={handleChange}
                  required
                >
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? 'Update User' : 'Add User'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
