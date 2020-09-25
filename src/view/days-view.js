import AbstractView from "./abstract-view";

const createDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class DaysView extends AbstractView {
  getTemplate() {
    return createDaysTemplate();
  }
}
