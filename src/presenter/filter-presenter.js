import {RenderPosition, FilterType, UpdateType} from "../const";
import {EventFiltrationView} from "../view/index";
import {renderElement} from "../utils/index";

export default class FilterPresenter {
  constructor(filterContainer, filterModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  init() {
    this._filterView = new EventFiltrationView(FilterType, this._filterModel.getFilter());
    this._filterView.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    renderElement(this._filterContainer, this._filterView, RenderPosition.AFTEREND);
  }

  _handleFilterTypeChange(filterType) {
    this._filterModel.setFilter(UpdateType.TRIP, filterType);
  }
}
