import moment from "moment";

export const getTimeAtDefaultFormat = (date) => {
  return date instanceof Date ? moment(date).format(`HH:mm`) : ``;
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
    `${duration.days() ? `${moment(duration.days(), `D`).format(`DD`)}D` : ``}
    ${duration.hours() ? ` ${moment(duration.hours(), `H`).format(`HH`)}H` : ``}
    ${duration.minutes() ? ` ${moment(duration.minutes(), `m`).format(`mm`)}M` : ``}`
  );
};

export const getDurationInHours = (start, end) => {
  return Math.round(moment.duration(Date.parse(end) - Date.parse(start)).asHours());
};
