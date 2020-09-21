import {RenderPosition} from "../const";
import {renderElement, removeElement} from "../utils/index";
import {StatisticsView} from "../view/index";

export default class StatisticsPresenter {
  constructor(eventsContainer, eventsModel) {
    this._eventsContainer = eventsContainer;
    this._eventsModel = eventsModel;

    this._statisticsView = null;
  }

  init() {
    if (this._statisticsView !== null) {
      this.destroy();
    }

    this._statisticsView = new StatisticsView(this._eventsModel.getEvents());
    renderElement(this._eventsContainer, this._statisticsView, RenderPosition.AFTEREND);
  }

  destroy() {
    if (this._statisticsView === null) {
      return;
    }

    removeElement(this._statisticsView);
    this._statisticsView = null;
  }
}
