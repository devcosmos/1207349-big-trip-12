import {TripInfoView, TotalPriceView, SortingView, EventEditorView, DaysView, DayView, EventView, NoEventView} from "../view/index";
import {splitEventsByDays} from "../utils/event";
import {renderElement, replaceElement} from "../utils/render";
import {RENDER_POSITION} from "../const";
import {DESTINATIONS} from "../mock/event";

export default class Board {
  constructor(boardContainer, tripMainContainer) {
    this._boardContainer = boardContainer;
    this._tripMainContainer = tripMainContainer;

    this._totalPriceComponent = new TotalPriceView();
    this._sortingComponent = new SortingView();
    this._daysComponent = new DaysView();
    this._eventComponent = new EventView();
    this._eventEditComponent = new EventEditorView();
    this._noEventComponent = new NoEventView();
  }

  init(boardEvent) {
    this._boardEvent = boardEvent.slice();
    this._tripInfoComponent = new TripInfoView(boardEvent);

    renderElement(this._tripMainContainer, this._tripInfoComponent, RENDER_POSITION.AFTERBEGIN);
    renderElement(this._tripInfoComponent, this._totalPriceComponent, RENDER_POSITION.BEFOREEND);

    this._renderBoard();
  }

  _renderEvent(event) {
    const eventComponent = new EventView(event);
    const eventEditComponent = new EventEditorView(event, DESTINATIONS);

    const replacePointToForm = () => {
      replaceElement(eventEditComponent, eventComponent);
    };

    const replaceFormToPoint = () => {
      replaceElement(eventComponent, eventEditComponent);
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

    renderElement(this._eventsListElement, eventComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderDay() {
    renderElement(this._daysComponent, this._dayComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderDays() {
    renderElement(this._boardContainer, this._daysComponent, RENDER_POSITION.BEFOREEND);

    splitEventsByDays(this._boardEvent).forEach((eventsByDay, index) => {
      this._dayDate = eventsByDay[0];
      this._dayComponent = new DayView(this._dayDate, index + 1);
      this._eventsListElement = this._dayComponent.getElement().querySelector(`#trip-events__list-${index + 1}`);

      eventsByDay.slice(1).forEach((event) => {
        this._renderEvent(event);
      });

      this._renderDay();
    });
  }

  _renderSorting() {
    renderElement(this._boardContainer, this._sortingComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderNoEdit() {
    renderElement(this._boardContainer, this._noEventComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderBoard() {
    if (this._boardEvent.length === 0) {
      this._renderNoEdit();
      return;
    }

    this._renderSorting();
    this._renderDays();
  }
}
