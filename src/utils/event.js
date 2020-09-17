import {getDurationInHourhs} from "./index";
import {ActionIcon, EVENT_TYPE_TRANSFER} from "../const";

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

export const splitEventsByTypeAndPrice = (events) => {
  const eventTypes = {};

  events.forEach((event) => {
    const eventType = `${ActionIcon[event.eventType]} ${event.eventType.toUpperCase()}`;
    if (eventTypes[eventType]) {
      eventTypes[eventType] += event.cost;
    } else {
      eventTypes[eventType] = event.cost;
    }
  });

  return Object.entries(eventTypes);
};

export const splitEventsByTransportTypeAndRepeats = (events) => {
  const eventTypes = {};

  events
    .filter((event) => EVENT_TYPE_TRANSFER.includes(event.eventType))
    .forEach((event) => {
      const eventType = `${ActionIcon[event.eventType]} ${event.eventType.toUpperCase()}`;
      if (eventTypes[eventType]) {
        eventTypes[eventType]++;
      } else {
        eventTypes[eventType] = 1;
      }
    });

  return Object.entries(eventTypes);
};

export const splitEventsByTypeAndTimeSpend = (events) => {
  const eventTypes = {};

  events.forEach((event) => {
    const eventType = `${ActionIcon[event.eventType]} ${event.eventType.toUpperCase()}`;
    if (eventTypes[eventType]) {
      eventTypes[eventType] += getDurationInHourhs(event.dateStart, event.dateEnd);
    } else {
      eventTypes[eventType] = getDurationInHourhs(event.dateStart, event.dateEnd);
    }
  });

  return Object.entries(eventTypes);
};
