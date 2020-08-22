import {EVENT_COUNT, RENDER_POSITION} from "./const";
import {TripInfo, NavigationController, EventFiltration, TotalPrice, Sorting, EventEditor, Days, Day, Event} from "./view/index";
import {generateEvent, DESTINATIONS} from "./mock/event";
import {splitEventsByDays, renderElement} from "./utils";

const renderEvent = (event, eventCount) => {
  const eventComponent = new Event(event).getElement();
  const eventEditComponent = new EventEditor(event, eventCount, DESTINATIONS).getElement();

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
const eventsByDays = splitEventsByDays(events);
const daysComponent = new Days();
const tripInfoComponent = new TripInfo(events);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

renderElement(tripElement, tripInfoComponent.getElement(), RENDER_POSITION.AFTERBEGIN);
renderElement(tripControlsFirstElement, new NavigationController().getElement(), RENDER_POSITION.AFTEREND);
renderElement(tripControlsSecondElement, new EventFiltration().getElement(), RENDER_POSITION.AFTEREND);
renderElement(tripInfoComponent.getElement(), new TotalPrice().getElement(), RENDER_POSITION.BEFOREEND);
renderElement(eventsElement, new Sorting().getElement(), RENDER_POSITION.BEFOREEND);
renderElement(eventsElement, daysComponent.getElement(), RENDER_POSITION.BEFOREEND);

let dayCount = 0;
let eventCount = 1;

eventsByDays.forEach(() => {
  const date = Array.from(eventsByDays.keys())[dayCount];
  const dayComponent = new Day(date, dayCount + 1);
  const eventsListElement = dayComponent.getElement().querySelector(`#trip-events__list-${dayCount + 1}`);

  eventsByDays.get(date).forEach((event) => {
    eventsListElement.append(renderEvent(event, eventCount));
    eventCount++;
  });

  daysComponent.getElement().append(dayComponent.getElement());
  dayCount++;
});
