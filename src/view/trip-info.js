import {getDateAtShortFormat} from "../utils";

const getTripRoute = (tripEvents) => {
  const cities = tripEvents[0].destinations;
  let route;

  if (cities.length > 3) {
    route = cities[0] + `&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;` + cities[cities.length - 1];
  } else {
    route = [];
    for (let city of cities) {
      route.push(city);
    }
    route = route.join(` — `);
  }

  return route;
};

const getTripDateInterval = (tripEvents) => {
  const start = getDateAtShortFormat(tripEvents[0].dateStart).split(` `);
  const end = getDateAtShortFormat(tripEvents[tripEvents.length - 1].dateStart).split(` `);
  if (start[0] === end[0]) {
    end[0] = ``;
  }

  return `${start[0]} ${start[1]}&nbsp;&mdash;&nbsp;${end[1]} ${end[0]}`;
};

export const createTripInfoTemplate = (tripEvents) => {

  const tripRoute = getTripRoute(tripEvents);
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
