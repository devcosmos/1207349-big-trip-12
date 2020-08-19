import {createElement} from "../utils";
import {getOffers} from "../mock/event";

const createEventOffersTemplate = (event) => {
  const {acceptedOffers, eventType} = event;
  const offers = getOffers(eventType);

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offers.map((offer, i) => `<div class="event__offer-selector">
          <input 
            class="event__offer-checkbox  visually-hidden" 
            id="event-offer-${offer.id}-${i}" 
            type="checkbox" 
            name="event-offer-${offer.id}" 
            ${acceptedOffers.includes(offer) ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.id}-${i}">
            <span class="event__offer-title">${offer.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
          </label>
        </div>`).join(``)}

      </div>
    </section>`
  );
};

export default class EventOffers {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createEventOffersTemplate(this._event);
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
