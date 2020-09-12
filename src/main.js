import {EVENT_COUNT, RenderPosition} from "./const";
import {renderElement} from "./utils/index";
import {EventsModel} from "./model/index";
import {NavigationControllerView, EventFiltrationView} from "./view/index";
import {TripPresenter} from "./presenter/index";
import {generateEvent} from "./mock/event";

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) => a.dateStart - b.dateStart);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const tripPresenter = new TripPresenter(eventsElement, tripElement, eventsModel);

renderElement(tripControlsFirstElement, new NavigationControllerView(), RenderPosition.AFTEREND);
renderElement(tripControlsSecondElement, new EventFiltrationView(), RenderPosition.AFTEREND);

tripPresenter.init();
