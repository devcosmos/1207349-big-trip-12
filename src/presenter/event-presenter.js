import {EventEditorView, EventView} from "../view/index";
import {renderElement, replaceElement} from "../utils/render";
import {RenderPosition} from "../const";
import {DESTINATIONS} from "../mock/event";

export default class EventPresenter {
  constructor(eventListContainer) {
    this._eventListContainer = eventListContainer;

    this._eventView = null;
    this._eventEditView = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._eventView = new EventView(event);
    this._eventEditView = new EventEditorView(event, DESTINATIONS);

    this._eventView.setEditClickHandler(this._handleEditClick);
    this._eventEditView.setFormSubmitHandler(this._handleFormSubmit);

    renderElement(this._eventListContainer, this._eventView, RenderPosition.BEFOREEND);
  }

  _replacePointToForm() {
    replaceElement(this._eventEditView, this._eventView);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replaceElement(this._eventView, this._eventEditView);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape`) {
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }
}
