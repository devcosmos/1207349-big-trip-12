import {RENDER_POSITION} from "../const";
import Abstract from "../view/abstract.js";

export const renderElement = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RENDER_POSITION.AFTERBEGIN:
      container.prepend(child);
      break;
    case RENDER_POSITION.BEFOREEND:
      container.append(child);
      break;
    case RENDER_POSITION.AFTEREND:
      container.insertAdjacentElement(place, child);
      break;
  }
};

export const replaceElement = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
