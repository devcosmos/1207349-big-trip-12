import {getDateAtShortFormat, getDateAtSystemFormat} from "../date-formatters";

export const createDayTemplate = (date, index) => {
  const dateAtShortFormat = getDateAtShortFormat(new Date(date));
  const dateAtSystemFormat = getDateAtSystemFormat(new Date(date));

  return (
    `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${index}</span>
        <time class="day__date" datetime="${dateAtSystemFormat}">${dateAtShortFormat}</time>
      </div>

      <ul class="trip-events__list" id="trip-events__list-${index}"></ul>
    </li>`
  );
};
