import {EVENT_TYPE_TRANSFER, EVENT_TYPE_ACTIVITY} from "../const";
import {getDateAtDefaultFormat, getTimeAtDefaultFormat} from "../utils/index";
import SmartView from "./smart-view";
import flatpickr from "flatpickr";
import he from "he";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

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
        value="${he.encode(currentDestination)}" 
        list="destination-list">
      <datalist id="destination-list">  
        ${cities.map((city) => `<option value="${city.name}"></option>`).join(``)}
      </datalist>
    </div>`
  );
};

const createEventOffersTemplate = (acceptedOffers, offers) => {
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer, i) => `<div class="event__offer-selector">
          <input 
            class="event__offer-checkbox  visually-hidden" 
            id="event-offer-${i}" 
            type="checkbox" 
            name="${offer.title}"
            ${acceptedOffers.some((acceptedOffer) => acceptedOffer.title === offer.title) ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${i}">
            <span class="event__offer-title">${offer.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`).join(``)}

      </div>
    </section>`
  );
};

const createEventDescriptionTemplate = (city) => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${city.description ? `<p class="event__destination-description">${city.description}</p>` : `` }
      ${city.pictures.length === 0 ? `` : `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${city.pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`)}
        </div>
      </div>`}
    </section>`
  );
};

const createEventEditorTemplate = (event, destinations, allOffers) => {
  const {isFavorite, eventType, currentDestination, acceptedOffers, dateStart, dateEnd, cost} = event;

  const city = destinations.find((destination) => destination.name === currentDestination);
  const offers = allOffers.find((offer) => offer.type === event.eventType.toLowerCase()).offers;

  const eventTypeTemplate = createEventTypeTemplate(eventType);
  const eventDestinationTemplate = createEventDestinationTemplate(eventType, destinations, currentDestination);
  const eventOffersTemplate = createEventOffersTemplate(acceptedOffers, offers);
  const eventDescriptionTemplate = createEventDescriptionTemplate(city);
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
          <input class="event__input  event__input--price" id="event-price" type="number" name="event-price" value="${cost === null ? `` : cost}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
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
  constructor(event, destinations, offers) {
    super();
    this._data = Object.assign({}, event);
    this._destinations = destinations;
    this._offers = offers;

    this._dateStartDatepicker = null;
    this._dateEndDatepicker = null;

    this._callback = {};

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._dateStartChangeHandler = this._dateStartChangeHandler.bind(this);
    this._dateEndChangeHandler = this._dateEndChangeHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(event) {
    this.updateData(event);
  }

  getTemplate() {
    return createEventEditorTemplate(this._data, this._destinations, this._offers);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepicker() {
    if (this._dateStartDatepicker) {
      this._dateStartDatepicker.destroy();
      this._dateStartDatepicker = null;
    }

    if (this._dateEndDatepicker) {
      this._dateEndDatepicker.destroy();
      this._dateEndDatepicker = null;
    }

    this._dateStartDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time`),
        {
          'dateFormat': `d/m/y H:i`,
          'enableTime': true,
          'time_24hr': true,
          'defaultDate': this._data.dateStart,
          'onChange': this._dateStartChangeHandler
        }
    );

    this._dateEndDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time`),
        {
          'dateFormat': `d/m/y H:i`,
          'enableTime': true,
          'time_24hr': true,
          'minDate': this._data.dateStart,
          'defaultDate': this._data.dateEnd,
          'onChange': this._dateEndChangeHandler
        }
    );
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

  _dateStartChangeHandler([userDate]) {
    this.updateData({
      dateStart: userDate
    }, true);

    this._dateEndDatepicker.set(`minDate`, userDate);

    if (userDate > this._data.dateEnd) {
      this._dateEndDatepicker.setDate(userDate);
      this.updateData({
        dateEnd: userDate
      }, true);
    }
  }

  _dateEndChangeHandler([userDate]) {
    this.updateData({
      dateEnd: userDate
    }, true);
  }

  _priceInputHandler(evt) {
    this.updateData({
      cost: parseInt(evt.target.value, 10)
    }, true);
  }

  _destinationInputHandler(evt) {
    const cities = [];

    this._destinations.forEach((city) => {
      cities.push(city.name);
    });

    if (cities.includes(evt.target.value)) {
      evt.target.setCustomValidity(``);
    } else {
      evt.target.setCustomValidity(`The selected city is not in the list`);
      return;
    }

    this.updateData({
      currentDestination: evt.target.value
    });
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

    const offers = this._offers.find((offer) => offer.type === this._data.eventType.toLowerCase()).offers;
    const offer = offers.find((element) => element.title === evt.target.name);
    const newAcceptedOffers = this._data.acceptedOffers.slice();
    const index = newAcceptedOffers.findIndex((item) => item.title === offer.title);

    if (evt.target.checked) {
      newAcceptedOffers.push(offer);
    } else {
      newAcceptedOffers.splice(index, 1);
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

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }
}
