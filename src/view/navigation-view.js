import {NavigationTab} from "../const";
import AbstractView from "./abstract-view";

const createNavigationTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-navigation-tab="${NavigationTab.TABLE}">${NavigationTab.TABLE}</a>
      <a class="trip-tabs__btn" href="#" data-navigation-tab="${NavigationTab.STATS}">${NavigationTab.STATS}</a>
    </nav>`
  );
};

export default class NavigationView extends AbstractView {
  constructor() {
    super();

    this._callback = {};

    this._navigationClickHandler = this._navigationClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate();
  }

  setNavigationClickHandler(callback) {
    this._callback.navigationClick = callback;
    this.getElement().addEventListener(`click`, this._navigationClickHandler);
  }

  isActiveTab(navigationTab) {
    return this.getElement().querySelector(`[data-navigation-tab=${navigationTab}]`).className.includes(`trip-tabs__btn--active`);
  }

  setActiveTab(navigationTab) {
    const tab = this.getElement().querySelector(`[data-navigation-tab=${navigationTab}]`);
    const activeTab = this.getElement().querySelector(`.trip-tabs__btn--active`);

    if (tab !== activeTab) {
      activeTab.classList.remove(`trip-tabs__btn--active`);
      tab.classList.add(`trip-tabs__btn--active`);
    }
  }

  _navigationClickHandler(evt) {
    if (evt.target.classList.contains(`trip-tabs__btn--active`) || evt.target.tagName !== `A`) {
      return;
    }

    this.setActiveTab(evt.target.dataset.navigationTab);
    this._callback.navigationClick(evt.target.dataset.navigationTab);
  }
}
