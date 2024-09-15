/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_FORMAT } from 'src/constants/common/common';
import { customWeekStartEndFormat, getDateFormat } from 'src/utils/date';

const { RangePicker } = DatePicker;
type NoUndefinedRangeValueType<DateType> = [
  start: DateType | null,
  end: DateType | null,
];

type DateProps = {
  value: any;
  onChange?: (date: Dayjs | null, dateString: string) => void;
  formatDatetime?: string;
  placeholder?: string;
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  showTime?: boolean;
  style?: any;
  className?: string;
  suffixIcon?: any;
  allowClear?: boolean;
  name: string;
  disabledDate?: (current: any) => boolean;
};
type RangePickerProps = Omit<DateProps, 'onChange'> & {
  onChange?: (
    dates: NoUndefinedRangeValueType<Dayjs> | null,
    dateStrings: [string, string],
  ) => void;
};
export const DatePickerInput = ({
  value,
  onChange,
  formatDatetime,
  placeholder,
  size,
  disabled,
  showTime,
  className,
  style,
  name,
  disabledDate,
}: DateProps) => {
  const format = useMemo(() => getDateFormat(value), [value]);
  const [panelDate, setPanelDate] = useState<Dayjs>();

  return (
    <div id={name}>
      <DatePicker
        name={name}
        id={name}
        value={value ? dayjs(value, format) : undefined}
        onChange={(date: Dayjs | null) => {
          if (!onChange) return;
          const dateString = date
            ? dayjs(date).format(DATE_FORMAT.TIMESTAMP)
            : '';
          onChange(date, dateString);
        }}
        size={size}
        className={className}
        format={formatDatetime}
        style={{ width: '100%', ...style }}
        showTime={showTime}
        disabled={disabled}
        placeholder={placeholder ?? 'Chọn'}
        allowClear={true}
        disabledDate={disabledDate}
        pickerValue={panelDate}
        onPanelChange={date => {
          setPanelDate(date);
        }}
      />
    </div>
  );
};
export const RangePickerInput = ({
  value,
  onChange,
  formatDatetime,
  size,
  disabled,
  style,
  className,
  suffixIcon,
  allowClear,
  name,
}: RangePickerProps) => {
  return (
    <>
      <RangePicker
        className={className}
        suffixIcon={suffixIcon}
        name={name}
        value={value}
        onChange={onChange}
        format={formatDatetime ?? DATE_FORMAT.DATE}
        style={{ width: '100%', ...style }}
        size={size}
        allowClear={allowClear}
        disabled={disabled}
        placeholder={['Từ ngày', 'Đến ngày']}
      />
    </>
  );
};
export const WeekPickerInput = ({
  value,
  onChange,
  placeholder,
  size,
  disabled,
  style,
  name,
}: DateProps) => {
  return (
    <DatePicker
      defaultValue={dayjs()}
      format={customWeekStartEndFormat}
      picker='week'
      name={name}
      value={value}
      disabled={disabled}
      onChange={(date: Dayjs | null) => {
        if (!onChange) return;
        const dateString = date
          ? dayjs(date).format(DATE_FORMAT.TIMESTAMP)
          : '';
        onChange(date, dateString);
      }}
      size={size}
      style={{ width: '100%', ...style }}
      placeholder={placeholder ?? 'Chọn'}
      className='date-picker-custom'
    />
  );
};
