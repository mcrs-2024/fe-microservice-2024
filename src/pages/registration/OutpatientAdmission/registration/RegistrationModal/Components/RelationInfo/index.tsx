import React from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Space } from 'antd';
import { useFormik } from 'formik';
import { t } from 'i18next';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { TRegistration } from 'src/constants/types/category/registration';
interface Props {
  inputs: InputProps[];
  form: TRegistration;
}
const RelationInfo = ({ inputs, form }: Props) => {
  return (
    <div style={{ padding: '5px 0px' }}>
      <div style={{ width: '100%' }}>
        <div className='d-flex' style={{ width: '100%' }}>
          <Card title={t('RelationInformation')} style={{ width: '100%' }}>
            <InputFields
              inputs={inputs}
              form={form}
              gutter={[16, 16]}
              isHorizontal={true}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RelationInfo;
