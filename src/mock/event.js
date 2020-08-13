import {getRandomInteger, getRandomArray} from "../utils";
import {EVENT_TYPE} from "../const";

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`
];

const DESTINATIONS = [
  `Amsterdam`,
  `Chamonix`,
  `Geneva`,
  `Moscow`
];

const getOffers = (type) => {
  if (type === `Flight` || type === `Ship` || type === `Bus`) {
    return [
      {name: `Add luggage`, id: `luggage`, cost: 30},
      {name: `Switch to comfort`, id: `comfort`, cost: 100},
      {name: `Add meal`, id: `meal`, cost: 15},
      {name: `Choose seats`, id: `comfort`, cost: 10},
    ];
  } else {
    return [
      {name: `Travel by train`, id: `train`, cost: 30},
      {name: `Rent a car`, id: `car`, cost: 100},
      {name: `Add meal`, id: `meal`, cost: 15},
      {name: `Order Uber`, id: `uber`, cost: 10},
    ];
  }
};

const generateDateStart = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + daysGap);

  return currentDate;
};

const generateDateEnd = (date) => {
  return new Date(date.getTime() + getRandomInteger(1, 100) * getRandomInteger(1, 60) * 60 * 1000);
};

const generateImage = () => `http://picsum.photos/248/152?r=${Math.random()}`;
const getRandomListItem = (list) => list[getRandomInteger(0, list.length - 1)];

export const generateEvent = () => {
  const images = new Array(getRandomInteger(1, 4)).fill().map(generateImage);
  const eventType = getRandomListItem(EVENT_TYPE);
  const offers = getOffers(eventType);
  const acceptedOffers = getRandomArray(offers);
  const dateStart = generateDateStart();
  const dateEnd = generateDateEnd(dateStart);

  return {
    eventType,
    destinations: DESTINATIONS,
    currentDestination: getRandomListItem(DESTINATIONS),
    offers,
    acceptedOffers,
    description: {
      text: getRandomListItem(DESCRIPTIONS),
      images,
    },
    dateStart,
    dateEnd,
    cost: getRandomInteger(0, 600)
  };
};
