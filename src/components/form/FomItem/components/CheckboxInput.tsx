import { Checkbox, Col, Row } from 'antd';
import { TOption } from 'src/constants/types';

type Props = {
  value: any;
  disabled?: boolean;
  options: TOption[];
  onChange?: (e: any) => void;
};
const CheckboxInput = ({ value, disabled, options, onChange }: Props) => {
  return (
    <>
      <Checkbox.Group disabled={disabled} onChange={onChange} value={value}>
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
    </>
  );
};
export default CheckboxInput;
