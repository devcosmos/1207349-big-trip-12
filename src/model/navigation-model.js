import {Observer} from "../utils/index";
import {NavigationTab} from "../const";

export default class NavigationModel extends Observer {
  constructor() {
    super();
    this._activeTab = NavigationTab.TABLE;
  }

  setActiveTab(updateType, tab) {
    this._activeTab = tab;
    this._notify(updateType, tab);
  }

  getActiveTab() {
    return this._activeTab;
  }
}
