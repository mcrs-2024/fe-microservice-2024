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
  Tag,
  theme,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { CHAPTER_STATUS } from 'src/constants/enums/category';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import { TFilterChapter } from 'src/constants/types/category/chapter';
import { TDepartment } from 'src/constants/types/category/department';
import {
  TFilterVehicles,
  TVehicles,
  VehiclesModalType,
} from 'src/constants/types/category/vehicles';
import chapterApi, { useChapter } from 'src/helpers/api/category/chapterApi';
import vehicleApi, {
  useGetAllDepartment,
  useVehicle,
} from 'src/helpers/api/category/vehicle';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryICDGroups } from 'src/routes/routes.contants';

import ChapterModal from './VehicleModal';

const Vehicles = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { data: departments } = useGetAllDepartment();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<VehiclesModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TVehicles | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterVehicles>({
    defaultFilter: {
      carCode: null,
      licensePlates: null,
      department: null,
    },
  });

  const { data, isLoading, mutate } = useVehicle(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: VehiclesModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await vehicleApi.deleteVehicle(id);
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
      label: t('Card_code'),
      type: TYPE_FIELD.TEXT,
      name: 'carCode',
      className: 'w-100',
      allowClear: true,
      value: filter.carCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('carCode', e.target.value),
    },
    {
      label: t('License_plates'),
      type: TYPE_FIELD.TEXT,
      name: 'licensePlates',
      className: 'w-100',
      allowClear: true,
      value: filter.licensePlates,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('licensePlates', e.target.value),
    },
    {
      label: t('Department_name'),
      type: TYPE_FIELD.SELECT,
      name: 'department',
      className: 'w-100',
      allowClear: true,
      value: filter.department,
      options: departments?.data?.map((department: TDepartment) => ({
        value: department.id ?? null,
        label: department.departmentName ?? null,
      })),
      onChange: (value: string) => {
        onChangeFilter('department', value);
      },
    },
  ];

  const columns: ColumnsType<TVehicles> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'stt',
      width: 120,
      align: 'center',
      render: (_, __, index) => {
        const { pageNum = 0, pageSize = 10 } = pagination;
        return pageNum * pageSize + index + 1;
      },
    },
    {
      title: t('Department_name'),
      dataIndex: 'department',
      render: (value: string) => {
        const data = departments?.data?.find(
          (data: { id: any }) => String(data.id) === String(value),
        );
        return data ? data.departmentName : null;
      },
    },
    {
      title: t('Card_code'),
      dataIndex: 'carCode',
    },
    {
      title: t('License_plates'),
      dataIndex: 'licensePlates',
    },
    {
      title: t('Note'),
      dataIndex: 'comment',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TVehicles) => {
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
              span={{ sm: 24, lg: 8 }}
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
          title={t('Car_reference')}
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
      <ChapterModal
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

export default Vehicles;
