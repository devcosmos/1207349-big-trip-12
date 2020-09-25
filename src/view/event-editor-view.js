import {EVENT_TYPE_TRANSFER, EVENT_TYPE_ACTIVITY} from "../const";
import {getDateAtDefaultFormat, getTimeAtDefaultFormat, isOnline} from "../utils/index";
import SmartView from "./smart-view";
import flatpickr from "flatpickr";
import he from "he";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_EVENT = {
  eventType: EVENT_TYPE_TRANSFER[4],
  currentDestination: ``,
  acceptedOffers: [],
  description: {
    text: ``,
    photos: [],
  },
  startDate: new Date(),
  endDate: new Date(),
  price: 0,
  isFavorite: false,
};

const createEventTypeTemplate = (type, isDisabled) => {
  return (
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox" ${isDisabled ? `disabled` : ``}>
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

const createEventDestinationTemplate = (eventType, destinations, currentDestination, isDisabled) => {
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
        value="${he.encode(currentDestination)}" required
        ${isDisabled ? `disabled` : ``}
        list="destination-list">
      <datalist id="destination-list">  
        ${destinations.map((destination) => `<option value="${destination.name}"></option>`).join(``)}
      </datalist>
    </div>`
  );
};

const createEventOffersTemplate = (acceptedOffers, offers, isDisabled) => {
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
            ${isDisabled ? `disabled` : ``}
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

const createEventDescriptionTemplate = (destination) => {
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${destination.description ? `<p class="event__destination-description">${destination.description}</p>` : `` }
      ${!destination.pictures.length || !isOnline() ? `` : `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${destination.pictures.map((photo) => `<img class="event__photo" src="${photo.src}" alt="${photo.description}">`).join(``)}
        </div>
      </div>`}
    </section>`
  );
};

const createEventDetailsTemplate = (destinations, offers, currentDestination, acceptedOffers, isDisabled) => {
  const eventOffersTemplate = offers.length
    ? createEventOffersTemplate(acceptedOffers, offers, isDisabled)
    : ``;

  const eventDescriptionTemplate = currentDestination === ``
    ? ``
    : createEventDescriptionTemplate(destinations.find((destination) => destination.name === currentDestination));

  return (
    `<section class="event__details">
      ${eventOffersTemplate}
      ${eventDescriptionTemplate}
    </section>`
  );
};

const createEventEditorTemplate = (event, destinations, offers, isNew) => {
  const {isFavorite, eventType, currentDestination, acceptedOffers, startDate, endDate, price, isDisabled, isSaving, isDeleting} = event;
  const deleteButtonName = isDeleting ? `Deleting...` : `Delete`;

  const eventDetailsTemplate = (!offers.length && currentDestination === ``)
    ? ``
    : createEventDetailsTemplate(destinations, offers, currentDestination, acceptedOffers, isDisabled);

  const eventTypeTemplate = createEventTypeTemplate(eventType, isDisabled);
  const eventDestinationTemplate = createEventDestinationTemplate(eventType, destinations, currentDestination, isDisabled);
  const startDateEventAtFormat = `${getDateAtDefaultFormat(startDate)} ${getTimeAtDefaultFormat(startDate)}`;
  const endDateEventAtFormat = `${getDateAtDefaultFormat(endDate)} ${getTimeAtDefaultFormat(endDate)}`;

  return (
    `<form class="trip-events__item  event  event--edit ${isDisabled ? `disabled` : ``}" action="#" method="post">
      <header class="event__header">
        
        ${eventTypeTemplate}
          
        ${eventDestinationTemplate}

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time" type="text" name="event-start-time" value="${startDateEventAtFormat}" ${isDisabled ? `disabled` : ``}>
          &mdash;
          <label class="visually-hidden" for="event-end-time">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time" type="text" name="event-end-time" value="${endDateEventAtFormat}" ${isDisabled ? `disabled` : ``}>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price" type="number" name="event-price" value="${price}" ${isDisabled ? `disabled` : ``}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>
          ${isNew ? `Cancel` : deleteButtonName}
          </button>
        ${isNew ? `` : `<input id="event-favorite" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``} ${isDisabled ? `disabled` : ``}>
        <label class="event__favorite-btn" for="event-favorite">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </label>
        <button class="event__rollup-btn" type="button" ${isDisabled ? `disabled` : ``}>
          <span class="visually-hidden">Open event</span>
        </button>`}
      </header>
      ${eventDetailsTemplate}
    </form>`
  );
};

