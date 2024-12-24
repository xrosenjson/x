import { useEffect, useState } from 'react';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { syncService } from '../../services/sync';
import { Button } from '../ui/button';
import { toast } from '../../lib/use-toast';

export const SyncStatus = () => {
  const [state, setState] = useState(() => syncService.getState());

  useEffect(() => {
    return syncService.subscribe(setState);
  }, []);

  const handleForceSyncClick = async () => {
    try {
      await syncService.forceSyncNow();
      toast({
        title: 'Sync Complete',
        description: 'Your data has been synchronized successfully.',
      });
    } catch (error) {
      toast({
        title: 'Sync Failed',
        description: error instanceof Error ? error.message : 'Failed to synchronize data',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-background rounded-lg border">
      <div className="flex items-center gap-2">
        {state.isSyncing ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : state.error ? (
          <XCircle className="h-4 w-4 text-destructive" />
        ) : (
          <CheckCircle className="h-4 w-4 text-success" />
        )}
        <span className="text-sm font-medium">
          {state.isSyncing
            ? 'Syncing...'
            : state.error
            ? 'Sync failed'
            : 'Synced'}
        </span>
      </div>
      {state.lastSyncTimestamp > 0 && (
        <span className="text-sm text-muted-foreground">
          Last synced: {new Date(state.lastSyncTimestamp).toLocaleTimeString()}
        </span>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={handleForceSyncClick}
        disabled={state.isSyncing}
      >
        Sync Now
      </Button>
    </div>
  );
};
