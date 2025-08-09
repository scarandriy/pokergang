'use client';

import { useLoadingState } from '@/hooks/useLoadingState';
import { FunnyLoading } from '@/components/FunnyLoading';

interface LoadingProviderProps {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const { isLoading } = useLoadingState();

  return (
    <>
      {children}
      {isLoading && <FunnyLoading />}
    </>
  );
} 