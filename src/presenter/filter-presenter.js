import {RenderPosition, FilterType, UpdateType} from "../const";
import {EventFilterView} from "../view/index";
import {renderElement, removeElement} from "../utils/index";

export default class FilterPresenter {
  constructor(filterElement, filterModel, eventsModel) {
    this._filterElement = filterElement;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;

    this._handleEventModel = this._handleEventModel.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleEventModel);
    this._filterModel.addObserver(this._handleEventModel);
  }

  init() {
    this._filterView = new EventFilterView(Object.values(FilterType), this._filterModel.getFilter(), this._eventsModel.getEvents());
    this._filterView.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    renderElement(this._filterElement, this._filterView, RenderPosition.AFTEREND);
  }

  destroy() {
    removeElement(this._filterView);
  }

  _handleEventModel() {
    this.destroy();
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    this._filterModel.setFilter(UpdateType.TRIP_WITH_RESET_SORT, filterType);
  }
}
