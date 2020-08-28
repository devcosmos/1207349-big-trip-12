export const splitEventsByDays = (events) => {
  const tripDays = [];

  let dayCount = 0;

  const isSameDate = (element, date) => {
    return element instanceof Date ? element.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0) : false;
  };

  for (const event of events) {
    const date = event.dateStart;

    if (tripDays.length === 0) {
      tripDays.push([date, event]);
    } else if (tripDays[dayCount].some((dayElements) => isSameDate(dayElements, date))) {
      tripDays[dayCount].push(event);
    } else {
      tripDays.push([date, event]);
      dayCount++;
    }
  }

  return tripDays;
};
