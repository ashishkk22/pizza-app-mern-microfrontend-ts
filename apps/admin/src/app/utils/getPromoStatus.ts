export const getBadgeColor = (status: string) => {
  const productStatus = status.toLowerCase();
  switch (productStatus) {
    case 'draft':
      return 'gray.6';
    case 'valid':
      return 'green';
  }
};
