export function validateProduct(values: {
  name: string;
  description: string;
  price: number;
}) {
  return {
    name:
      values.name.trim().length < 3
        ? 'Product name must include at least 3 characters'
        : null,
    description:
      values.description.trim().length < 25
        ? 'Product description must include at least 25 characters'
        : null,
    price: values.price < 1 ? 'Price should be greater than 1 !' : null,
  };
}
