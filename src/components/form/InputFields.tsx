/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { FormProps } from 'antd';
import { Col, Form } from 'antd';
import classNames from 'classnames';
import { FormikProps } from 'formik';

import FormItem, { InputProps } from './FomItem';

import './FomItem/style.scss';

type Props = Omit<FormProps, 'form'> & {
  inputs: InputProps[];
  form?: FormikProps<any>;
  span?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gutter?: [number, number];
  isHorizontal?: boolean;
};

const InputFields: React.FC<Props> = ({
  inputs,
  form,
  gutter,
  span = { sm: 24, md: 12, lg: 8, xl: 6 },
  isHorizontal = false,
  ...otherProps
}) => {
  const formLayout = isHorizontal ? 'horizontal' : 'vertical';
  return (
    <Form
      {...otherProps}
      layout={formLayout}
      className={classNames(otherProps.className, 'form-container')}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      {inputs.map((input, index) => {
        const { ...inputProps } = input;
        return (
          <Col
            style={{
              padding: gutter ? `${gutter[0]}px ${gutter[1]}px` : '0',
            }}
            className={input.name}
            key={input.name + index}
            sm={input.span || span.sm}
            md={input.span || span.md}
            lg={input.span || span.lg}
            xl={input.span || span.xl}
          >
            <FormItem
              {...inputProps} // Spread the rest of the props
              onBlur={(e: any) => {
                input.onBlur && input.onBlur(e);
                if (!form) return;
                form?.setFieldTouched(input.name, true);
                form?.handleBlur(e);
              }}
              error={
                form?.errors?.[input.name]
                  ? (form?.errors[input.name] as string)
                  : undefined
              }
              touched={
                form?.touched?.[input.name]
                  ? (form?.touched[input.name] as boolean)
                  : undefined
              }
            />
          </Col>
        );
      })}
    </Form>
  );
};
export default InputFields;
