import {EVENT_COUNT, RENDER_POSITION} from "./const";
import {TripInfoView, NavigationControllerView, EventFiltrationView, TotalPriceView, SortingView, EventEditorView, DaysView, DayView, EventView, NoEventView} from "./view/index";
import {generateEvent, DESTINATIONS} from "./mock/event";
import {splitEventsByDays, renderElement} from "./utils";

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) => a.dateStart - b.dateStart);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

const renderEvent = (event) => {
  const eventComponent = new EventView(event).getElement();
  const eventEditComponent = new EventEditorView(event, DESTINATIONS).getElement();

  const replacePointToForm = () => {
    eventComponent.parentElement.replaceChild(eventEditComponent, eventComponent);
  };

  const replaceFormToPoint = () => {
    eventEditComponent.parentElement.replaceChild(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape`) {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      replacePointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  eventEditComponent
    .addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  return eventComponent;
};

const renderBoard = (container, boardEvents) => {
  const tripInfoComponent = new TripInfoView(boardEvents);

  renderElement(tripElement, tripInfoComponent.getElement(), RENDER_POSITION.AFTERBEGIN);
  renderElement(tripInfoComponent.getElement(), new TotalPriceView().getElement(), RENDER_POSITION.BEFOREEND);

  if (boardEvents.length === 0) {
    renderElement(container, new NoEventView().getElement(), RENDER_POSITION.BEFOREEND);
    return;
  }

  const daysComponent = new DaysView();
  const eventsByDays = splitEventsByDays(boardEvents);

  renderElement(container, new SortingView().getElement(), RENDER_POSITION.BEFOREEND);
  renderElement(container, daysComponent.getElement(), RENDER_POSITION.BEFOREEND);

  eventsByDays.forEach((eventsByDay, index) => {
    const dayDate = eventsByDay[0];
    const dayComponent = new DayView(dayDate, index + 1);
    const eventsListElement = dayComponent.getElement().querySelector(`#trip-events__list-${index + 1}`);

    eventsByDay.slice(1).forEach((event) => {
      eventsListElement.append(renderEvent(event));
    });

    daysComponent.getElement().append(dayComponent.getElement());
  });
};

renderElement(tripControlsFirstElement, new NavigationControllerView().getElement(), RENDER_POSITION.AFTEREND);
renderElement(tripControlsSecondElement, new EventFiltrationView().getElement(), RENDER_POSITION.AFTEREND);
renderBoard(eventsElement, events);
