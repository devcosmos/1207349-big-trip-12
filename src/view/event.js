import {EVENT_TYPE_ACTIVITY} from "../const";
import AbstractView from "./abstract";
import {getTimeAtDefaultFormat, getDateAtSystemFormat, getDurationTime} from "../utils/date-formatters";

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
  const timeStartAtShortFormat = getTimeAtDefaultFormat(dateStart);
  const timeEndAtShortFormat = getTimeAtDefaultFormat(dateEnd);
  const dateStartAtSystemFormat = getDateAtSystemFormat(dateStart);
  const dateEndAtSystemFormat = getDateAtSystemFormat(dateEnd);
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
            <time class="event__start-time" datetime="${dateStartAtSystemFormat}T${timeStartAtShortFormat}">${timeStartAtShortFormat}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEndAtSystemFormat}T${timeEndAtShortFormat}">${timeEndAtShortFormat}</time>
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

export default class EventView extends AbstractView {
  constructor(event) {
    super();
    this._event = event;
    this._callback = {};
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createEventTemplate(this._event);
  }

  _editClickHandler() {
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}

