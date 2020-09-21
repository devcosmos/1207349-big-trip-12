import {RenderPosition} from "../const";
import {removeElement, renderElement, replaceElement} from "../utils/index";
import {TripInfoView, TotalPriceView} from "../view/index";

export default class TripInfoPresenter {
  constructor(tripContainer, eventsModel, filterModel) {
    this._tripContainer = tripContainer;
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;

    this._updateViews = this._updateViews.bind(this);

    this._eventsModel.addObserver(this._updateViews);
    this._filterModel.addObserver(this._updateViews);
  }

  init() {
    this._tripInfoView = new TripInfoView(this._eventsModel.getEvents());
    this._totalPriceView = new TotalPriceView();

    renderElement(this._tripContainer, this._tripInfoView, RenderPosition.AFTERBEGIN);
    renderElement(this._tripInfoView, this._totalPriceView, RenderPosition.BEFOREEND);
  }

  _updateViews() {
    const prevTripInfoView = this._tripInfoView;

    this._tripInfoView = new TripInfoView(this._eventsModel.getEvents());
    this._totalPriceView = new TotalPriceView();

    renderElement(this._tripInfoView, this._totalPriceView, RenderPosition.BEFOREEND);
    replaceElement(this._tripInfoView, prevTripInfoView);
    removeElement(prevTripInfoView);
  }
}
