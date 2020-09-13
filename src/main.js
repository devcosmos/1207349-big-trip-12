import {EVENT_COUNT, RenderPosition} from "./const";
import {renderElement} from "./utils/index";
import {EventsModel, FilterModel} from "./model/index";
import {NavigationControllerView} from "./view/index";
import {TripPresenter, FilterPresenter} from "./presenter/index";
import {generateEvent} from "./mock/event";

const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

renderElement(tripControlsFirstElement, new NavigationControllerView(), RenderPosition.AFTEREND);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(eventsElement, tripElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsSecondElement, filterModel);

filterPresenter.init();
tripPresenter.init();
