import AbstractView from "./abstract";

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
