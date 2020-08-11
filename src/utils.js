export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArray = (array) => {
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

export const isTransport = (type) => {
  if (type === `Check-in` || type === `Sightseeing` || type === `Restaurant`) {
    return false;
  }
  return true;
};

export const addZero = (i) => {
  if (i < 10) {
    i = `0` + i;
  }

  return i;
};
