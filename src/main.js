import {EVENT_COUNT} from "./const";
import {generateEvent, DESTINATIONS} from "./mock/event";
import {render, splitEventsByDays} from "./utils";
import * as veiw from "./view/index";

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) => {
  return a.dateStart - b.dateStart;
});

const tripDays = splitEventsByDays(events.slice(1));
const siteHeaderElement = document.querySelector(`.page-header`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

render(tripElement, veiw.createTripInfoTemplate(events.slice(1), DESTINATIONS), `afterbegin`);
render(tripControlsFirstElement, veiw.createNavigationControllerTemplate(), `afterend`);
render(tripControlsSecondElement, veiw.createEventFiltrationTemplate(), `afterend`);

const tripInfoElement = tripElement.querySelector(`.trip-info`);

render(tripInfoElement, veiw.createTotalPriceTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.page-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);

render(eventsElement, veiw.createSortingTemplate(), `beforeend`);
render(eventsElement, veiw.createEventEditorTemplate(events[0], DESTINATIONS), `beforeend`);
render(eventsElement, veiw.createDaysTemplate(), `beforeend`);

const eventDetailsElement = eventsElement.querySelector(`.event__details`);
const daysElement = eventsElement.querySelector(`.trip-days`);

render(eventDetailsElement, veiw.createEventOffersTemplate(events[0]), `beforeend`);
render(eventDetailsElement, veiw.createEventDestinationTemplate(events[0]), `beforeend`);

for (let i = 0; i < tripDays.size; i++) {
  const date = Array.from(tripDays.keys())[i];

  render(daysElement, veiw.createDayTemplate(date, i + 1), `beforeend`);

  const dayElement = daysElement.querySelector(`#trip-events__list-${i + 1}`);

  render(dayElement, tripDays.get(date).map(veiw.createEventTemplate).join(``), `beforeend`);
}
