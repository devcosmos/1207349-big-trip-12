import {TripInfoView, TotalPriceView, SortingView, DaysView, DayView, NoEventView} from "../view/index";
import {splitEventsByDays, sortEventsByDuration, sortEventsByPrice} from "../utils/event";
import {renderElement, removeElement} from "../utils/render";
import {RenderPosition, SortType} from "../const";
import {EventPresenter} from "./index";

export default class TripPresenter {
  constructor(eventsContainer, tripContainer, eventsModel) {
    this._eventsContainer = eventsContainer;
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._currentSortType = SortType.EVENT;
    this._eventPresenter = {};

    this._totalPriceView = new TotalPriceView();
    this._sortingView = new SortingView();
    this._daysView = new DaysView();
    this._noEventView = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleEventStatusChange = this._handleEventStatusChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._tripInfoView = new TripInfoView(this._eventsModel.getEvents());

    renderElement(this._tripContainer, this._tripInfoView, RenderPosition.AFTERBEGIN);
    renderElement(this._tripInfoView, this._totalPriceView, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.TIME:
        this._eventsModel.getEvents().slice().sort(sortEventsByDuration);
        break;
      case SortType.PRICE:
        this._eventsModel.getEvents().slice().sort(sortEventsByPrice);
        break;
    }

    return this._eventsModel.getEvents();
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListElement, this._handleEventChange, this._handleEventStatusChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderDay(events) {
    events.forEach((event) => {
      this._renderEvent(event);
    });

    renderElement(this._tripFragment, this._dayView, RenderPosition.BEFOREEND);
  }

  _renderDays() {
    splitEventsByDays(this._getEvents()).forEach((eventsByDay, index) => {
      this._dayDate = eventsByDay[0];
      this._dayEvents = eventsByDay[1];
      this._dayView = new DayView(this._dayDate, index + 1);
      this._eventListElement = this._dayView.getElement().querySelector(`#trip-events__list-${index + 1}`);

      this._renderDay(this._dayEvents);
    });
  }

  _renderEvents() {
    this._dayView = new DayView();
    this._eventListElement = this._dayView.getElement().querySelector(`#trip-events__list-1`);

    this._renderDay(this._getEvents());
  }

  _renderEventList() {
    this._tripFragment = document.createDocumentFragment();

    renderElement(this._eventsContainer, this._daysView, RenderPosition.BEFOREEND);

    if (this._currentSortType === SortType.EVENT) {
      this._renderDays();
    } else {
      this._renderEvents();
    }

    renderElement(this._daysView, this._tripFragment, RenderPosition.BEFOREEND);
  }

  _clearEventList() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    removeElement(this._daysView);
    this._eventPresenter = {};
  }

  _handleEventStatusChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
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

  _renderTrip() {
    if (this._getEvents().length === 0) {
      this._renderNoEdit();
      return;
    }

    this._renderSorting();
    this._renderEventList();
  }
}
