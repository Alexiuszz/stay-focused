export const padZero = (x: number) => (x < 10 ? "0" + x : x);

export const streakEnded = (lastDate: Date): boolean => {
  return differenceInDays(new Date(), lastDate) > 1;
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

  return (midnight.getTime() - now.getTime()) / 1000;
};

export const differenceInDays = (day1: Date, day2: Date): number => {
  day2.setHours(0);
  day1.setHours(0);
  console.log(day1, day2);
  // To calculate the time difference of two dates
  let Difference_In_Time = day2.getTime() - day1.getTime();
  //return diff in daysF
  return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
};


