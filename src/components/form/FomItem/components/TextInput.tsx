import { useEffect, useState } from 'react';
import { Button, Checkbox, Input, Space } from 'antd';

import { InputProps } from '..';

const TextInput = ({
  name,
  onChange,
  value,
  placeholder,
  type,
  addonAfter,
  allowClear,
  size,
  className,
  defaultValue,
  disabled,
  suffixIcon,
  prefix,
  showLanguageToggle,
}: InputProps & { showLanguageToggle?: boolean }) => {
  const [isEN, setIsEN] = useState(false);

  const handleLanguageChange = () => {
    setIsEN(!isEN);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;

    const newValue = e.target.value;
    if (showLanguageToggle) {
      if (isEN) {
        onChange({
          target: {
            name,
            value: {
              en: isEN ? newValue : value.en,
              vn: value.vn,
            },
          },
        });
      } else {
        onChange({
          target: {
            name,
            value: {
              vn: !isEN ? newValue : value.vn,
              en: value.en,
            },
          },
        });
      }
    } else {
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Input
          value={showLanguageToggle ? (isEN ? value.en : value.vn) : value}
          name={name}
          size={size}
          onChange={handleInputChange}
          spellCheck={false}
          placeholder={placeholder ?? 'Nhập'}
          type={type}
          addonAfter={addonAfter}
          allowClear={allowClear}
          disabled={disabled}
          className={className}
          defaultValue={defaultValue}
          suffix={suffixIcon}
          prefix={prefix}
        />
        {showLanguageToggle && (
          <Button
            style={{ height: '30px', borderRadius: 'none' }}
            size='small'
            onClick={handleLanguageChange}
          >
            {isEN ? 'EN' : 'VN'}
          </Button>
        )}
      </div>
    </Space>
  );
};

export default TextInput;
