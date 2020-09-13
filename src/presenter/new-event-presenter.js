import {RenderPosition, UserAction, UpdateType} from "../const";
import {renderElement, removeElement} from "../utils/index";
import {EventEditorView} from "../view/index";
import {DESTINATIONS, generateId} from "../mock/event";

const BLANK_EVENT = {
  isFavorite: false,
  eventType: `Taxi`,
  currentDestination: DESTINATIONS[0],
  acceptedOffers: [],
  description: {
    text: ``,
    images: [],
  },
  dateStart: new Date(),
  dateEnd: new Date(),
  cost: 0,
};

export default class NewEventPresenter {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;

    this._eventEditorView = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._eventEditorView !== null) {
      return;
    }

    this._eventEditorView = new EventEditorView(BLANK_EVENT, DESTINATIONS);
    this._eventEditorView.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditorView.setDeleteClickHandler(this._handleDeleteClick);

    renderElement(this._eventListContainer, this._eventEditorView, RenderPosition.AFTEREND);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditorView === null) {
      return;
    }

    removeElement(this._eventEditorView);
    this._eventEditorView = null;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape`) {
      this.destroy();
    }
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.TRIP,
        Object.assign({id: generateId()}, event)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }
}
