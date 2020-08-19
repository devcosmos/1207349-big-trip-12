import {RENDER_POSITION} from "./const";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomPartialList = (array) => {
  const newArray = [];
  const newArrayLength = getRandomInteger(0, array.length - 1);

  while (newArray.length < newArrayLength) {
    const randomIndex = getRandomInteger(0, array.length - 1);
    if (!newArray.includes(randomIndex)) {
      newArray.push(randomIndex);
    }
  }

  return newArray.sort((a, b) => a - b).map((index) => array[index]);
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(element);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const filterEventsByDays = (tripPoints) => {
  const tripDays = new Map();
  for (const event of tripPoints) {
    const date = new Date(event.dateStart).setHours(0, 0, 0, 0);
    if (tripDays.has(date)) {
      tripDays.get(date).push(event);
    } else {
      tripDays.set(date, [event]);
    }
  }
  return tripDays;
};
