import {EventEditorView, EventView} from "../view/index";
import {renderElement, replaceElement, removeElement} from "../utils/render";
import {RenderPosition, Mode} from "../const";
import {DESTINATIONS} from "../mock/event";

export default class EventPresenter {
  constructor(eventListContainer, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventView = null;
    this._eventEditView = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventView = this._eventView;
    const prevEventEditView = this._eventEditView;

    this._eventView = new EventView(event);
    this._eventEditView = new EventEditorView(event, DESTINATIONS);

    this._eventView.setEditClickHandler(this._handleEditClick);
    this._eventEditView.setFormSubmitHandler(this._handleFormSubmit);

    if (prevEventView === null || prevEventEditView === null) {
      renderElement(this._eventListContainer, this._eventView, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replaceElement(this._eventView, prevEventView);
    }

    if (this._mode === Mode.EDITING) {
      replaceElement(this._eventEditView, prevEventEditView);
    }

    removeElement(prevEventView);
    removeElement(prevEventEditView);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._eventEditView.reset(this._event);
      this._replaceFormToPoint();
    }
  }

  destroy() {
    removeElement(this._eventView);
    removeElement(this._eventEditView);
  }

  _replacePointToForm() {
    replaceElement(this._eventEditView, this._eventView);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replaceElement(this._eventView, this._eventEditView);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape`) {
      this._eventEditView.reset(this._event);
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToPoint();
  }
}
