import { ReactNode, FC } from 'react';
import { AppShell as AppShellMantine } from '@mantine/core';

import AppNavbar from '../Navbar/Navbar';
import Sidebar from './Sidebar';

type AppShellProps = {
  children: ReactNode;
};

const AppShell: FC<AppShellProps> = ({ children }) => {
  return (
    <AppShellMantine navbar={<AppNavbar />} header={<Sidebar />}>
      {children}
    </AppShellMantine>
  );
};

export default AppShell;
