import {isTransport, addZero} from "../utils";

const getEventTimeFrontend = (date) => {
  const h = addZero(date.getHours());
  const m = addZero(date.getMinutes());

  return `${h}:${m}`;
};

const getEventTimeBackend = (date) => {
  const y = date.getFullYear();
  const m = addZero(date.getMonth());
  const d = addZero(date.getDate());

  return `${y}:${m}:${d}T${getEventTimeFrontend(date)}`;
};

const getDifference = (start, end) => {
  const difference = (Date.parse(end) - Date.parse(start));

  let minuts = difference / (1000 * 60);
  let hours = Math.floor(minuts / 60);
  let days = Math.floor(hours / 24);
  let durationTime;

  if (days > 0) {
    minuts = Math.floor(minuts % (hours * 60));
    hours = Math.floor(hours % (days * 24));
    durationTime = minuts !== 0
      ? `${days}D ${hours}H ${minuts}M`
      : `${days}D ${hours}H`;

  } else if (hours > 0) {
    minuts = Math.floor(minuts % (hours * 60));
    durationTime = minuts !== 0
      ? `${hours}H ${minuts}M`
      : `${hours}H`;

  } else {
    durationTime = `${minuts}M`;
  }

  return durationTime;
};

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

  const prepositions = isTransport(eventType) ? `in` : `to`;
  const eventStartTimeFrontend = getEventTimeFrontend(dateStart);
  const eventStartTimeBackend = getEventTimeBackend(dateStart);
  const eventEndTimeFrontend = getEventTimeFrontend(dateEnd);
  const eventEndTimeBackend = getEventTimeBackend(dateEnd);
  const durationTime = getDifference(dateStart, dateEnd);
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
            <time class="event__start-time" datetime="${eventStartTimeBackend}">${eventStartTimeFrontend}</time>
            &mdash;
            <time class="event__end-time" datetime="${eventEndTimeBackend}">${eventEndTimeFrontend}</time>
          </p>
          <p class="event__duration">${durationTime}</p>
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
