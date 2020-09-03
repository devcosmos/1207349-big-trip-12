import {TripInfoView, TotalPriceView, SortingView, EventEditorView, DaysView, DayView, EventView, NoEventView} from "../view/index";
import {splitEventsByDays} from "../utils/event";
import {renderElement, replaceElement} from "../utils/render";
import {RenderPosition} from "../const";
import {DESTINATIONS} from "../mock/event";

export default class TripPresenter {
  constructor(eventsContainer, tripContainer) {
    this._eventsContainer = eventsContainer;
    this._tripContainer = tripContainer;

    this._totalPriceView = new TotalPriceView();
    this._sortingView = new SortingView();
    this._daysView = new DaysView();
    this._noEventView = new NoEventView();
  }

  init(boardEvent) {
    this._boardEvent = boardEvent;
    this._tripInfoView = new TripInfoView(boardEvent);

    renderElement(this._tripContainer, this._tripInfoView, RenderPosition.AFTERBEGIN);
    renderElement(this._tripInfoView, this._totalPriceView, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderEvent(event) {
    const eventView = new EventView(event);
    const eventEditView = new EventEditorView(event, DESTINATIONS);

    const replacePointToForm = () => {
      replaceElement(eventEditView, eventView);
    };

    const replaceFormToPoint = () => {
      replaceElement(eventView, eventEditView);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape`) {
        replaceFormToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    eventView.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditView.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    renderElement(this._eventsListElement, eventView, RenderPosition.BEFOREEND);
  }

  _renderDay() {
    renderElement(this._boardFragment, this._dayView, RenderPosition.BEFOREEND);
  }

  _renderDays() {
    this._boardFragment = document.createDocumentFragment();

    renderElement(this._eventsContainer, this._daysView, RenderPosition.BEFOREEND);

    splitEventsByDays(this._boardEvent).forEach((eventsByDay, index) => {
      this._dayDate = eventsByDay[0];
      this._dayEvents = eventsByDay[1];
      this._dayView = new DayView(this._dayDate, index + 1);
      this._eventsListElement = this._dayView.getElement().querySelector(`#trip-events__list-${index + 1}`);

      this._dayEvents.forEach((event) => {
        this._renderEvent(event);
      });

      this._renderDay();
    });

    renderElement(this._daysView, this._boardFragment, RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    renderElement(this._eventsContainer, this._sortingView, RenderPosition.BEFOREEND);
  }

  _renderNoEdit() {
    renderElement(this._eventsContainer, this._noEventView, RenderPosition.BEFOREEND);
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
