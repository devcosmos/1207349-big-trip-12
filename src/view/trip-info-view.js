import {getDateAtShortFormat, sortEventsByDate} from "../utils/index";
import AbstractView from "./abstract-view";

const getTripRoute = (tripEvents) => {
  const cities = tripEvents.sort(sortEventsByDate).map((event) => event.currentDestination);
  const uniqueCities = Array.from(new Set(cities));

  return (uniqueCities.length > 3)
    ? cities[0] + ` &mdash; ... &mdash; ` + cities[cities.length - 1]
    : uniqueCities.join(` — `);
};

const getTripDateInterval = (tripEvents) => {
  const startDate = getDateAtShortFormat(tripEvents[0].dateStart);
  const endDate = getDateAtShortFormat(tripEvents[tripEvents.length - 1].dateEnd);
  const splitStartDate = startDate.split(` `);
  const splitEndDate = endDate.split(` `);
  if (startDate === endDate) {
    return `${splitStartDate[1]} ${splitStartDate[0]}`;
  }

  return `${splitStartDate[1]} ${splitStartDate[0]} &mdash; ${splitEndDate[1]}${splitStartDate[0] === splitEndDate[0] ? `` : ` ` + splitEndDate[0]}`;
};

const createTripInfoTemplate = (tripEvents) => {
  return (
    `<section class="trip-main__trip-info  trip-info">
      ${tripEvents.length ? `<div class="trip-info__main"> 
        <h1 class="trip-info__title">${getTripRoute(tripEvents)}</h1>
        <p class="trip-info__dates">${getTripDateInterval(tripEvents)}</p>
      </div>` : `` }
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  constructor(tripEvents) {
    super();
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTripInfoTemplate(this._tripEvents);
  }
}
