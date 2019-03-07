export const formatPrice = (x: number, currency: string) => {
  switch (currency) {
    case 'PLN':
      return x.toFixed(2).replace('.', ',');
    default:
      return x.toFixed(2);
  }
};