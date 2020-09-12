import Observer from "../utils/observer";

export default class EventsModel extends Observer {
  constructor() {
    super();
    this._events = [];
  }

  setevents(events) {
    this._events = events.slice();
  }

  getevents() {
    return this._events;
  }
}
