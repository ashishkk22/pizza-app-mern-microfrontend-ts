import { Box } from '@mantine/core';
import React, { FC, ReactNode } from 'react';

type GrayContainerProps = {
  children: ReactNode;
};

export const GrayContainer: FC<GrayContainerProps> = ({ children }) => {
  return (
    <Box mih="100vh" bg="#F5F5F5">
      {children}
    </Box>
  );
};
