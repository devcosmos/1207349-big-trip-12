import {EVENT_COUNT, RENDER_POSITION} from "./const";
import {TripInfoView, NavigationControllerView, EventFiltrationView, TotalPriceView, SortingView, EventEditorView, DaysView, DayView, EventView, NoEventView} from "./view/index";
import {generateEvent, DESTINATIONS} from "./mock/event";
import {splitEventsByDays} from "./utils/event";
import {renderElement} from "./utils/render";

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) => a.dateStart - b.dateStart);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

const renderEvent = (event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditorView(event, DESTINATIONS);

  const replacePointToForm = () => {
    eventComponent.getElement().parentElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToPoint = () => {
    eventEditComponent.getElement().parentElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape`) {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  return eventComponent.getElement();
};

const renderBoard = (container, boardEvents) => {
  const tripInfoComponent = new TripInfoView(boardEvents);

  renderElement(tripElement, tripInfoComponent, RENDER_POSITION.AFTERBEGIN);
  renderElement(tripInfoComponent, new TotalPriceView(), RENDER_POSITION.BEFOREEND);

  if (boardEvents.length === 0) {
    renderElement(container, new NoEventView(), RENDER_POSITION.BEFOREEND);
    return;
  }

  const daysComponent = new DaysView();
  const eventsByDays = splitEventsByDays(boardEvents);

  renderElement(container, new SortingView(), RENDER_POSITION.BEFOREEND);
  renderElement(container, daysComponent, RENDER_POSITION.BEFOREEND);

  eventsByDays.forEach((eventsByDay, index) => {
    const dayDate = eventsByDay[0];
    const dayComponent = new DayView(dayDate, index + 1);
    const eventsListElement = dayComponent.getElement().querySelector(`#trip-events__list-${index + 1}`);

    eventsByDay.slice(1).forEach((event) => {
      renderElement(eventsListElement, renderEvent(event), RENDER_POSITION.BEFOREEND);
    });

    renderElement(daysComponent, dayComponent, RENDER_POSITION.BEFOREEND);
  });
};

renderElement(tripControlsFirstElement, new NavigationControllerView(), RENDER_POSITION.AFTERBEGIN);
renderElement(tripControlsSecondElement, new EventFiltrationView(), RENDER_POSITION.AFTERBEGIN);
renderBoard(eventsElement, events);
