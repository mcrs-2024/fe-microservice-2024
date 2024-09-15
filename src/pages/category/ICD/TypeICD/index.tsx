import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Flex,
  message,
  Popconfirm,
  Row,
  Space,
  Tag,
  theme,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import { USER_STATUS } from 'src/constants/enums/User';
import {
  ICDTypeModalType,
  TFilterICDType,
  TICDType,
} from 'src/constants/types/category/icdType';
import icdTypeAPI, { useICDType } from 'src/helpers/api/category/ICDType';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryTypeICD } from 'src/routes/routes.contants';

import TypeICDModal from './TypeICDModal';

const TypeICD = () => {
  const { t } = useTranslation();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ICDTypeModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TICDType | null>(null);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: ICDTypeModalType) => {
    setModalType(type);
  };

  const {
    pagination,
    onPaginationChange,
    debouncedFilter,
    filter,
    onChangeFilter,
  } = useFilter<TFilterICDType>({
    defaultFilter: {
      icdTypeCode: '',
      icdTypeName: '',
    },
  });

  const { data, isLoading, mutate } = useICDType(pagination, debouncedFilter);

  const { token } = theme.useToken();
  const handleDeleteUser = async (id: string | null) => {
    try {
      const res = await icdTypeAPI.deleteICDType(id);
      if (res.data.code) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const inputSearch: InputProps[] = [
    {
      label: t('Type_Code'),
      type: TYPE_FIELD.TEXT,
      name: 'icdTypeCode',
      className: 'w-100',
      allowClear: true,
      value: filter.icdTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdTypeCode', e.target.value),
    },
    {
      label: t('Type_Name'),
      type: TYPE_FIELD.TEXT,
      name: 'icdTypeName',
      className: 'w-100',
      allowClear: true,
      value: filter.icdTypeName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdTypeName', e.target.value),
    },
  ];
  const columns: ColumnsType<TICDType> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'fullName',
      width: 250,
      render: (_, __, index) => {
        const { pageNum = 0, pageSize = 10 } = pagination;
        return pageNum * pageSize + index + 1;
      },
    },
    {
      title: t('Type_Code'),
      dataIndex: 'icdTypeCode',
    },
    {
      title: t('Type_Name'),
      dataIndex: 'icdTypeName',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TICDType) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.Edit
              onClick={() => {
                setSelectedRecord(record);
                onChangeModalType('edit');
                onOpenModal();
              }}
              type='link'
              style={{ color: token['green-7'] }}
              size='small'
              icon={<EditOutlined />}
            ></ButtonCustom.Edit>
            <Popconfirm
              title='Bạn có chắc chắn muốn xóa nhân viên này?'
              onConfirm={() => handleDeleteUser(record.id)}
              okText='Ok'
            >
              <ButtonCustom.Delete
                size='small'
                type='link'
                danger
                icon={<DeleteOutlined />}
              ></ButtonCustom.Delete>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card>
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 12 }}
              gutter={[0, 8]}
            ></InputFields>
          </Row>
          <Row style={{ paddingLeft: '9px' }}>
            <Button icon={<ReloadOutlined />} style={{ marginRight: '1%' }}>
              {t('Delete_Search')}
            </Button>
            <Button type='primary' icon={<SearchOutlined />}>
              {t('Search')}
            </Button>
          </Row>
        </Card>
        {/* products list */}
        <TableCustom
          columns={columns}
          title={t('Type_ICD')}
          extra={
            <>
              <ButtonCustom.Create
                type='primary'
                onClick={() => {
                  onChangeModalType('add');
                  onOpenModal();
                }}
                icon={<PlusOutlined />}
              >
                {t('Add_Type_ICD_Category')}
              </ButtonCustom.Create>
            </>
          }
          isRowSelection={true}
          loading={isLoading}
          id='id'
          data={data?.data?.content || []}
          pagination={{
            pageSize: data?.data?.pageSize,
            pageNum: data?.data?.pageNum,
            totalElements: data?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
        />
      </Space>

      <TypeICDModal
        key={1}
        modalType={modalType}
        show={isOpenModal}
        selectedRecord={selectedRecord}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      />
    </>
  );
};

export default TypeICD;
