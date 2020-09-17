import {RenderPosition, SortType, UserAction, UpdateType} from "../const";
import {splitEventsByDays, sortEventsByDuration, sortEventsByPrice, sortEventsByDate, renderElement, removeElement, filter} from "../utils/index";
import {TripInfoView, TotalPriceView, SortingView, DaysView, DayView, NoEventView, StatisticsView} from "../view/index";
import {EventPresenter, NewEventPresenter} from "../presenter/index";

export default class TripPresenter {
  constructor(eventsContainer, tripContainer, eventsModel, filterModel) {
    this._eventsContainer = eventsContainer;
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;

    this._currentSortType = SortType.EVENT;
    this._eventPresenter = {};

    this._tripInfoView = null;
    this._totalPriceView = null;
    this._statisticsView = null;

    this._daysView = new DaysView();
    this._noEventView = new NoEventView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelChange = this._handleModelChange.bind(this);
    this._handleEventStatusChange = this._handleEventStatusChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._newEventPresenter = new NewEventPresenter(this._handleViewAction);
  }

  init() {
    if (this._tripInfoView === null || this._totalPriceView === null) {
      this._tripInfoView = new TripInfoView(this._getEvents());
      this._totalPriceView = new TotalPriceView();

      renderElement(this._tripContainer, this._tripInfoView, RenderPosition.AFTERBEGIN);
      renderElement(this._tripInfoView, this._totalPriceView, RenderPosition.BEFOREEND);
    }

    this._eventsModel.addObserver(this._handleModelChange);
    this._filterModel.addObserver(this._handleModelChange);

    this._renderTrip();
  }

  createEvent(callback) {
    this._newEventPresenter.init(this._sortingView, callback);
  }

  removeStats() {
    removeElement(this._statisticsView);
  }

  createStats() {
    this._statisticsView = new StatisticsView(this._getEvents());
    renderElement(this._eventsContainer, this._statisticsView, RenderPosition.AFTEREND);
  }

  destroy({removeHeader = true} = {}) {
    this._clearTrip();

    if (removeHeader) {
      removeElement(this._tripInfoView);
      removeElement(this._totalPriceView);

      this._tripInfoView = null;
      this._totalPriceView = null;
    }

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

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelChange(updateType, data) {
    switch (updateType) {
      case UpdateType.EVENT:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.TRIP:
        this._clearTrip();
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
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._eventListElement, this._handleViewAction, this._handleEventStatusChange, this._currentSortType);
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

  _renderSorting() {
    this._sortingView = new SortingView(this._currentSortType);
    this._sortingView.setSortTypeChangeHandler(this._handleSortTypeChange);

    renderElement(this._eventsContainer, this._sortingView, RenderPosition.BEFOREEND);
  }

  _renderNoEdit() {
    renderElement(this._eventsContainer, this._noEventView, RenderPosition.BEFOREEND);
  }

  _clearTrip() {
    Object.values(this._eventPresenter).forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
    this._newEventPresenter.destroy();

    removeElement(this._sortingView);
    removeElement(this._daysView);
    removeElement(this._noEventView);
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
