import {EVENT_TYPE_TRANSFER, EVENT_TYPE_ACTIVITY} from "../const";
import {getDateAtFormat} from "../date-formatters";
import {createElement} from "../utils";
import {getOffers} from "../mock/event";

const BLANK_EVENT = {
  eventType: `Taxi`,
  currentDestination: null,
  acceptedOffers: [],
  description: {
    text: ``,
    images: [],
  },
  dateStart: null,
  dateEnd: null,
  cost: null,
};

const createEventTypeTemplate = (type, index) => {
  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-${index}">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${index}" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
          ${EVENT_TYPE_TRANSFER.map((transfer, i) => `<div class="event__type-item">
            <input id="event-type-${transfer}-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${transfer}" ${transfer === type ? `checked` : ``}>
            <label class="event__type-label  event__type-label--${transfer}" for="event-type-${transfer}-${i}">${transfer}</label>
          </div>`).join(``)}
        </fieldset>
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>
          ${EVENT_TYPE_ACTIVITY.map((activity, i) => `<div class="event__type-item">
            <input id="event-type-${activity}-${i}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${activity}" ${activity === type ? `checked` : ``}>
            <label class="event__type-label  event__type-label--${activity}" for="event-type-${activity}-${i}">${activity}</label>
          </div>`).join(``)}
        </fieldset>
      </div>
    </div>`
  );
};

const createEventDestinationTemplate = (eventType, cities, currentDestination, index) => {
  const prepositions = EVENT_TYPE_ACTIVITY.includes(eventType) ? `in` : `to`;

  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${index}">
        ${eventType} ${prepositions}
      </label>
      <input 
        class="event__input  event__input--destination" 
        id="event-destination-${index}" 
        type="text" 
        name="event-destination" 
        value="${currentDestination === null ? `` : currentDestination}" 
        list="destination-list-${index}">
      <datalist id="destination-list-${index}">  
        ${cities.map((city) => `<option value="${city}"></option>`).join(``)}
      </datalist>
    </div>`
  );
};

const createEventOffersTemplate = (acceptedOffers, eventType, index) => {
  const offers = getOffers(eventType);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer) => `<div class="event__offer-selector">
          <input 
            class="event__offer-checkbox  visually-hidden" 
            id="event-offer-${offer.id}-${index}" 
            type="checkbox" 
            name="event-offer-${offer.id}" 
            ${acceptedOffers.includes(offer) ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.id}-${index}">
            <span class="event__offer-title">${offer.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
          </label>
        </div>`).join(``)}

      </div>
    </section>`
  );
};

const createEventDescriptionTemplate = (description) => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${description.text ? `<p class="event__destination-description">${description.text}</p>` : `` }
      ${description.images.length === 0 ? `` : `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${description.images.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`)}
        </div>
      </div>`}
    </section>`
  );
};

const createEventEditorTemplate = (event, index, cities) => {
  const {eventType, currentDestination, acceptedOffers, description, dateStart, dateEnd, cost} = event;

  const eventTypeTemplate = createEventTypeTemplate(eventType, index);
  const eventDestinationTemplate = createEventDestinationTemplate(eventType, cities, currentDestination, index);
  const eventOffersTemplate = createEventOffersTemplate(acceptedOffers, eventType, index);
  const eventDescriptionTemplate = !description.text && description.images.length === 0 ? `` : createEventDescriptionTemplate(description);
  const dateStartEventAtFormat = dateStart === null ? `` : dateStart.toLocaleString(`en-US`, {year: `2-digit`, month: `2-digit`, day: `2-digit`}) + ` ` + getDateAtFormat(dateStart, 11, 16);
  const dateEndEventAtFormat = dateEnd === null ? `` : dateEnd.toLocaleString(`en-US`, {year: `2-digit`, month: `2-digit`, day: `2-digit`}) + ` ` + getDateAtFormat(dateEnd, 11, 16);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        
        ${eventTypeTemplate}
          
        ${eventDestinationTemplate}

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${index}">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-${index}" type="text" name="event-start-time" value="${dateStartEventAtFormat}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-${index}">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-${index}" type="text" name="event-end-time" value="${dateEndEventAtFormat}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${index}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${index}" type="text" name="event-price" value="${cost === null ? `` : cost}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">

        ${eventOffersTemplate}

        ${eventDescriptionTemplate}

      </section>
    </form>`
  );
};

export class EventEditorView {
  constructor(event = BLANK_EVENT, index, cities) {
    this._element = null;
    this._event = event;
    this._cities = cities;
    this._index = index;
  }

  getTemplate() {
    return createEventEditorTemplate(this._event, this._index, this._cities);
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
