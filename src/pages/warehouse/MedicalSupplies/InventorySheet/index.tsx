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

import InventoryModal from './InventoryModal/InventoryModal';

const InventorySheet = () => {
  const { data: warehouses } = useGetAllWarehouseMedicineCategory();
  const { data: medicineGroups } = useGetAllMedicineGroup();

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

  const { filter, setFilter, pagination, onPaginationChange } =
    useFilter<TFilterInventory>({
      defaultFilter: {
        maPhieu: '',
        tieuDe: '',
        tenKho: '',
        nguonThuoc: '',
        tinhTrang: '',
        createDate: '',
        modifyDate: '',
      },
    });

  const { data: inventory, isLoading, mutate } = useInventory(pagination);

  const inputSearch: InputProps[] = [
    {
      label: t('Receipt Code'), // Translated string
      type: TYPE_FIELD.TEXT,
      name: 'maPhieu',
      allowClear: true,
      value: filter.maPhieu,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          maPhieu: e.target.value,
        }),
    },
    {
      label: t('Receipt Title'), // Translated string
      type: TYPE_FIELD.TEXT,
      name: 'tieuDe',
      allowClear: true,
      value: filter.tieuDe,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setFilter({
          ...filter,
          tieuDe: e.target.value,
        }),
    },
    {
      label: t('Inventory Warehouse'), // Translated string
      name: 'tenKho',
      type: TYPE_FIELD.SELECT,
      allowClear: true,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse.tenKho ?? '',
          label: warehouse.tenKho ?? '',
        }),
      ),
      value: filter.tenKho,
      onChange: (value: string | null) => {
        const newValue = value ? value : null;
        setFilter({
          ...filter,
          tenKho: newValue,
        });
      },
    },
    {
      label: t('Medicine Source'), // Translated string
      type: TYPE_FIELD.SELECT,
      options: medicineGroups?.data?.map(
        (medicineGroup: TMedicineGroupCategory) => ({
          value: medicineGroup.tenNhomThuoc ?? '',
          label: medicineGroup.tenNhomThuoc ?? '',
        }),
      ),
      value: filter.nguonThuoc,
      allowClear: true,
      name: 'nguonThuoc',
      onChange: (value: string | null) => {
        const newValue = value ? value : null;
        setFilter({
          ...filter,
          nguonThuoc: newValue,
        });
      },
    },
    {
      label: t('Receipt Status'), // Translated string
      name: 'tinhTrang',
      type: TYPE_FIELD.SELECT,
      options: TINH_TRANG,
      allowClear: true,
      value: filter.tinhTrang,
      onChange: (value: string | null) => {
        const newValue = value ? value : null;
        setFilter({
          ...filter,
          tinhTrang: newValue,
        });
      },
    },
    {
      label: t('Created Date From'), // Translated string
      name: 'createDate',
      value: filter.createDate,
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : null;
        setFilter({
          ...filter,
          createDate: newValue,
        });
      },
    },
    {
      label: t('Created Date To'), // Translated string
      name: 'modifyDate',
      value: filter.modifyDate,
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : null;
        setFilter({
          ...filter,
          modifyDate: newValue,
        });
      },
    },
  ];

  const columns: ColumnsType<TInventorySheet> = [
    {
      title: t('STT'),
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
        return status ? status.label : '';
      },
    }, // Translated string
    { title: t('Inventory Date'), dataIndex: 'createdDate', width: 200 }, // Translated string
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
      title: t('Note'),
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
        <Card title='Danh sách phiếu kiểm kê' style={{ paddingBottom: '1%' }}>
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
