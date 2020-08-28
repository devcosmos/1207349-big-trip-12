import {EVENT_COUNT, RENDER_POSITION} from "./const";
import {NavigationControllerView, EventFiltrationView} from "./view/index";
import {generateEvent} from "./mock/event";
import {renderElement} from "./utils/render";
import TripPresenter from "./presenter/trip.js";

const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) => a.dateStart - b.dateStart);

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const tripElement = siteHeaderElement.querySelector(`.trip-main`);
const eventsElement = siteMainElement.querySelector(`.trip-events`);
const tripControlsFirstElement = tripElement.querySelector(`.trip-controls > h2:first-child`);
const tripControlsSecondElement = tripElement.querySelector(`.trip-controls > h2:last-child`);

const tripPresenter = new TripPresenter(eventsElement, tripElement);

renderElement(tripControlsFirstElement, new NavigationControllerView(), RENDER_POSITION.AFTEREND);
renderElement(tripControlsSecondElement, new EventFiltrationView(), RENDER_POSITION.AFTEREND);

tripPresenter.init(events);
