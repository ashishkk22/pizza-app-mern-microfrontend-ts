import { Card, Text } from '@mantine/core';
import React from 'react';

const Comment = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" m={8} w={'100%'}>
      <Text fz="lg" fw={600} mb={12}>
        Comment
      </Text>
      <Text color="gray.6">
        Please, do not make to spicy and once you reach to the location call me
        to pickup the order
      </Text>
    </Card>
  );
};

export default Comment;
