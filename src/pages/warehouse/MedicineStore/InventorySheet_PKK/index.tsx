import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
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
import { ColumnType } from 'antd/es/table';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { DATE_FORMAT } from 'src/constants/common/common';
import {
  KHO_KIEM_KE,
  NGUON_THUOC,
  TINH_TRANG,
} from 'src/constants/dumb/inventory';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  InventoryModelType,
  TFilterInventory,
  TInventoryFields,
  TInventorySheet,
} from 'src/constants/types/medicineStore/inventorySheet';
import inventoryApi, {
  useInventory,
} from 'src/helpers/api/medicineStore/inventory';
import useFilter from 'src/hooks/useFilter';

import InventoryModal from './InventoryModal/InventoryModal';

const InventorySheet = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
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
      label: t('billId'),
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
      label: t('Form Title'),
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
      label: t('importWarehouse'),
      name: 'tenKho',
      type: TYPE_FIELD.SELECT,
      allowClear: true,
      options: KHO_KIEM_KE,
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
      label: t('Supplier_ID'),
      type: TYPE_FIELD.SELECT,
      options: NGUON_THUOC,
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
      label: t('status'),
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
      label: t('From_date'),
      name: 'fromDate',
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
      label: t('To_date'),
      name: 'toDate',
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
      title: 'STT',
      dataIndex: 'id',
      width: 50,
      render(_, __, index) {
        return index + 1;
      },
    },
    //{ title: 'Kho Id', dataIndex: 'khoId', width: 100 },
    { title: 'Mã phiếu', dataIndex: 'maPhieu', width: 100 },

    {
      title: 'Kho ID',
      dataIndex: 'khoId',
      width: 200,
    },
    {
      title: 'Kho nhập',
      dataIndex: 'tenKho',
      width: 200,
    },
    {
      title: 'Nhà cung cấp',
      dataIndex: 'tieuDe',
      width: 200,
    },
    { title: 'Nguồn thuốc ID', dataIndex: 'nguonThuocId', width: 200 },
    { title: 'Nguồn thuốc', dataIndex: 'nguonThuoc', width: 200 },
    { title: 'Trạng thái phiếu', dataIndex: 'tinhTrang', width: 200 },
    //{ title: 'Ngày kiểm kê', dataIndex: 'ngayKiemKe', width: 200 },
    {
      title: 'Người lập phiếu',
      dataIndex: 'nguoiKiemKe',
      width: 200,
    },
    {
      title: 'Tổng giá trị',
      dataIndex: 'tongGiaTri',
      width: 200,
    },
    {
      title: 'Ghi chú',
      width: 100,
      dataIndex: 'action',
      fixed: 'right',
      align: 'center',
      render: (_, record: TInventorySheet) => {
        return (
          <Flex justify='center'>
            <Button
              onClick={() => {
                setSelectedInventory(record);
                onChangeModalType('edit');
                onOpenModal();
              }}
              type='link'
              style={{ color: token['green-7'] }}
              size='small'
              icon={<EditOutlined />}
            ></Button>
            <Popconfirm
              title='Bạn có chắc chắn muốn xóa phiếu kiểm kê này?'
              onConfirm={() => handleDeletePhieuKiemKe(record.id)}
              okText='Ok'
            >
              <Button
                size='small'
                type='link'
                danger
                icon={<DeleteOutlined />}
              ></Button>
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
          <Row>
            <Button icon={<ReloadOutlined />} style={{ marginRight: '1%' }}>
              Xóa tìm kiếm
            </Button>
            <Button type='primary' icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
          </Row>
        </Card>
        <Card title='Danh sách phiếu kiểm kê' style={{ paddingBottom: '1%' }}>
          <TableCustom
            extra={
              <>
                <Button
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={() => {
                    onChangeModalType('add');
                    onOpenModal();
                  }}
                >
                  Thêm phiếu kiểm kê
                </Button>
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
