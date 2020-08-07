import {getRandomInteger} from "../utils";

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget. `,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDestination = () => {
  const destinations = [
    `Amsterdam`,
    `Chamonix`,
    `Geneva`,
    `Moscow`
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);

  return destinations[randomIndex];
};

export const generateEvent = () => {
  return {
    typeEvent: `Taxi`,
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
