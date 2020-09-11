import moment from "moment";

export const getTimeAtDefaultFormat = (date) => {
  return date.toLocaleString(`en-US`, {hour12: false, hour: `2-digit`, minute: `2-digit`});
};

export const getDateAtShortFormat = (date) => {
  return date.toLocaleString(`en-US`, {month: `short`, day: `2-digit`});
};

export const getDateAtSystemFormat = (date) => {
  const [m, d, y] = date.toLocaleString(`en-US`, {year: `numeric`, month: `2-digit`, day: `2-digit`}).split(`/`);
  return `${y}-${m}-${d}`;
};

export const getDateAtDefaultFormat = (date) => {
  const [m, d, y] = date.toLocaleString(`en-US`, {year: `2-digit`, month: `2-digit`, day: `2-digit`}).split(`/`);
  return `${d}/${m}/${y}`;
};

export const getDurationTime = (start, end) => {
  const duration = moment.duration(Date.parse(end) - Date.parse(start));

  return (
    `${duration.days() === 0 ? `` : `${String(duration.days()).padStart(2, `0`)}D`}
    ${duration.hours() === 0 ? `` : ` ${String(duration.hours()).padStart(2, `0`)}H`}
    ${duration.minutes() === 0 ? `` : ` ${String(duration.minutes()).padStart(2, `0`)}M`}`
  );
};
