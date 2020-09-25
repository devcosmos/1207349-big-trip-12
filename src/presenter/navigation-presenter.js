import {RenderPosition, NavigationTab, UpdateType, FilterType} from "../const";
import {NavigationView} from "../view/index";
import {renderElement, removeElement} from "../utils/index";

export default class NavigationPresenter {
  constructor(navigationElement, newEventButtonElement, tripPresenter, statisticsPresenter, navigationModel, filterModel) {
    this._navigationElement = navigationElement;
    this._newEventButtonElement = newEventButtonElement;
    this._tripPresenter = tripPresenter;
    this._statisticsPresenter = statisticsPresenter;
    this._navigationModel = navigationModel;
    this._filterModel = filterModel;

    this._handleNavigationModel = this._handleNavigationModel.bind(this);
    this._navigationClickHandler = this._navigationClickHandler.bind(this);
    this._newEventButtonClickHandler = this._newEventButtonClickHandler.bind(this);
    this._newEventFormCloseHandler = this._newEventFormCloseHandler.bind(this);

    this._navigationModel.addObserver(this._handleNavigationModel);

    this._newEventButtonElement.addEventListener(`click`, this._newEventButtonClickHandler);
  }

  init() {
    this._navigationView = new NavigationView(Object.values(NavigationTab), this._navigationModel.getTab());
    this._navigationView.setNavigationClickHandler(this._navigationClickHandler);

    renderElement(this._navigationElement, this._navigationView, RenderPosition.AFTEREND);
  }

  destroy() {
    removeElement(this._navigationView);
  }

  _handleNavigationModel() {
    this.destroy();
    this.init();
  }

  _newEventFormCloseHandler() {
    this._newEventButtonElement.disabled = false;
  }

  _newEventButtonClickHandler() {
    if (this._navigationModel.getTab() === NavigationTab.TABLE) {
      this._filterModel.setFilter(UpdateType.TRIP_WITH_RESET_SORT, FilterType.EVERYTHING);
    } else {
      this._navigationClickHandler(NavigationTab.TABLE);
    }

    this._tripPresenter.createEvent(this._newEventFormCloseHandler);
    this._newEventButtonElement.disabled = true;
  }

  _navigationClickHandler(navigationTab) {
    switch (navigationTab) {
      case NavigationTab.TABLE:
        this._statisticsPresenter.destroy();
        this._navigationModel.setTab(UpdateType.TRIP_WITH_RESET_SORT, NavigationTab.TABLE);
        this._filterModel.setFilter(UpdateType.TRIP_WITH_RESET_SORT, FilterType.EVERYTHING);
        this._tripPresenter.init();
        break;
      case NavigationTab.STATS:
        this._tripPresenter.destroy();
        this._navigationModel.setTab(UpdateType.TRIP_WITH_RESET_SORT, NavigationTab.STATS);
        this._filterModel.setFilter(UpdateType.TRIP_WITH_RESET_SORT, FilterType.EVERYTHING);
        this._statisticsPresenter.init();
        break;
    }
  }
}
