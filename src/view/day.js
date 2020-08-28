import AbstractView from "./abstract.js";
import {getDateAtShortFormat, getDateAtSystemFormat} from "../date-formatters";

const createDayTemplate = (date, index) => {
  const dateAtShortFormat = getDateAtShortFormat(date);
  const dateAtSystemFormat = getDateAtSystemFormat(date);

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

export default class DayView extends AbstractView {
  constructor(date, index) {
    super();
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._index);
  }
}
