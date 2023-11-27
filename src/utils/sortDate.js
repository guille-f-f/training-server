export const sortDates = (arrayDates) => {
  arrayDates.sort((a, b) => {
    const fechaA = new Date(a.date.split("-").reverse().join("-"));
    const fechaB = new Date(b.date.split("-").reverse().join("-"));

    return fechaA - fechaB;
  });
  return arrayDates;
};
