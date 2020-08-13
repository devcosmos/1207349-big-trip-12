import {EVENT_COUNT} from "./const";
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
import {generateEvent, DESTINATIONS} from "./mock/event";
import {render, splitEventsByDays} from "./utils";

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) => {
  return a.dateStart - b.dateStart;
});

const tripDays = splitEventsByDays(events.slice(1));
const siteHeaderElement = document.querySelector(`.page-header`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

render(tripElement, createTripInfoTemplate(events.slice(1), DESTINATIONS), `afterbegin`);
render(tripControlsFirstElement, createNavigationControllerTemplate(), `afterend`);
render(tripControlsSecondElement, createEventFiltrationTemplate(), `afterend`);

const tripInfoElement = tripElement.querySelector(`.trip-info`);

render(tripInfoElement, createTotalPriceTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.page-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);

render(eventsElement, createSortingTemplate(), `beforeend`);
render(eventsElement, createEventEditorTemplate(events[0], DESTINATIONS), `beforeend`);
render(eventsElement, createDaysTemplate(), `beforeend`);

const eventDetailsElement = eventsElement.querySelector(`.event__details`);
const daysElement = eventsElement.querySelector(`.trip-days`);

render(eventDetailsElement, createEventOffersTemplate(events[0]), `beforeend`);
render(eventDetailsElement, createEventDestinationTemplate(events[0]), `beforeend`);

for (let i = 0; i < tripDays.size; i++) {
  const date = Array.from(tripDays.keys())[i];

  render(daysElement, createDayTemplate(date, i + 1), `beforeend`);

  const dayElement = daysElement.querySelector(`#trip-events__list-${i + 1}`);

  render(dayElement, tripDays.get(date).map(createEventTemplate).join(``), `beforeend`);
}
