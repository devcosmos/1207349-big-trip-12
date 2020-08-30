export const splitEventsByDays = (events) => {
  const tripDays = [];

  let dayCount = 0;

  for (const event of events) {
    const date = event.dateStart;

    if (tripDays.length === 0) {
      tripDays.push([date, [event]]);
    } else if (tripDays[dayCount][0].setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)) {
      tripDays[dayCount][1].push(event);
    } else {
      tripDays.push([date, [event]]);
      dayCount++;
    }
  }

  return tripDays;
};
