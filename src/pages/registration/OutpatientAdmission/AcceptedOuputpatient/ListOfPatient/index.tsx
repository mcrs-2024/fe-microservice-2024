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
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  ListOfPatientModalType,
  TListOfPatient,
} from 'src/constants/types/registration/listOfPatient';
import useFilter from 'src/hooks/useFilter';

import ListOfPatientModal from './ListOfPatientModal/ListOfPatientModal';

const ListOfPatient = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ListOfPatientModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TListOfPatient | null>(
    null,
  );

  const { pagination, onPaginationChange } = useFilter<[]>({});
  // const { data, isLoading, mutate } = useChapter(pagination);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: ListOfPatientModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string | null) => {
    // try {
    //   const res = await chapterApi.deleteChapter(id);
    //   if (res.data.code) {
    //     message.success(res.data.message);
    //   } else {
    //     message.error(res.data.message);
    //   }
    //   mutate();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const columns: ColumnsType<TListOfPatient> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 120,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: t('patientName'),
      dataIndex: 'patientName',
    },
    {
      title: t('patientAge'),
      dataIndex: 'patientAge',
    },
    {
      title: t('patientGender'),
      dataIndex: 'patientGender',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TListOfPatient) => {
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
        <TableCustom
          columns={columns}
          title={t('List_Of_Patient')}
          extra={
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
          }
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
        />
      </Space>
      {/* edit modal */}
      <ListOfPatientModal
        modalType={modalType}
        isShow={isOpenModal}
        selectedRecord={selectedRecord}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          // mutate();
        }}
      />
    </>
  );
};

export default ListOfPatient;
