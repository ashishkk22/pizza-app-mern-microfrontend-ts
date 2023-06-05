import React, { useState } from 'react';
import {
  IconHome2,
  IconToolsKitchen2,
  IconBriefcase,
  IconCategory,
  IconGift,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import {
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
  Navbar,
} from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
  link?: string;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  link = '/',
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
        component={Link}
        to={link}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const sideBarData = [
  { icon: IconHome2, label: 'Home', link: '/' },
  { icon: IconBriefcase, label: 'Orders', link: '/orders' },
  { icon: IconToolsKitchen2, label: 'Products', link: '/products' },
  { icon: IconCategory, label: 'Categories', link: '/categories' },
  { icon: IconGift, label: 'Promos', link: '/promos' },
];

const Sidebar = () => {
  const location = useLocation();

  const links = sideBarData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={location.pathname === link.link}
    />
  ));
  return (
    <Navbar height={'100%'} width={{ base: 80 }} p="md">
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
