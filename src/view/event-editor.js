import {EVENT_TYPE} from "../const";
import {isTransport, addZero} from "../utils";

const createEventTypeIconTemplate = (type) => {
  return (
    `<label class="event__type  event__type-btn" for="event-type-toggle-1">
      <span class="visually-hidden">Choose event type</span>
      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">`
  );
};

const createEventTypeTemplate = (types, eventType) => {
  return (
    `${types.map((type) => `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${eventType === type ? `checked` : ``}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
    </div>`).join(``)}`
  );
};

const createEventDestinationTemplate = (eventType, cities) => {
  const prepositions = isTransport(eventType) ? `in` : `to`;

  return (
    `<label class="event__label  event__type-output" for="event-destination-1">
      ${eventType} ${prepositions}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="" list="destination-list-1">
    <datalist id="destination-list-1">  
      ${cities.map((city) => `<option value="${city}"></option>`).join(``)}
    </datalist>`
  );
};

const getEventTime = (date) => {
  const y = addZero(date.getFullYear() % 100);
  const m = addZero(date.getMonth());
  const d = addZero(date.getDate());
  const h = addZero(date.getHours());
  const minuts = addZero(date.getMinutes());

  return `${d}/${m}/${y} ${h}:${minuts}`;
};

export const createEventEditorTemplate = (event = {}, cities) => {
  const {
    eventType = `Taxi`,
    dateStart = null,
    dateEnd = null,
    cost = null
  } = event;

  const eventTypeIconTemplate = createEventTypeIconTemplate(eventType);
  const eventTypeTransferTemplate = createEventTypeTemplate(EVENT_TYPE.filter(isTransport), eventType);
  const eventTypeActivityTemplate = createEventTypeTemplate(EVENT_TYPE.filter((type) => !isTransport(type)), eventType);
  const eventDestinationTemplate = createEventDestinationTemplate(eventType, cities);
  const eventStartTime = getEventTime(dateStart);
  const eventEndTime = getEventTime(dateEnd);

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">

          ${eventTypeIconTemplate}

          <div class="event__type-list">
          
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Transfer</legend>
            
            ${eventTypeTransferTemplate}
            
          </fieldset>

          <fieldset class="event__type-group">
            <legend class="visually-hidden">Activity</legend>
                
            ${eventTypeActivityTemplate}
            
            </fieldset>

          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          
          ${eventDestinationTemplate}

        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">
            From
          </label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${eventStartTime}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">
            To
          </label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${eventEndTime}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details"></section>
    </form>`
  );
};
