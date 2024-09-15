import React, { ReactNode } from 'react';
import { Card } from 'react-bootstrap';
import { CardProps } from 'antd';

type Props = {
  children: React.ReactNode;
} & CardProps;

const CardCustom = (props: Props) => {
  const { children, ...rest } = props;
  return <> </>;
};

export default CardCustom;
