import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTotalPriceTemplate} from "./view/total-price.js";
import {createNavigationControllerTemplate} from "./view/nav-controller.js";
import {createEventFiltrationTemplate} from "./view/event-filtration.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createEventEditorTemplate} from "./view/event-editor.js";
import {createEventOffersTemplate} from "./view/event-offers.js";
import {createEventDestinationTemplate} from "./view/event-destination.js";
import {createDaysTemplate} from "./view/days.js";

const EVENT_COUNT = 3;

const createDayTemplate = () => {
  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
  );
};

const createEventTemplate = () => {
  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">Taxi to Amsterdam</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">10:30</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">11:00</time>
          </p>
          <p class="event__duration">30M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">20</span>
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

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

render(tripElement, createTripInfoTemplate(), `afterbegin`);
render(tripControlsFirstElement, createNavigationControllerTemplate(), `afterend`);
render(tripControlsSecondElement, createEventFiltrationTemplate(), `afterend`);

const tripInfoElement = tripElement.querySelector(`.trip-info`);

render(tripInfoElement, createTotalPriceTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.page-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);

render(eventsElement, createSortingTemplate(), `beforeend`);
render(eventsElement, createEventEditorTemplate(), `beforeend`);
render(eventsElement, createDaysTemplate(), `beforeend`);

const eventDetailsElement = eventsElement.querySelector(`.event__details`);
const daysElement = eventsElement.querySelector(`ul.trip-days`);

render(eventDetailsElement, createEventOffersTemplate(), `beforeend`);
render(eventDetailsElement, createEventDestinationTemplate(), `beforeend`);
render(daysElement, createDayTemplate(), `beforeend`);

const dayElement = daysElement.querySelector(`ul.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(dayElement, createEventTemplate(), `beforeend`);
}
