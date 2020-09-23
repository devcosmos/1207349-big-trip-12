export const SHAKE_ANIMATION_TIMEOUT = 600;
export const MAX_DISPLAY_OFFERS = 3;

export const EVENT_TYPE_TRANSFER = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`
];

export const EVENT_TYPE_ACTIVITY = [
  `Check-in`,
  `Sightseeing`,
  `Restaurant`
];

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
};

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const EventStatus = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

export const UpdateType = {
  EVENT: `EVENT`,
  TRIP: `TRIP`,
  TRIP_WITH_RESET_SORT: `TRIP_WITH_RESET_SORT`,
  INIT: `INIT`
};

export const TripControlsItem = {
  NEW_EVENT: `New event`,
  TABLE: `Table`,
  STATS: `Stats`
};

export const ChartType = {
  MONEY: `MONEY`,
  TRANSPORT: `TRANSPORT`,
  TIME_SPENT: `TIME SPENT`
};

export const ActionIcon = {
  'Taxi': `🚕`,
  'Bus': `🚌`,
  'Train': `🚂`,
  'Ship': `🚢`,
  'Transport': `🚙`,
  'Drive': `🚗`,
  'Flight': `✈️`,
  'Check-in': `🏨`,
  'Sightseeing': `🏛`,
  'Restaurant': `🍴`
};

