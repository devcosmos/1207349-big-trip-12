import {getDurationInHours} from "./index";
import {ActionIcon, EVENT_TYPE_TRANSFER, ChartType} from "../const";

export const splitEventsByDays = (events) => {
  const tripDays = [];

  let dayCount = 0;

  events.forEach((event) => {
    const date = event.dateStart;

    if (tripDays.length === 0) {
      tripDays.push([date, [event]]);
    } else if (tripDays[dayCount][0].toDateString() === date.toDateString()) {
      tripDays[dayCount][1].push(event);
    } else {
      tripDays.push([date, [event]]);
      dayCount++;
    }
  });

  return tripDays;
};

export const sortEventsByDuration = (a, b) => {
  const durationA = (Date.parse(a.dateEnd) - Date.parse(a.dateStart));
  const durationB = (Date.parse(b.dateEnd) - Date.parse(b.dateStart));

  if (durationA > durationB) {
    return -1;
  }

  if (durationA < durationB) {
    return 1;
  }

  return 0;
};

export const sortEventsByPrice = (a, b) => {
  return b.cost - a.cost;
};

export const sortEventsByDate = (a, b) => {
  return a.dateStart - b.dateStart;
};

export const splitEventsByChartType = (chartType, data) => {
  const events = chartType === ChartType.TRANSPORT
    ? data.filter((event) => EVENT_TYPE_TRANSFER.includes(event.eventType))
    : data;
  const eventTypes = {};

  events.forEach((event) => {
    const eventType = `${ActionIcon[event.eventType]} ${event.eventType.toUpperCase()}`;
    switch (chartType) {
      case (ChartType.MONEY):
        eventTypes[eventType] = eventTypes[eventType] ? eventTypes[eventType] + event.cost : event.cost;
        break;
      case (ChartType.TRANSPORT):
        eventTypes[eventType] = eventTypes[eventType] ? eventTypes[eventType] + 1 : 1;
        break;
      case (ChartType.TIME_SPENT):
        const duration = getDurationInHours(event.dateStart, event.dateEnd);
        eventTypes[eventType] = eventTypes[eventType] ? eventTypes[eventType] + duration : duration;
        break;
    }
  });

  return Object.entries(eventTypes);
};
