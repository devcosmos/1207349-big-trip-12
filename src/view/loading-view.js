import AbstractView from "./abstract-view.js";

const createNoEventTemplate = () => {
  return `<p class="trip-events__msg">Loading...</p>`;
};

export default class LoadingView extends AbstractView {
  getTemplate() {
    return createNoEventTemplate();
  }
}
