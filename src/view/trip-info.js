const createDestinationsTitleTemplate = (cities) => {
  let route;

  if (cities.length > 3) {
    route = cities[0] + `&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;` + cities[cities.length - 1];
  } else {
    route = [];
    for (let el of cities) {
      route.push(el);
    }
    route = route.join(` — `);
  }

  return route;
};

export const createTripInfoTemplate = (event) => {
  const {destinations} = event;

  const destinationsTitleTemplate = createDestinationsTitleTemplate(destinations);

  return (
    ` <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${destinationsTitleTemplate}</h1>
        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>
    </section>`
  );
};
