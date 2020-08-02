import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTotalPriceTemplate} from "./view/total-price.js";
import {createNavigationControllerTemplate} from "./view/nav-controller.js";
import {createEventFiltrationTemplate} from "./view/event-filtration.js";
import {createSortingTemplate} from "./view/sorting.js";
import {createEventEditorTemplate} from "./view/event-editor.js";
import {createEventOffersTemplate} from "./view/event-offers.js";
import {createEventDestinationTemplate} from "./view/event-destination.js";
import {createDaysTemplate} from "./view/days.js";
import {createDayTemplate} from "./view/day.js";
import {createEventTemplate} from "./view/event.js";

const EVENT_COUNT = 3;

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
