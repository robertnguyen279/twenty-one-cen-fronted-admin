export const transfromInterPhone = (phone: string): string => '0' + phone.slice(2);

export const removeNull = <T>(obj: T): T => {
  Object.keys(obj).forEach(
    (key) =>
      (obj[key] && typeof obj[key] === 'object' && removeNull(obj[key])) ||
      ((obj[key] === undefined || obj[key] === null || obj[key] === '') && delete obj[key]),
  );
  return obj;
};
