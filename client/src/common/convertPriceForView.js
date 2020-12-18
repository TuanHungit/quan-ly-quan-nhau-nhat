const numberFormat = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
export default (n, currency) => numberFormat.format(n.toFixed(4));
