export const formatNumber = (num: number) => {
  const newNumber = new Intl.NumberFormat();
  return newNumber.format(num);
};
export const formatDate = (num: Date) => {
  const newDate = new Date(num);

  const newNumber = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
  return newNumber.format(newDate);
};
