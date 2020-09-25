import AbstractView from "./abstract-view";
import {filter} from "../utils/index";

const createEventFilterTemplate = (filters, currentFilter, events) => {
  return (
    `<form class="trip-filters" action="#" method="get">

      ${filters.map((filterItem) => `<div class="trip-filters__filter">
        <input
          id="filter-${filterItem}"
          class="trip-filters__filter-input visually-hidden"
          type="radio"
          name="trip-filter"
          value="${filterItem}"
          ${filterItem === currentFilter ? `checked` : ``}
          ${filter[filterItem](events).length ? `` : `disabled`}
        >
        <label class="trip-filters__filter-label" for="filter-${filterItem}">
          ${filterItem}
        </label>
      </div>`).join(``)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class EventFilterView extends AbstractView {
  constructor(filters, currentFilterType, events) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._events = events;

    this._callback = {};

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createEventFilterTemplate(this._filters, this._currentFilter, this._events);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    this._callback.filterTypeChange(evt.target.value);
  }
}
