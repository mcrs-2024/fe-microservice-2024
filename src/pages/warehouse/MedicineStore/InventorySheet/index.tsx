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
import dayjs, { Dayjs } from 'dayjs';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import TableCustom from 'src/components/TableCustom';
import { DATE_FORMAT } from 'src/constants/common/common';
import { TINH_TRANG } from 'src/constants/dumb/phieuNhap';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import {
  InventoryModelType,
  TFilterInventory,
  TInventorySheet,
} from 'src/constants/types/medicineStore/inventorySheet';
import {
  TMedicineGroupCategory,
  TWarehouseMedicineCategory,
} from 'src/constants/types/medicineStore/medicineCategory';
import inventoryApi, {
  useInventory,
} from 'src/helpers/api/medicineStore/inventory';
import { useGetAllMedicineGroup } from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineGroupCategory';
import { useGetAllWarehouseMedicineCategory } from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';

import InventoryModal from './InventoryModal/InventoryModal';

const InventorySheet = () => {
  const { data: warehouses } = useGetAllWarehouseMedicineCategory();
  const { data: medicineGroups } = useGetAllMedicineGroup();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { token } = theme.useToken();
  const [selectedInventory, setSelectedInventory] =
    useState<TInventorySheet | null>(null);
  const [modalType, setModalType] = useState<InventoryModelType>('add');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);

  const handleDeletePhieuKiemKe = async (khoId: string | null) => {
    try {
      const res = await inventoryApi.deleteInventory(khoId);
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
  //console.log('onChangeModalType:', onChangeModalType('add'));
  const onChangeModalType = (type: InventoryModelType) => {
    setModalType(type);
  };

  const {
    filter,
    setFilter,
    pagination,
    onPaginationChange,
    onChangeFilter,
    debouncedFilter,
  } = useFilter<TFilterInventory>({
    defaultFilter: {
      maPhieu: null,
      tieuDe: null,
      tenKho: null,
      nguonThuoc: null,
      tinhTrang: null,
      createDate: null,
      modifyDate: null,
    },
  });

  const {
    data: inventory,
    isLoading,
    mutate,
  } = useInventory(pagination, debouncedFilter);

  const inputSearch: InputProps[] = [
    {
      label: t('Receipt Code'), // Translated string
      type: TYPE_FIELD.TEXT,
      name: 'maPhieu',
      allowClear: true,
      value: filter.maPhieu,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChangeFilter('maPhieu', e.target.value);
      },
    },
    {
      label: t('Receipt Title'), // Translated string
      type: TYPE_FIELD.TEXT,
      name: 'tieuDe',
      allowClear: true,
      value: filter.tieuDe,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChangeFilter('tieuDe', e.target.value);
      },
    },
    {
      label: t('Inventory Warehouse'), // Translated string
      name: 'tenKho',
      type: TYPE_FIELD.SELECT,
      allowClear: true,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.id ?? null,
          label: warehouse.tenKho ?? null,
        }),
      ),
      value: filter.tenKho,
      onChange: (value: string) => {
        onChangeFilter('tenKho', value);
      },
    },
    {
      label: t('Medicine Source'), // Translated string
      type: TYPE_FIELD.SELECT,
      options: medicineGroups?.data?.map(
        (medicineGroup: TMedicineGroupCategory) => ({
          value: medicineGroup.id ?? null,
          label: medicineGroup.tenNhomThuoc ?? null,
        }),
      ),
      value: filter.nguonThuoc,
      allowClear: true,
      name: 'nguonThuoc',
      onChange: (value: string) => {
        onChangeFilter('nguonThuoc', value);
      },
    },
    {
      label: t('Receipt Status'), // Translated string
      name: 'tinhTrang',
      type: TYPE_FIELD.SELECT,
      options: TINH_TRANG,
      allowClear: true,
      value: filter.tinhTrang,
      onChange: (value: string) => {
        onChangeFilter('tinhTrang', value);
      },
    },
    {
      label: t('Created Date From'), // Translated string
      name: 'createDate',
      value: filter.createDate,
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      onChange: (_, dateString: string) => {
        onChangeFilter('createDate', dateString);
      },
    },
    {
      label: t('Created Date To'), // Translated string
      name: 'modifyDate',
      value: filter.modifyDate,
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      onChange: (_, dateString: string) => {
        onChangeFilter('modifyDate', dateString);
      },
    },
  ];

  const columns: ColumnsType<TInventorySheet> = [
    {
      title: t('ID'),
      dataIndex: 'id',
      width: 50,
      render(_, __, index) {
        return index + 1;
      },
    },
    { title: t('Receipt Code'), dataIndex: 'maPhieu', width: 100 }, // Translated string
    {
      title: t('Warehouse ID'),
      dataIndex: 'khoId',
      width: 200,
    },
    {
      title: t('Inventory Warehouse'),
      dataIndex: 'tenKho',
      width: 200,
    },
    {
      title: t('Receipt Title'),
      dataIndex: 'tieuDe',
      width: 200,
    },
    { title: t('Medicine Source ID'), dataIndex: 'nguonThuocId', width: 200 }, // Translated string
    { title: t('Medicine Source'), dataIndex: 'nguonThuoc', width: 200 }, // Translated string
    {
      title: t('Receipt Status'),
      dataIndex: 'tinhTrang',
      width: 200,
      render: (value: number) => {
        const status = TINH_TRANG.find(
          status => Number(status.value) === Number(value),
        );
        return status ? status.label : null;
      },
    }, // Translated string
    {
      title: t('Inventory Date'),
      dataIndex: 'createdDate',
      width: 200,
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    }, // Translated string
    {
      title: t('Receipt Creator'),
      dataIndex: 'nguoiKiemKe',
      width: 200,
    },
    {
      title: t('Total Value'),
      dataIndex: 'tongGiaTri',
      width: 200,
    },
    {
      title: t('Action'),
      width: 100,
      dataIndex: 'action',
      fixed: 'right',
      align: 'center',
      render: (_, record: TInventorySheet) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.Edit
              onClick={() => {
                setSelectedInventory(record);
                onChangeModalType('edit');
                onOpenModal();
              }}
              type='link'
              style={{ color: token['green-7'] }}
              size='small'
              icon={<EditOutlined />}
            ></ButtonCustom.Edit>
            <Popconfirm
              title={t(t('are_you_sure_you_want_to_delete_this_record'))} // Translated string
              onConfirm={() => handleDeletePhieuKiemKe(record.id)}
              okText={t('Ok')} // Translated string
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

  useEffect(() => {
    dispatch(
      addButton({
        action: PERMISSION_CODES.CREATE,
        id: 'addButtonInventorySheet',
        className: 'btn-sub',
        type: 'primary',
        icon: <PlusOutlined />,
        onClick: () => {
          onChangeModalType('add');
          onOpenModal();
        },
        children: 'Add',
      }),
    );
  }, [dispatch]);

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card>
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 8 }}
              gutter={[0, 8]}
            ></InputFields>
          </Row>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              columnGap: '8px',
            }}
          >
            <Button icon={<ReloadOutlined />}>{t('Clear Search')}</Button>
            <Button type='primary' icon={<SearchOutlined />}>
              {t('Search')}
            </Button>
          </div>
        </Card>
        <Card style={{ paddingBottom: '1%' }}>
          <TableCustom
            title={t('Inventory Receipt List')}
            columns={columns}
            data={inventory?.data?.content || []}
            isLoading={isLoading}
            isRowSelection={true}
            pagination={{
              pageSize: inventory?.data?.pageSize,
              pageNum: inventory?.data?.pageNum,
              totalElements: inventory?.data?.totalElements,
              onChange: onPaginationChange,
            }}
            scroll={{ x: 400 }}
          ></TableCustom>
        </Card>
      </Space>

      <InventoryModal
        key={selectedInventory?.id}
        modalType={modalType}
        show={isOpenModal}
        inventory={selectedInventory}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      ></InventoryModal>
    </>
  );
};

export default InventorySheet;
