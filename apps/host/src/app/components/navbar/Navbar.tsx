import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Badge,
  BackgroundImage,
  Container,
  Flex,
  Image,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

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
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <>
      <Box>
        <Header height={60} px="md">
          <Group position="apart" sx={{ height: '100%' }}>
            <Link to={'/'}>
              <img src="../../../assets/Logo.svg" alt="Logo" />
            </Link>
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
              <Link to={'/'} className={classes.link}>
                Cart
                <Image
                  width={22}
                  ml={8}
                  src="/assets/shopping_basket.svg"
                  alt="shopping_basket"
                />
              </Link>
            </Group>
            <Group className={classes.hiddenMobile}>
              <Button variant="default">Log in</Button>
              <Button color="red.6">Sign up</Button>
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
          title="Welcome to Our Platform !"
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
            {/* <a href="#" className={classes.link}>
            Home
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}> </Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>
           */}
            <Link to={'/'} className={classes.link}>
              Menu
            </Link>
            <Link to={'/'} className={classes.link}>
              Orders
            </Link>
            <Link to={'/'} className={classes.link}>
              Cart
              <Image
                width={22}
                ml={8}
                src="/assets/shopping_basket.svg"
                alt="shopping_basket"
              />
            </Link>
            <Divider
              my="sm"
              color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'}
            />
            <Group position="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button color="red.6">Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>
      <BackgroundImage src="/assets/banner-bg.svg">
        <Container py={64}>
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            gap={{ base: 'sm', sm: 'lg' }}
            justify={{ sm: 'space-between' }}
            align={{ base: 'center' }}
          >
            <Box>
              <Text m={4} fs="italic">
                Are you hungry ?
              </Text>
              <Title order={1} color="brand.9" m={4}>
                Get a yummy pizza in 30 min!
              </Title>
              <Button radius="lg" m={4} color="red.6">
                Order now
              </Button>
            </Box>
            <Box>
              <Image
                maw={420}
                mx="auto"
                radius="md"
                src="/assets/pizza-banner.svg"
                alt="Random image"
              />
            </Box>
          </Flex>
        </Container>
      </BackgroundImage>
    </>
  );
};
export default Navbar;
