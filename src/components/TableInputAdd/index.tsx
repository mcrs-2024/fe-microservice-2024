import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Table } from 'antd';

import ButtonCustom from '../ButtonCustom';
import { EditableCell } from '../EditableCell';

interface TableInputAddProps {
  columns: any[];
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  form: any;
  scroll?: {
    x?: number;
    y?: number;
  };
}

const TableInputAdd: React.FC<TableInputAddProps> = ({
  columns,
  data,
  setData,
  scroll,
  form,
}) => {
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: any) => record.key === editingKey;

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleAdd = async () => {
    if (editingKey) {
      await save(editingKey);
    }

    const newData = columns.reduce(
      (acc, column) => {
        acc[column.dataIndex] =
          column.inputType === 'number'
            ? 0
            : column.inputType === 'date'
              ? null
              : '';
        return acc;
      },
      { key: Date.now() },
    );

    setData([...data, newData]);
    edit(newData);
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter(item => item.key !== key);
    setData(newData);
  };

  const edit = (record: any) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const mergedColumns = columns.map(col => ({
    ...col,
    onCell: (record: any) => ({
      record,
      inputType: col.inputType,
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    }),
  }));

  return (
    <Form form={form} component={false}>
      <Table
        className='table-custom'
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={[
          ...mergedColumns,
          {
            title: (
              <ButtonCustom.Create
                onClick={handleAdd}
                type='primary'
                icon={<PlusOutlined />}
              />
            ),
            dataIndex: 'operation',
            render: (_, record: { key: React.Key }) =>
              data.length >= 1 ? (
                <ButtonCustom.Delete
                  onClick={() => handleDelete(record.key)}
                  type='primary'
                  danger
                  icon={<MinusOutlined />}
                />
              ) : null,
            width: 100,
            fixed: 'right',
            align: 'center',
          },
        ]}
        rowClassName='editable-row'
        pagination={false}
        scroll={scroll}
      />
    </Form>
  );
};

export default TableInputAdd;
