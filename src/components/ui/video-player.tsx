
import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import FeaturedBadge from './featured-badge';

interface VideoPlayerProps {
  title: string;
  description: string;
  videoUrl?: string;
  backdropUrl: string;
  movieId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  title, 
  description, 
  videoUrl, 
  backdropUrl,
  movieId
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Auto play video after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          console.log('Auto-play was prevented. User interaction is required.');
        });
        setIsPlaying(true);
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative w-full h-[56.25vw] max-h-[80vh] overflow-hidden">
      {/* Video or backdrop image */}
      {videoUrl ? (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={videoUrl}
          poster={backdropUrl}
          muted={isMuted}
          loop
          playsInline
        />
      ) : (
        <img 
          src={backdropUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      )}
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 hero-gradient-overlay pointer-events-none" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 pt-24 text-white">
        <div className="max-w-3xl space-y-4 animate-fade-in">
          <FeaturedBadge text="Featured" className="mb-2" />
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">{title}</h1>
          
          <p className="text-sm md:text-base text-white/90 line-clamp-3 md:line-clamp-3 max-w-lg text-shadow">
            {description}
          </p>
          
          <div className="flex items-center gap-3 pt-2">
            <button 
              className="px-6 py-2 bg-white text-black rounded-sm flex items-center font-medium hover:bg-white/90 transition-colors"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 w-5 h-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 w-5 h-5 fill-current" />
                  Play
                </>
              )}
            </button>
            
            <Link to={`/movie/${movieId}`}>
              <button className="px-6 py-2 bg-secondary/80 text-white rounded-sm flex items-center font-medium hover:bg-secondary/90 transition-colors">
                <Info className="mr-2 w-5 h-5" />
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Video controls */}
      {videoUrl && (
        <div className="absolute top-6 right-4 md:right-12 flex items-center gap-3">
          <button 
            className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center border border-white/10 hover:border-white/40 transition-colors"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
          </button>
          
          <FeaturedBadge text={isMuted ? "Muted" : "Unmuted"} className="opacity-70 bg-black/40 transition-opacity duration-300" />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
