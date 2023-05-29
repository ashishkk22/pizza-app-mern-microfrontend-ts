export const getProductStatus = (status: string) => {
  const productStatus = status.toLowerCase();
  switch (productStatus) {
    case 'draft':
      return 'Draft';
    case 'published':
      return 'Published';
  }
};

export const getBadgeColor = (status: string) => {
  const productStatus = status.toLowerCase();
  switch (productStatus) {
    case 'draft':
      return 'gray.6';
    case 'published':
      return 'green';
  }
};
