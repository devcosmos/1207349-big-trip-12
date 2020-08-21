import {EVENT_TYPE_ACTIVITY} from "../const";
import {createElement} from "../utils";
import {getTimeAtFormat, getDurationTime} from "../date-formatters";

const createAcceptedOffersTemplate = (offers) => {
  return (
    offers.length === 0 ? `` : `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.map((offer) => `<li class="event__offer">
          <span class="event__offer-title">${offer.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
        </li>`).join(``)}
      </ul>`
  );
};

const createEventTemplate = (event) => {
  const {eventType, currentDestination, acceptedOffers, dateStart, dateEnd, cost} = event;

  const prepositions = EVENT_TYPE_ACTIVITY.includes(eventType) ? `in` : `to`;
  const timeStartAtShortFormat = getTimeAtFormat(dateStart);
  const timeEndAtShortFormat = getTimeAtFormat(dateEnd);
  const dateStartAtSystemFormat = new Date(dateStart.getTime() + 10800000).toISOString().substring(0, 16);
  const dateEndAtSystemFormat = new Date(dateEnd.getTime() + 10800000).toISOString().substring(0, 16);
  const duration = getDurationTime(dateStart, dateEnd);
  const acceptedOffersTemplate = createAcceptedOffersTemplate(acceptedOffers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventType} ${prepositions} ${currentDestination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStartAtSystemFormat}">${timeStartAtShortFormat}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEndAtSystemFormat}">${timeEndAtShortFormat}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${cost}</span>
        </p>

        ${acceptedOffersTemplate}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Event {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createEventTemplate(this._event);
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
