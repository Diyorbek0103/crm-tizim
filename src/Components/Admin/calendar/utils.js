export const getMonthYear = (date) => {
    const d = date.toDateString().split(" ");
    return `${d[1]} ${d[3]}`;
};

export const DAYS = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

export const MOCKAPPS = [
    { date: new Date("2023-02-13T22:24:16.419561+05:00"), title: "Ingliz tili A3", color: "#238783" },
    { date: new Date("2023-02-17T22:24:16.419561+05:00"), title: "Matematika A15", color: "#708898" },
    { date: new Date("2023-02-17T22:24:16.419561+05:00"), title: "Rus tili 63", color: "#708898" },
    { date: new Date("2023-02-17T22:24:16.419561+05:00"), title: "Web dasturlash 12", color: "#708898" },
    { date: new Date("2023-02-17T22:24:16.419561+05:00"), title: "Web dasturlash 12", color: "#708898" },
    { date: new Date("2023-02-17T22:24:16.419561+05:00"), title: "Web dasturlash 12", color: "#708898" },
    { date: new Date("2023-02-17T22:24:16.419561+05:00"), title: "Web dasturlash 12", color: "#708898" },
    { date: new Date("2023-02-17T22:24:16.419561+05:00"), title: "Ona tili 2", color: "#708898" },
    { date: new Date("2023-02-18T22:24:16.419561+05:00"), title: "Fizika s1", color: "#047106" },
    { date: new Date("2023-02-20T22:24:16.419561+05:00"), title: "Tarix f3", color: "#371395" }
  ];

export const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  export const range = (end) => {
    const { result } = Array.from({ length: end }).reduce(
      ({ result, current }) => ({
        result: [...result, current],
        current: current + 1
      }),
      { result: [], current: 1 }
    );
    return result;
  };

export const getSortedDays = (date) => {
    const daysInMonth = range(getDaysInMonth(date));
    const index = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return [...Array(index === 0 ? 6 : index - 1), ...daysInMonth];
  };

  export const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();


  export const nextMonth = (date, cb) => {
    const mon = date.getMonth();
    if (mon < 11) {
      date.setMonth(mon + 1);
    } else {
      date.setMonth(0);
      date.setFullYear(date.getFullYear() + 1);
    }
    cb(new Date(date));
  };
  
  export const prevMonth = (date, cb) => {
    const mon = date.getMonth();
    if (mon > 0) {
      date.setMonth(mon - 1);
    } else {
      date.setMonth(11);
      date.setFullYear(date.getFullYear() - 1);
    }
    cb(new Date(date));
  };