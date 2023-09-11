export const padZero = (x: number) => (x < 10 ? "0" + x : x);

export const streakCheck = (lastDate: Date) => {
  const today = new Date();
  lastDate.setTime(0);
  today.setTime(0);
  // To calculate the time difference of two dates
  let Difference_In_Time = today.getTime() - lastDate.getTime();
  //return diff in daysF
  return Difference_In_Time / (1000 * 3600 * 24);
};
