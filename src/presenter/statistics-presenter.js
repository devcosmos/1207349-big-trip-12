import {RenderPosition} from "../const";
import {renderElement, removeElement} from "../utils/index";
import {StatisticsView} from "../view/index";

export default class StatisticsPresenter {
  constructor(bodyElement, eventsModel) {
    this._bodyElement = bodyElement;
    this._eventsModel = eventsModel;

    this._statisticsView = null;
  }

  init() {
    this._statisticsView = new StatisticsView(this._eventsModel.getEvents());
    renderElement(this._bodyElement, this._statisticsView, RenderPosition.BEFOREEND);
  }

  destroy() {
    removeElement(this._statisticsView);
    this._statisticsView = null;
  }
}
