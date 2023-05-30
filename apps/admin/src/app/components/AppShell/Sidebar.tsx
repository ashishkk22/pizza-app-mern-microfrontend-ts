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
import { Link } from 'react-router-dom';

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
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();

  const routeLink = label.toLowerCase();

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
        component={Link}
        to={`/${routeLink}`}
      >
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const sideBarData = [
  { icon: IconHome2, label: 'Home' },
  { icon: IconBriefcase, label: 'Orders' },
  { icon: IconToolsKitchen2, label: 'Products' },
  { icon: IconCategory, label: 'Categories' },
  { icon: IconGift, label: 'Promos' },
];

const Sidebar = () => {
  const [active, setActive] = useState(0);

  const links = sideBarData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
      }}
    />
  ));
  return (
    <Navbar height={'100%'} width={{ base: 80 }} p="md">
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconLogout} label="Logout" />
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

export default Sidebar;
