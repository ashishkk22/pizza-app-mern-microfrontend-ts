export const getBadgeColor = (status: string) => {
  const productStatus = status.toLowerCase();
  switch (productStatus) {
    case 'draft':
      return 'gray.6';
    case 'published':
      return 'green';
    case 'valid':
      return 'green';
    case 'received':
      return 'red.6';
    case 'prepared':
      return 'blue';
    case 'out_for_delivery':
      return 'green';
    case 'completed':
      return 'red.6';
    default:
      return 'red.6';
  }
};
