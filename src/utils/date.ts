import { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { DATE_FORMAT } from 'src/constants/common/common';

const customWeekStartEndFormat: DatePickerProps['format'] = value =>
  `${dayjs(value).startOf('week').format(DATE_FORMAT.DATE)} ~ ${dayjs(value)
    .endOf('week')
    .format(DATE_FORMAT.DATE)}`;

const renderDate = (value: Date) => dayjs(value).format(DATE_FORMAT.DATE);
const renderFullDate = (value: Date) =>
  dayjs(value).format(DATE_FORMAT.DATE_TIME);

const disabledStartDate = (current: any, endDate: string) => {
  const startDateCompare = new Date(endDate);
  return current && current > startDateCompare;
};
const disabledEndDate = (current: any, startDate: string) => {
  const startDateCompare = new Date(startDate);
  return current && current < startDateCompare;
};
const getDateFormat = (value: string | null): string => {
  const defaultDate = DATE_FORMAT.TIMESTAMP;
  if (!value) return defaultDate;

  if (dayjs(value, 'DD/MM/YYYY', true).isValid()) {
    return 'DD/MM/YYYY';
  }
  if (dayjs(value, 'YYYY-MM-DD', true).isValid()) {
    return 'YYYY-MM-DD';
  }
  if (dayjs(value, DATE_FORMAT.DATE, true).isValid()) {
    return DATE_FORMAT.DATE;
  }
  if (dayjs(value, DATE_FORMAT.DATE_TIME, true).isValid()) {
    return DATE_FORMAT.DATE_TIME;
  }
  if (dayjs(value, DATE_FORMAT.TIMESTAMP, true).isValid()) {
    return DATE_FORMAT.TIMESTAMP;
  }
  return defaultDate;
};
export {
  customWeekStartEndFormat,
  disabledEndDate,
  disabledStartDate,
  getDateFormat,
  renderDate,
  renderFullDate,
};
