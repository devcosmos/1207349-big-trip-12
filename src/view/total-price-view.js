import AbstractView from "./abstract-view";

const createTotalPriceTemplate = (events) => {
  let price = 0;

  events.forEach((event) => {
    price += event.price;
    event.acceptedOffers.forEach((offer) => {
      price += offer.price;
    });
  });

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`
  );
};

export default class TotalPriceView extends AbstractView {
  constructor(tripEvents = null) {
    super();
    this._tripEvents = tripEvents;
  }

  getTemplate() {
    return createTotalPriceTemplate(this._tripEvents);
  }
}
