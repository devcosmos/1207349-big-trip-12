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
  `check-in`,
  `sightseeing`,
  `restaurant`,
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];

const generateImage = () => `http://picsum.photos/248/152?r=${Math.random()}`;
const generateRandomData = (data) => data[getRandomInteger(0, data.length - 1)];

export const generateEvent = () => {
  const images = new Array(getRandomInteger(1, 4)).fill().map(generateImage);

  return {
    eventType: generateRandomData(EVENT_TYPE),
    destination: generateRandomData(DESTINATIONS),
    offers: ``,
    description: {
      text: generateRandomData(DESCRIPTIONS),
      images,
    },
    startDate: null,
    endDate: null,
    cost: getRandomInteger(0, 600)
  };
};
