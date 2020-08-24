import {createElement} from "../utils";

const createDaysTemplate = () => {
  return (
    `<ul class="trip-days">`
  );
};

export default class DaysView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDaysTemplate();
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
