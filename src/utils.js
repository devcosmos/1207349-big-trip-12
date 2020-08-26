import {RENDER_POSITION} from "./const";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomPartialList = (array) => array.filter(() => !!getRandomInteger());

export const renderElement = (container, element, place) => {
  switch (place) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(element);
      break;
    case RENDER_POSITION.AFTEREND:
      container.insertAdjacentElement(place, element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const splitEventsByDays = (events) => {
  const tripDays = [];

  let dayCount = 0;

  const isSameDate = (element, date) => {
    return element instanceof Date ? element.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0) : false;
  };

  for (const event of events) {
    const date = event.dateStart;

    if (tripDays.length === 0) {
      tripDays.push([date, event]);
    } else if (tripDays[dayCount].some((dayElements) => isSameDate(dayElements, date))) {
      tripDays[dayCount].push(event);
    } else {
      tripDays.push([date, event]);
      dayCount++;
    }
  }

  return tripDays;
};
