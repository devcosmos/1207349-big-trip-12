import {FilterType} from "../const";
import moment from "moment";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => moment(event.startDate).isAfter(new Date())),
  [FilterType.PAST]: (events) => events.filter((event) => moment(event.startDate).isBefore(new Date()))
};
