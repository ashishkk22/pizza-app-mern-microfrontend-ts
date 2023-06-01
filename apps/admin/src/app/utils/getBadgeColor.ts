export const getBadgeColor = (status: string) => {
  const productStatus = status.toLowerCase();
  switch (productStatus) {
    case 'draft':
      return 'gray.6';
    case 'published':
      return 'green';
    case 'valid':
      return 'green';
  }
};
