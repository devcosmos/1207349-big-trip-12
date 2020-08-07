import {getRandomInteger} from "../utils";

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

const EVENT_TYPE = [
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
];

const getOffers = (type) => {
  if (type.includes(`Flight`) || type.includes(`Ship`) || type.includes(`Bus`)) {
    return [
      {name: `Add luggage`, cost: 30},
      {name: `Switch to comfort class`, cost: 100},
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

const generateDate = (date) => {
  return new Date(date.getTime() + getRandomInteger(1, 30) * 60 * 60 * 1000);
};

const generateImage = () => `http://picsum.photos/248/152?r=${Math.random()}`;
const generateRandomData = (data) => data[getRandomInteger(0, data.length - 1)];

export const generateEvent = () => {
  const images = new Array(getRandomInteger(1, 4)).fill().map(generateImage);
  const eventType = generateRandomData(EVENT_TYPE);
  const offers = getOffers(eventType);
  const dateStart = generateDate(new Date());
  const dateEnd = generateDate(dateStart);

  return {
    eventType,
    destination: generateRandomData(DESTINATIONS),
    offers,
    description: {
      text: generateRandomData(DESCRIPTIONS),
      images,
    },
    dateStart,
    dateEnd,
    cost: getRandomInteger(0, 600)
  };
};
