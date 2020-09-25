import {getDurationInHours} from "./index";
import {ActionIcon, EVENT_TYPE_TRANSFER, ChartType} from "../const";

export const splitEventsByDays = (events) => {
  const tripDays = [];

  let dayCount = 0;

  events.forEach((event) => {
    const date = event.startDate;

    if (!tripDays.length) {
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
  const durationA = (Date.parse(a.endDate) - Date.parse(a.startDate));
  const durationB = (Date.parse(b.endDate) - Date.parse(b.startDate));

  if (durationA > durationB) {
    return -1;
  }

  if (durationA < durationB) {
    return 1;
  }

  return 0;
};

export const sortEventsByPrice = (a, b) => {
  return b.price - a.price;
};

export const sortEventsByDate = (a, b) => {
  return a.startDate - b.startDate;
};

export const splitEventsByChartType = (chartType, events) => {
  const filteredEvents = chartType === ChartType.TRANSPORT
    ? events.filter((event) => EVENT_TYPE_TRANSFER.includes(event.eventType))
    : events;
  const eventTypes = {};

  filteredEvents.forEach((event) => {
    const eventType = `${ActionIcon[event.eventType]} ${event.eventType.toUpperCase()}`;
    switch (chartType) {
      case (ChartType.MONEY):
        eventTypes[eventType] = eventTypes[eventType] ? eventTypes[eventType] + event.price : event.price;
        break;
      case (ChartType.TRANSPORT):
        eventTypes[eventType] = eventTypes[eventType] ? eventTypes[eventType] + 1 : 1;
        break;
      case (ChartType.TIME_SPENT):
        const duration = getDurationInHours(event.startDate, event.endDate);
        eventTypes[eventType] = eventTypes[eventType] ? eventTypes[eventType] + duration : duration;
        break;
    }
  });

  return Object.entries(eventTypes);
};
