import {
  createStyles,
  Header,
  Group,
  Divider,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Image,
} from '@mantine/core';
import { Logo } from '@pizza-app/ui-shared';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import ProfileSection from './ProfileSection';

const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const Navbar = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <>
      <Header height={60} px="md" bg="white">
        <Group position="apart" sx={{ height: '100%' }}>
          <Logo />
          <Group
            sx={{ height: '100%' }}
            spacing={0}
            className={classes.hiddenMobile}
          >
            <Link to={'/'} className={classes.link}>
              Menu
            </Link>
            <Link to={'/'} className={classes.link}>
              Orders
            </Link>
            <Link to={'/cart/'} className={classes.link}>
              Cart
              <Image
                width={22}
                ml={8}
                src="https://ik.imagekit.io/ashishkk22/shopping_basket.svg?updatedAt=1684732991249"
                alt="shopping_basket"
              />
            </Link>
          </Group>

          <Group className={classes.hiddenMobile}>
            <ProfileSection />
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title={<Logo />}
        size="100%"
        padding="sm"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(100)})`} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
          <Link to={'/'} className={classes.link}>
            Menu
          </Link>
          <Link to={'/'} className={classes.link}>
            Orders
          </Link>
          <Link to={'/cart/'} className={classes.link}>
            Cart
            <Image
              width={22}
              ml={8}
              src="https://ik.imagekit.io/ashishkk22/shopping_basket.svg?updatedAt=1684732991249"
              alt="shopping_basket"
            />
          </Link>
          <Divider
            my="sm"
            color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
          />
          <Group position="apart" grow pb="xl" px="md">
            <ProfileSection isMobile style={classes.link} />
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
};
export default Navbar;
