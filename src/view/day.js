import {createElement} from "../utils";
import {getDateAtShortFormat, getDateAtSystemFormat} from "../date-formatters";

const createDayTemplate = (date, index) => {
  const dateAtShortFormat = getDateAtShortFormat(new Date(date));
  const dateAtSystemFormat = getDateAtSystemFormat(new Date(date));

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${dateAtSystemFormat}">${dateAtShortFormat}</time>
      </div>
      <ul class="trip-events__list" id="trip-events__list-${index}"></ul>
    </li>`
  );
};

export default class DayView {
  constructor(date, index) {
    this._element = null;
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._index);
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
