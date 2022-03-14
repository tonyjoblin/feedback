export const toIsoString = (date) => {
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${month.toString().padStart(2, 0)}-${date.getDate().toString().padStart(2, 0)}`;
};


export const addDays = (date, days) => {
  const value = date.valueOf();
  return new Date(value + days * (24 * 60 * 60 * 1000));
}