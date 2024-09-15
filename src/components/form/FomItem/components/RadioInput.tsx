import { Radio } from 'antd';
import { TOption } from 'src/constants/types';

type Props = {
  value: any;
  disabled?: boolean;
  options: TOption[];
  onChange?: (e: any) => void;
  name: string;
};
const RadioInput = ({ value, name, disabled, options, onChange }: Props) => {
  return (
    <>
      <Radio.Group
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      >
        {options?.map(e => {
          return (
            <Radio key={e?.value} value={e?.value}>
              {e?.label}
            </Radio>
          );
        })}
      </Radio.Group>
    </>
  );
};
export default RadioInput;
