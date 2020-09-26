import {UpdateType} from "./const";
import {EventsModel, FilterModel, NavigationModel} from "./model/index";
import {TripPresenter, FilterPresenter, StatisticsPresenter, TripInfoPresenter, NavigationPresenter} from "./presenter/index";
import {Api, Store, ApiProxyCache} from "./api/index";

const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic k3jsk3sdfjk4ns1d45k1b2`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const headerElement = document.querySelector(`.trip-main`);
const bodyElement = document.querySelector(`.page-main__container`);
const mainElement = bodyElement.querySelector(`.trip-events`);
const tabsElement = headerElement.querySelector(`.trip-main__tabs`);
const filtersElement = headerElement.querySelector(`.trip-main__filters`);
const newEventButtonElement = headerElement.querySelector(`.trip-main__event-add-btn`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiProxyCache = new ApiProxyCache(api, store);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const navigationModel = new NavigationModel();

const tripPresenter = new TripPresenter(mainElement, eventsModel, filterModel, apiProxyCache);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, eventsModel);
const statisticsPresenter = new StatisticsPresenter(bodyElement, eventsModel);
const tripInfoPresenter = new TripInfoPresenter(headerElement, eventsModel, filterModel);
const navigationPresenter = new NavigationPresenter(tabsElement, newEventButtonElement, tripPresenter, statisticsPresenter, navigationModel, filterModel);

tripInfoPresenter.init();
navigationPresenter.init();
filterPresenter.init();
tripPresenter.init();

Promise
  .all([
    apiProxyCache.getOffers(),
    apiProxyCache.getDestinations(),
    apiProxyCache.getEvents(),
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
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiProxyCache.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
