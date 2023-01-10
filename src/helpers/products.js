export const productincart = (product_id, products_in_cart) => {
  // eslint-disable-next-line
  const arr = products_in_cart.filter((prod) => prod.product_id == product_id);

  // eslint-disable-next-line
  return arr.length == 0 ? false : true;
};
