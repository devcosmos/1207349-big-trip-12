import {ChartType} from "../const";
import {splitEventsByTypeAndPrice, splitEventsByTransportTypeAndRepeats, splitEventsByTypeAndTimeSpend} from "../utils/index";
import SmartView from "./smart-view";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const renderChart = (canvas, chartType, events) => {
  const labels = [];
  const data = [];
  let formatter;

  switch (chartType) {
    case ChartType.MONEY:
      formatter = (val) => `€ ${val}`;
      break;
    case ChartType.TRANSPORT:
      formatter = (val) => `${val}x`;
      break;
    case ChartType.TIME_SPENT:
      formatter = (val) => `${val}H`;
      break;
  }

  events
    .sort((a, b) => b[1] - a[1])
    .forEach((value) => {
      labels.push(value[0]);
      data.push(value[1]);
    });

  return new Chart(canvas, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#9f9f9f`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter,
        }
      },
      title: {
        display: true,
        text: chartType,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          // barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          // minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>
      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>
      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class StatisticsView extends SmartView {
  constructor(events) {
    super();

    this._data = events;

    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate(this._data);
  }

  _setCharts() {
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);

    const eventsByTypeAndPrice = splitEventsByTypeAndPrice(this._data);
    const eventsByTransportTypeAndRepeats = splitEventsByTransportTypeAndRepeats(this._data);
    const eventsByTypeAndTimeSpend = splitEventsByTypeAndTimeSpend(this._data);

    const BAR_HEIGHT = 55;

    moneyCtx.height = BAR_HEIGHT * eventsByTypeAndPrice.length;
    transportCtx.height = BAR_HEIGHT * eventsByTransportTypeAndRepeats.length;
    timeSpendCtx.height = BAR_HEIGHT * eventsByTypeAndTimeSpend.length;

    this._moneyCart = renderChart(moneyCtx, ChartType.MONEY, eventsByTypeAndPrice);
    this._transportCart = renderChart(transportCtx, ChartType.TRANSPORT, eventsByTransportTypeAndRepeats);
    this._spendCart = renderChart(timeSpendCtx, ChartType.TIME_SPENT, eventsByTypeAndTimeSpend);
  }
}
