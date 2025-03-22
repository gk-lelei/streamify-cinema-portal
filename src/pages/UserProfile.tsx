
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, CreditCard, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from '@/components/ui/navbar';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().optional(),
  bio: z.string().max(160).optional(),
});

const accountFormSchema = z.object({
  currentPassword: z.string().min(1, {
    message: 'Current password is required to change password.',
  }),
  newPassword: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const UserProfile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentUser, logout } = useAdminAuth();
  
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: currentUser?.username || '',
      email: currentUser?.email || '',
      phone: '',
      bio: '',
    },
  });
  
  const accountForm = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onProfileSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    setIsProfileLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      setIsProfileLoading(false);
    }, 1000);
  };
  
  const onPasswordSubmit = async (values: z.infer<typeof accountFormSchema>) => {
    setIsPasswordLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Password updated',
        description: 'Your password has been updated successfully.',
      });
      accountForm.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsPasswordLoading(false);
    }, 1000);
  };
  
  const handleDeleteAccount = async () => {
    // Simulate API call
    setTimeout(async () => {
      await logout();
      toast({
        title: 'Account deleted',
        description: 'Your account has been deleted successfully.',
      });
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-netflix-black text-white">
      <Navbar />
      
      <div className="container max-w-6xl pt-24 pb-16 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Header */}
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center border-2 border-primary">
                {currentUser?.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.username} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">{currentUser?.username?.charAt(0)?.toUpperCase()}</span>
                )}
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            
            <h2 className="text-2xl font-bold">{currentUser?.username}</h2>
            <p className="text-muted-foreground">{currentUser?.email}</p>
            <p className="text-sm text-muted-foreground mt-1">Joined {currentUser?.lastLogin.toLocaleDateString()}</p>
            
            <div className="mt-6 p-4 bg-card/30 rounded-lg w-full">
              <h3 className="font-medium mb-2">Subscription Details</h3>
              <p className="text-sm flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">Premium</span>
              </p>
              <p className="text-sm flex justify-between mt-1">
                <span>Billing Cycle:</span>
                <span className="font-medium">Monthly</span>
              </p>
              <p className="text-sm flex justify-between mt-1">
                <span>Next Billing:</span>
                <span className="font-medium">June 15, 2023</span>
              </p>
              <Button className="w-full mt-4 gap-2" variant="outline">
                <CreditCard className="h-4 w-4" />
                Manage Subscription
              </Button>
            </div>
          </div>
          
          {/* Profile Tabs */}
          <div className="md:w-2/3">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="p-4 pt-6 border rounded-md mt-4 border-white/10">
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Optional" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <textarea
                              {...field}
                              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                              placeholder="Tell us a bit about yourself"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={isProfileLoading} className="gap-2">
                      {isProfileLoading ? 'Saving...' : 'Save Changes'}
                      <Save className="h-4 w-4" />
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="account" className="p-4 pt-6 border rounded-md mt-4 border-white/10 space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>
                  <Form {...accountForm}>
                    <form onSubmit={accountForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                      <FormField
                        control={accountForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={accountForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={accountForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" disabled={isPasswordLoading}>
                        {isPasswordLoading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </form>
                  </Form>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Releases</p>
                      <p className="text-sm text-muted-foreground">Get notified when new movies or shows are added.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-muted-foreground">Receive special offers and promotions.</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium text-destructive mb-4">Danger Zone</h3>
                  
                  <Dialog open={isDeleteAccountOpen} onOpenChange={setIsDeleteAccountOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive" className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteAccountOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                          Yes, Delete My Account
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
