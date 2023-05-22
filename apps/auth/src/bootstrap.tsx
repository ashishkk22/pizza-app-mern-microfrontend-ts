import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createRouter } from './routing/router-factory';
import { RoutingStrategy } from './routing/types';
import { MantineProvider } from '@mantine/core';
import { theme } from '@pizza-app/ui-shared';

const mount = ({
  mountPoint,
  initialPathname,
  routingStrategy,
}: {
  mountPoint: HTMLElement;
  initialPathname?: string;
  routingStrategy?: RoutingStrategy;
}) => {
  const router = createRouter({ strategy: routingStrategy, initialPathname });

  const root = createRoot(mountPoint);
  root.render(
    <MantineProvider
      withNormalizeCSS
      withGlobalStyles
      theme={{
        fontFamily: theme.fontFamily,
        colors: theme.colors as Record<string, any>,
        primaryColor: theme.primaryColor,
      }}
    >
      <RouterProvider router={router} />
    </MantineProvider>
  );

  return () => queueMicrotask(() => root.unmount());
};

export { mount };
