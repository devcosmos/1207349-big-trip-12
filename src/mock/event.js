import {EVENT_TYPE_TRANSFER, EVENT_TYPE_ACTIVITY} from "../const";
import {getRandomInteger, getRandomPartialList} from "../utils/index";

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`
];

export const DESTINATIONS = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `Moscow`
];

export const getOffers = (type) => {
  if (type === `Flight` || type === `Ship` || type === `Bus`) {
    return [
      {name: `Add luggage`, cost: 30},
      {name: `Switch to comfort`, cost: 100},
      {name: `Add meal`, cost: 15},
      {name: `Choose seats`, cost: 10},
    ];
  } else {
    return [
      {name: `Travel by train`, cost: 30},
      {name: `Rent a car`, cost: 100},
      {name: `Add meal`, cost: 15},
      {name: `Order Uber`, cost: 10},
    ];
  }
};

const generateDateStart = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysGap);
  currentDate.setTime(currentDate.getTime() + getRandomInteger(1, 60) * 60 * 1000);

  return currentDate;
};

const generateDateEnd = (date) => {
  return new Date(date.getTime() + getRandomInteger(1, 6000) * 60 * 1000);
};

const generateImage = () => `http://picsum.photos/248/152?r=${Math.random()}`;
const getRandomListItem = (list) => list[getRandomInteger(0, list.length - 1)];
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateEvent = () => {
  const images = new Array(getRandomInteger(0, 4)).fill().map(generateImage);
  const eventType = getRandomListItem(EVENT_TYPE_TRANSFER.concat(EVENT_TYPE_ACTIVITY));
  const offers = getOffers(eventType);
  const acceptedOffers = getRandomPartialList(offers);
  const dateStart = generateDateStart();
  const dateEnd = generateDateEnd(dateStart);
  const text = getRandomInteger() ? getRandomListItem(DESCRIPTIONS) : ``;

  return {
    id: generateId(),
    isFavorite: getRandomInteger(),
    eventType,
    currentDestination: getRandomListItem(DESTINATIONS),
    acceptedOffers,
    description: {
      text,
      images,
    },
    dateStart,
    dateEnd,
    cost: getRandomInteger(0, 600)
  };
};
