import {RenderPosition, FilterType, UpdateType} from "../const";
import {EventFilterView} from "../view/index";
import {renderElement, removeElement} from "../utils/index";

export default class FilterPresenter {
  constructor(filterContainer, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._filterView = new EventFilterView(FilterType, this._filterModel.getFilter());
    this._filterView.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    renderElement(this._filterContainer, this._filterView, RenderPosition.AFTEREND);
  }

  destroy() {
    removeElement(this._filterView);
  }

  _handleModelEvent() {
    this.destroy();
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    this._filterModel.setFilter(UpdateType.TRIP_WITH_RESET_SORT, filterType);
  }
}
