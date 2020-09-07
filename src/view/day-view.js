import AbstractView from "./abstract-view";
import {getDateAtShortFormat, getDateAtSystemFormat} from "../utils/date-formatters";

const createDayTemplate = (date, index) => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        ${date === null ? `` : `<span class="day__counter">${index}</span>
        <time class="day__date" datetime="${getDateAtSystemFormat(date)}">${getDateAtShortFormat(date)}</time>`}
      </div>
      <ul class="trip-events__list" id="trip-events__list-${index}"></ul>
    </li>`
  );
};

export default class DayView extends AbstractView {
  constructor(date = null, index = 1) {
    super();
    this._date = date;
    this._index = index;
  }

  getTemplate() {
    return createDayTemplate(this._date, this._index);
  }
}
