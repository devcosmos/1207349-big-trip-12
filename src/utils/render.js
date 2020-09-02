import {RenderPosition} from "../const";
import Abstract from "../view/abstract.js";

export const renderElement = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
    case RenderPosition.AFTEREND:
      container.insertAdjacentElement(place, child);
      break;
  }
};

export const replaceElement = (newChild, oldChild) => {

  if (!(oldChild instanceof Abstract) || !(newChild instanceof Abstract)) {
    throw new Error(`Can't replace unexisting elements`);
  }

  oldChild = oldChild.getElement();
  newChild = newChild.getElement();

  const parent = oldChild.parentElement;

  parent.replaceChild(newChild, oldChild);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
