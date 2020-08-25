export const getTimeAtFormat = (date) => {
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
