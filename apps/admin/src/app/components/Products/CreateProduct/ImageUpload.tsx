import { Flex, Image, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import React from 'react';

const ImageUpload = () => {
  return (
    <Dropzone
      onDrop={(e) => {
        console.log(e);
      }}
      accept={IMAGE_MIME_TYPE}
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 0.5,
        borderStyle: 'dotted',
        borderColor: 'gray.3',
        backgroundColor: theme.colors.gray[0],
        '&[data-accept]': {
          color: theme.white,
          backgroundColor: theme.colors.blue[6],
        },
        '&[data-reject]': {
          color: theme.white,
          backgroundColor: theme.colors.red[6],
        },
      })}
    >
      <Flex justify="center">
        <Image
          src="https://ik.imagekit.io/ashishkk22/pizza/Inbox.svg"
          width={60}
        />
      </Flex>
      <Text align="center">Click or drag file to this area to upload</Text>
      <Text align="center" fz={'xs'} color="dimmed">
        Support only single file
      </Text>
    </Dropzone>
  );
};

export default ImageUpload;
