export const commaizeNumber = (value: number) => {
  return value.toLocaleString('ko-KR');
};

export const changeCommaizedNumber = (value: string) => {
  const numberString = value.replace(/,/g, '');
  return Number(numberString);
};

export const checkNumber = (value: any) => {
  return typeof value === 'number' && !Number.isNaN(value);
};

export const roundToThousands = (value: number) => {
  return Math.round(value / 1000) * 1000;
};
