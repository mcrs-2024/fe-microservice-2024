import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Dropdown,
  Flex,
  Menu,
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
  TFilterMedicine,
  TWarehouseMedicine,
  WarehouseMedicineModelType,
} from 'src/constants/types/medicineStore/warehouseMedicine';
import { useGetAllHoatChat } from 'src/helpers/api/medicineStore/medicineStoreCategory/hoatChatCategory';
import {
  useGetAllGroupMedicine,
  useGetAllTypeMedicine,
  useMeasure,
} from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import warehouseApi, {
  useWarehouseMedicine,
} from 'src/helpers/api/medicineStore/warehouse';
import useFilter from 'src/hooks/useFilter';
import WarehouseMedicineModal from 'src/pages/warehouse/MedicineStore/WarehouseMedicine/WarehouseMedicineModal';

const MaterialsWarehouse = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const [modalType, setModalType] = useState<WarehouseMedicineModelType>('add');
  const [selectedWarehouseMedicine, setSelectedWarehouseMedicine] =
    useState<TWarehouseMedicine | null>(null);
  const onChangeModalType = (type: WarehouseMedicineModelType) => {
    setModalType(type);
  };
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const { data: groupMedicines } = useGetAllGroupMedicine();
  const { data: typeMedicines } = useGetAllTypeMedicine();
  const { data: hoatChats } = useGetAllHoatChat();
  const { data: measures } = useMeasure();

  const {
    filter,
    pagination,
    onPaginationChange,
    debouncedFilter,
    onChangeFilter,
  } = useFilter<TFilterMedicine>({
    defaultFilter: {
      hangSanXuat: null,
      tenThuoc: null,
      ngayHetHan: null,
      ngaySanXuat: null,
    },
  });
  const {
    data: warehouseMedicine,
    isLoading,
    mutate,
  } = useWarehouseMedicine(pagination, debouncedFilter);

  const handleDeleteWarehouseMedicine = async (warehouseId: string | null) => {
    try {
      const res = await warehouseApi.deleteWarehouse(warehouseId);
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
      label: t('Source_of_medicine'),
      name: 'hangSanXuat',
      key: 'hangSanXuat',
      allowClear: true,
      value: filter.hangSanXuat,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChangeFilter('hangSanXuat', e.target.value);
      },
    },
    {
      label: t('To_date'),
      name: 'medicineDateImport',
      value: filter.ngayHetHan,
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      onChange: (_, dayString: string) => {
        onChangeFilter('ngayHetHan', dayString);
      },
    },
    {
      label: t('From_date'),
      name: 'medicineEndImport',
      value: filter.ngaySanXuat,
      type: TYPE_FIELD.DATE_PICKER,
      allowClear: true,
      onChange: (_, dayString: string) => {
        onChangeFilter('ngaySanXuat', dayString);
      },
    },
    {
      label: t('Medicine_name'),
      type: TYPE_FIELD.TEXT,
      name: 'tenThuoc',
      allowClear: true,
      value: filter.tenThuoc,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('tenThuoc', e.target.value),
    },
  ];

  const columns: ColumnsType<TWarehouseMedicine> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 150,
      render(_, __, index) {
        return index + 1;
      },
      align: 'center',
    },
    {
      title: 'VAT',
      dataIndex: 'vat',
      width: 200,
      align: 'center',
    },
    {
      title: t('Storage'),
      dataIndex: 'baoQuan',
      width: 150,
      align: 'center',
    },
    {
      title: t('Receipt_Detail_ID'),
      dataIndex: 'chiTietPhieuId',
      width: 200,
      align: 'center',
    },
    {
      title: t('description'),
      dataIndex: 'description',
      width: 150,
      align: 'center',
    },
    {
      title: t('Unit'),
      dataIndex: 'donViTinh',
      width: 150,
      align: 'center',
      render: (value: string) => {
        const measure = measures?.data?.find(
          measure => String(measure.id) === String(value),
        );
        return measure ? measure.name : null;
      },
    },
    {
      title: t('Manufacturer_ID'),
      dataIndex: 'hangSanXuatId',
      width: 200,
      align: 'center',
    },
    {
      title: t('Active_Ingredient'),
      dataIndex: 'hoatChat',
      width: 150,
      align: 'center',
      render: (value: string) => {
        const hoatChat = hoatChats?.data?.find(
          hChat => String(hChat.id) === String(value),
        );
        return hoatChat ? hoatChat.tenHoatChat : null;
      },
    },
    {
      title: t('Health_Insurance_Code'),
      dataIndex: 'isBhyt',
      width: 200,
      align: 'center',
      render: (value: number) => {
        return value === 1 ? 'Có' : 'Không';
      },
    },
    {
      title: t('Warehouse_ID'),
      dataIndex: 'khoId',
      width: 200,
      align: 'center',
    },
    {
      title: t('Type_of_Medicine'),
      dataIndex: 'loaiThuoc',
      width: 150,
      align: 'center',
      render: (value: string) => {
        const typeMedicine = typeMedicines?.data?.find(
          tMedicine => String(tMedicine.id) === String(value),
        );
        return typeMedicine ? typeMedicine.tenLoaiThuoc : null;
      },
    },
    {
      title: t('Expiry_Date'),
      dataIndex: 'ngayHetHan',
      width: 200,
      align: 'center',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: t('Manufacturing_Date'),
      dataIndex: 'ngaySanXuat',
      width: 200,
      align: 'center',
      render: (date: string) => dayjs(date).format('DD-MM-YYYY'),
    },
    {
      title: t('Supplier_ID'),
      dataIndex: 'nhaCungCapId',
      width: 200,
      align: 'center',
    },
    {
      title: t('Medicine_Group'),
      dataIndex: 'nhomThuoc',
      width: 150,
      align: 'center',
      render: (value: string) => {
        const groupMedicine = groupMedicines?.data?.find(
          gMedicine => String(gMedicine.id) === String(value),
        );
        return groupMedicine ? groupMedicine.tenNhomThuoc : null;
      },
    },
    {
      title: t('Note'),
      dataIndex: 'note',
      width: 200,
      align: 'center',
    },
    {
      title: t('Country_of_Manufacture_ID'),
      dataIndex: 'nuocSanXuatId',
      width: 200,
      align: 'center',
    },
    {
      title: t('Country_of_Manufacture'),
      dataIndex: 'nuocSanXuat',
      width: 200,
      align: 'center',
    },
    {
      title: t('Lot_Number'),
      dataIndex: 'soLo',
      width: 200,
      align: 'center',
    },
    {
      title: t('Quantity_Imported'),
      dataIndex: 'soLuongNhap',
      width: 200,
      align: 'center',
    },
    {
      title: t('Medicine_Name'),
      dataIndex: 'tenThuoc',
      width: 150,
      align: 'center',
    },
    {
      title: t('Total_Amount'),
      dataIndex: 'thanhTien',
      width: 200,
      align: 'center',
    },
    {
      title: t('Medicine_ID'),
      dataIndex: 'thuocId',
      width: 200,
      align: 'center',
    },
    {
      title: t('Inventory'),
      dataIndex: 'tonKho',
      width: 200,
      align: 'center',
    },
    {
      title: t('Unit_Price_Import'),
      dataIndex: 'donGiaNhap',
      width: 200,
      align: 'center',
    },
    {
      title: t('Unit_Price_Export'),
      dataIndex: 'donGiaXuat',
      width: 200,
      align: 'center',
    },
    {
      title: t('Unit_Price'),
      dataIndex: 'donGia',
      width: 200,
      align: 'center',
    },
    {
      title: t('Receipt_ID'),
      dataIndex: 'phieuId',
      width: 200,
      align: 'center',
    },
    {
      title: t('status'),
      dataIndex: 'tinhTrang',
      width: 200,
      align: 'center',
      render: (value: number) => {
        const status = TINH_TRANG.find(
          status => Number(status.value) === Number(value),
        );
        return status ? status.label : '';
      },
    },
    {
      title: t('Manufacturer'),
      dataIndex: 'hangSanXuat',
      width: 200,
      align: 'center',
    },
    {
      title: t('Supplier'),
      dataIndex: 'nhaCungCap',
      width: 200,
      align: 'center',
    },
    {
      title: t('Unit_ID'),
      dataIndex: 'donViTinhId',
      width: 200,
      align: 'center',
    },
    {
      title: t('Unit'),
      dataIndex: 'donViTinh',
      width: 150,
      align: 'center',
      render: (value: string) => {
        const measure = measures?.data?.find(
          measure => String(measure.id) === String(value),
        );
        return measure ? measure.name : null;
      },
    },
    {
      title: t('Packaging'),
      dataIndex: 'dongGoi',
      width: 200,
      align: 'center',
    },
    {
      title: t('Initial_Import'),
      dataIndex: 'nhapBanDau',
      width: 200,
      align: 'center',
    },
    {
      title: t('Registration_Number'),
      dataIndex: 'soDangKy',
      width: 200,
      align: 'center',
    },
    {
      title: t('Formulation'),
      dataIndex: 'baoChe',
      width: 200,
      align: 'center',
    },
    {
      title: t('Formulation_ID'),
      dataIndex: 'baoCheId',
      width: 200,
      align: 'center',
    },
    {
      title: t('Main_Drug'),
      dataIndex: 'duocChinh',
      width: 200,
      align: 'center',
    },
    {
      title: t('Main_Drug_ID'),
      dataIndex: 'duocChinhId',
      width: 200,
      align: 'center',
    },
    {
      title: t('Goods_Value'),
      dataIndex: 'giaTriHang',
      width: 200,
      align: 'center',
    },
    {
      title: t('Supplier_Lot_Number'),
      dataIndex: 'soLoNcc',
      width: 200,
      align: 'center',
    },
    {
      title: t('Quantity_Exported'),
      dataIndex: 'soLuongDaXuat',
      width: 200,
      align: 'center',
    },
    {
      title: t('Quantity_Expired'),
      dataIndex: 'soLuongHetHan',
      width: 200,
      align: 'center',
    },
    {
      title: t('Quantity_Returned_to_Supplier'),
      dataIndex: 'soLuongTraNcc',
      width: 200,
      align: 'center',
    },
    {
      title: t('Reserved_Quantity'),
      dataIndex: 'soLuongDuTru',
      width: 200,
      align: 'center',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      fixed: 'right',
      width: 100,
      render: (_, record: TWarehouseMedicine) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              size='small'
              icon={<EditOutlined />}
              onClick={() => {
                setSelectedWarehouseMedicine(record);
                onChangeModalType('edit');
                onOpenModal();
              }}
            ></ButtonCustom.Edit>
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDeleteWarehouseMedicine(record.id)}
              okText='Ok'
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

  const handleMenuClick = (e: any) => {
    //
  };

  const EXPORT_OPTION = [
    {
      key: 'Excel',
      title: 'Excel',
      Icon: <FileExcelOutlined />,
    },
    {
      key: 'PDF',
      title: 'PDF',
      Icon: <FilePdfOutlined />,
    },
  ];

  const menu = (
    <Menu onClick={handleMenuClick}>
      {EXPORT_OPTION.map(option => (
        <Menu.Item key={option.key}>
          {option.Icon} &nbsp;
          {option.title}
        </Menu.Item>
      ))}
    </Menu>
  );

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
            <Button icon={<ReloadOutlined />}>{t('Delete_Search')}</Button>
            <Button type='primary' icon={<SearchOutlined />}>
              {t('Search')}
            </Button>
          </div>
        </Card>

        <Card>
          <TableCustom
            columns={columns}
            extra={
              <>
                <ButtonCustom.Create
                  type='primary'
                  onClick={() => {
                    setModalType('add');
                    onOpenModal();
                  }}
                  icon={<PlusOutlined />}
                >
                  {t('Add')}
                </ButtonCustom.Create>
                <>
                  <Menu>
                    <Dropdown.Button
                      overlay={menu}
                      style={{ marginBottom: '1%' }}
                    >
                      {t('Export_File')}
                    </Dropdown.Button>
                  </Menu>
                </>
              </>
            }
            data={warehouseMedicine?.data?.content || []}
            pagination={{
              pageSize: warehouseMedicine?.data?.pageSize,
              pageNum: warehouseMedicine?.data?.pageNum,
              totalElements: warehouseMedicine?.data?.totalElements,
              onChange: onPaginationChange,
            }}
            isRowSelection={true}
            isLoading={isLoading}
            scroll={{ x: 400, y: 800 }}
          ></TableCustom>
        </Card>
      </Space>

      <WarehouseMedicineModal
        key={selectedWarehouseMedicine?.id}
        modalType={modalType}
        show={isOpenModal}
        warehouse={selectedWarehouseMedicine}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      />
    </>
  );
};

export default MaterialsWarehouse;
