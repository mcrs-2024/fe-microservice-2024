import { LockOutlined } from '@ant-design/icons';
import { Input } from 'antd';

type Props = {
  value: any;
  size?: 'small' | 'middle' | 'large';
  onChange?: (e: any) => void;
  disabled?: boolean;
  placeholder?: string;
  name: string;
};
const PasswordInput = ({
  value,
  size,
  onChange,
  disabled,
  placeholder,
  name,
}: Props) => {
  return (
    <>
      <Input.Password
        value={value}
        size={size}
        name={name}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder ?? 'Nhập'}
        prefix={<LockOutlined />}
      />
    </>
  );
};

export default PasswordInput;
