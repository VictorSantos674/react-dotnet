import { memo, type ComponentType } from 'react';

export const withMemo = <P extends object>(
  Component: ComponentType<P>,
  propsAreEqual?: (prevProps: P, nextProps: P) => boolean
) => {
  return memo(Component, propsAreEqual);
};

export const useRenderCounter = (componentName: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${componentName} rendered`);
  }
};