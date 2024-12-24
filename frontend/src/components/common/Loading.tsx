import React from 'react';
import { LoadingProps } from '../../types/components';

const sizeClasses = {
  small: 'h-4 w-4',
  medium: 'h-8 w-8',
  large: 'h-12 w-12'
};

const Loading: React.FC<LoadingProps> = ({ size = 'medium', message }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-4 border-primary border-t-transparent ${sizeClasses[size]}`} />
      {message && <p className="mt-2 text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export { Loading };
