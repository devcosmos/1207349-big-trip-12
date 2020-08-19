import {createElement} from "../utils";

const createEventDestinationTemplate = ({description}) => {

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description.text}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${description.images.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`)}
        </div>
      </div>
    </section>`
  );
};

export default class EventDestination {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createEventDestinationTemplate(this._event);
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
