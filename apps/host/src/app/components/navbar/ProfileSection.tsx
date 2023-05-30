import React, { FC } from 'react';
import { Button, Avatar, Menu, Text, Accordion, Flex } from '@mantine/core';
import {
  IconArrowsExchange,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react';
import { useUserStore } from '@pizza-app/redux-store';
import { Link } from 'react-router-dom';

type ProfileSectionProps = {
  isMobile?: boolean;
  style?: string;
};

const ProfileSection: FC<ProfileSectionProps> = ({ isMobile, style }) => {
  const { isAuth, photo, name } = useUserStore();
  if (isMobile) {
    return (
      <>
        {' '}
        {isAuth ? (
          <Accordion variant="filled">
            <Accordion.Item value="customization">
              <Accordion.Control>
                <Flex gap={10} align="center">
                  <Avatar
                    style={{ cursor: 'pointer' }}
                    radius="lg"
                    src={photo}
                    alt={name}
                  />
                  <Text>{name}</Text>
                </Flex>
              </Accordion.Control>
              <Accordion.Panel>
                <Flex direction="column" justify="flex-start" align="center">
                  <Button
                    variant="subtle"
                    component={Link}
                    to="/"
                    className={style}
                    leftIcon={<IconUserCircle size={14} />}
                  >
                    Profile
                  </Button>
                  <Button
                    variant="subtle"
                    component={Link}
                    className={style}
                    to="/"
                    leftIcon={<IconArrowsExchange size={14} />}
                  >
                    Change password
                  </Button>
                  <Button
                    variant="subtle"
                    component={Link}
                    className={style}
                    to="/"
                    leftIcon={<IconLogout size={14} />}
                  >
                    Logout
                  </Button>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ) : (
          <>
            <Button
              component={Link}
              variant="default"
              fullWidth
              to="/user/signin"
            >
              Log in
            </Button>
            <Button to="/user/signup" component={Link} color="red.6" fullWidth>
              Sign up
            </Button>
          </>
        )}
      </>
    );
  }
  return (
    <>
      {' '}
      {isAuth ? (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar
              style={{ cursor: 'pointer' }}
              radius="lg"
              src={photo}
              alt={name}
            />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconUserCircle size={14} />}>Profile</Menu.Item>
            <Menu.Item icon={<IconArrowsExchange size={14} />}>
              Change password
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" icon={<IconLogout size={14} />}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <>
          <Link to="/user/signin">
            <Button variant="default">Log in</Button>
          </Link>
          <Link to="/user/signup">
            <Button color="red.6">Sign up</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default ProfileSection;
