import { useEffect, useRef } from 'react';

export const usePerformance = (componentName: string) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const startTime = performance.now();
      
      return () => {
        const endTime = performance.now();
        console.log(`${componentName} render time: ${(endTime - startTime).toFixed(2)}ms`);
      };
    }
  }, [componentName]);
};

export const useRenderCount = (componentName: string) => { // Hook para medir re-renders
  const count = useRef(0);
  
  useEffect(() => {
    count.current += 1;
    console.log(`${componentName} re-rendered: ${count.current} times`);
  });
};