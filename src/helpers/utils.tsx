export const padZero = (x: number) => (x < 10 ? "0" + x : x);

export const streakEnded = (lastDate: Date): boolean => {
  return differenceInDays(new Date(), lastDate) > 1;
};

export const secondsToHrMins = (s: number) => {
  const mins = Math.floor(s / 60);
  const hrs = Math.floor(mins / 60);
  const minsLeft = mins % 60;
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
  const Difference_In_Time = day2.getTime() - day1.getTime();
  //return diff in daysF
  return Math.floor(Difference_In_Time / (1000 * 3600 * 24));
};

export function rotateArray<Type>(arr: Type[], pos: number): Type[] {
  pos %= arr.length; // if pos is greater than arr.length then one cycle is completed that means it will remain the same and we have to remainder shifts

  const reverse = function (i: number, j: number) {
    while (i < j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
      i++;
      j--;
    }
  }; // suppose  ----->--->
  reverse(0, arr.length - 1); // reverse   <--<------
  reverse(0, pos - 1); // reverse first part ---><----
  reverse(pos, arr.length - 1); // reverse second part --->----->
  return arr;
}
export const getDays = (): string[] => {
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thur",
    "Fri",
    "Sat",
  ];

  const today = new Date();
  return rotateArray<string>(days, today.getDay()).reverse();
};
