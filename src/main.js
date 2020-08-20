import {EVENT_COUNT, RENDER_POSITION} from "./const";
import TripInfoView from "./view/trip-info";
import NavigationControllerView from "./view/nav-controller";
import EventFiltrationView from "./view/event-filtration";
import TotalPriceView from "./view/total-price";
import SortingView from "./view/sorting";
import EventEditorView from "./view/event-editor";
import DaysView from "./view/days";
import DayView from "./view/day";
import EventView from "./view/event";
import {generateEvent, DESTINATIONS} from "./mock/event";
import {filterEventsByDays, renderElement} from "./utils";

const renderEvent = (event) => {
  const eventComponent = new EventView(event).getElement();
  const eventEditComponent = new EventEditorView(event, DESTINATIONS).getElement();

  const replacePointToForm = () => {
    eventComponent.parentElement.replaceChild(eventEditComponent, eventComponent);
  };

  const replaceFormToPoint = () => {
    eventEditComponent.parentElement.replaceChild(eventComponent, eventEditComponent);
  };

  eventComponent
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      replacePointToForm();
    });

  eventEditComponent
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
    });

  return eventComponent;
};

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) => a.dateStart - b.dateStart);
const tripDays = filterEventsByDays(events);
const daysComponent = new DaysView();
const tripInfoComponent = new TripInfoView(events);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

renderElement(tripElement, tripInfoComponent.getElement(), RENDER_POSITION.AFTERBEGIN);
renderElement(tripControlsFirstElement, new NavigationControllerView().getElement(), RENDER_POSITION.AFTEREND);
renderElement(tripControlsSecondElement, new EventFiltrationView().getElement(), RENDER_POSITION.AFTEREND);
renderElement(tripInfoComponent.getElement(), new TotalPriceView().getElement(), RENDER_POSITION.BEFOREEND);
renderElement(eventsElement, new SortingView().getElement(), RENDER_POSITION.BEFOREEND);
renderElement(eventsElement, daysComponent.getElement(), RENDER_POSITION.BEFOREEND);

for (let i = 0; i < tripDays.size; i++) {
  const date = Array.from(tripDays.keys())[i];
  const dayComponent = new DayView(date, i + 1);
  const days = dayComponent.getElement().querySelector(`#trip-events__list-${i + 1}`);

  for (const event of tripDays.get(date)) {
    days.append(renderEvent(event));
  }

  daysComponent.getElement().append(dayComponent.getElement());
}
