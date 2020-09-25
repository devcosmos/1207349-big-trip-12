import {SortType} from "../const";
import AbstractView from "./abstract-view";

const createSortingTemplate = (sortTypes, currentSortType) => {
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">${currentSortType === SortType.EVENT ? `Day` : ``}</span>

      ${sortTypes.map((sortType) => `<div class="trip-sort__item  trip-sort__item--${sortType}" data-sort-type="${sortType}">
        <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${currentSortType === sortType ? `checked` : ``}>
        <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
      </div>`).join(``)}

      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>`
  );
};


export default class SortingView extends AbstractView {
  constructor(sortTypes, currentSortType) {
    super();
    this._sortTypes = sortTypes;
    this._currentSortType = currentSortType;

    this._callback = {};

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate(this._sortTypes, this._currentSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }

  _sortTypeChangeHandler(evt) {
    if (!(evt.target.tagName === `LABEL` || evt.target.tagName === `INPUT`)) {
      return;
    }

    this._callback.sortTypeChange(evt.target.parentElement.dataset.sortType);
  }
}
