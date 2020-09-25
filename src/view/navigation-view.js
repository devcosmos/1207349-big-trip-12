import AbstractView from "./abstract-view";

const createNavigationTemplate = (tabs, activeTab) => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${tabs.map((tab) => `<a 
        href="#" 
        data-navigation-tab="${tab}"
        class="trip-tabs__btn  ${tab === activeTab ? `trip-tabs__btn--active` : ``}" 
      >${tab}</a>`).join(``)}
    </nav>`
  );
};

export default class NavigationView extends AbstractView {
  constructor(tabs, activeTab) {
    super();
    this._tabs = tabs;
    this._activeTab = activeTab;

    this._callback = {};

    this._navigationClickHandler = this._navigationClickHandler.bind(this);
  }

  getTemplate() {
    return createNavigationTemplate(this._tabs, this._activeTab);
  }

  setNavigationClickHandler(callback) {
    this._callback.navigationClick = callback;
    this.getElement().addEventListener(`click`, this._navigationClickHandler);
  }

  _navigationClickHandler(evt) {
    if (evt.target.classList.contains(`trip-tabs__btn--active`) || evt.target.tagName !== `A`) {
      return;
    }

    this._callback.navigationClick(evt.target.dataset.navigationTab);
  }
}
