import AbstractView from "./abstract-view";

const createEventFilterTemplate = (filters, currentFilter) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${Object.values(filters).map((filter) => `<div class="trip-filters__filter">
        <input
          id="filter-${filter}"
          class="trip-filters__filter-input visually-hidden"
          type="radio"
          name="trip-filter"
          value="${filter}"
          ${filter === currentFilter ? `checked` : ``}
        >
        <label class="trip-filters__filter-label" for="filter-${filter}">
          ${filter}
        </label>
      </div>`).join(``)}

      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class EventFilterView extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._callback = {};

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createEventFilterTemplate(this._filters, this._currentFilter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }

  _filterTypeChangeHandler(evt) {
    this._callback.filterTypeChange(evt.target.value);
  }
}
