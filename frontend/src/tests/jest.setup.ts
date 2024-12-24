import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { afterEach, beforeEach, vi } from 'vitest';
import 'fake-indexeddb/auto';

// Add missing globals
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// Mock crypto
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => 'test-device-id',
    subtle: {
      digest: () => Promise.resolve(new ArrayBuffer(32)),
      encrypt: () => Promise.resolve(new ArrayBuffer(32)),
      decrypt: () => Promise.resolve(new ArrayBuffer(32))
    },
    getRandomValues: (array: Uint8Array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    }
  },
  configurable: true,
  writable: true
});

// Mock import.meta.env
(global as any).import = {
  meta: {
    env: {
      VITE_API_URL: 'http://localhost:8000',
      VITE_SYNC_INTERVAL: '1000',
      VITE_MAX_DOWNLOAD_SIZE: '1073741824', // 1GB
      VITE_STREAMING_CHUNK_SIZE: '8388608', // 8MB
      VITE_OFFLINE_STORAGE_LIMIT: '10737418240', // 10GB
      VITE_APP_NAME: 'Magnet App'
    }
  }
};

// Mock config module after environment setup
vi.mock('../lib/config', () => ({
  config: {
    apiUrl: 'http://localhost:8000',
    syncInterval: 1000,
    maxDownloadSize: 1073741824,
    streamingChunkSize: 8388608,
    offlineStorageLimit: 10737418240,
    appName: 'Magnet App',
    deviceId: 'test-device'
  }
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn().mockImplementation((key: string) => {
    if (key === 'deviceId') return 'test-device';
    return null;
  }),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
  length: 0,
  key: vi.fn(),
};

// Set up localStorage mock
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Mock fetch API
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  } as Response)
);

// Reset mocks and clear storage before each test
beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.clear.mockClear();
  localStorageMock.removeItem.mockClear();
  indexedDB.deleteDatabase('offlineStorage');
});

afterEach(() => {
  vi.resetAllMocks();
});

// Mock console.error to fail tests on errors
const originalError = console.error;
console.error = (...args: any[]) => {
  originalError(...args);
  // Only throw on specific errors we want to catch
  const errorMessage = args.join(' ');
  if (errorMessage.includes('Critical error:')) {
    throw new Error(errorMessage);
  }
};
