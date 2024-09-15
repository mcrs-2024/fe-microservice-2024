import { ChangeEvent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Flex, message, Modal, Space, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import { DATE_FORMAT } from 'src/constants/common/common';
import { BHYT } from 'src/constants/dumb/medicineCategory';
import { TINH_TRANG } from 'src/constants/dumb/phieuNhap';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TInventorySheet } from 'src/constants/types/medicineStore/inventorySheet';
import { TMeasureMedicine } from 'src/constants/types/medicineStore/MeasureMedicine';
import {
  THoatChatCategory,
  TMedicineGroupCategory,
  TMedicineTypeCategory,
} from 'src/constants/types/medicineStore/medicineCategory';
import {
  TWarehouseMedicine,
  WarehouseMedicineModelType,
} from 'src/constants/types/medicineStore/warehouseMedicine';
import { useGetAllHoatChat } from 'src/helpers/api/medicineStore/medicineStoreCategory/hoatChatCategory';
import { useGetAllMedicineGroup } from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineGroupCategory';
import { useGetAllMedicineType } from 'src/helpers/api/medicineStore/medicineStoreCategory/medicineTypeCategory';
import { useMeasure } from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import warehouseApi from 'src/helpers/api/medicineStore/warehouse';
import { textOnly, yupObject } from 'src/utils/validate';
import * as Yup from 'yup';

interface AddInventoryProps {
  show: boolean;
  modalType: WarehouseMedicineModelType;
  warehouse: TWarehouseMedicine | null;
  onHide: () => void;
  onSuccess: () => void;
}

const defaultValue: TWarehouseMedicine = {
  id: null,
  vat: null,
  baoQuan: null,
  chiTietPhieuId: null,
  description: null,
  donViTinh: null,
  hangSanXuatId: null,
  hoatChat: null,
  isBhyt: 0,
  khoId: null,
  loaiThuoc: null,
  ngayHetHan: null,
  ngaySanXuat: null,
  nhaCungCapId: null,
  nhomThuoc: null,
  note: null,
  nuocSanXuatId: null,
  soLo: null,
  soLuongNhap: null,
  tenThuoc: null,
  thanhTien: null,
  thuocId: null,
  tonKho: null,
  donGiaNhap: null,
  donGiaXuat: null,
  donGia: null,
  phieuId: null,
  tinhTrang: null,
  hangSanXuat: null,
  nhaCungCap: null,
  nuocSanXuat: null,
  donViTinhId: null,
  dongGoi: null,
  nhapBanDau: null,
  soDangKy: null,
  baoChe: null,
  baoCheId: null,
  duocChinh: null,
  duocChinhId: null,
  giaTriHang: null,
  soLoNcc: null,
  soLuongDaXuat: null,
  soLuongHetHan: null,
  soLuongTraNcc: null,
  soLuongDuTru: null,
};

