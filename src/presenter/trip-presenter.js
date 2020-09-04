import {TripInfoView, TotalPriceView, SortingView, EventEditorView, DaysView, DayView, EventView, NoEventView} from "../view/index";
import {splitEventsByDays, sortEventsByTime, sortEventsByPrice} from "../utils/event";
import {renderElement, replaceElement} from "../utils/render";
import {RenderPosition, SortType} from "../const";
import {DESTINATIONS} from "../mock/event";

export default class TripPresenter {
  constructor(eventsContainer, tripContainer) {
    this._eventsContainer = eventsContainer;
    this._tripContainer = tripContainer;
    this._currentSortType = SortType.EVENT;

    this._totalPriceView = new TotalPriceView();
    this._sortingView = new SortingView();
    this._daysView = new DaysView();
    this._noEventView = new NoEventView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardEvent) {
    this._boardEvent = boardEvent.slice();
    this._sourcedBoardEvent = boardEvent.slice();

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

    renderElement(this._eventListElement, eventView, RenderPosition.BEFOREEND);
  }

  _renderDay() {
    renderElement(this._boardFragment, this._dayView, RenderPosition.BEFOREEND);
  }

  _renderDays() {
    splitEventsByDays(this._boardEvent).forEach((eventsByDay, index) => {
      this._dayDate = eventsByDay[0];
      this._dayEvents = eventsByDay[1];
      this._dayView = new DayView(this._dayDate, index + 1);
      this._eventListElement = this._dayView.getElement().querySelector(`#trip-events__list-${index + 1}`);

      this._dayEvents.forEach((event) => {
        this._renderEvent(event);
      });

      this._renderDay();
    });
  }

  _renderEvents() {
    this._dayView = new DayView();
    this._eventListElement = this._dayView.getElement().querySelector(`#trip-events__list-1`);

    this._boardEvent.forEach((event) => {
      this._renderEvent(event);
    });

    this._renderDay();
  }

  _renderEventList() {
    this._boardFragment = document.createDocumentFragment();

    renderElement(this._eventsContainer, this._daysView, RenderPosition.BEFOREEND);

    if (this._currentSortType === SortType.EVENT) {
      this._renderDays();
    } else {
      this._renderEvents();
    }

    renderElement(this._daysView, this._boardFragment, RenderPosition.BEFOREEND);
  }

  _clearEventList() {
    this._daysView.getElement().innerHTML = ``;
  }

  _sortEvent(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._boardEvent.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this._boardEvent.sort(sortEventsByPrice);
        break;
      default:
        this._boardEvent = this._sourcedBoardEvent.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvent(sortType);
    this._clearEventList();
    this._renderEventList();
  }

  _renderSorting() {
    renderElement(this._eventsContainer, this._sortingView, RenderPosition.BEFOREEND);
    this._sortingView.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    this._renderEventList();
  }
}
