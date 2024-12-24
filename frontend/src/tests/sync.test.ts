import { vi } from 'vitest';

// Mock API client before imports
vi.mock('../lib/api-client', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn()
  }
}));

import { describe, test, expect, beforeEach } from 'vitest';
import { syncService } from '../services/sync';
import { offlineStorage } from '../lib/offline-storage';
import type { SyncMetadata } from '../types/sync';
import { config } from '../lib/config';
import apiClient from '../lib/api-client';

// Verify config is properly mocked
beforeAll(() => {
  expect(config.deviceId).toBe('test-device');
  expect(config.syncInterval).toBe(1000);
  expect(config.apiUrl).toBe('http://localhost:8000');
});

beforeEach(() => {
  // Reset sync service state and mocks before each test
  vi.clearAllMocks();
});

describe('Sync Integration Tests', () => {
  beforeEach(async () => {
    // Clear offline storage before each test
    await offlineStorage.clearOldDownloads(0);
    // Reset sync service state
    (syncService as any).setState({ lastSyncTimestamp: 0, isSyncing: false, error: null });
  });

  test('should sync offline downloads', async () => {
    // Add test download
    const testMetadata: SyncMetadata = {
      filename: 'test.mp4',
      size: 1024,
      timestamp: Date.now(),
      type: 'download'
    };
    const testData = new ArrayBuffer(1024);
    await offlineStorage.addDownload('test-id', testData, testMetadata);

    // Mock successful API responses
    (apiClient.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { success: true }
    });
    
    (apiClient.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        data: {
          changes: [],
          timestamp: Date.now()
        }
      }
    });

    // Force sync
    await syncService.forceSyncNow();

    // Verify sync state
    const state = syncService.getState();
    expect(state.error).toBeNull();
    expect(state.isSyncing).toBeFalsy();
    expect(state.lastSyncTimestamp).toBeGreaterThan(0);
  });


  test('should handle offline mode gracefully', async () => {
    // Mock network error
    (apiClient.post as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));
    (apiClient.get as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Network error'));

    // Add test download
    const testMetadata: SyncMetadata = {
      filename: 'offline.mp4',
      size: 2048,
      timestamp: Date.now(),
      type: 'download'
    };
    const testData = new ArrayBuffer(2048);
    await offlineStorage.addDownload('offline-id', testData, testMetadata);

    // Attempt sync
    await syncService.forceSyncNow();

    // Verify offline data is preserved
    const metadata = await offlineStorage.getMetadata('offline-id');
    expect(metadata).toBeTruthy();
    expect(metadata?.filename).toBe('offline.mp4');

    // Verify sync state shows error
    const state = syncService.getState();
    expect(state.error).toBeTruthy();
  });

  beforeEach(() => {
    // Mock setInterval
    vi.spyOn(window, 'setInterval').mockImplementation((fn) => {
      fn(); // Run once immediately
      return 1 as unknown as NodeJS.Timeout;
    });
    
    // Mock clearInterval
    vi.spyOn(window, 'clearInterval').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should handle large datasets efficiently', async () => {
    // Add multiple large downloads
    const downloads = Array.from({ length: 10 }, (_, i) => ({
      id: `large-${i}`,
      metadata: {
        filename: `large-${i}.mp4`,
        size: 1024 * 1024, // 1MB
        timestamp: Date.now(),
        type: 'download' as const
      },
      data: new ArrayBuffer(1024 * 1024)
    }));

    // Add downloads in parallel
    await Promise.all(
      downloads.map(({ id, data, metadata }) =>
        offlineStorage.addDownload(id, data, metadata)
      )
    );

    // Mock successful API responses for large dataset test
    (apiClient.post as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: { success: true }
    });
    
    (apiClient.get as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      data: {
        data: {
          changes: [],
          timestamp: Date.now()
        }
      }
    });

    // Measure sync time
    const startTime = Date.now();
    await syncService.forceSyncNow();
    const endTime = Date.now();

    // Verify sync completed successfully
    const state = syncService.getState();
    expect(state.error).toBeNull();
    expect(endTime - startTime).toBeLessThan(5000); // Should sync within 5 seconds

    // Verify all downloads are still accessible
    for (const { id } of downloads) {
      const metadata = await offlineStorage.getMetadata(id);
      expect(metadata).toBeTruthy();
    }
  });
});
