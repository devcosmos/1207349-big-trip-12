import {UpdateType} from "./const";
import {EventsModel, FilterModel, NavigationModel} from "./model/index";
import {TripPresenter, FilterPresenter, StatisticsPresenter, TripInfoPresenter, NavigationPresenter} from "./presenter/index";
import {Api, Store, ApiProxy} from "./api/index";

const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const AUTHORIZATION = `Basic k3jsk3sdfjk4ns1d45k1b2`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const headerElement = document.querySelector(`.trip-main`);
const mainElement = document.querySelector(`.trip-events`); //создать ещё 1 селектор для статистики 
const tabsElement = headerElement.querySelector(`.trip-main__tabs`);
const filtersElement = headerElement.querySelector(`.trip-main__filters`);
const newEventButtonElement = headerElement.querySelector(`.trip-main__event-add-btn`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiProxy = new ApiProxy(api, store); // apiProxy -> apiProxyCashe

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const navigationModel = new NavigationModel();

const tripPresenter = new TripPresenter(mainElement, eventsModel, filterModel, apiProxy);
const filterPresenter = new FilterPresenter(filtersElement, filterModel, eventsModel);
const statisticsPresenter = new StatisticsPresenter(mainElement, eventsModel); // передавать не main а статистику 
const tripInfoPresenter = new TripInfoPresenter(headerElement, eventsModel, filterModel);
const navigationPresenter = new NavigationPresenter(tabsElement, newEventButtonElement, tripPresenter, statisticsPresenter, navigationModel, filterModel);

tripInfoPresenter.init();
navigationPresenter.init();
filterPresenter.init();
tripPresenter.init();

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
