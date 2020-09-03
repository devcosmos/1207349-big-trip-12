import AbstractView from "./abstract-view";

const createNavigationControllerTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`
  );
};

export default class NavigationControllerView extends AbstractView {
  getTemplate() {
    return createNavigationControllerTemplate();
  }
}
