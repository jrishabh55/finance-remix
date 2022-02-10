import numeral from 'numeral';

export const formatNumber = (
  number: number,
  { currency = true, currencyCode = '$', chart = false } = {}
) => {
  return numeral(number)
    .format(`${currency ? '$' : ''}0${chart ? '' : '.0'}}a`)
    .replace(/\$/, currencyCode);
};
