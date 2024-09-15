/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from 'react';
import { Checkbox, Col, Form, Input, InputNumber, Row } from 'antd';
import { DATE_FORMAT } from 'src/constants/common/common';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TOption } from 'src/constants/types';

import Autocomplete from './components/AutoComplete';
import {
  DatePickerInput,
  RangePickerInput,
  WeekPickerInput,
} from './components/DateInput';
import FileUploadInput from './components/FileUpload';
import ImagesUploadInput from './components/ImagesUploadInput';
import PasswordInput from './components/PasswordInput';
import RadioInput from './components/RadioInput';
import SelectInput from './components/SelectInput';
import TextInput from './components/TextInput';

export type InputProps = {
  name: string;
  span?: number;
  key?: string;
  value: any;
  type: (typeof TYPE_FIELD)[keyof typeof TYPE_FIELD];

  placeholder?: string;
  label?: string;

  require?: boolean;
  disabled?: boolean;
  error?: string;
  touched?: boolean;

  options?: TOption[];
  onChange?: (e: any, dateString?: any) => void;
  onBlur?: (e: any) => void;
  onKeyDown?: (e: any) => void;
  onClick?: (e: any) => void;
  onSearch?: (e: any) => void;
  onSelect?: (e: any) => void;

  className?: string;
  addonAfter?: string;
  size?: 'small' | 'middle' | 'large';
  isMultiple?: boolean;
  showTime?: boolean;
  formatDatetime?: string;
  showCount?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  prefix?: any;
  maxLength?: number;
  defaultValue?: string | number;
  suffixIcon?: ReactNode;
  style?: React.CSSProperties;
  maxCount?: number;
  fileSize?: number;
  accept?: string;
  showLanguageToggle?: boolean;
  disabledDate?: (current: any) => boolean;
};

const FormItem: React.FC<InputProps> = ({
  defaultValue,
  type,
  options,
  value,
  onChange,
  require,
  formatDatetime,
  placeholder,
  className,
  touched,
  error,
  allowClear,
  size,
  disabled,
  label,
  showTime,
  addonAfter,
  showCount,
  onSearch,
  onSelect,
  isMultiple,
  name,
  prefix,
  suffixIcon,
  maxLength,
  style,
  onKeyDown,
  onClick,
  maxCount,
  fileSize,
  accept,
  disabledDate,
  showLanguageToggle,
  ...rest
}) => {
  const renderItem = () => {
    switch (type) {
      case TYPE_FIELD.TEXT:
        return (
          <div>
            <TextInput
              name={name}
              error={error}
              value={value}
              onChange={onChange}
              touched={touched}
              placeholder={placeholder}
              type={type}
              allowClear={allowClear}
              size={'small'}
              className={className}
              defaultValue={defaultValue}
              disabled={disabled}
              suffixIcon={suffixIcon}
              prefix={prefix}
              showLanguageToggle={showLanguageToggle}
            />
          </div>
        );
      case TYPE_FIELD.PASSWORD:
        return (
          <div>
            <PasswordInput
              value={value}
              size={size}
              name={name}
              onChange={onChange}
              disabled={disabled}
              placeholder={placeholder ?? 'Nhập'}
            />
          </div>
        );
      case TYPE_FIELD.WEEK_PICKER:
        return (
          <div>
            <WeekPickerInput
              value={value}
              name={name}
              onChange={onChange}
              size={size}
              style={style}
              placeholder={placeholder}
            />
          </div>
        );
      case TYPE_FIELD.DATE_PICKER:
        return (
          <div>
            <DatePickerInput
              name={name}
              value={value}
              className={className}
              onChange={onChange}
              size={'small'}
              formatDatetime={formatDatetime || DATE_FORMAT.DATE}
              style={style}
              showTime={showTime}
              disabled={disabled}
              placeholder={placeholder}
              disabledDate={disabledDate}
            />
          </div>
        );
      case TYPE_FIELD.RANGE_PICKER:
        return (
          <div>
            <RangePickerInput
              className={className}
              suffixIcon={suffixIcon}
              name={name}
              value={value}
              onChange={onChange}
              formatDatetime={formatDatetime}
              style={style}
              size={size}
              allowClear={allowClear}
              disabled={disabled}
            />
          </div>
        );
      case TYPE_FIELD.INPUT_NUMBER:
        return (
          <div>
            <InputNumber
              onChange={onChange}
              value={value}
              name={name}
              className={className}
              disabled={disabled}
              size={size ?? 'small'}
              placeholder={placeholder ?? 'Nhập'}
              addonAfter={addonAfter}
            />
          </div>
        );
      case TYPE_FIELD.SELECT:
        return (
          <div>
            <SelectInput
              disabled={disabled}
              size={'small'}
              name={name}
              mode={isMultiple ? 'multiple' : undefined}
              options={options ?? []}
              className={className}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              showSearch={true}
              allowClear={allowClear}
              onKeyDown={onKeyDown}
              onClick={onClick}
            />
          </div>
        );
      case TYPE_FIELD.AUTO_COMPLETE:
        return (
          <div>
            <Autocomplete
              disabled={disabled}
              size={size}
              name={name}
              mode={isMultiple ? 'multiple' : undefined}
              options={options ?? []}
              className={className}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              showSearch={true}
              allowClear={allowClear}
              onClick={onClick}
            />
          </div>
        );
      case TYPE_FIELD.RADIO:
        return (
          <div>
            <RadioInput
              value={value}
              disabled={disabled}
              options={options ?? []}
              onChange={onChange}
              name={name}
            />
          </div>
        );
      case TYPE_FIELD.TEXT_AREA:
        return (
          <div>
            <Input.TextArea
              showCount={showCount}
              size={size}
              spellCheck={false}
              maxLength={maxLength || 255}
              onChange={onChange}
              value={value}
              name={name}
              placeholder={placeholder ?? 'Nhập'}
              disabled={disabled}
              allowClear={allowClear}
            />
          </div>
        );
      case TYPE_FIELD.CHECKBOX:
        return (
          <div>
            {options ? (
              <Checkbox.Group
                disabled={disabled}
                onChange={onChange}
                name={name}
                value={value}
              >
                <Row>
                  {options?.map((item: any, index: any) => (
                    <Col key={index} span={item.span}>
                      <Checkbox
                        value={item.value}
                        style={{
                          width: '100%',
                        }}
                      >
                        {item.label}
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            ) : (
              <Checkbox
                value={value}
                onChange={onChange}
                style={{
                  width: '100%',
                }}
              ></Checkbox>
            )}
          </div>
        );
      case TYPE_FIELD.FILE:
        return (
          <div>
            <ImagesUploadInput
              name={name}
              accept={accept}
              handleChangeFiles={onChange}
              dataURI={value}
              disabled={disabled}
              maxCount={maxCount}
              fileSize={fileSize}
            />
          </div>
        );
      case TYPE_FIELD.FILE_UPLOAD:
        return (
          <div>
            <FileUploadInput
              name={name}
              handleChangeFiles={onChange}
              disabled={disabled}
              maxCount={maxCount}
              fileSize={fileSize}
            />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <Form.Item
      {...rest}
      name={name}
      className='form-item-container'
      label={
        label ? (
          <>
            {require ? (
              <>
                {label}
                <span style={{ color: '#F25B60', marginLeft: '5px' }}>*</span>
              </>
            ) : (
              label
            )}
          </>
        ) : null
      }
      validateStatus={touched && error ? 'error' : ''}
      help={touched && error}
    >
      {renderItem()}
    </Form.Item>
  );
};

export default FormItem;
