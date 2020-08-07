export const createEventTemplate = (event) => {
  const {eventType, dateStart, dateEnd, cost} = event;

  const isTransport = (type) => {
    if (type === `Check-in` || type === `Sightseeing` || type === `Restaurant`) {
      return false;
    }
    return true;
  };

  const addZero = (i) => {
    if (i < 10) {
      i = `0` + i;
    }

    return i;
  };

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
    if (minuts >= 60) {
      let hours = Math.floor(minuts / 60);
      minuts = Math.floor(minuts % (hours * 60));

      if (minuts === 0) {
        return `${hours}H`;
      }

      return `${hours}H ${minuts}M`;
    }

    return `${minuts}M`;
  };

  const prepositions = isTransport(eventType) ? `in` : `to`;
  const eventStartTimeFrontend = getEventTimeFrontend(dateStart);
  const eventStartTimeBackend = getEventTimeBackend(dateStart);
  const eventEndTimeFrontend = getEventTimeFrontend(dateEnd);
  const eventEndTimeBackend = getEventTimeBackend(dateEnd);
  const durationTime = getDifference(dateStart, dateEnd);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventType} ${prepositions} Amsterdam</h3>

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

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title">Order Uber</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">20</span>
          </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
