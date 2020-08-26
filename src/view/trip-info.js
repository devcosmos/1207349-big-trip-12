import {getDateAtShortFormat} from "../date-formatters";
import {createElement} from "../utils";

const getTripRoute = (tripEvents) => {
  const cities = tripEvents.map((event) => event.currentDestination);
  const uniqueCities = Array.from(new Set(cities));

  return (uniqueCities.length > 3)
    ? cities[0] + `&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;` + cities[cities.length - 1]
    : uniqueCities.join(` — `);
};

const getTripDateInterval = (tripEvents) => {
  const start = getDateAtShortFormat(tripEvents[0].dateStart).split(` `);
  const end = getDateAtShortFormat(tripEvents[tripEvents.length - 1].dateStart).split(` `);

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

export default class TripInfoView {
  constructor(tripEvents = null) {
    this._element = null;
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripEvents);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
