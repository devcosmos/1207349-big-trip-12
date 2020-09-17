import {EVENT_COUNT, RenderPosition, TripControlsItem, UpdateType, FilterType} from "./const";
import {renderElement} from "./utils/index";
import {EventsModel, FilterModel} from "./model/index";
import {NavigationControllerView} from "./view/index";
import {TripPresenter, FilterPresenter} from "./presenter/index";
import {generateEvent} from "./mock/event";
import Api from "./api";

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic k3jsk3sdfjk4ns1d45kbj`;

const api = new Api(END_POINT, AUTHORIZATION);

api.getEvents().then((events) => {
  console.log(events);
});

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);
const newEventButton = tripElement.querySelector(`.trip-main__event-add-btn`);

const newEventButtonClickHandler = (evt) => {
  evt.preventDefault();
  navControllerClickHandler(TripControlsItem.NEW_EVENT);
  navControllerView.setNavControllerItem(TripControlsItem.TABLE);
};

const newEventFormCloseHandler = () => {
  newEventButton.disabled = false;
};

const navControllerClickHandler = (tripControlsItem) => {
  switch (tripControlsItem) {
    case TripControlsItem.NEW_EVENT:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.TRIP, FilterType.EVERYTHING);
      tripPresenter.init();
      tripPresenter.createEvent(newEventFormCloseHandler);
      newEventButton.disabled = true;
      break;
    case TripControlsItem.TABLE:
      tripPresenter.removeStats();
      filterModel.setFilter(UpdateType.TRIP, FilterType.EVERYTHING);
      tripPresenter.init();
      break;
    case TripControlsItem.STATS:
      tripPresenter.destroy({removeHeader: false});
      filterModel.setFilter(UpdateType.TRIP, FilterType.EVERYTHING);
      tripPresenter.createStats();
      break;
  }
};

const navControllerView = new NavigationControllerView();

renderElement(tripControlsFirstElement, navControllerView, RenderPosition.AFTEREND);

newEventButton.addEventListener(`click`, newEventButtonClickHandler);
navControllerView.setNavControllerClickHandler(navControllerClickHandler);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(eventsElement, tripElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsSecondElement, filterModel);

filterPresenter.init();
tripPresenter.init();
