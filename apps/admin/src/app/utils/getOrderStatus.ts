enum DeliveryStatus {
  preparing,
  onTheWay,
  Delivery,
}

export const getOrderStatus = (status: number) => {
  switch (status) {
    case 0:
      return 'Preparing';
    case 1:
      return 'On the way';
    case 2:
      return 'Delivered';
    default:
      return 'Preparing';
  }
};

export const getBadgeColor = (status: number) => {
  switch (status) {
    case 0:
      return 'red.6';
    case 1:
      return 'blue';
    case 2:
      return 'green';
    default:
      return 'red.6';
  }
};
