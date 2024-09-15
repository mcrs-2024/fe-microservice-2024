import React, { useState } from 'react';
import {
  DeleteOutlined,
  DownOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Popover, Segmented, Select, Space, Table } from 'antd';
import { t } from 'i18next';
import { render } from 'node-sass';
import ButtonCustom from 'src/components/ButtonCustom';
import TableAddColum from 'src/components/TableAddColum';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
const { Option } = Select;
const columnsTypeHistory = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
  },
  {
    title: 'Ngày khám',
    dataIndex: 'examDate',
    key: 'examDate',
  },
  {
    title: 'Phòng khám',
    dataIndex: 'clinic',
    key: 'clinic',
  },
  {
    title: 'Đối tượng',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Nhân viên TN',
    dataIndex: 'staff',
    key: 'staff',
  },
  {
    title: 'BS khám',
    dataIndex: 'doctor',
    key: 'doctor',
  },
];

const dataSourceService = [
  {
    key: '1',
    stt: '1',
    serviceName: 'Khám tổng quát',
    clinic: 'Phòng khám A',
    typefee: 'Theo yêu cầu',
    amount: '500,000 VND',
  },
  {
    key: '2',
    stt: '2',
    serviceName: 'Xét nghiệm máu',
    clinic: 'Phòng khám B',
    typefee: 'BHYT',
    amount: '200,000 VND',
  },
];
const SegmentedRegistration = () => {
  const [selectedOption, setSelectedOption] = useState<number>(1);
  const [tableData, setTableData] = useState<any[]>(dataSourceService);

  const handleAddRow = () => {
    const newRow = {
      key: `${tableData.length + 1}`,
      stt: `${tableData.length + 1}`,
      serviceName: '',
      clinic: '',
      amount: '',
    };
    setTableData([...tableData, newRow]);
  };

  const handleDeleteRow = (index: number) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    const updatedData = newData.map((row, idx) => ({
      ...row,
      stt: `${idx + 1}`,
      key: `${idx + 1}`,
    }));

    setTableData(updatedData);
  };
  const columnsTypeService = [
    {
      title: t('STT'),
      dataIndex: 'stt',
      key: 'stt',
    },
    {
      title: t('ServiceName'),
      dataIndex: 'serviceName',
      key: 'serviceName',
      render: (text: string, record: any) => (
        <Select defaultValue={text} style={{ width: '100%' }}>
          <Option value='Khám tổng quát'>Khám tổng quát</Option>
          <Option value='Xét nghiệm máu'>Xét nghiệm máu</Option>
          <Option value='Chụp X-quang'>Chụp X-quang</Option>
          <Option value='Siêu âm'>Siêu âm</Option>
        </Select>
      ),
    },
    {
      title: t('clinic'),
      dataIndex: 'clinic',
      key: 'clinic',
      render: (text: string, record: any) => (
        <Popover
          content={
            <Table
              className='table'
              bordered
              columns={[
                { title: 'STT', dataIndex: 'stt', key: 'stt' },
                { title: 'Phòng khám', dataIndex: 'clinic', key: 'clinic' },
                { title: 'Tổng', dataIndex: 'total', key: 'total' },
                { title: 'Chờ khám', dataIndex: 'waiting', key: 'waiting' },
              ]}
              dataSource={[
                { key: '1', stt: '1', clinic: text, total: '10', waiting: '5' },
              ]}
              pagination={false}
            />
          }
          trigger='click'
          overlayClassName='hiddenBr'
        >
          <div
            style={{
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {text} <DownOutlined />
          </div>
        </Popover>
      ),
    },
    {
      title: t('TypeFee'),
      dataIndex: 'typefee',
      key: 'typefee',
    },
    {
      title: t('Total_Amount'),
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleAddRow}>
            <PlusCircleOutlined />
          </Button>
        </div>
      ),
      render: (_: any, i: number) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonCustom.Edit
              onClick={() => handleDeleteRow(i)}
              type='link'
              style={{ color: 'red' }}
              size='small'
              icon={<DeleteOutlined />}
            />
          </div>
        );
      },
      key: 'action',
    },
  ];

  return (
    <div
      className='segmented'
      style={{ backgroundColor: 'white', margin: '7px 0' }}
    >
      <div>
        <Segmented
          className='segmented-option'
          options={[
            { label: t('Service'), value: 1 },
            { label: t('MedicalHistory'), value: 2 },
          ]}
          block
          value={selectedOption}
          onChange={value => setSelectedOption(value)}
        />
      </div>
      <div>
        {selectedOption === 1 && (
          <TableCustom
            columns={columnsTypeService}
            data={tableData}
            bordered
            showVisibleColumns={false}
            isLoading={false}
            scroll={{ x: 800, y: 800 }}
          />
        )}
        {selectedOption === 2 && (
          <TableCustom
            columns={columnsTypeHistory}
            data={[]}
            bordered
            showVisibleColumns={false}
            isLoading={false}
            scroll={{ x: 800, y: 800 }}
          />
        )}
      </div>
    </div>
  );
};

export default SegmentedRegistration;
