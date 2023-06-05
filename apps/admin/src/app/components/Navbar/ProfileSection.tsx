import React, { FC } from 'react';
import { Button, Avatar, Menu, Text, Accordion, Flex } from '@mantine/core';
import { IconArrowsExchange, IconLogout } from '@tabler/icons-react';
import { useUserStore } from '@pizza-app/redux-store';
import { Link, useNavigate } from 'react-router-dom';

type ProfileSectionProps = {
  isMobile?: boolean;
  style?: string;
};

const ProfileSection: FC<ProfileSectionProps> = ({ isMobile, style }) => {
  const { isAuth, photo, name, removeUser } = useUserStore();
  const navigate = useNavigate();
  const logoutHandler = () => {
    removeUser();
    navigate('/');
  };

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
                    className={style}
                    to="/user/changePassword"
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
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ) : (
          <>
            <Button component={Link} color="red.6" fullWidth to="/user/signin">
              Log in
            </Button>
            {/* <Button to="/user/signup" component={Link} color="red.6" fullWidth>
              Sign up
            </Button> */}
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
            <Menu.Item
              icon={<IconArrowsExchange size={14} />}
              component={Link}
              to="/user/changePassword"
            >
              Change password
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              icon={<IconLogout size={14} />}
              onClick={logoutHandler}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <>
          <Link to="/user/signin">
            <Button color="red.6">Log in</Button>
          </Link>
          {/* <Link to="/user/signup">
            <Button color="red.6">Sign up</Button>
          </Link> */}
        </>
      )}
    </>
  );
};

export default ProfileSection;
