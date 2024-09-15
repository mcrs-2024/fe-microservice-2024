import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  THoatChatCategory,
  THoatChatCategoryModal,
} from 'src/constants/types/medicineStore/medicineCategory';
import hoatChatCategoryApi, {
  useHoatChatCategory,
} from 'src/helpers/api/medicineStore/medicineStoreCategory/hoatChatCategory';
import useFilter from 'src/hooks/useFilter';
import HoatChatCategoryModal from 'src/pages/warehouse/MedicineStore/Category/HoatChatCategory/HoatChatCategoryModal';

const HoatChatCategory = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();

  const { pagination, onPaginationChange } = useFilter({});
  const {
    data: HoatChatCategory,
    isLoading,
    mutate,
  } = useHoatChatCategory(pagination);
  const [selectedHoatChat, setSelectedHoatChat] =
    useState<THoatChatCategory | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] = useState<THoatChatCategoryModal>('add');
  const onChangeModalType = (type: THoatChatCategoryModal) => {
    setModalType(type);
  };

  const handleDelete = async (id: number | null) => {
    try {
      const res = await hoatChatCategoryApi.deleteHoatChat(id);
      if (res.data.code) {
        message.success(res.data.message);
        mutate();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const column: ColumnsType<THoatChatCategory> = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
      align: 'center',
    },
    {
      title: t('Active_Ingredient_ID'),
      dataIndex: 'maHoatChat',
      width: 200,
      align: 'center',
    },
    {
      title: t('Active_Ingredient_Name'),
      dataIndex: 'tenHoatChat',
      width: 150,
    },
    {
      title: t('Interaction'),
      dataIndex: 'tuongTac',
      width: 150,
    },
    {
      title: t('description'),
      dataIndex: 'moTa',
      width: 150,
    },
    {
      title: t('Created by'),
      dataIndex: 'createdBy',
      width: 150,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: THoatChatCategory) => {
        return (
          <>
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setSelectedHoatChat(record);
                onOpenModal();
                onChangeModalType('edit');
              }}
            ></ButtonCustom.Edit>
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDelete(record.id)}
              okText='Ok'
            >
              <ButtonCustom.Delete
                type='link'
                size='small'
                icon={<DeleteOutlined />}
                style={{ color: token['red-7'] }}
              ></ButtonCustom.Delete>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <TableCustom
          extra={
            <>
              <ButtonCustom.Create
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => {
                  onChangeModalType('add');
                  onOpenModal();
                }}
              >
                {t('Add new active ingredient')}
              </ButtonCustom.Create>
            </>
          }
          title={t('List of active ingredient')}
          columns={column}
          //data={DANH_SACH_HOAT_CHAT}
          data={HoatChatCategory?.data?.content || []}
          pagination={{
            pageSize: HoatChatCategory?.data?.pageSize,
            pageNum: HoatChatCategory?.data?.pageNum,
            totalElements: HoatChatCategory?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={false}
          isRowSelection={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <HoatChatCategoryModal
        key={selectedHoatChat?.id}
        modalType={modalType}
        show={isOpenModal}
        HoatChatCategory={selectedHoatChat}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></HoatChatCategoryModal>
    </>
  );
};

export default HoatChatCategory;
