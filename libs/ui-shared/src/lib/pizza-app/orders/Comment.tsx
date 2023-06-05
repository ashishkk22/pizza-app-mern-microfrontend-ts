import { Card, Text } from '@mantine/core';
import React, { FC } from 'react';

type CommentProps = {
  msg: string;
};

export const Comment: FC<CommentProps> = ({ msg }) => {
  return (
    <Card shadow="sm" radius="md" w={'100%'} my={6}>
      <Text fz="lg" fw={600} mb={12}>
        Comment
      </Text>
      <Text color="gray.6">{msg}</Text>
    </Card>
  );
};
