import {TripInfoView, TotalPriceView, SortingView, DaysView, DayView, NoEventView} from "../view/index";
import {splitEventsByDays} from "../utils/event";
import {renderElement} from "../utils/render";
import {RENDER_POSITION} from "../const";

export default class Board {
  constructor(boardContainer, tripMainContainer) {
    this._boardContainer = boardContainer;
    this._tripMainContainer = tripMainContainer;

    this._totalPriceComponent = new TotalPriceView();
    this._sortingComponent = new SortingView();
    this._daysComponent = new DaysView();
    this._noEventComponent = new NoEventView();
  }

  init(boardEvent) {
    this._boardEvent = boardEvent.slice();
    this._tripInfoComponent = new TripInfoView(boardEvent);

    renderElement(this._tripMainContainer, this._tripInfoComponent, RENDER_POSITION.AFTERBEGIN);
    renderElement(this._tripInfoComponent, this._totalPriceComponent, RENDER_POSITION.BEFOREEND);

    this._renderBoard();
  }

  _renderSorting() {
    renderElement(this._boardContainer, this._sortingComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderDays() {
    renderElement(this._boardContainer, this._daysComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderDay() {
    renderElement(this._daysComponent, this._dayComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderEvent(event, eventsListElement) {
    renderElement(eventsListElement, renderEvent(event), RENDER_POSITION.BEFOREEND);
  }

  _renderNoEdit() {
    renderElement(this._boardContainer, this._noEventComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderBoard() {
    if (this._boardEvent.length === 0) {
      this._renderNoEdit();
      return;
    }
    
    const eventsByDays = splitEventsByDays(this._boardEvent);
    
    this._renderSorting();
    this._renderDays();
    
    eventsByDays.forEach((eventsByDay, index) => {
      const dayDate = eventsByDay[0];
      this._dayComponent = new DayView(dayDate, index + 1);
      const eventsListElement = this._dayComponent.getElement().querySelector(`#trip-events__list-${index + 1}`);
  
      eventsByDay.slice(1).forEach((event) => {
        this._renderEvent(event, eventsListElement);
      });
      
      this._renderDay()
    });
  }
}
