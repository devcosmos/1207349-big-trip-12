export const splitEventsByDays = (events) => {
  const tripDays = [];

  let dayCount = 0;

  events.forEach((event) => {
    const date = event.dateStart;

    if (tripDays.length === 0) {
      tripDays.push([date, [event]]);
    } else if (tripDays[dayCount][0].toDateString() === date.toDateString()) {
      tripDays[dayCount][1].push(event);
    } else {
      tripDays.push([date, [event]]);
      dayCount++;
    }
  });

  return tripDays;
};
