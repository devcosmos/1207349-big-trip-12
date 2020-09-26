import {RenderPosition, SortType, UserAction, UpdateType, EventStatus} from "../const";
import {splitEventsByDays, sortEventsByDuration, sortEventsByPrice, sortEventsByDate, renderElement, removeElement, filter} from "../utils/index";
import {SortingView, DaysView, DayView, NoEventView, LoadingView} from "../view/index";
import {EventPresenter, NewEventPresenter} from "../presenter/index";

export default class TripPresenter {
  constructor(eventsElement, eventsModel, filterModel, api) {
    this._eventsElement = eventsElement;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._api = api;

    this._currentSortType = SortType.EVENT;
    this._eventPresenters = {};
    this._isLoading = true;

    this._sortingView = null;

    this._daysView = new DaysView();
    this._noEventView = new NoEventView();
    this._loadingView = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelChange = this._handleModelChange.bind(this);
    this._handleEventStatusChange = this._handleEventStatusChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._newEventPresenter = new NewEventPresenter(this._handleViewAction);
  }

  init() {
    this._eventsModel.addObserver(this._handleModelChange);
    this._filterModel.addObserver(this._handleModelChange);

    this._renderTrip();
  }

  createEvent(callback) {
    const element = this._getEvents().length ? this._sortingView : this._eventsElement.querySelector(`h2`);
    this._newEventPresenter.init(element, callback, this._eventsModel.getDestinations(), this._eventsModel.getOffers());
  }

  destroy() {
    this._clearTrip(true);

    this._eventsModel.removeObserver(this._handleModelChange);
    this._filterModel.removeObserver(this._handleModelChange);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filtredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME:
        filtredEvents.sort(sortEventsByDuration);
        break;
      case SortType.PRICE:
        filtredEvents.sort(sortEventsByPrice);
        break;
      default:
        filtredEvents.sort(sortEventsByDate);
        break;
    }

    return filtredEvents;
  }

  _handleViewAction(actionType, updateType, event) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventPresenters[event.id].setViewState(EventStatus.SAVING);
        this._api.updateEvent(event)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          })
          .catch(() => {
            this._eventPresenters[event.id].setViewState(EventStatus.ABORTING);
          });
        break;
      case UserAction.ADD_EVENT:
        this._newEventPresenter.setSaving();
        this._api.addEvent(event)
          .then((response) => {
            this._eventsModel.addEvent(updateType, response);
          })
          .catch(() => {
            this._newEventPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenters[event.id].setViewState(EventStatus.DELETING);
        this._api.deleteEvent(event)
          .then(() => {
            this._eventsModel.deleteEvent(updateType, event);
          })
          .catch(() => {
            this._eventPresenters[event.id].setViewState(EventStatus.ABORTING);
          });
        break;
    }
  }

  _handleModelChange(updateType, event) {
    switch (updateType) {
      case UpdateType.EVENT:
        this._eventPresenters[event.id].init(this._eventsModel.getDestinations(), this._eventsModel.getOffers(), event);
        break;
      case UpdateType.TRIP:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.TRIP_WITH_RESET_SORT:
        this._clearTrip(true);
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        removeElement(this._loadingView);
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _handleEventStatusChange() {
    this._newEventPresenter.destroy();
    Object
      .values(this._eventPresenters)
      .forEach((presenter) => presenter.resetView());
  }

  _renderEvent(event, eventListElement) {
    const eventPresenter = new EventPresenter(eventListElement, this._handleViewAction, this._handleEventStatusChange, this._currentSortType);
    eventPresenter.init(this._eventsModel.getDestinations(), this._eventsModel.getOffers(), event);
    this._eventPresenters[event.id] = eventPresenter;
  }

  _renderDay(events, dayView, eventListElement) {
    events.forEach((event) => {
      this._renderEvent(event, eventListElement);
    });

    renderElement(this._daysView, dayView, RenderPosition.BEFOREEND);
  }

  _renderDays() {
    splitEventsByDays(this._getEvents()).forEach((eventsByDay, index) => {
      const dayDate = eventsByDay[0];
      const dayEvents = eventsByDay[1];
      const dayView = new DayView(dayDate, index + 1);
      const eventListElement = dayView.getElement().querySelector(`#trip-events__list-${index + 1}`);

      this._renderDay(dayEvents, dayView, eventListElement);
    });
  }

  _renderEvents() {
    const dayView = new DayView();
    const eventListElement = dayView.getElement().querySelector(`#trip-events__list-1`);

    this._renderDay(this._getEvents(), dayView, eventListElement);
  }

  _renderEventList() {
    this._tripFragment = document.createDocumentFragment();

    if (this._currentSortType === SortType.EVENT) {
      this._renderDays();
    } else {
      this._renderEvents();
    }

    renderElement(this._tripFragment, this._daysView, RenderPosition.BEFOREEND);
    renderElement(this._eventsElement, this._tripFragment, RenderPosition.BEFOREEND);
  }

  _renderSorting() {
    this._sortingView = new SortingView(Object.values(SortType), this._currentSortType);
    this._sortingView.setSortTypeChangeHandler(this._handleSortTypeChange);

    renderElement(this._eventsElement, this._sortingView, RenderPosition.BEFOREEND);
  }

  _renderNoEvent() {
    renderElement(this._eventsElement, this._noEventView, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    renderElement(this._eventsElement, this._loadingView, RenderPosition.BEFOREEND);
  }

  _clearTrip(resetSortType = false) {
    this._newEventPresenter.destroy();
    Object.values(this._eventPresenters)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenters = {};

    if (resetSortType) {
      this._currentSortType = SortType.EVENT;
    }

    if (this._sortingView) {
      removeElement(this._sortingView);
    }

    removeElement(this._daysView);
    removeElement(this._noEventView);
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (!this._getEvents().length) {
      this._renderNoEvent();
      return;
    }

    this._renderSorting();
    this._renderEventList();
  }
}
