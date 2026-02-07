export const getMeliSellerId = (): string => {
  const sellerId = process.env.MELI_SELLER_ID;

  if (!sellerId) {
    throw new Error('MELI_SELLER_ID is not defined');
  }

  return sellerId;
};
