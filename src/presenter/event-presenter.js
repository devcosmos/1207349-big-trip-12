import {RenderPosition, EventStatus, UserAction, UpdateType, SortType} from "../const";
import {renderElement, replaceElement, removeElement} from "../utils/index";
import {EventEditorView, EventView} from "../view/index";

export default class EventPresenter {
  constructor(eventListContainer, changeData, changeEventStatus, currentSortType) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._changeEventStatus = changeEventStatus;
    this._currentSortType = currentSortType;

    this._eventView = null;
    this._eventEditorView = null;
    this._eventStatus = EventStatus.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(destinations, offers, event) {
    this._event = event;

    const prevEventView = this._eventView;
    const prevEventEditorView = this._eventEditorView;

    this._eventView = new EventView(event);
    this._eventEditorView = new EventEditorView(destinations, offers, event);

    this._eventView.setEditClickHandler(this._handleEditClick);
    this._eventEditorView.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditorView.setDeleteClickHandler(this._handleDeleteClick);
    this._eventEditorView.setFormCloseClickHandler(this._handleCloseClick);

    if (prevEventView === null || prevEventEditorView === null) {
      renderElement(this._eventListContainer, this._eventView, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventStatus === EventStatus.DEFAULT) {
      replaceElement(this._eventView, prevEventView);
    }

    if (this._eventStatus === EventStatus.EDITING) {
      replaceElement(this._eventView, prevEventEditorView);
      this._eventStatus = EventStatus.DEFAULT;
    }

    removeElement(prevEventView);
    removeElement(prevEventEditorView);
  }

  resetView() {
    if (this._eventStatus !== EventStatus.DEFAULT) {
      this._eventEditorView.reset(this._event);
      this._replaceFormEditorToEvent();
    }
  }

  setViewState(status) {
    const resetFormState = () => {
      this._eventEditorView.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (status) {
      case EventStatus.SAVING:
        this._eventEditorView.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case EventStatus.DELETING:
        this._eventEditorView.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case EventStatus.ABORTING:
        this._eventEditorView.shake(resetFormState);
        this._eventView.shake(resetFormState);
        break;
    }
  }

  destroy() {
    removeElement(this._eventView);
    removeElement(this._eventEditorView);
  }

  _replaceEventToFormEditor() {
    replaceElement(this._eventEditorView, this._eventView);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeEventStatus();
    this._eventStatus = EventStatus.EDITING;
  }

  _replaceFormEditorToEvent() {
    replaceElement(this._eventView, this._eventEditorView);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._eventStatus = EventStatus.DEFAULT;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape`) {
      this._eventEditorView.reset(this._event);
      this._replaceFormEditorToEvent();
    }
  }

  _handleCloseClick() {
    this._eventEditorView.reset(this._event);
    this._replaceFormEditorToEvent();
  }

  _handleEditClick() {
    this._replaceEventToFormEditor();
  }

  _handleFormSubmit(update) {
    const isOnlyEventUpdate =
      (this._currentSortType !== SortType.PRICE || this._event.price === update.price) &&
      (this._currentSortType === SortType.PRICE || this._event.dateStart === update.dateStart) &&
      (this._currentSortType !== SortType.TIME || this._event.dateEnd === update.dateEnd);

    this._changeData(
        UserAction.UPDATE_EVENT,
        isOnlyEventUpdate ? UpdateType.EVENT : UpdateType.TRIP,
        update
    );
  }

  _handleDeleteClick(event) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.TRIP,
        event
    );
  }
}
