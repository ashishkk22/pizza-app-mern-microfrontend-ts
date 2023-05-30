export const getPromoStatus = (status: string) => {
  const productStatus = status.toLowerCase();
  switch (productStatus) {
    case 'expired':
      return 'Expired';
    case 'valid':
      return 'Valid';
  }
};

export const getBadgeColor = (status: string) => {
  const productStatus = status.toLowerCase();
  switch (productStatus) {
    case 'expired':
      return 'gray.6';
    case 'valid':
      return 'green';
  }
};
