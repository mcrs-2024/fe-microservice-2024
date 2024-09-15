import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Flex,
  message,
  Popconfirm,
  Row,
  Space,
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
import {
  CatDepartmentModalType,
  TDepartment,
  TFilterCatDepartment,
} from 'src/constants/types/category/department';
import departmentApi, {
  useDepartment,
  useGetAllTypeDepartments,
} from 'src/helpers/api/category/department';
import { useGetAllFacilities } from 'src/helpers/api/category/facilities';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryDepartment } from 'src/routes/routes.contants';

import DepartmentModal from './DepartmentModal/DepartmentModal';

const Department = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { data: departmentTypes } = useGetAllTypeDepartments();
  const { data: facilities } = useGetAllFacilities();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<CatDepartmentModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TDepartment | null>(
    null,
  );

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterCatDepartment>({
    defaultFilter: {
      departmentName: '',
      departmentCode: '',
    },
  });
  const { data, isLoading, mutate } = useDepartment(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: CatDepartmentModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await departmentApi.deleteDepartment(id);
      if (res.data.code) {
        message.success(res.data.message);
        mutate();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputSearch: InputProps[] = [
    {
      label: t('areaCode'),
      type: TYPE_FIELD.TEXT,
      name: 'departmentCode',
      className: 'w-100',
      allowClear: true,
      value: filter.departmentCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('departmentCode', e.target.value),
    },
    {
      label: t('areaName'),
      type: TYPE_FIELD.TEXT,
      name: 'departmentName',
      className: 'w-100',
      allowClear: true,
      value: filter.departmentName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('departmentName', e.target.value),
    },
  ];

  const columns: ColumnsType<TDepartment> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 120,
      align: 'center',
      render: (_, __, index) => {
        const { pageNum = 0, pageSize = 10 } = pagination;
        return pageNum * pageSize + index + 1;
      },
    },
    {
      title: t('facilityID'),
      dataIndex: 'facility',
      width: 200,
      render: (value: string) => {
        const data = facilities?.data?.find(
          (fac: { id: any }) => String(fac.id) === String(value),
        );
        return value ? data.facilityFullName : null;
      },
    },
    {
      title: t('areaNo'),
      dataIndex: 'departmentNo',
      width: 200,
    },
    {
      title: t('areaCode'),
      dataIndex: 'departmentCode',
      width: 200,
    },
    {
      title: t('areaName'),
      dataIndex: 'departmentName',
      width: 200,
    },
    {
      title: t('departmentType'),
      dataIndex: 'departmentType',
      width: 200,
      render: (value: string) => {
        const data = departmentTypes?.data?.find(
          (dtypes: { id: any }) => String(dtypes.id) === String(value),
        );
        return value ? data.departmentTypeName : null;
      },
    },
    {
      title: t('areaIsSurgery'),
      dataIndex: 'isSurgery',
      width: 200,
      render: (value: boolean) => {
        return value === true ? t('Yes') : t('No');
      },
    },
    {
      title: t('areaIsActive'),
      dataIndex: 'isActive',
      width: 200,
      render: (value: boolean) => {
        return value === true ? t('Yes') : t('No');
      },
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TDepartment) => {
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
            />
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDelete(record.id)}
              okText='Ok'
            >
              <ButtonCustom.Delete
                size='small'
                type='link'
                danger
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  return (
    <>
      {/* header */}
      <Space direction='vertical' className='d-flex'>
        {/* filter container */}
        <Card>
          {/* filter inputs */}
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 6, xl: 12 }} // change thanh search cho đều nhau
              gutter={[0, 8]}
            ></InputFields>
          </Row>
          {/* filter actions */}
          <Row
            justify={'end'}
            className='d-flex align-items-center'
            style={{
              columnGap: '8px',
            }}
          >
            {/* reset filter */}
            <Button icon={<ReloadOutlined />} onClick={onResetFilter}>
              {t('Delete_Search')}
            </Button>
            {/* trigger filter */}
            <Button
              type='primary'
              icon={<SearchOutlined />}
              onClick={() => {
                mutate();
              }}
            >
              {t('Search')}
            </Button>
          </Row>
        </Card>
        <TableCustom
          columns={columns}
          title={t('Department')}
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
                {t('Add')}
              </ButtonCustom.Create>
            </>
          }
          scroll={{ x: 800, y: 800 }}
          data={data?.data?.content || []}
          isLoading={isLoading}
          id='id'
          pagination={{
            pageSize: data?.data?.pageSize,
            pageNum: data?.data?.pageNum,
            totalElements: data?.data?.totalElements,
            onChange: onPaginationChange,
          }}
        />
      </Space>
      {/* edit modal */}
      <DepartmentModal
        modalType={modalType}
        isShow={isOpenModal}
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

export default Department;