export default class EventEditorView extends SmartView {
  constructor(destinations, offers, event) {
    super();
    this._data = EventEditorView.parseEventToData(event || BLANK_EVENT);
    this._destinations = destinations;
    this._offers = offers;
    this._offersByType = offers.find((offer) => offer.type === this._data.eventType.toLowerCase()).offers;
    this._isNew = !event;

    this._startDatepicker = null;
    this._endDatepicker = null;

    this._callback = {};

    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._favoriteChangeHandler = this._favoriteChangeHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);

    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formCloseClickHandler = this._formCloseClickHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
  }

  getTemplate() {
    return createEventEditorTemplate(this._data, this._destinations, this._offersByType, this._isNew);
  }

  removeElement() {
    super.removeElement();
    this._destroyDatepickers();
  }

  reset(event) {
    this.updateData(EventEditorView.parseEventToData(event));
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormDeleteClickHandler(this._callback.deleteClick);
    if (!this._isNew) {
      this.setFormCloseClickHandler(this._callback.formCloseClick);
    }
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setFormCloseClickHandler(callback) {
    this._callback.formCloseClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._formCloseClickHandler);
  }

  setFormDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.event__input--price`)
      .addEventListener(`input`, this._priceInputHandler);
    if (this._offersByType.length) {
      this.getElement().querySelector(`.event__available-offers`)
        .addEventListener(`click`, this._offersChangeHandler);
    }
    if (!this._isNew) {
      this.getElement().querySelector(`.event__favorite-checkbox`)
        .addEventListener(`input`, this._favoriteChangeHandler);
    }
    this.getElement().querySelector(`.event__type-list`)
      .addEventListener(`click`, this._eventTypeChangeHandler);
    this.getElement().querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationInputHandler);
  }

  _setDatepicker() {
    this._destroyDatepickers();

    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time`),
        {
          'dateFormat': `d/m/y H:i`,
          'enableTime': true,
          'time_24hr': true,
          'defaultDate': this._data.startDate,
          'onChange': this._startDateChangeHandler
        }
    );

    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time`),
        {
          'dateFormat': `d/m/y H:i`,
          'enableTime': true,
          'time_24hr': true,
          'minDate': this._data.startDate,
          'defaultDate': this._data.endDate,
          'onChange': this._endDateChangeHandler
        }
    );
  }

  _destroyDatepickers() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      startDate: userDate
    }, true);

    this._endDatepicker.set(`minDate`, userDate);

    if (userDate > this._data.endDate) {
      this._endDatepicker.setDate(userDate);
      this.updateData({
        endDate: userDate
      }, true);
    }
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      endDate: userDate
    }, true);
  }

  _priceInputHandler(evt) {
    this.updateData({
      price: parseInt(evt.target.value, 10)
    }, true);
  }

  _offersChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    const offer = this._offersByType.find((element) => element.title === evt.target.name);
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

  _favoriteChangeHandler() {
    this.updateData({
      isFavorite: !this._data.isFavorite
    }, true);
  }

  _eventTypeChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }

    this._offersByType = this._offers.find((offer) => offer.type === evt.target.value.toLowerCase()).offers;

    this.updateData({
      eventType: evt.target.value,
      acceptedOffers: [],
    });
  }

  _destinationInputHandler(evt) {
    const selectedDestination = this._destinations.find((destination) => destination.name === evt.target.value);

    if (!selectedDestination) {
      evt.target.setCustomValidity(`The selected destination is not in the list`);
      return;
    }

    this.updateData({
      currentDestination: selectedDestination.name,
      description: {
        text: selectedDestination.description,
        photos: selectedDestination.pictures,
      },
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEditorView.parseDataToEvent(this._data));
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEditorView.parseDataToEvent(this._data));
  }

  _formCloseClickHandler() {
    this._callback.formCloseClick();
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }
}
