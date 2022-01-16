export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const excerpt = (text: string, length: number = text.length) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};
