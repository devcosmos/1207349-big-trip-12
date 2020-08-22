import {createElement} from "../utils";
import {getDateAtShortFormat, getDateAtFormat} from "../date-formatters";

const createDayTemplate = (date, dayCount) => {
  const dateAtShortFormat = getDateAtShortFormat(new Date(date));
  const dateAtSystemFormat = getDateAtFormat(new Date(date), 0, 10);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${dayCount}</span>
        <time class="day__date" datetime="${dateAtSystemFormat}">${dateAtShortFormat}</time>
      </div>
      <ul class="trip-events__list" id="trip-events__list-${dayCount}"></ul>
    </li>`
  );
};

export default class Day {
  constructor(date, dayCount) {
    this._element = null;
    this._date = date;
    this._dayCount = dayCount;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._dayCount);
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
