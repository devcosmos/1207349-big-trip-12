import {createTripInfoTemplate} from "./view/trip-info";
import {createTotalPriceTemplate} from "./view/total-price";
import {createNavigationControllerTemplate} from "./view/nav-controller";
import {createEventFiltrationTemplate} from "./view/event-filtration";
import {createSortingTemplate} from "./view/sorting";
import {createEventEditorTemplate} from "./view/event-editor";
import {createEventOffersTemplate} from "./view/event-offers";
import {createEventDestinationTemplate} from "./view/event-destination";
import {createDaysTemplate} from "./view/days";
import {createDayTemplate} from "./view/day";
import {createEventTemplate} from "./view/event";
import {generateEvent} from "./mock/event";

const EVENT_COUNT = 4;
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

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
render(eventsElement, createEventEditorTemplate(events[0]), `beforeend`);
render(eventsElement, createDaysTemplate(), `beforeend`);

const eventDetailsElement = eventsElement.querySelector(`.event__details`);
const daysElement = eventsElement.querySelector(`ul.trip-days`);

render(eventDetailsElement, createEventOffersTemplate(), `beforeend`);
render(eventDetailsElement, createEventDestinationTemplate(), `beforeend`);
render(daysElement, createDayTemplate(), `beforeend`);

const dayElement = daysElement.querySelector(`ul.trip-events__list`);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(dayElement, createEventTemplate(events[i]), `beforeend`);
}
