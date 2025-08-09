'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useLoadingState() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Показываем loading при изменении пути
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Минимальное время показа loading

    return () => clearTimeout(timer);
  }, [pathname]);

  return { isLoading };
} 