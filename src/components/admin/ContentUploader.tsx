
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Upload, 
  File, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  X, 
  Film, 
  Image as ImageIcon, 
  FileText, 
  UploadCloud
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface UploadFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  errorMessage?: string;
}

export const ContentUploader = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const processFiles = (fileList: FileList) => {
    const newFiles: UploadFile[] = Array.from(fileList).map(file => ({
      id: Math.random().toString(36).substring(2, 11),
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'uploading'
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress for each file
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      // Clear the input
      e.target.value = '';
    }
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5; // Random progress between 5-15%
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Complete the upload with a small delay to show 100%
        setTimeout(() => {
          setFiles(prev => prev.map(f => 
            f.id === fileId 
              ? { ...f, progress: 100, status: 'completed' } 
              : f
          ));
          
          // Show toast on completion
          toast({
            title: "Upload Complete",
            description: "File has been uploaded successfully.",
          });
        }, 500);
      }
      
      // Update progress
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress } : f
      ));
    }, 300);
    
    // Simulate random error for demonstration (10% chance)
    if (Math.random() > 0.9) {
      setTimeout(() => {
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { 
                ...f, 
                status: 'error', 
                errorMessage: 'Upload failed. Please try again.' 
              } 
            : f
        ));
        
        toast({
          title: "Upload Failed",
          description: "An error occurred while uploading the file.",
          variant: "destructive"
        });
      }, Math.random() * 3000 + 1000); // Random failure between 1-4 seconds
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if there are any uploading files
    const stillUploading = files.some(f => f.status === 'uploading');
    
    if (stillUploading) {
      toast({
        title: "Files still uploading",
        description: "Please wait for all files to complete uploading.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if there are any completed files
    const hasCompletedFiles = files.some(f => f.status === 'completed');
    
    if (!hasCompletedFiles) {
      toast({
        title: "No files uploaded",
        description: "Please upload at least one file.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate form submission
    toast({
      title: "Content Submitted",
      description: "Your content has been submitted for processing.",
    });
    
    // Reset form
    setFiles([]);
    setTitle('');
    setDescription('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('video/')) return <Film className="h-5 w-5 text-blue-500" />;
    if (type.startsWith('image/')) return <ImageIcon className="h-5 w-5 text-green-500" />;
    if (type.startsWith('text/')) return <FileText className="h-5 w-5 text-yellow-500" />;
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === 'error') return <AlertCircle className="h-5 w-5 text-red-500" />;
    return <Info className="h-5 w-5 text-blue-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upload Content</h2>
        <p className="text-muted-foreground">Upload video files, images, or other content to the platform.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Content Title</label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for this content"
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a description for this content"
              rows={3}
              required
            />
          </div>
        </div>

        <div 
          className={`border-2 border-dashed rounded-lg p-8 ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-white/10'
          } transition-colors duration-200 text-center`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <UploadCloud className="h-12 w-12 text-muted-foreground" />
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Drag and drop files here</h3>
              <p className="text-sm text-muted-foreground">
                Support for videos, images, subtitle files, and more
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Select Files
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {files.length > 0 && (
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <div className="p-4 bg-background/50 border-b border-white/10">
              <h3 className="font-medium">Uploaded Files</h3>
            </div>
            <div className="divide-y divide-white/10">
              {files.map((file) => (
                <div key={file.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getFileIcon(file.type)}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground space-x-2">
                        <span>{formatFileSize(file.size)}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                        <span>{file.status === 'uploading' ? `${file.progress}%` : file.status}</span>
                      </div>
                      {file.errorMessage && (
                        <p className="text-xs text-red-500 mt-1">{file.errorMessage}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(file.status)}
                    <Button variant="ghost" size="icon" onClick={() => removeFile(file.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={() => setFiles([])}>
            Clear All
          </Button>
          <Button type="submit">
            Submit Content
          </Button>
        </div>
      </form>
    </div>
  );
};
