import AbstractView from "./abstract-view";

const createTotalPriceTemplate = () => {
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
    </p>`
  );
};

export default class TotalPriceView extends AbstractView {
  getTemplate() {
    return createTotalPriceTemplate();
  }
}
