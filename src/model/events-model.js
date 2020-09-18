import {Observer} from "../utils/index";

export default class EventsModel extends Observer {
  constructor() {
    super();
    this._events = [];
    this._offers = [];
    this._destinations = [];
  }

  setEvents(updateType, events) {
    this._events = events.slice();

    this._notify(updateType);
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getEvents() {
    return this._events;
  }

  getOffers() {
    return this._offers;
  }

  getDestinations() {
    return this._destinations;
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          eventType: event.type[0].toUpperCase() + event.type.slice(1),
          currentDestination: event.destination.name,
          description: {
            text: event.destination.description,
            images: event.destination.pictures
          },
          dateEnd: event.date_to !== null ? new Date(event.date_to) : event.date_to,
          dateStart: event.date_from !== null ? new Date(event.date_from) : event.date_from,
          cost: event.base_price,
          acceptedOffers: event.offers,
          isFavorite: event.is_favorite
        }
    );

    delete adaptedEvent.type;
    delete adaptedEvent.destination;
    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.base_price;
    delete adaptedEvent.offers;
    delete adaptedEvent.is_favorite;

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const adaptedEvent = Object.assign(
        {},
        event,
        {
          "type": event.eventType.toLowerCase(),
          "destination": {
            "name": event.currentDestination,
            "description": event.description.text,
            "pictures": event.description.images
          },
          "date_from": event.dateStart !== null ? new Date(event.dateStart) : event.dateStart,
          "date_to": event.dateEnd !== null ? new Date(event.dateEnd) : event.dateEnd,
          "base_price": event.cost,
          "offers": event.acceptedOffers,
          "is_favorite": event.isFavorite
        }
    );

    delete adaptedEvent.eventType;
    delete adaptedEvent.currentDestination;
    delete adaptedEvent.description;
    delete adaptedEvent.dateStart;
    delete adaptedEvent.dateEnd;
    delete adaptedEvent.cost;
    delete adaptedEvent.acceptedOffers;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  }
}
