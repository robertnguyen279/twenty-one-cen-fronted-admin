export const transfromInterPhone = (phone: string): string => '0' + phone.slice(2);

export const removeNull = <T>(obj: T): T => {
  Object.keys(obj).forEach(
    (key) =>
      (obj[key] && typeof obj[key] === 'object' && removeNull(obj[key])) ||
      ((obj[key] === undefined || obj[key] === null || obj[key] === '') && delete obj[key]),
  );
  return obj;
};

export const currencyFormatter = new Intl.NumberFormat('vn-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
});

export const convertDate = (dateInput: Date): string => {
  const date = new Date(dateInput);
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return day + '/' + month + '/' + year;
};

export const convertInternationalPhone = (phone: string): string => {
  return `0${phone.slice(2)}`;
};

export const convertVietnamesePhone = (phone: string): string => {
  return `84${phone.slice(1)}`;
};

export const checkExpiredVoucher = (date: Date): string => {
  const today = new Date();
  const expiredDate = new Date(date);

  if (today < expiredDate) {
    return 'Còn hạn';
  } else {
    return 'Hết hạn';
  }
};
