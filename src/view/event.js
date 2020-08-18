import {getTimeAtFormat, getDateAtSystemFormat, getDurationTime} from "../date-formatters";
import {EVENT_TYPE_ACTIVITY} from "../const";

const createAcceptedOffersTemplate = (offers) => {
  return (
    offers !== 0
      ? `<h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offers.map((offer) => `<li class="event__offer">
            <span class="event__offer-title">${offer.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.cost}</span>
          </li>`).join(``)}
        </ul>`
      : ``
  );
};

export const createEventTemplate = (event) => {
  const {eventType, currentDestination, acceptedOffers, dateStart, dateEnd, cost} = event;

  const prepositions = EVENT_TYPE_ACTIVITY.includes(eventType) ? `in` : `to`;
  const timeStartAtShortFormat = getTimeAtFormat(dateStart);
  const timeEndAtShortFormat = getTimeAtFormat(dateEnd);
  const dateStartAtSystemFormat = getDateAtSystemFormat(dateStart);
  const dateEndAtSystemFormat = getDateAtSystemFormat(dateEnd);
  const duration = getDurationTime(dateStart, dateEnd);
  const acceptedOffersTemplate = createAcceptedOffersTemplate(acceptedOffers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventType} ${prepositions} ${currentDestination}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStartAtSystemFormat}T${timeStartAtShortFormat}">${timeStartAtShortFormat}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateEndAtSystemFormat}T${timeEndAtShortFormat}">${timeEndAtShortFormat}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${cost}</span>
        </p>

        ${acceptedOffersTemplate}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
