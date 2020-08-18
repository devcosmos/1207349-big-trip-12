import {getDayAtShortFormat} from "../utils";

const getTripRoute = (tripEvents) => {
  const cities = [];

  for (const tripEvent of tripEvents) {
    cities.push(tripEvent.currentDestination);
  }

  const uniqueCities = Array.from(new Set(cities));

  return (uniqueCities.length > 3)
    ? cities[0] + `&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;` + cities[cities.length - 1]
    : uniqueCities.join(` — `);
};

const getTripDateInterval = (tripEvents) => {
  const start = getDayAtShortFormat(tripEvents[0].dateStart).split(` `);
  const end = getDayAtShortFormat(tripEvents[tripEvents.length - 1].dateStart).split(` `);

  return `${start[1]}&nbsp;${start[0]}&nbsp;&mdash;&nbsp;${end[1]}${start[0] === end[0] ? `` : `&nbsp;` + end[0] }`;
};

export const createTripInfoTemplate = (tripEvents = null) => {

  return (
    `<section class="trip-main__trip-info  trip-info">
      ${tripEvents === null || tripEvents.length === 0 ? `` : `<div class="trip-info__main">
        <h1 class="trip-info__title">${getTripRoute(tripEvents)}</h1>
        <p class="trip-info__dates">${getTripDateInterval(tripEvents)}</p>
      </div>` }
    </section>`
  );
};
