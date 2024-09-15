import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  TContractorCategory,
  TContractorCategoryModal,
  TMedicineCategory,
} from 'src/constants/types/medicineStore/medicineCategory';
import contractorCategoryApi, {
  useContractorCategory,
} from 'src/helpers/api/medicineStore/medicineStoreCategory/contractorCategory';
import { useGetAllMedicine } from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineCategory';
import useFilter from 'src/hooks/useFilter';

import ContractorCategoryModal from './ContractorCategoryModal';

const ContractorCategory = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { data: medicines } = useGetAllMedicine();

  const { pagination, onPaginationChange } = useFilter({});
  const {
    data: ContractorCategory,
    isLoading,
    mutate,
  } = useContractorCategory(pagination);
  const [selectedNhaThau, setSelectedNhaThau] =
    useState<TContractorCategory | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] = useState<TContractorCategoryModal>('add');
  const onChangeModalType = (type: TContractorCategoryModal) => {
    setModalType(type);
  };

  const handleDelete = async (id: string | null) => {
    try {
      const res = await contractorCategoryApi.deleteContractor(id);
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

  const column: ColumnsType<TContractorCategory> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 150,
      align: 'center',
    },
    {
      title: t('Medicine'),
      dataIndex: 'thuoc',
      width: 150,
      render: (value: number) => {
        const medicine = medicines?.data?.find(
          (med: TMedicineCategory) => Number(med.id) === Number(value),
        );
        return medicine ? medicine.ten : '';
      },
    },

    {
      title: t('Tender number'),
      dataIndex: 'soThau',
      width: 150,
    },
    {
      title: t('Decision'),
      dataIndex: 'quyetDinh',
      width: 150,
    },
    {
      title: t('Announcement'),
      dataIndex: 'congBo',
      width: 150,
    },
    {
      title: t('Note'),
      dataIndex: 'ghiChu',
      width: 150,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: TContractorCategory) => {
        return (
          <>
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setSelectedNhaThau(record);
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
                {t('Add contractor')}
              </ButtonCustom.Create>
            </>
          }
          title={t('List of contractor')}
          columns={column}
          data={ContractorCategory?.data?.content || []}
          pagination={{
            pageSize: ContractorCategory?.data?.pageSize,
            pageNum: ContractorCategory?.data?.pageNum,
            totalElements: ContractorCategory?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={false}
          showVisibleColumns={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <ContractorCategoryModal
        key={selectedNhaThau?.id}
        modalType={modalType}
        show={isOpenModal}
        ContractorCategory={selectedNhaThau}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></ContractorCategoryModal>
    </>
  );
};

export default ContractorCategory;
