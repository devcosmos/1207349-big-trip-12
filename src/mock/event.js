export const generateEvent = () => {
  return {
    typeEvent: `Taxi`,
    destination: `Amsterdam`,
    offers: ``,
    description: {
      text: `lorem`,
      photo: `http://picsum.photos/248/152?r=${Math.random()}`
    },
    startDate: null,
    endDate: null,
    cost: null
  };
};
