import numeral from 'numeral';

export const formatNumber = (number: number, currency = false) => {
  return numeral(number).format(`${currency ? '$' : ''}0.00a`);
};
