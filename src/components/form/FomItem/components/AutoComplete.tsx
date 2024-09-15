import { AutoComplete, Select } from 'antd';
import { TOption } from 'src/constants/types';

type Props = {
  placeholder?: string;
  className?: string;
  suffixIcon?: any;
  onChange?: (e: any) => void;
  options: TOption[];
  value: any;
  name: string;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  selectMultiple?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  onKeyDown?: (e: any) => void;
  onClick?: (e: any) => void;
  mode?: 'multiple' | undefined;
};

const stringToArray = (value: string | undefined) => {
  if (
    typeof value === 'string' &&
    value.startsWith('{') &&
    value.endsWith('}')
  ) {
    return value
      .slice(1, -1)
      .split(',')
      .map(item => item.trim());
  }
  return [];
};

const Autocomplete = ({
  placeholder,
  className,
  onChange,
  options,
  value,
  mode,
  disabled,
  size,
  selectMultiple,
  showSearch,
  allowClear,
  onKeyDown,
  onClick,
}: Props) => {
  const isMultiple = mode === 'multiple' || selectMultiple;
  const arrayValue = isMultiple ? stringToArray(value) : value;

  const defaultValue = isMultiple
    ? arrayValue
    : options.find(option => option.value === value)?.value;

  const handleSelectChange = (newValue: string | string[]) => {
    if (isMultiple) {
      const stringValue =
        Array.isArray(newValue) && newValue.length > 0
          ? `{${newValue.join(',')}}`
          : '';
      onChange?.(stringValue);
    } else {
      onChange?.(newValue);
    }
  };

  return (
    <AutoComplete
      defaultValue={defaultValue}
      disabled={disabled || false}
      size={size}
      options={options ?? []}
      className={className}
      placeholder={placeholder ?? 'Chọn'}
      value={arrayValue}
      onChange={handleSelectChange}
      showSearch={showSearch}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      allowClear={allowClear || true}
      onKeyDown={onKeyDown}
      onClick={onClick}
      popupMatchSelectWidth
      virtual
    />
  );
};

export default Autocomplete;
