import { Card, Divider, Text, Timeline } from '@mantine/core';
import React, { FC } from 'react';
import {
  IconClipboardText,
  IconPizza,
  IconBike,
  IconCircleCheck,
} from '@tabler/icons-react';
import { OrderStatus } from '../../utils/Endpoints.type';

type TimeLineProps = {
  status: string;
};

const getTimeLineStatus = (status: OrderStatus) => {
  switch (status) {
    case 'received':
      return 0;
    case 'prepared':
      return 1;
    case 'out_for_delivery':
      return 2;
    case 'completed':
      return 3;
  }
};

const TimeLine: FC<TimeLineProps> = ({ status }) => {
  const timeLineStatus = getTimeLineStatus(status as OrderStatus);

  return (
    <Card shadow="sm" radius="md" w={'100%'} my={6}>
      <Text fz="lg" fw={600} mt={12}>
        Order status
      </Text>
      <Divider size="xs" color="gray.2" my={16} />
      <Timeline
        active={timeLineStatus}
        bulletSize={30}
        lineWidth={4}
        my={12}
        style={{ cursor: 'pointer' }}
      >
        <Timeline.Item
          bullet={<IconClipboardText size={12} />}
          title="Received"
        >
          <Text color="dimmed" size="sm">
            We received the order !
          </Text>
        </Timeline.Item>

        <Timeline.Item bullet={<IconPizza size={12} />} title="Prepared">
          <Text color="dimmed" size="sm">
            Order has been prepared !
          </Text>
        </Timeline.Item>

        <Timeline.Item
          title="Out for delivery"
          bullet={<IconBike size={12} />}
          lineVariant="dashed"
        >
          <Text color="dimmed" size="sm">
            Item is reaching to you soon !
          </Text>
        </Timeline.Item>
        <Timeline.Item title="Completed" bullet={<IconCircleCheck size={12} />}>
          <Text color="dimmed" size="sm">
            Item is delivered successfully
          </Text>
        </Timeline.Item>
      </Timeline>
    </Card>
  );
};

export default TimeLine;