const WarehouseMedicineModal = ({
  show,
  modalType,
  warehouse,
  onHide,
  onSuccess,
}: AddInventoryProps) => {
  const { data: medicineTypes } = useGetAllMedicineType();
  const { data: medicineGroups } = useGetAllMedicineGroup();
  const { data: activeIngrediens } = useGetAllHoatChat();
  const { data: measures } = useMeasure();
  const isDisable = modalType === 'view';
  const { t } = useTranslation();

  const formSchema = yupObject({
    donViTinh: Yup.string().required(t('Please_choose_measure')).nullable(),
    isBhyt: Yup.boolean().required('Please_select_health_insurance').nullable(),
    // ngayHetHan: Yup.string()
    //   .required(t('Please_select_the_expiration_date'))
    //   .nullable(),
    // ngaySanXuat: Yup.string()
    //   .required(t('Please_select_the_production_date'))
    //   .nullable(),
    soLo: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_batch_number'))
      .nullable(),
    tenThuoc: textOnly
      .max(150, t('Too_long'))
      .required(t('Please_enter_medicine_name'))
      .nullable(),
    thuocId: Yup.string()
      .min(0, t('Please_enter_a_positive_number'))
      .max(20, t('Too_long'))
      .required(t('Please_enter_medicine_ID'))
      .nullable(),
    donGiaNhap: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_unit_price_import'))
      .nullable(),
    donGiaXuat: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_unit_price_for_export'))
      .nullable(),
    donGia: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_unit_price'))
      .nullable(),
    donViTinhId: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .max(20, t('Too_long'))
      .required(t('Please_enter_calculate_code_units'))
      .nullable(),
    dongGoi: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_packaging'))
      .nullable(),
    soDangKy: Yup.number()
      .min(0, t('Please enter a positive number'))
      .required(t('Please_enter_the_registration_number'))
      .nullable(),
    baoChe: textOnly
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_formulation'))
      .nullable(),
    baoCheId: Yup.string()
      .min(0, t('Please_enter_a_positive_number'))
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_formulation_code'))
      .nullable(),
    duocChinh: textOnly.required(t('Please_enter_main_pharmacy')).nullable(),
    duocChinhId: Yup.string()
      .min(0, t('Please_enter_a_positive_number'))
      .max(20, t('Too_long'))
      .required(t('Please_enter_main_pharmacy_code'))
      .nullable(),
    soLoNcc: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_supplier_batch_number'))
      .nullable(),
    baoQuan: textOnly
      .required(t('Please_enter_storage_instructions'))
      .nullable(),
    //*********************************************************************** */
    nhaCungCap: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_supplier'))
      .nullable(),
    nhaCungCapId: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_supplier_code'))
      .nullable(),
    nuocSanXuatId: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_country_of_origin_code'))
      .nullable(),
    hangSanXuatId: Yup.string()
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_manufacturer_code'))
      .nullable(),
    hangSanXuat: Yup.string()
      .max(150, t('Too_long'))
      .required(t('Please_enter_the_manufacturer'))
      .nullable(),
    tonKho: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_stock_quantity'))
      .nullable(),
    //********************************************************** */
    chiTietPhieuId: Yup.string()
      .min(0, t('Please_enter_a_positive_number'))
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_detail_code_of_the_voucher'))
      .nullable(),
    phieuId: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_voucher_code'))
      .nullable(),
    khoId: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .max(20, t('Too_long'))
      .required(t('Please_enter_the_warehouse_code'))
      .nullable(),
    soLuongNhap: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_quantity_received'))
      .nullable(),
    soLuongDaXuat: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please enter the quantity dispatched'))
      .nullable(),
    soLuongHetHan: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_quantity_expired'))
      .nullable(),
    soLuongDuTru: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_projected_quantity'))
      .nullable(),
    tinhTrang: Yup.string()
      .required(t('Please_select_the_condition'))
      .nullable(),
    giaTriHang: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_item_value'))
      .nullable(),
    vat: Yup.string().required(t('Please_enter_VAT')).nullable(),
    nhapBanDau: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_initial_value'))
      .nullable(),
    nuocSanXuat: textOnly
      .required(t('Please_enter_the_country_of_origin'))
      .nullable(),
    soLuongTraNcc: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_quantity_returned_to_the_supplier'))
      .nullable(),
    thanhTien: Yup.number()
      .min(0, t('Please_enter_a_positive_number'))
      .required(t('Please_enter_the_total_amount'))
      .nullable(),
  });

  const formControl = useFormik<TWarehouseMedicine>({
    initialValues: defaultValue,
    validationSchema: formSchema,
    onSubmit: async (data: TWarehouseMedicine) => {
      try {
        if (modalType === 'edit' && warehouse) {
          const res = await warehouseApi.updateWarehouse(data);
          if (res.data.code === 200) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        } else {
          const res = await warehouseApi.createWarehouse(data);
          if (res.data.code === 200) {
            message.success(res.data.message);
            onSuccess();
            onHide();
            formControl.resetForm();
          } else {
            throw new Error(res.data.message);
          }
        }
      } catch (error) {
        message.error(error);
      }
    },
  });

  const handleChange = (key: keyof TWarehouseMedicine, value: any) => {
    formControl.setValues({
      ...formControl.values,
      [key]: value,
    });
  };

  const handleResetForm = () => {
    formControl.resetForm();
  };

  useEffect(() => {
    if (modalType === 'edit' && warehouse) {
      handleResetForm();
      formControl.setValues(warehouse);
    }
    if (modalType === 'add') {
      handleResetForm();
    }
  }, [modalType, warehouse]);

  const inputsMedicineInfo: InputProps[] = [
    {
      name: 'thuocId',
      key: 'thuocId',
      label: t('Medicine_Code'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.thuocId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('thuocId', e.target.value);
      },
    },
    {
      name: 'tenThuoc',
      key: 'tenThuoc',
      label: t('medicineName'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.tenThuoc,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tenThuoc', e.target.value);
      },
    },
    {
      name: 'loaiThuoc',
      key: 'loaiThuoc',
      label: t('medicineType'),
      type: TYPE_FIELD.SELECT,
      options: medicineTypes?.data.map(
        (medicineType: TMedicineTypeCategory) => ({
          value: medicineType.id ?? '',
          label: medicineType.tenLoaiThuoc ?? '',
        }),
      ),
      value: formControl.values.loaiThuoc,
      onChange: (value: string | null) => {
        handleChange('loaiThuoc', value);
      },
    },
    {
      name: 'nhomThuoc',
      key: 'nhomThuoc',
      label: t('medicineGroup'),
      type: TYPE_FIELD.SELECT,
      options: medicineGroups?.data.map(
        (medicineGroup: TMedicineGroupCategory) => ({
          value: medicineGroup.id ?? '',
          label: medicineGroup.tenNhomThuoc ?? '',
        }),
      ),

      value: formControl.values.nhomThuoc,
      onChange: (value: string | null) => {
        handleChange('nhomThuoc', value);
      },
    },
    {
      name: 'hoatChat',
      key: 'hoatChat',
      label: t('activeIngredient'),
      type: TYPE_FIELD.SELECT,
      options: activeIngrediens?.data.map(
        (activeIngredien: THoatChatCategory) => ({
          value: activeIngredien.id ?? '',
          label: activeIngredien.tenHoatChat ?? '',
        }),
      ),
      value: formControl.values.hoatChat,
      onChange: (value: string | null) => {
        handleChange('hoatChat', value);
      },
    },
    {
      name: 'donViTinhId',
      key: 'donViTinhId',
      require: true,
      label: t('Calculate_code_units'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.donViTinhId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('donViTinhId', e.target.value);
      },
    },
    {
      name: 'duocChinhId',
      key: 'duocChinhId',
      require: true,
      label: t('Main_pharmacy_code'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.duocChinhId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('duocChinhId', e.target.value);
      },
    },
    {
      name: 'duocChinh',
      key: 'duocChinh',
      label: t('Main_pharmacy'),
      require: true,
      type: TYPE_FIELD.TEXT,
      value: formControl.values.duocChinh,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('duocChinh', e.target.value);
      },
    },
    {
      name: 'donViTinh',
      key: 'donViTinh',
      label: t('measurementUnit'),
      type: TYPE_FIELD.SELECT,
      value: formControl.values.donViTinh,
      options: measures?.data?.map((measure: TMeasureMedicine) => ({
        value: measure.id,
        label: measure.name ?? '',
      })),
      onChange: (value: string | null) => {
        handleChange('donViTinh', value);
      },
    },
    {
      name: 'donGiaNhap',
      key: 'donGiaNhap',
      label: t('inputPrice'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.donGiaNhap,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('donGiaNhap', e.target.value);
      },
    },
    {
      name: 'donGiaXuat',
      key: 'donGiaXuat',
      label: t('outputPrice'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.donGiaXuat,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('donGiaXuat', e.target.value);
      },
    },
    {
      name: 'donGia',
      key: 'donGia',
      label: t('price'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.donGia,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('donGia', e.target.value);
      },
    },
    {
      name: 'ngaySanXuat',
      key: 'ngaySanXuat',
      label: t('productionDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.ngaySanXuat,
      onChange: (_, dateString: string) => {
        handleChange('ngaySanXuat', dateString);
      },
    },
    {
      name: 'ngayHetHan',
      key: 'ngayHetHan',
      label: t('expiryDate'),
      type: TYPE_FIELD.DATE_PICKER,
      value: formControl.values.ngayHetHan,
      onChange: (_, dateString: string) => {
        handleChange('ngayHetHan', dateString);
      },
    },
    {
      name: 'soLo',
      key: 'soLo',
      label: t('batchNumber'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.soLo,
      require: true,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soLo', e.target.value);
      },
    },
    {
      name: 'soLoNcc',
      key: 'soLoNcc',
      label: t('supplierBatchNumber'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.soLoNcc,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soLoNcc', e.target.value);
      },
    },
    {
      name: 'soDangKy',
      key: 'soDangKy',
      label: t('registrationNumber'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.soDangKy,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soDangKy', e.target.value);
      },
    },
    {
      name: 'dongGoi',
      key: 'dongGoi',
      label: t('Packaging'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.dongGoi,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('dongGoi', e.target.value);
      },
    },
    {
      name: 'baoCheId',
      key: 'baoCheId',
      label: t('Formulation_ID'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.baoCheId,
      require: true,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('baoCheId', e.target.value);
      },
    },
    {
      name: 'baoChe',
      key: 'baoChe',
      label: t('preparation'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.baoChe,
      require: true,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('baoChe', e.target.value);
      },
    },
    {
      name: 'note',
      key: 'note',
      label: t('Note'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.note,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('note', e.target.value);
      },
    },
    {
      name: 'baoQuan',
      key: 'baoQuan',
      label: t('preservation'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.baoQuan,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('baoQuan', e.target.value);
      },
    },
    {
      name: 'description',
      key: 'description',
      label: t('Description'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.description,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('description', e.target.value);
      },
    },
    {
      label: t('BHYT'),
      name: 'isBhyt',
      type: TYPE_FIELD.SELECT,
      value: formControl.values.isBhyt,
      allowClear: true,
      options: BHYT,
      onChange: (value: string | null) => {
        handleChange('isBhyt', value);
      },
    },
  ];

  //Nhà sản xuất
  const inputsNSX: InputProps[] = [
    {
      name: 'nhaCungCap',
      key: 'nhaCungCap',
      label: t('Supplier'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.nhaCungCap,
      require: true,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nhaCungCap', e.target.value);
      },
    },
    {
      name: 'nhaCungCapId',
      key: 'nhaCungCapId',
      label: t('Supplier_ID'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.nhaCungCapId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nhaCungCapId', e.target.value);
      },
    },
    {
      name: 'nuocSanXuatId',
      key: 'nuocSanXuatId',
      label: t('Country_of_Manufacture_ID'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.nuocSanXuatId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nuocSanXuatId', e.target.value);
      },
    },
    {
      name: 'hangSanXuat',
      key: 'hangSanXuat',
      label: t('Manufacturer'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.hangSanXuat,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('hangSanXuat', e.target.value);
      },
    },
    {
      name: 'hangSanXuatId',
      key: 'hangSanXuatId',
      label: t('manufacturerId'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.hangSanXuatId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('hangSanXuatId', e.target.value);
      },
    },
    {
      name: 'tonKho',
      key: 'tonKho',
      label: t('Inventory'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.tonKho,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('tonKho', e.target.value);
      },
    },
  ];
  //Thông tin phiếu nhập
  const inputsPhieuNhap: InputProps[] = [
    {
      name: 'chiTietPhieuId',
      key: 'chiTietPhieuId',
      label: t('detailBillId'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.chiTietPhieuId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('chiTietPhieuId', e.target.value);
      },
    },
    {
      name: 'phieuId',
      key: 'phieuId',
      label: t('billId'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.phieuId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('phieuId', e.target.value);
      },
    },
    {
      name: 'khoId',
      key: 'khoId',
      label: t('warehouseId'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.khoId,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('khoId', e.target.value);
      },
    },
    {
      name: 'soLuongNhap',
      key: 'soLuongNhap',
      label: t('importQuantity'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.soLuongNhap,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soLuongNhap', e.target.value);
      },
    },
    {
      name: 'soLuongDaXuat',
      key: 'soLuongDaXuat',
      label: t('exportedQuantity'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.soLuongDaXuat,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soLuongDaXuat', e.target.value);
      },
    },
    {
      name: 'soLuongHetHan',
      key: 'soLuongHetHan',
      label: t('expiredQuantity'),
      type: TYPE_FIELD.TEXT,
      value: formControl.values.soLuongHetHan,
      require: true,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soLuongHetHan', e.target.value);
      },
    },
    {
      name: 'soLuongDuTru',
      key: 'soLuongDuTru',
      label: t('reserveQuantity'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.soLuongDuTru,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soLuongDuTru', e.target.value);
      },
    },
    {
      name: 'tinhTrang',
      key: 'tinhTrang',
      label: t('status'),
      type: TYPE_FIELD.SELECT,
      options: TINH_TRANG,
      value: formControl.values.tinhTrang,
      onChange: (value: string | null) => {
        handleChange('tinhTrang', value);
      },
    },
    {
      name: 'giaTriHang',
      key: 'giaTriHang',
      label: t('valueOfGoods'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.giaTriHang,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('giaTriHang', e.target.value);
      },
    },
    {
      name: 'vat',
      key: 'vat',
      label: t('vat'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.vat,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('vat', e.target.value);
      },
    },
    {
      name: 'nhapBanDau',
      key: 'nhapBanDau',
      label: t('Initial_Import'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.nhapBanDau,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nhapBanDau', e.target.value);
      },
    },
    {
      name: 'nuocSanXuat',
      key: 'nuocSanXuat',
      label: t('Country of Manufacture'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.nuocSanXuat,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('nuocSanXuat', e.target.value);
      },
    },
    {
      name: 'soLuongTraNcc',
      key: 'soLuongTraNcc',
      label: t('Quantity_Returned_to_Supplier'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.soLuongTraNcc,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('soLuongTraNcc', e.target.value);
      },
    },
    {
      name: 'thanhTien',
      key: 'thanhTien',
      label: t('Total_Amount'),
      type: TYPE_FIELD.TEXT,
      require: true,
      value: formControl.values.thanhTien,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        handleChange('thanhTien', e.target.value);
      },
    },
  ];

  return (
    <>
      <Modal
        open={modalType !== 'view' && show}
        onCancel={onHide}
        centered
        title={
          <Typography.Title level={4} className='mb-4'>
            {modalType === 'add'
              ? t('Add_Medicine_Warehouse_List')
              : modalType === 'edit'
                ? t('Edit_Medicine_Warehouse_List')
                : t('View_Medicine_Warehouse_List')}
          </Typography.Title>
        }
        footer
        width={950}
      >
        <Card>
          <Space direction='vertical' style={{ width: '100%' }}>
            <Typography.Title level={5}>
              {' '}
              {t('Medicine Information')}
            </Typography.Title>
            <InputFields
              inputs={inputsMedicineInfo}
              form={formControl}
              span={{ sm: 24, md: 12, lg: 8 }}
              gutter={[0, 6]}
            />
          </Space>
          <Space direction='vertical' style={{ width: '100%' }} size={'small'}>
            <Typography.Title level={5}>
              {t('Supplier Information')}
            </Typography.Title>
            <InputFields
              inputs={inputsNSX}
              form={formControl}
              span={{ sm: 24, md: 12, lg: 8 }}
              gutter={[0, 6]}
            />
          </Space>
          <Space direction='vertical' style={{ width: '100%' }} size={'small'}>
            <Typography.Title level={5}>
              {t('Production Quantity')}
            </Typography.Title>
            <InputFields
              inputs={inputsPhieuNhap}
              form={formControl}
              span={{ sm: 24, md: 12, lg: 8 }}
              gutter={[0, 6]}
            />
          </Space>
        </Card>
        <Flex justify='end' gap={12}>
          <Button onClick={onHide}>Cancel</Button>
          <ButtonCustom.Edit type='primary' onClick={formControl.submitForm}>
            Save
          </ButtonCustom.Edit>
        </Flex>
      </Modal>
    </>
  );
};

export default WarehouseMedicineModal;
