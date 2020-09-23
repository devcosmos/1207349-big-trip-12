import {getDateAtShortFormat, sortEventsByDate} from "../utils/index";
import AbstractView from "./abstract-view";

const getTripRoute = (tripEvents) => {
  const cities = tripEvents.sort(sortEventsByDate).map((event) => event.currentDestination);
  const uniqueCities = Array.from(new Set(cities));

  return (uniqueCities.length > 3)
    ? cities[0] + `&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;` + cities[cities.length - 1]
    : uniqueCities.join(` — `);
};

const getTripDateInterval = (tripEvents) => {
  const start = getDateAtShortFormat(tripEvents[0].dateStart).split(` `);
  const end = getDateAtShortFormat(tripEvents[tripEvents.length - 1].dateEnd).split(` `);
  if (start.toString() === end.toString()) {
    return `${start[1]}&nbsp;${start[0]}`;
  }

  return `${start[1]}&nbsp;${start[0]}&nbsp;&mdash;&nbsp;${end[1]}${start[0] === end[0] ? `` : `&nbsp;` + end[0] }`;
};

const createTripInfoTemplate = (tripEvents) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${tripEvents === null || tripEvents.length === 0 ? `` : `<div class="trip-info__main">
        <h1 class="trip-info__title">${getTripRoute(tripEvents)}</h1>
        <p class="trip-info__dates">${getTripDateInterval(tripEvents)}</p>
      </div>` }
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  constructor(tripEvents = null) {
    super();
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripEvents);
  }
}
