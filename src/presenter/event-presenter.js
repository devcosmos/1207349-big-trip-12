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
    this._eventEditorView = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventView = this._eventView;
    const prevEventEditorView = this._eventEditorView;

    this._eventView = new EventView(event);
    this._eventEditorView = new EventEditorView(event, DESTINATIONS);

    this._eventView.setEditClickHandler(this._handleEditClick);
    this._eventEditorView.setFormSubmitHandler(this._handleFormSubmit);

    if (prevEventView === null || prevEventEditorView === null) {
      renderElement(this._eventListContainer, this._eventView, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replaceElement(this._eventView, prevEventView);
    }

    if (this._mode === Mode.EDITING) {
      replaceElement(this._eventEditorView, prevEventEditorView);
    }

    removeElement(prevEventView);
    removeElement(prevEventEditorView);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._eventEditorView.reset(this._event);
      this._replaceFormEditorToEvent();
    }
  }

  destroy() {
    removeElement(this._eventView);
    removeElement(this._eventEditorView);
  }

  _replaceEventToFormEditor() {
    replaceElement(this._eventEditorView, this._eventView);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormEditorToEvent() {
    replaceElement(this._eventView, this._eventEditorView);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape`) {
      this._eventEditorView.reset(this._event);
      this._replaceFormEditorToEvent();
    }
  }

  _handleEditClick() {
    this._replaceEventToFormEditor();
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormEditorToEvent();
  }
}
