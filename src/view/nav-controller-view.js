import {TripControlsItem} from "../const";
import AbstractView from "./abstract-view";

const createNavigationControllerTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-nav-control-item="${TripControlsItem.TABLE}">${TripControlsItem.TABLE}</a>
      <a class="trip-tabs__btn" href="#" data-nav-control-item="${TripControlsItem.STATS}">${TripControlsItem.STATS}</a>
    </nav>`
  );
};

export default class NavigationControllerView extends AbstractView {
  constructor() {
    super();

    this._callback = {};

    this._navControllerClickHandler = this._navControllerClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationControllerTemplate();
  }

  setNavControllerClickHandler(callback) {
    this._callback.navControllerClick = callback;
    this.getElement().addEventListener(`click`, this._navControllerClickHandler);
  }

  setNavControllerItem(tripControlsItem) {
    const item = this.getElement().querySelector(`[data-nav-control-item=${tripControlsItem}]`);
    const activeItem = this.getElement().querySelector(`.trip-tabs__btn--active`);

    if (activeItem !== item) {
      activeItem.classList.remove(`trip-tabs__btn--active`);
      item.classList.add(`trip-tabs__btn--active`);
    }
  }

  _navControllerClickHandler(evt) {
    if (evt.target.classList.contains(`trip-tabs__btn--active`)) {
      return;
    }

    evt.preventDefault();
    this.setNavControllerItem(evt.target.dataset.navControlItem);
    this._callback.navControllerClick(evt.target.dataset.navControlItem);
  }
}
