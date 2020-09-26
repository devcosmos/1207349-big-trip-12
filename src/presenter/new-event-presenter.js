import {RenderPosition, UserAction, UpdateType} from "../const";
import {renderElement, removeElement} from "../utils/index";
import {EventEditorView} from "../view/index";

export default class NewEventPresenter {
  constructor(viewAction) {
    this._viewAction = viewAction;

    this._eventEditorView = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(eventListElement, destroyCallback, destinations, offers) {
    if (this._eventEditorView) {
      return;
    }

    this._eventListElement = eventListElement;
    this._destroyCallback = destroyCallback;

    this._eventEditorView = new EventEditorView(destinations, offers);
    this._eventEditorView.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditorView.setDeleteClickHandler(this._handleDeleteClick);

    renderElement(this._eventListElement, this._eventEditorView, RenderPosition.AFTEREND);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._eventEditorView.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._eventEditorView.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._eventEditorView.shake(resetFormState);
  }

  destroy() {
    if (!this._eventEditorView) {
      return;
    }

    if (this._destroyCallback) {
      this._destroyCallback();
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
    this._viewAction(UserAction.ADD_EVENT, UpdateType.TRIP, event);
  }

  _handleDeleteClick() {
    this.destroy();
  }
}
