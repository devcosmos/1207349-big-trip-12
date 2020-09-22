import {RenderPosition, TripControlsItem, UpdateType, FilterType} from "./const";
import {renderElement} from "./utils/index";
import {EventsModel, FilterModel} from "./model/index";
import {NavigationControllerView} from "./view/index";
import {TripPresenter, FilterPresenter, StatisticsPresenter, TripInfoPresenter} from "./presenter/index";
import {Api, Store, Provider} from "./api/index";

const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic k3jsk3sdfjk4ns1d45k1b2`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);
const newEventButton = tripElement.querySelector(`.trip-main__event-add-btn`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const navControllerView = new NavigationControllerView();

const tripPresenter = new TripPresenter(eventsElement, eventsModel, filterModel, apiWithProvider);
const filterPresenter = new FilterPresenter(tripControlsSecondElement, filterModel, eventsModel);
const statisticsPresenter = new StatisticsPresenter(eventsElement, eventsModel);
const tripInfoPresenter = new TripInfoPresenter(tripElement, eventsModel, filterModel);

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
      statisticsPresenter.destroy();
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.TRIP_WITH_RESET_SORT, FilterType.EVERYTHING);
      tripPresenter.init();
      tripPresenter.createEvent(newEventFormCloseHandler);
      newEventButton.disabled = true;
      break;
    case TripControlsItem.TABLE:
      statisticsPresenter.destroy();
      filterModel.setFilter(UpdateType.TRIP_WITH_RESET_SORT, FilterType.EVERYTHING);
      tripPresenter.init();
      break;
    case TripControlsItem.STATS:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.TRIP_WITH_RESET_SORT, FilterType.EVERYTHING);
      statisticsPresenter.init();
      break;
  }
};

newEventButton.addEventListener(`click`, newEventButtonClickHandler);

filterPresenter.init();
tripPresenter.init();
tripInfoPresenter.init();

Promise
  .all([
    apiWithProvider.getOffers(),
    apiWithProvider.getDestinations(),
    apiWithProvider.getEvents(),
  ])
  .then(([offers, destinations, events]) => {
    eventsModel.setOffers(offers);
    eventsModel.setDestinations(destinations);
    eventsModel.setEvents(UpdateType.INIT, events);
    renderElement(tripControlsFirstElement, navControllerView, RenderPosition.AFTEREND);
    navControllerView.setNavControllerClickHandler(navControllerClickHandler);
  })
  .catch(() => {
    eventsModel.setOffers([]);
    eventsModel.setDestinations([]);
    eventsModel.setEvents(UpdateType.INIT, []);
    renderElement(tripControlsFirstElement, navControllerView, RenderPosition.AFTEREND);
    navControllerView.setNavControllerClickHandler(navControllerClickHandler);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .catch(() => {
      throw new Error(`ServiceWorker isn't available`);
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
