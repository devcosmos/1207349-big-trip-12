import AbstractView from "./abstract.js";

const createDaysTemplate = () => {
  return (
    `<ul class="trip-days">`
  );
};

export default class DaysView extends AbstractView {
  getTemplate() {
    return createDaysTemplate();
  }
}
