import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { debounce } from 'redux-saga/effects';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  AppointmentModalType,
  TAppointment,
  TFilterAppointment,
} from 'src/constants/types/reception/appointment';
import chapterApi, { useChapter } from 'src/helpers/api/category/chapterApi';
import useFilter from 'src/hooks/useFilter';
import { categoryICDGroups } from 'src/routes/routes.contants';

const HealthContract = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<AppointmentModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TAppointment | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterAppointment>({
    defaultFilter: {
      icdTypeCode: '',
      icdChapterNameV: '',
    },
  });
  // const { data, isLoading, mutate } = useChapter(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: AppointmentModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await chapterApi.deleteChapter(id);
      if (res.data.code) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      // mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const inputSearch: InputProps[] = [
    {
      label: 'Mã hợp đồng KSK',
      type: TYPE_FIELD.TEXT,
      name: 'icdTypeCode',
      className: 'w-100',
      allowClear: true,
      value: filter.icdTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdTypeCode', e.target.value),
    },
    {
      label: 'Tên hợp đồng KSK',
      type: TYPE_FIELD.TEXT,
      name: 'icdChapterNameV',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterNameV,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterNameV', e.target.value),
    },
    {
      label: 'Mã y tế',
      type: TYPE_FIELD.TEXT,
      name: 'icdChapterNameV',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterNameV,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterNameV', e.target.value),
    },
    {
      label: 'Họ tên',
      type: TYPE_FIELD.TEXT,
      name: 'icdChapterNameV',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterNameV,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterNameV', e.target.value),
    },
    {
      label: 'Ngày sinh',
      type: TYPE_FIELD.SELECT,
      name: 'icdChapterNameV',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterNameV,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterNameV', e.target.value),
    },
    {
      label: 'Gói khám',
      type: TYPE_FIELD.SELECT,
      name: 'icdChapterNameV',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterNameV,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterNameV', e.target.value),
    },
  ];

  const columns: ColumnsType<TAppointment> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'stt',
      width: 120,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Mã hợp đồng KSK',
      dataIndex: 'maChuong',
    },
    {
      title: 'Tên hợp đồng KSK',
      dataIndex: 'tenChuong',
    },
    {
      title: 'Tên gói',
      dataIndex: 'tenChuong',
    },
    {
      title: 'Mã y tế',
      dataIndex: 'tenChuong',
    },
    {
      title: 'Họ tên',
      dataIndex: 'tenChuong',
    },
    {
      title: 'Giới tính	',
      dataIndex: 'tenChuong',
    },
    {
      title: 'Ngày sinh	',
      dataIndex: 'tenChuong',
    },
    {
      title: 'Ngày tạo	',
      dataIndex: 'tenChuong',
    },
    {
      title: 'Bắt đầu gói	',
      dataIndex: 'tenChuong',
    },
    {
      title: 'Kết thúc gói',
      dataIndex: 'tenChuong',
    },
    {
      title: 'Hoàn thành',
      dataIndex: 'tenChuong',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'tenChuong',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TAppointment) => {
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
                // mutate();
              }}
            >
              {t('Search')}
            </Button>
          </Row>
        </Card>
        <TableCustom
          columns={columns}
          title='Khám sức khỏe cá nhân'
          data={[]}
          isLoading={false}
          // data={data?.data?.content || []}
          // isLoading={isLoading}
          // id='id'
          // pagination={{
          //   pageSize: data?.data?.pageSize,
          //   pageNum: data?.data?.pageNum,
          //   totalElements: data?.data?.totalElements,
          //   onChange: onPaginationChange,
          // }}
          isRowSelection={true}
          scroll={{ y: 1200 }}
        />
      </Space>
    </>
  );
};

export default HealthContract;
