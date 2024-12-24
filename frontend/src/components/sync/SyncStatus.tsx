import { useEffect, useState } from 'react';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { syncService } from '../../services/sync';
import { Button } from '../ui/button';
import { toast } from '../../lib/use-toast';
import { SyncMetadata } from '../../types/sync';
import { offlineStorage } from '../../lib/offline-storage';

interface SyncStatusProps {
  isAdmin?: boolean;
}

export const SyncStatus: React.FC<SyncStatusProps> = ({ isAdmin }) => {
  const [state, setState] = useState(() => syncService.getState());
  const [syncStatus, setSyncStatus] = useState<SyncMetadata['syncStatus']>('synced');
  const [conflicts, setConflicts] = useState<Array<{ id: string; type: string }>>([]);

  useEffect(() => {
    return syncService.subscribe(setState);
  }, []);

  const handleForceSyncClick = async () => {
    try {
      await syncService.forceSyncNow();
      const metadata = await offlineStorage.getAllMetadata();
      const hasConflicts = Object.entries(metadata)
        .filter(([_, meta]) => meta.syncStatus === 'conflict')
        .map(([id, meta]) => ({ id, type: meta.type }));
      
      setConflicts(hasConflicts);

      if (hasConflicts.length > 0) {
        toast({
          title: 'Sync Conflicts Detected',
          description: `${hasConflicts.length} items need your attention.`,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Sync Complete',
          description: 'Your data has been synchronized successfully.',
        });
      }
    } catch (error) {
      toast({
        title: 'Sync Failed',
        description: error instanceof Error ? error.message : 'Failed to synchronize data',
        variant: 'destructive',
      });
    }
  };

  const handleResolveConflict = async (id: string, resolution: 'local' | 'remote') => {
    try {
      await syncService.resolveConflict(id, resolution);
      setConflicts(prev => prev.filter(conflict => conflict.id !== id));
      toast({
        title: 'Conflict Resolved',
        description: 'The sync conflict has been resolved successfully.',
      });
    } catch (error) {
      toast({
        title: 'Resolution Failed',
        description: error instanceof Error ? error.message : 'Failed to resolve conflict',
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
        ) : syncStatus === 'conflict' ? (
          <AlertTriangle className="h-4 w-4 text-warning" />
        ) : syncStatus === 'pending' ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : (
          <CheckCircle className="h-4 w-4 text-success" />
        )}
        <span className="text-sm font-medium">
          {state.isSyncing
            ? 'Syncing...'
            : state.error
            ? 'Sync failed'
            : syncStatus === 'conflict'
            ? 'Sync conflict'
            : syncStatus === 'pending'
            ? 'Changes pending'
            : 'Synced'}
        </span>
      </div>
      {state.lastSyncTimestamp > 0 && (
        <span className="text-sm text-muted-foreground">
          Last synced: {new Date(state.lastSyncTimestamp).toLocaleTimeString()}
        </span>
      )}
      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleForceSyncClick}
          disabled={state.isSyncing}
        >
          Sync Now
        </Button>
        
        {conflicts.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Sync Conflicts</h3>
            {conflicts.map(conflict => (
              <div key={conflict.id} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                <span className="text-sm">{conflict.type} conflict</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolveConflict(conflict.id, 'local')}
                  >
                    Keep Local
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleResolveConflict(conflict.id, 'remote')}
                  >
                    Use Remote
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isAdmin && (
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Admin Controls</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => syncService.forceSyncAllUsers()}
              disabled={state.isSyncing}
            >
              Sync All Users
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
