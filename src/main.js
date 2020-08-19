import {EVENT_COUNT, RENDER_POSITION} from "./const";
import TripInfoView from "./view/trip-info";
import NavigationControllerView from "./view/nav-controller";
import EventFiltrationView from "./view/event-filtration";
import TotalPriceView from "./view/total-price";
import SortingView from "./view/sorting";
import EventEditorView from "./view/event-editor";
import EventOffersView from "./view/event-offers";
import EventDestinationView from "./view/event-destination";
import {createDaysTemplate} from "./view/days";
import {createDayTemplate} from "./view/day";
import {createEventTemplate} from "./view/event";
import {generateEvent, DESTINATIONS} from "./mock/event";
import {filterEventsByDays, renderTemplate, renderElement} from "./utils";

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) => {
  return a.dateStart - b.dateStart;
});

const tripDays = filterEventsByDays(events.slice(1));

const siteHeaderElement = document.querySelector(`.page-header`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

renderElement(tripElement, new TripInfoView(events.slice(1)).getElement(), RENDER_POSITION.AFTERBEGIN);
renderElement(tripControlsFirstElement, new NavigationControllerView().getElement(), RENDER_POSITION.AFTEREND);
renderElement(tripControlsSecondElement, new EventFiltrationView().getElement(), RENDER_POSITION.AFTEREND);

const tripInfoElement = tripElement.querySelector(`.trip-info`);

renderElement(tripInfoElement, new TotalPriceView().getElement(), RENDER_POSITION.BEFOREEND);

const siteMainElement = document.querySelector(`.page-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);

renderElement(eventsElement, new SortingView().getElement(), RENDER_POSITION.BEFOREEND);
renderElement(eventsElement, new EventEditorView(events[0], DESTINATIONS).getElement(), RENDER_POSITION.BEFOREEND);
renderTemplate(eventsElement, createDaysTemplate(), `beforeend`);

const eventDetailsElement = eventsElement.querySelector(`.event__details`);
const daysElement = eventsElement.querySelector(`.trip-days`);

renderElement(eventDetailsElement, new EventOffersView(events[0]).getElement(), RENDER_POSITION.BEFOREEND);
renderElement(eventDetailsElement, new EventDestinationView(events[0]).getElement(), RENDER_POSITION.BEFOREEND);

for (let i = 0; i < tripDays.size; i++) {
  const date = Array.from(tripDays.keys())[i];

  renderTemplate(daysElement, createDayTemplate(date, i + 1), `beforeend`);

  const dayElement = daysElement.querySelector(`#trip-events__list-${i + 1}`);

  renderTemplate(dayElement, tripDays.get(date).map(createEventTemplate).join(``), `beforeend`);
}
