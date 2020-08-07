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

const generateDestination = () => DESTINATIONS[getRandomInteger(0, DESTINATIONS.length - 1)];
const generateDescription = () => DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
const generateEventType = () => EVENT_TYPE[getRandomInteger(0, EVENT_TYPE.length - 1)];

export const generateEvent = () => {
  return {
    eventType: generateEventType(),
    destination: generateDestination(),
    offers: ``,
    description: {
      text: generateDescription(),
      photo: `http://picsum.photos/248/152?r=${Math.random()}`
    },
    startDate: null,
    endDate: null,
    cost: null
  };
};
