import { Box, Flex, Image, Text } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import React, { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { imageKitGenToken, imageKitUpload } from '../../../utils/api';
import { publicKey } from '../../../utils/ImageKitConfig';

type ImageUploadProps = {
  image: string;
  setImage: (img: string) => void;
};

const ImageUpload: FC<ImageUploadProps> = ({ image, setImage }) => {
  const [loading, setLoading] = useState(false);

  //to convert the img in to base64 with constrains
  const handleFile = (file: File | null) => {
    if (file && file.size < 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;
        profileUpload(base64);
      };
    } else {
      toast.error('Image should not be more than 4 mb');
    }
  };

  //upload base64 img to the imageKit and set the res img url in the image state
  const profileUpload = async (base64: string) => {
    setLoading(true);
    try {
      const response = await imageKitGenToken();
      const { expire, signature, token } = response.data;
      const res = await imageKitUpload({
        token,
        signature,
        expire,
        file: base64,
        publicKey: publicKey,
        useUniqueFileName: true,
        fileName: 'user',
      });
      toast.success('Profile picture uploaded successfully');
      setImage(res.data.url);
      setLoading(false);
    } catch (error) {
      toast.error('An error while uploading profile !');
      setLoading(false);
    }
  };
  return (
    <Box m={12}>
      {image ? (
        <Flex mah={280} maw={280} justify="center">
          <Image src={image} />
        </Flex>
      ) : (
        <Dropzone
          loading={loading}
          onDrop={(Files) => {
            handleFile(Files[0]);
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
      )}
    </Box>
  );
};

export default ImageUpload;
