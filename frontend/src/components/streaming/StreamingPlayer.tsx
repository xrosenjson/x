import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/slider';
import { Card, CardContent } from '../ui/card';
import { MagnetLink, StreamInfo } from '@/types/magnet';
import { api } from '@/lib/api';

interface StreamingPlayerProps {
  magnetLink?: MagnetLink;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
}

const StreamingPlayer: React.FC<StreamingPlayerProps> = ({ 
  magnetLink,
  onError,
  onProgress
}) => {
  const [streamInfo, setStreamInfo] = useState<StreamInfo | null>(null);
  const [currentQuality, setCurrentQuality] = useState<'auto' | 'low' | 'medium' | 'high'>('auto');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);
  const [currentQuality, setCurrentQuality] = useState(quality);

  useEffect(() => {
    // Handle quality change
    const video = videoRef.current;
    if (!video) return;

    // TODO: Implement actual quality change logic here
    // This would typically involve:
    // 1. Getting the available video qualities
    // 2. Switching to the selected quality stream
    // 3. Maintaining playback position
    console.log(`Quality changed to: ${currentQuality}`);
  }, [currentQuality]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual video playback
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    setIsMuted(value === 0);
    // TODO: Implement actual volume control
  };

  const handleProgressChange = (value: number) => {
    setProgress(value);
    // TODO: Implement actual seeking
  };

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      onProgress?.(progress);
    };

    const handleError = (error: Event) => {
      console.error('Error playing video:', error);
      setIsPlaying(false);
      onError?.(new Error('Failed to play video'));
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);

    if (isPlaying) {
      video.play().catch(error => {
        console.error('Error playing video:', error);
        setIsPlaying(false);
        onError?.(error);
      });
    } else {
      video.pause();
    }

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
    };
  }, [isPlaying, onProgress, onError]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume / 100;
    video.muted = isMuted;
  }, [volume, isMuted]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="aspect-video bg-black relative">
        <video
          ref={videoRef}
          src={url}
          className="w-full h-full"
          onClick={handlePlayPause}
        />
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <Play className="w-16 h-16 opacity-50" />
          </div>
        )}
      </div>
      <div className="absolute bottom-4 right-4">
        <select
          value={currentQuality}
          onChange={(e) => setCurrentQuality(e.target.value as 'auto' | 'low' | 'medium' | 'high')}
          className="bg-black/50 text-white px-2 py-1 rounded-md"
        >
          <option value="auto">Auto</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Slider
              value={[progress]}
              max={100}
              step={1}
              onValueChange={([value]) => handleProgressChange(value)}
              className="flex-grow"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={100}
                step={1}
                onValueChange={([value]) => handleVolumeChange(value)}
                className="w-24"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamingPlayer;
