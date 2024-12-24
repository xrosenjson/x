import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { api } from '@/lib/api';
import { MagnetLink } from '@/types/magnet';
import { useAuth } from '@/contexts/AuthContext';

interface MagnetLinkParserProps {
  onParsed?: (magnetLink: MagnetLink) => void;
}

export const MagnetLinkParser: React.FC<MagnetLinkParserProps> = ({ onParsed }) => {
  const [magnetUrl, setMagnetUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user: _ } = useAuth(); // Unused for now

  const handleParse = async () => {
    if (!magnetUrl) {
      toast({
        title: 'Error',
        description: 'Please enter a magnet URL',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post<MagnetLink>('/api/v1/magnet/parse', {
        magnet_url: magnetUrl,
      });

      toast({
        title: 'Success',
        description: 'Magnet link parsed successfully',
      });

      // Clear input
      setMagnetUrl('');
      
      // Notify parent component
      onParsed?.(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to parse magnet link',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Parse Magnet Link</h2>
      <div className="flex gap-2">
        <Input
          type="text"
          value={magnetUrl}
          onChange={(e) => setMagnetUrl(e.target.value)}
          placeholder="Enter magnet URL..."
          className="flex-1"
        />
        <Button 
          onClick={handleParse}
          disabled={loading || !magnetUrl}
        >
          {loading ? 'Parsing...' : 'Parse'}
        </Button>
      </div>
    </Card>
  );
};
