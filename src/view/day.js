import {getDateAtShortFormat} from "../utils";

const getDaysDateBackend = (timestemp) => {
  const date = new Date();
  date.setTime(timestemp);

  return date.getFullYear() + `-` + (`0` + (date.getMonth() + 1)).slice(-2) + `-` + (`0` + (date.getDate() + 1)).slice(-2);
};

export const createDayTemplate = (date, index) => {
  const daysDateFrontend = getDateAtShortFormat(new Date(date));
  const daysDateBackend = getDaysDateBackend(date);

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${daysDateBackend}">${daysDateFrontend}</time>
      </div>

      <ul class="trip-events__list" id="trip-events__list-${index}"></ul>
    </li>`
  );
};
