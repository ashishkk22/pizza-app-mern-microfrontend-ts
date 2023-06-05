import { Card, Divider, Text, Timeline } from '@mantine/core';
import React, { FC, useState } from 'react';
import {
  IconClipboardText,
  IconPizza,
  IconBike,
  IconCircleCheck,
} from '@tabler/icons-react';
import { ModifyOrderStatusBody, OrderStatus } from '../../utils/endPoint.type';
import { useMutation } from '@tanstack/react-query';
import { modifyOrderStatus } from '../../utils/api';
import { queryClient } from '@pizza-app/ui-shared';
import { toast } from 'react-hot-toast';

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
const orderStatusFromTimeline: Record<number, OrderStatus> = {
  0: 'received',
  1: 'prepared',
  2: 'out_for_delivery',
  3: 'received',
};

type TimeLineProps = {
  status: string;
  orderId: string;
};

const TimeLine: FC<TimeLineProps> = ({ status, orderId }) => {
  const timeLinkStr = getTimeLineStatus(status as OrderStatus);
  const [timeLineStatus, setTimeLineStatus] = useState(timeLinkStr);

  const updateOrderMutation = useMutation({
    mutationFn: (data: ModifyOrderStatusBody) => modifyOrderStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
      queryClient.invalidateQueries(['home_orders']);
      toast.success('Order status updated !');
    },
    onError: () => {
      toast.error('Unable to update the order status');
      setTimeLineStatus(timeLinkStr);
    },
  });

  const statusChangeHandler = (status: number) => {
    const updatedStatus = orderStatusFromTimeline[status];
    updateOrderMutation.mutate({
      orderId: orderId,
      changedStatus: updatedStatus,
    });
    setTimeLineStatus(status);
  };

  return (
    <Card shadow="sm" radius="md" w={'100%'} my={6}>
      <Text fz="lg" fw={600} mt={12}>
        Order status
      </Text>
      <Text fz={'sm'} color="dimmed">
        Click on the below timeline to update the order status
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
          onClick={() => statusChangeHandler(0)}
          active
        >
          <Text color="dimmed" size="sm">
            We received the order !
          </Text>
        </Timeline.Item>

        <Timeline.Item
          bullet={<IconPizza size={12} />}
          title="Prepared"
          onClick={() => statusChangeHandler(1)}
        >
          <Text color="dimmed" size="sm">
            Order has been prepared !
          </Text>
        </Timeline.Item>

        <Timeline.Item
          title="Out for delivery"
          bullet={<IconBike size={12} />}
          lineVariant="dashed"
          onClick={() => statusChangeHandler(2)}
        >
          <Text color="dimmed" size="sm">
            Item is reaching to you soon !
          </Text>
        </Timeline.Item>
        <Timeline.Item
          title="Completed"
          bullet={<IconCircleCheck size={12} />}
          onClick={() => statusChangeHandler(3)}
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
