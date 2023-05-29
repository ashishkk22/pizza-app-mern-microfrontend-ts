import { Card, Divider, Text, Timeline } from '@mantine/core';
import React, { useState } from 'react';
import {
  IconClipboardText,
  IconPizza,
  IconBike,
  IconCircleCheck,
} from '@tabler/icons-react';
import { toast } from 'react-hot-toast';

const TimeLine = () => {
  const [status, setStatus] = useState(0);

  const handleTimeline = (status: number) => {
    setStatus(status);
    toast.success('Order status updated!');
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" m={8} w={'100%'}>
      <Text fz="lg" fw={600} mt={12}>
        Update the order status
      </Text>
      <Text fz={'sm'} color="dimmed">
        Click on the below timeline to update the order status
      </Text>
      <Divider size="xs" color="gray.2" my={16} />
      <Timeline
        active={status}
        bulletSize={30}
        lineWidth={4}
        my={12}
        style={{ cursor: 'pointer' }}
      >
        <Timeline.Item
          bullet={<IconClipboardText size={12} />}
          title="Received"
          onClick={() => handleTimeline(0)}
        >
          <Text color="dimmed" size="sm">
            We received the order !
          </Text>
        </Timeline.Item>

        <Timeline.Item
          bullet={<IconPizza size={12} />}
          title="Prepared"
          onClick={() => handleTimeline(1)}
        >
          <Text color="dimmed" size="sm">
            Order has been prepared !
          </Text>
        </Timeline.Item>

        <Timeline.Item
          title="Out for delivery"
          bullet={<IconBike size={12} />}
          lineVariant="dashed"
          onClick={() => handleTimeline(2)}
        >
          <Text color="dimmed" size="sm">
            Item is reaching to you soon !
          </Text>
        </Timeline.Item>
        <Timeline.Item
          title="Completed"
          bullet={<IconCircleCheck size={12} />}
          onClick={() => handleTimeline(3)}
        >
          <Text color="dimmed" size="sm">
            Item is delivered successfully
          </Text>
        </Timeline.Item>
      </Timeline>
    </Card>
  );
};

export default TimeLine;
