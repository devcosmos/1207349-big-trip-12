import {EVENT_TYPE_TRANSFER, EVENT_TYPE_ACTIVITY} from "../const";
import SmartView from "./smart-view";
import {getDateAtDefaultFormat, getTimeAtDefaultFormat} from "../utils/date-formatters";
import {getOffers} from "../mock/event";

const BLANK_EVENT = {
  id: 1,
  isFavorite: false,
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

const createEventTypeTemplate = (type) => {
  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox">
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

const createEventDestinationTemplate = (eventType, cities, currentDestination) => {
  const prepositions = EVENT_TYPE_ACTIVITY.includes(eventType) ? `in` : `to`;

  return (
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination">
        ${eventType} ${prepositions}
      </label>
      <input 
        class="event__input  event__input--destination" 
        id="event-destination" 
        type="text" 
        name="event-destination" 
        value="${currentDestination === null ? `` : currentDestination}" 
        list="destination-list">
      <datalist id="destination-list">  
        ${cities.map((city) => `<option value="${city}"></option>`).join(``)}
      </datalist>
    </div>`
  );
};

const createEventOffersTemplate = (acceptedOffers, eventType) => {
  const offers = getOffers(eventType);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer, i) => `<div class="event__offer-selector">
          <input 
            class="event__offer-checkbox  visually-hidden" 
            id="event-offer-${i}" 
            type="checkbox" 
            name="${offer.name}"
            ${acceptedOffers.some((acceptedOffer) => acceptedOffer.name === offer.name) ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${i}">
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

const createEventEditorTemplate = (event, cities) => {
  const {isFavorite, eventType, currentDestination, acceptedOffers, description, dateStart, dateEnd, cost} = event;

  const eventTypeTemplate = createEventTypeTemplate(eventType);
  const eventDestinationTemplate = createEventDestinationTemplate(eventType, cities, currentDestination);
  const eventOffersTemplate = createEventOffersTemplate(acceptedOffers, eventType);
  const eventDescriptionTemplate = !description.text && description.images.length === 0 ? `` : createEventDescriptionTemplate(description);
  const dateStartEventAtFormat = dateStart === null ? `` : `${getDateAtDefaultFormat(dateStart)} ${getTimeAtDefaultFormat(dateStart)}`;
  const dateEndEventAtFormat = dateEnd === null ? `` : `${getDateAtDefaultFormat(dateEnd)} ${getTimeAtDefaultFormat(dateEnd)}`;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        
        ${eventTypeTemplate}
          
        ${eventDestinationTemplate}

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${dateStartEventAtFormat}">
          &mdash;
          <label class="visually-hidden" for="event-end-time">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${dateEndEventAtFormat}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value="${cost === null ? `` : cost}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        <input id="event-favorite" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </label>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">

        ${eventOffersTemplate}

        ${eventDescriptionTemplate}

      </section>
    </form>`
  );
};

export default class EventEditorView extends SmartView {
  constructor(event = BLANK_EVENT, cities) {
    super();
    this._data = Object.assign({}, event);
    this._cities = cities;

    this._callback = {};

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(event) {
    this.updateData(event);
  }

  getTemplate() {
    return createEventEditorTemplate(this._data, this._cities);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
    this.getElement().querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationInputHandler);
    this.getElement().querySelector(`.event__favorite-checkbox`)
      .addEventListener(`input`, this._favoriteChangeHandler);
    this.getElement().querySelector(`.event__type-list`)
      .addEventListener(`click`, this._eventTypeChangeHandler);
    this.getElement().querySelector(`.event__available-offers`)
      .addEventListener(`click`, this._offersChangeHandler);
  }

  _priceInputHandler(evt) {
    this.updateData({
      cost: evt.target.value
    }, true);
  }

  _destinationInputHandler(evt) {
    this.updateData({
      currentDestination: evt.target.value
    }, true);
  }

  _favoriteChangeHandler() {
    this.updateData({
      isFavorite: !this._data.isFavorite
    }, true);
  }

  _offersChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    const offers = getOffers(this._data.eventType);
    const offer = offers.find((element) => element.name === evt.target.name);

    // const newAcceptedOffers = evt.target.checked
    //   ? this._data.acceptedOffers
    //   : this._data.acceptedOffers.filter((item) => item.name !== offer.name);
    // if (evt.target.checked) {
    //   newAcceptedOffers.push(offer)
    // }

    let newAcceptedOffers = this._data.acceptedOffers.slice();

    if (evt.target.checked) {
      newAcceptedOffers.push(offer);
    } else {
      newAcceptedOffers = newAcceptedOffers.filter((item) => item.name !== offer.name);
    }

    this.updateData({
      acceptedOffers: newAcceptedOffers
    }, true);
  }

  _eventTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    this.getElement().querySelector(`.event__type-toggle`).checked = false;

    const newAcceptedOffers = evt.target.value === this._data.eventType
      ? this._data.acceptedOffers
      : [];

    this.updateData({
      eventType: evt.target.value,
      acceptedOffers: newAcceptedOffers
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }
}
