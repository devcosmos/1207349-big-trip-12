export const createEventOffersTemplate = (event) => {
  const {offers, acceptedOffers} = event;

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">

        ${offers.map((offer) => `<div class="event__offer-selector">
          <input 
            class="event__offer-checkbox  visually-hidden" 
            id="event-offer-${offer.id}-1" 
            type="checkbox" 
            name="event-offer-${offer.id}" 
            ${acceptedOffers.indexOf(offer) !== -1 ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${offer.id}">
            <span class="event__offer-title">${offer.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
          </label>
        </div>`).join(``)}

      </div>
    </section>`
  );
};
