import {Observer} from "../utils/index";
import {FilterType} from "../const";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._currentFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, filter) {
    this._currentFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._currentFilter;
  }
}
