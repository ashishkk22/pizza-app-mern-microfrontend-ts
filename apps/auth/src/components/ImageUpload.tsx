import React, { FC, useState } from 'react';
import { toast } from 'react-hot-toast';
import { publicKey } from '../config/imageKit';
import { Avatar, Button, Center, FileButton, Indicator } from '@mantine/core';
import { imageKitGenToken, imageKitUpload } from '../config/api';

type ImageInputProps = {
  image: string;
  setImage: (url: string) => void;
};

const ImageInput: FC<ImageInputProps> = ({ image, setImage }) => {
  const [loading, setLoading] = useState(false);

  const handleFile = (file: File | null) => {
    if (file && file.size < 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result as string;
        setImage(base64);
        profileUpload(base64);
      };
    } else {
      toast.error('Image should not be more than 4 mb');
    }
  };
  const profileUpload = async (base64: string) => {
    setLoading(true);
    try {
      const response = await imageKitGenToken();
      const { expire, signature, token } = response.data;
      const res = await toast.promise(
        imageKitUpload({
          token,
          signature,
          expire,
          file: base64,
          publicKey: publicKey,
          useUniqueFileName: true,
          fileName: 'user',
        }),
        {
          loading: 'Uploading file....',
          success: <div>Profile picture uploaded successfully</div>,
          error: <div>An error while uploading profile !</div>,
        }
      );
      setImage(res.data.url);
      setLoading(false);
    } catch (error) {
      toast.error('An error while uploading profile !');
    }
  };
  return (
    <>
      <Center>
        <Indicator label="New" size={16}>
          <Avatar
            radius="xl"
            size="lg"
            style={{ borderRadius: '10rem', width: '7rem', height: '7rem' }}
            src={image}
          />
        </Indicator>
      </Center>
      <Center mt={12}>
        <FileButton
          onChange={handleFile}
          accept="image/png,image/jpeg,image/jpg,image/svg,image/gif,image/webp"
        >
          {(props) => (
            <Button
              variant="subtle"
              color="red"
              compact
              {...props}
              loading={loading}
            >
              Change Profile Picture
            </Button>
          )}
        </FileButton>
      </Center>
    </>
  );
};

export default ImageInput;
