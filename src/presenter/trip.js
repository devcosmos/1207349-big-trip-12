import {TripInfoView, TotalPriceView, SortingView, EventEditorView, DaysView, DayView, EventView, NoEventView} from "../view/index";
import {splitEventsByDays} from "../utils/event";
import {renderElement, replaceElement} from "../utils/render";
import {RENDER_POSITION} from "../const";
import {DESTINATIONS} from "../mock/event";

export default class TripPresenter {
  constructor(eventsContainer, tripContainer) {
    this._eventsContainer = eventsContainer;
    this._tripContainer = tripContainer;

    this._totalPriceComponent = new TotalPriceView();
    this._sortingComponent = new SortingView();
    this._daysComponent = new DaysView();
    this._noEventComponent = new NoEventView();
  }

  init(boardEvent) {
    this._boardEvent = boardEvent;
    this._tripInfoComponent = new TripInfoView(boardEvent);

    renderElement(this._tripContainer, this._tripInfoComponent, RENDER_POSITION.AFTERBEGIN);
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
    renderElement(this._eventsContainer, this._daysComponent, RENDER_POSITION.BEFOREEND);

    splitEventsByDays(this._boardEvent).forEach((eventsByDay, index) => {
      this._dayDate = eventsByDay[0];
      this._dayEvent = eventsByDay[1];
      this._dayComponent = new DayView(this._dayDate, index + 1);
      this._eventsListElement = this._dayComponent.getElement().querySelector(`#trip-events__list-${index + 1}`);

      this._dayEvent.forEach((event) => {
        this._renderEvent(event);
      });

      this._renderDay();
    });
  }

  _renderSorting() {
    renderElement(this._eventsContainer, this._sortingComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderNoEdit() {
    renderElement(this._eventsContainer, this._noEventComponent, RENDER_POSITION.BEFOREEND);
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
