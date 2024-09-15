import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Popconfirm, Space, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import {
  MedicalSuppliesModalType,
  TMedicalSupplies,
} from 'src/constants/types/categoryWarehouseSupplier/medicalSupplies';
import { useGetAllFirm } from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/firm';
import medicalSuppliesApi, {
  useMedicalSupplies,
} from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/medicalSupplies';
import { useGetAllMedicalSuppliesGroup } from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/medicalSuppliesGroup';
import { useGetAllRegulation } from 'src/helpers/api/warehouseSupplier/warehouseSupplierCategory/regulations';
import useFilter from 'src/hooks/useFilter';

import MedicalSuppliesModal from './MedicalSuppliesModal/MedicalSuppliesModal';

const MedicalSupplies = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter({});
  const {
    data: medicalSupplies,
    isLoading,
    mutate,
  } = useMedicalSupplies(pagination);
  const [selectedMedicalSupplies, setselectedMedicalSupplies] =
    useState<TMedicalSupplies | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => {
    return setIsOpenModal(true);
  };
  const onCloseModal = () => {
    return setIsOpenModal(false);
  };
  const [modalType, setModalType] = useState<MedicalSuppliesModalType>('add');
  const onChangeModalType = (type: MedicalSuppliesModalType) => {
    setModalType(type);
  };
  const { data: regulations } = useGetAllRegulation();
  const { data: medicalSuppliesGroups } = useGetAllMedicalSuppliesGroup();
  const { data: firms } = useGetAllFirm();

  const handleDelete = async (id: string | null) => {
    try {
      const res = await medicalSuppliesApi.deleteMedicalSupplies(id);
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

  const column: ColumnsType<TMedicalSupplies> = [
    {
      title: t('ID'),
      dataIndex: 'id',
      width: 100,
      align: 'center',
    },
    {
      title: t('tenTheoBaoHiem'),
      dataIndex: 'tenTheoBaoHiem',
      width: 300,
    },
    {
      title: t('tenTheoThuongMai'),
      dataIndex: 'tenTheoThuongMai',
      width: 350,
    },
    {
      title: t('maHang'),
      dataIndex: 'maHang',
      width: 350,
    },
    {
      title: t('quyCachId'),
      dataIndex: 'quyCachId',
      width: 350,
      render: (value: number) => {
        const regs = regulations?.data?.find(
          reg => Number(reg.id) === Number(value),
        );
        return regs ? regs.name : '';
      },
    },
    {
      title: t('nhomVTYTId'),
      dataIndex: 'nhomVTYTId',
      width: 350,
      render: (value: number) => {
        const medicalSuppliesGroup = medicalSuppliesGroups?.data?.find(
          medicalSuppliesGroup =>
            Number(medicalSuppliesGroup.id) === Number(value),
        );
        return medicalSuppliesGroup ? medicalSuppliesGroup.name : '';
      },
    },
    {
      title: t('hangSanXUATId'),
      dataIndex: 'hangSanXUATId',
      width: 350,
      render: (value: string) => {
        const firm = firms?.data?.find(
          firm => String(firm.id) === String(value),
        );
        return firms ? firm?.tenSanPham : null;
      },
    },
    {
      title: t('nuocSanXUATId'),
      dataIndex: 'nuocSanXUATId',
      width: 350,
    },
    {
      title: t('donViTINHId'),
      dataIndex: 'donViTINHId',
      width: 350,
    },
    {
      title: t('giaTriBHChiTra'),
      dataIndex: 'giaTriBHChiTra',
      width: 350,
    },
    {
      title: t('donViApKQDTId'),
      dataIndex: 'donViApKQDTId',
      width: 350,
    },
    {
      title: t('nhaThau'),
      dataIndex: 'nhaThau',
      width: 350,
    },
    {
      title: t('nhomTCKT'),
      dataIndex: 'nhomTCKT',
      width: 350,
    },
    {
      title: t('description'),
      dataIndex: 'description',
      width: 350,
    },
    {
      title: t('Action'),
      dataIndex: 'thaoTac',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_, record: TMedicalSupplies) => {
        return (
          <>
            <ButtonCustom.View
              type='link'
              style={{ color: token['green-7'] }}
              icon={<EditOutlined />}
              size='small'
              onClick={() => {
                setselectedMedicalSupplies(record);
                onOpenModal();
                onChangeModalType('edit');
              }}
            ></ButtonCustom.View>
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
                {t('Add')}
              </ButtonCustom.Create>
            </>
          }
          title={t('MedicalSupplies')}
          columns={column}
          data={medicalSupplies?.data?.content || []}
          pagination={{
            pageNum: medicalSupplies?.data?.pageNum,
            pageSize: medicalSupplies?.data?.pageSize,
            totalElements: medicalSupplies?.data?.totalElements,
            onChange: onPaginationChange,
          }}
          isLoading={isLoading}
          isRowSelection={false}
          bordered
          scroll={{ x: 200, y: 300 }}
        ></TableCustom>
      </Space>
      <MedicalSuppliesModal
        key={selectedMedicalSupplies?.id}
        modalType={modalType}
        show={isOpenModal}
        data={selectedMedicalSupplies}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></MedicalSuppliesModal>
    </>
  );
};

export default MedicalSupplies;
