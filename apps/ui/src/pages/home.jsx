import { useEffect, useState } from 'react';
import { api } from '@/services/api-service';
import { cn } from '@/utils/cn';

export function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const connectToBackend = async () => {
      try {
        await api.get('ping');

        setIsLoaded(true);
      } catch {
        setIsLoaded(false);
      }
    };

    connectToBackend();
  }, []);

  return (
    <div className="min-h-svh grid place-content-center">
      <h1 className="text-4xl text-center">Home Page</h1>
      <h2 className="flex gap-1">
        <span>Backend Status:</span>
        <span className={cn('font-bold', isLoaded ? 'text-green-500' : 'text-red-500')}>
          {isLoaded ? 'Connected' : 'Unavailable'}
        </span>
      </h2>
    </div>
  );
}
