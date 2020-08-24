import {THREE_HOURS_IN_TIMESTAMP} from "./const";

export const getDateAtShortFormat = (date) => {
  return date.toLocaleString(`en-US`, {month: `short`, day: `2-digit`});
};

export const getDurationTime = (start, end) => {
  const difference = (Date.parse(end) - Date.parse(start));

  let minuts = difference / (1000 * 60);
  let hours = Math.floor(minuts / 60);
  let days = Math.floor(hours / 24);
  let durationTime;

  if (days > 0) {
    minuts = Math.floor(minuts % (hours * 60));
    hours = Math.floor(hours % (days * 24));
    durationTime = `${days}D${hours === 0 ? `` : ` ${hours}H`}${minuts === 0 ? `` : ` ${minuts}M` }`;
  } else if (hours > 0) {
    minuts = Math.floor(minuts % (hours * 60));
    durationTime = minuts === 0 ? `${hours}H` : `${hours}H ${minuts}M`;
  } else {
    durationTime = `${minuts}M`;
  }

  return durationTime;
};

export const getDateAtFormat = (date, from, to) => {
  return new Date(date.getTime() + THREE_HOURS_IN_TIMESTAMP).toISOString().substring(from, to);
};
