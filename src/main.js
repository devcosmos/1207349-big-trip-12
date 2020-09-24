import {RenderPosition, NavigationTab, UpdateType, FilterType} from "./const";
import {renderElement} from "./utils/index";
import {EventsModel, FilterModel} from "./model/index";
import {NavigationView} from "./view/index";
import {TripPresenter, FilterPresenter, StatisticsPresenter, TripInfoPresenter} from "./presenter/index";
import {Api, Store, ApiProxy} from "./api/index";

const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic k3jsk3sdfjk4ns1d45k1b2`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const headerElement = document.querySelector(`.trip-main`);
const mainElement = document.querySelector(`.trip-events`);
const tabsElement = headerElement.querySelector(`.trip-main__tabs`);
const filtersElement = headerElement.querySelector(`.trip-main__filters`);
const newEventButton = headerElement.querySelector(`.trip-main__event-add-btn`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiProxy = new ApiProxy(api, store);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const navigationView = new NavigationView();

const tripPresenter = new TripPresenter(mainElement, eventsModel, filterModel, apiProxy);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, eventsModel);
const statisticsPresenter = new StatisticsPresenter(mainElement, eventsModel);
const tripInfoPresenter = new TripInfoPresenter(headerElement, eventsModel, filterModel);

const newEventButtonClickHandler = () => {
  if (navigationView.isActiveTab(NavigationTab.TABLE)) {
    filterModel.setFilter(UpdateType.TRIP_WITH_RESET_SORT, FilterType.EVERYTHING);
  } else {
    navigationClickHandler(NavigationTab.TABLE);
  }

  navigationView.setActiveTab(NavigationTab.TABLE);
  tripPresenter.createEvent(newEventFormCloseHandler);
  newEventButton.disabled = true;
};

const newEventFormCloseHandler = () => {
  newEventButton.disabled = false;
};

const navigationClickHandler = (navigationTab) => {
  switch (navigationTab) {
    case NavigationTab.TABLE:
      statisticsPresenter.destroy();
      filterModel.setFilter(UpdateType.TRIP_WITH_RESET_SORT, FilterType.EVERYTHING);
      tripPresenter.init();
      break;
    case NavigationTab.STATS:
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
    apiProxy.getOffers(),
    apiProxy.getDestinations(),
    apiProxy.getEvents(),
  ])
  .then(([offers, destinations, events]) => {
    eventsModel.setOffers(offers);
    eventsModel.setDestinations(destinations);
    eventsModel.setEvents(UpdateType.INIT, events);
  })
  .catch(() => {
    eventsModel.setOffers([]);
    eventsModel.setDestinations([]);
    eventsModel.setEvents(UpdateType.INIT, []);
  })
  .finally(() => {
    renderElement(tabsElement, navigationView, RenderPosition.AFTEREND);
    navigationView.setNavigationClickHandler(navigationClickHandler);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiProxy.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
