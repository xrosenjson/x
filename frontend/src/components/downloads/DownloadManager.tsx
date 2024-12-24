import React from 'react';
import { Download as DownloadIcon, Pause, Play, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { toast } from '../../lib/use-toast';
import { DownloadManagerProps, Download } from '../../types/components';

// Using types from components.ts

const DownloadManager: React.FC<DownloadManagerProps> = ({
  downloads,
  onPauseResume,
  onCancel,
  onRetry,
}) => {
  const handleAction = (action: 'pause' | 'resume' | 'cancel' | 'retry', download: Download) => {
    switch (action) {
      case 'pause':
      case 'resume':
        onPauseResume(download.id);
        toast({
          title: `Download ${action}d`,
          description: `${download.filename} has been ${action}d`,
        });
        break;
      case 'cancel':
        onCancel(download.id);
        toast({
          title: 'Download cancelled',
          description: `${download.filename} has been cancelled`,
          variant: 'destructive',
        });
        break;
      case 'retry':
        onRetry(download.id);
        toast({
          title: 'Retrying download',
          description: `Retrying download for ${download.filename}`,
        });
        break;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Downloads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {downloads.map((download) => (
              <div
                key={download.id}
                className="flex items-center space-x-4 p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{download.filename}</h3>
                    <span className="text-sm text-muted-foreground">
                      {download.size ? `${download.size} bytes` : 'Unknown size'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Progress value={download.progress} />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{download.status}</span>
                      {download.speed && <span>{download.speed}/s</span>}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {download.status === 'downloading' && (
                      <DropdownMenuItem
                        onClick={() => handleAction('pause', download)}
                      >
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                      </DropdownMenuItem>
                    )}
                    {download.status === 'paused' && (
                      <DropdownMenuItem
                        onClick={() => handleAction('resume', download)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Resume
                      </DropdownMenuItem>
                    )}
                    {download.status === 'failed' && (
                      <DropdownMenuItem
                        onClick={() => handleAction('retry', download)}
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Retry
                      </DropdownMenuItem>
                    )}
                    {download.status !== 'completed' && (
                      <DropdownMenuItem
                        onClick={() => handleAction('cancel', download)}
                        className="text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Cancel
                      </DropdownMenuItem>
                    )}
                    {download.status === 'completed' && (
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Completed
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadManager;
