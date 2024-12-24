import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { toast } from '../../lib/use-toast';

interface Settings {
  theme: 'light' | 'dark' | 'system';
  autoDownload: boolean;
  streamingQuality: 'auto' | 'low' | 'medium' | 'high';
  notifications: boolean;
  syncEnabled: boolean;
}

const SettingsPage = () => {
  const [settings, setSettings] = React.useState<Settings>({
    theme: 'system',
    autoDownload: false,
    streamingQuality: 'auto',
    notifications: true,
    syncEnabled: true,
  });

  const handleSave = async () => {
    try {
      // TODO: Implement settings save to backend
      toast({
        title: 'Settings Saved',
        description: 'Your settings have been updated successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
      });
    }
  };

export default SettingsPage;
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred theme
                </p>
              </div>
              <Select
                value={settings.theme}
                onValueChange={(value: 'light' | 'dark' | 'system') =>
                  setSettings({ ...settings, theme: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto Download</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically download new content
                </p>
              </div>
              <Switch
                checked={settings.autoDownload}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, autoDownload: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Streaming Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Set your preferred streaming quality
                </p>
              </div>
              <Select
                value={settings.streamingQuality}
                onValueChange={(value: 'auto' | 'low' | 'medium' | 'high') =>
                  setSettings({ ...settings, streamingQuality: value })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Enable push notifications
                </p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, notifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Cross-Platform Sync</h3>
                <p className="text-sm text-muted-foreground">
                  Sync settings across devices
                </p>
              </div>
              <Switch
                checked={settings.syncEnabled}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, syncEnabled: checked })
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
