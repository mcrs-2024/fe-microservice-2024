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
  CatRoomModalType,
  TCatRoom,
  TFilterCatRoom,
} from 'src/constants/types/category/rooms';
import accidentApi, { useAccident } from 'src/helpers/api/category/acident';
import useFilter from 'src/hooks/useFilter';
import { useAppSelector } from 'src/hooks/useRedux';
import { addButton, ButtonProps } from 'src/redux toolkit/buttonsSlice';
import { RootStateToolKit } from 'src/redux toolkit/store';
import { categoryRoom } from 'src/routes/routes.contants';

import RoomModal from './RoomModal/RoomModal';

const Room = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<CatRoomModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TCatRoom | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterCatRoom>({
    defaultFilter: {
      roomName: '',
    },
  });
  //   const { data, isLoading, mutate } = useAccident(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: CatRoomModalType) => {
    setModalType(type);
  };
  const handleDelete = async (casualtyCode: string) => {
    try {
      const res = await accidentApi.deleteAcident(casualtyCode);
      if (res.data.code) {
        message.success(res.data.message);
        // mutate();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputSearch: InputProps[] = [
    {
      label: t('roomName'),
      type: TYPE_FIELD.TEXT,
      name: 'roomName',
      className: 'w-100',
      allowClear: true,
      value: filter.roomName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('roomName', e.target.value),
    },
  ];

  const columns: ColumnsType<TCatRoom> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'stt',
      width: 120,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: t('roomId'),
      dataIndex: 'roomId',
      width: 350,
    },
    {
      title: t('facilityId'),
      dataIndex: 'facilityId',
      width: 350,
    },
    {
      title: t('areaId'),
      dataIndex: 'areaId',
      width: 350,
    },
    {
      title: t('roomTypeId'),
      dataIndex: 'roomTypeId',
      width: 350,
    },
    {
      title: t('roomNo'),
      dataIndex: 'roomNo',
      width: 350,
    },
    {
      title: t('roomName'),
      dataIndex: 'roomName',
      width: 350,
    },
    {
      title: t('roomNameEnglish'),
      dataIndex: 'roomNameEnglish',
      width: 350,
    },
    {
      title: t('roomNameUnUnicode'),
      dataIndex: 'roomNameUnUnicode',
      width: 350,
    },
    {
      title: t('roomIsMedicare'),
      dataIndex: 'roomIsMedicare',
      width: 350,
    },
    {
      title: t('roomIsService'),
      dataIndex: 'roomIsService',
      width: 350,
    },
    {
      title: t('roomIsArmy'),
      dataIndex: 'roomIsArmy',
      width: 350,
    },
    {
      title: t('roomIsActive'),
      dataIndex: 'roomIsActive',
      width: 350,
    },
    {
      title: t('roomIsMinorSurgery'),
      dataIndex: 'roomIsMinorSurgery',
      width: 350,
    },
    {
      title: t('roomIsActived'),
      dataIndex: 'roomIsActived',
      width: 350,
    },
    {
      title: t('chuyenkhoaId'),
      dataIndex: 'chuyenkhoaId',
      width: 350,
    },
    {
      title: t('inactiveDate'),
      dataIndex: 'inactiveDate',
      width: 350,
    },
    {
      title: t('orderIndex'),
      dataIndex: 'orderIndex',
      width: 350,
    },
    {
      title: t('tang'),
      dataIndex: 'tang',
      width: 350,
    },
    {
      title: t('nhom'),
      dataIndex: 'nhom',
      width: 350,
    },
    {
      title: t('payTypeId'),
      dataIndex: 'payTypeId',
      width: 350,
    },
    {
      title: t('idKhuTiepNhan'),
      dataIndex: 'idKhuTiepNhan',
      width: 350,
    },
    {
      title: t('quanityTreatmentTable'),
      dataIndex: 'quanityTreatmentTable',
      width: 350,
    },
    {
      title: t('loaiPhongTheoGiaId'),
      dataIndex: 'loaiPhongTheoGiaId',
      width: 350,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TCatRoom) => {
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
              onConfirm={() => handleDelete(record.casualtyCode)}
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
              span={{ sm: 24 }} // change thanh search cho đều nhau
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
          scroll={{ x: 800, y: 800 }}
          columns={columns}
          title={t('Room')}
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
          data={[]}
          isLoading={false}
          //   data={data?.data?.content || []}
          //   isLoading={isLoading}
          //   id='id'
          //   pagination={{
          //     pageSize: data?.data?.pageSize,
          //     pageNum: data?.data?.pageNum,
          //     totalElements: data?.data?.totalElements,
          //     onChange: onPaginationChange,
          //   }}
        />
      </Space>
      {/* edit modal */}
      <RoomModal
        modalType={modalType}
        isShow={isOpenModal}
        selectedRecord={selectedRecord}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          //   mutate();
        }}
      />
    </>
  );
};

export default Room;
