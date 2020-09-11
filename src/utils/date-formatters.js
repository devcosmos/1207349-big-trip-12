import moment from "moment";

export const getTimeAtDefaultFormat = (date) => {
  return date instanceof Date ? moment(date).format(`HH:MM`) : ``;
};

export const getDateAtShortFormat = (date) => {
  return date instanceof Date ? moment(date).format(`MMM DD`) : ``;
};

export const getDateAtSystemFormat = (date) => {
  return date instanceof Date ? moment(date).format(`YYYY-MM-DD`) : ``;
};

export const getDateAtDefaultFormat = (date) => {
  return date instanceof Date ? moment(date).format(`DD/MM/YY`) : ``;
};

export const getDurationTime = (start, end) => {
  const duration = moment.duration(Date.parse(end) - Date.parse(start));

  return (
    `${duration.days() === 0 ? `` : `${moment(duration.days()).format(`DD`)}D`}
    ${duration.hours() === 0 ? `` : ` ${moment(duration.hours()).format(`HH`)}H`}
    ${duration.minutes() === 0 ? `` : ` ${moment(duration.minutes()).format(`MM`)}M`}`
  );
};
