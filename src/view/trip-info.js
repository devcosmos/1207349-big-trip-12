const createDestinationsTitleTemplate = (cities) => {
  let destinationsTitle = ``;

  if (cities.length > 3) {
    destinationsTitle = cities[0] + `&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;` + cities[cities.length - 1];
  } else {
    for (let i = 0; i <= cities.length - 1; i++) {
      if (i === 0) {
        destinationsTitle = cities[i];
      } else {
        destinationsTitle = destinationsTitle + `&nbsp;&mdash;&nbsp;` + cities[i];
      }
    }
  }

  return destinationsTitle;
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
