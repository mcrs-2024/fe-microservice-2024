import React from 'react';
import { Button, ButtonProps } from 'antd';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import { usePermission } from 'src/hooks/usePermission';

// Define the color options
type ButtonColor = 'green' | 'red' | 'yellow' | 'black';

type Props = {
  action?: PERMISSION_CODES;
  color?: ButtonColor;
} & ButtonProps;

const colors: Record<ButtonColor, string> = {
  green: '#52c41a',
  red: '#f5222d',
  yellow: '#faad14',
  black: '#000000',
};

const ButtonCustom = {
  Create: (props: Props) => (
    <ButtonWrapper {...props} action={PERMISSION_CODES.CREATE} />
  ),
  Edit: (props: Props) => (
    <ButtonWrapper {...props} action={PERMISSION_CODES.UPDATE} />
  ),
  Delete: (props: Props) => (
    <ButtonWrapper {...props} action={PERMISSION_CODES.DELETE} />
  ),
  View: (props: Props) => (
    <ButtonWrapper {...props} action={PERMISSION_CODES.VIEW} />
  ),
  Import: (props: Props) => (
    <ButtonWrapper {...props} action={PERMISSION_CODES.IMPORT} />
  ),
  Export: (props: Props) => (
    <ButtonWrapper {...props} action={PERMISSION_CODES.EXPORT} />
  ),
  Default: (props: Props) => <Button {...props} />,
  // Add more nested components for other action types as needed
};

const ButtonWrapper = (props: Props & { action: PERMISSION_CODES }) => {
  const { action, color, ...otherProps } = props;
  const isAllowed = usePermission(action);

  const colorStyles: React.CSSProperties = {
    backgroundColor: color ? colors[color] : undefined,
    borderColor: color ? colors[color] : undefined,
  };

  return (
    <Button
      {...otherProps}
      style={{ ...colorStyles, ...otherProps.style }}
      disabled={!isAllowed || props.disabled}
    />
  );
};

export default ButtonCustom;
