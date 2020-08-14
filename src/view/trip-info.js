import {getDateAtShortFormat} from "../utils";

const getTripRoute = (cities) => {
  return (cities.length > 3)
    ? cities[0] + `&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;` + cities[cities.length - 1]
    : cities.join(` — `);
};

const getTripDateInterval = (tripEvents) => {
  const start = getDateAtShortFormat(tripEvents[0].dateStart).split(` `);
  const end = getDateAtShortFormat(tripEvents[tripEvents.length - 1].dateStart).split(` `);

  return `${start[0]}&nbsp;${start[1]}&nbsp;&mdash;&nbsp;${end[1]}${start[0] !== end[0] ? `&nbsp;` + end[0] : `` }`;
};

export const createTripInfoTemplate = (tripEvents, cities) => {

  const tripRoute = getTripRoute(cities);
  const tripDateInterval = getTripDateInterval(tripEvents);

  return (
    ` <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripRoute}</h1>
        <p class="trip-info__dates">${tripDateInterval}</p>
      </div>
    </section>`
  );
};
