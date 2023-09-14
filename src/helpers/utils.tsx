export const padZero = (x: number) => (x < 10 ? "0" + x : x);

export const streakEnded = (lastDate: Date): boolean => {
  const today = new Date();
  lastDate.setTime(0);
  today.setTime(0);
  // To calculate the time difference of two dates
  let Difference_In_Time = today.getTime() - lastDate.getTime();
  //return diff in daysF
  return Difference_In_Time / (1000 * 3600 * 24) > 1;
};

export const secondsToHrMins = (s: number) => {
  let mins = Math.floor(s / 60);
  let hrs = Math.floor(mins / 60);
  let minsLeft = mins % 60;
  return { hrs: hrs, mins: minsLeft };
};

export const secondsLeftToday = (): number => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(23, 59, 59);

  return midnight.getTime() - now.getTime() / 1000;
};
