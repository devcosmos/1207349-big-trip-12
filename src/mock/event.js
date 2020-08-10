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
  if (type.includes(`Flight`) || type.includes(`Ship`) || type.includes(`Bus`)) {
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

const generateDate = (date) => {
  return new Date(date.getTime() + getRandomInteger(1, 100) * getRandomInteger(1, 60) * 60 * 1000);
};

const generateImage = () => `http://picsum.photos/248/152?r=${Math.random()}`;
const generateRandomData = (data) => data[getRandomInteger(0, data.length - 1)];

export const generateEvent = () => {
  const images = new Array(getRandomInteger(1, 4)).fill().map(generateImage);
  const eventType = generateRandomData(EVENT_TYPE);
  const offers = getOffers(eventType);
  const acceptedOffers = getRandomArray(0, offers.length - 1, offers);
  const dateStart = generateDate(new Date());
  const dateEnd = generateDate(dateStart);

  return {
    eventType,
    destinations: DESTINATIONS,
    currentDestination: generateRandomData(DESTINATIONS),
    offers,
    acceptedOffers,
    description: {
      text: generateRandomData(DESCRIPTIONS),
      images,
    },
    dateStart,
    dateEnd,
    cost: getRandomInteger(0, 600)
  };
};
