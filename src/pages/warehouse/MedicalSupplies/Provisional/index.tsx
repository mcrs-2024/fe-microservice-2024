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
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import TableCustom from 'src/components/TableCustom';
import { DATE_FORMAT } from 'src/constants/common/common';
import { TINH_TRANG } from 'src/constants/dumb/phieuNhap';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TWarehouseMedicineCategory } from 'src/constants/types/medicineStore/medicineCategory';
import {
  ProvisionalFilter,
  ProvisionalModalType,
  TProvisional,
} from 'src/constants/types/medicineStore/phieuDuTru';
import { useGetAllWarehouseMedicineCategory } from 'src/helpers/api/medicineStore/medicineStoreCategory/warehouseMedicineCategory';
import provisionalApi, {
  useProvisional,
} from 'src/helpers/api/medicineStore/phieuDuTru';
import useFilter from 'src/hooks/useFilter';

import ProvisionalModal from './ProvisionalModal/ProvisionalModal';

const PhieuDuTru = () => {
  const { data: warehouses } = useGetAllWarehouseMedicineCategory();
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const [selectedProvisional, setSelectedProvisional] =
    useState<TProvisional | null>(null);
  const [modalType, setModalType] = useState<ProvisionalModalType>('edit');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);

  const onChangeModalType = (type: ProvisionalModalType) => {
    setModalType(type);
  };

  const { filter, setFilter, pagination, onPaginationChange } =
    useFilter<ProvisionalFilter>({
      defaultFilter: {
        khoXuat: '',
        ngayNhapDen: '',
        ngayNhapTu: '',
        tinhTrang: '',
        khoNhap: '',
        tieuDe: '',
      },
    });

  const { data: phieuDuTru, isLoading, mutate } = useProvisional(pagination);

  const handleDeletePhieuDuTru = async (id: string | null) => {
    try {
      const res = await provisionalApi.deleteProvisional(id);
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

  const inputSearch: InputProps[] = [
    {
      label: t('Form Title'),
      name: 'tieuDe',
      key: 'tieuDe',
      value: filter.tieuDe,
      type: TYPE_FIELD.TEXT,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({
          ...filter,
          tieuDe: e.target.value,
        });
      },
    },
    {
      label: t('importWarehouse'),
      name: 'khoNhap',
      key: 'khoNhap',
      value: filter.khoNhap,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse?.id ?? '',
          label: warehouse?.tenKho ?? '',
        }),
      ),
      onChange: (value: string | null) => {
        const newValue = value ? value : null;
        setFilter({
          ...filter,
          khoNhap: newValue,
        });
      },
    },
    {
      label: t('exportWarehouse'),
      name: 'khoXuat',
      key: 'khoXuat',
      value: filter.khoXuat,
      type: TYPE_FIELD.SELECT,
      options: warehouses?.data?.map(
        (warehouse: TWarehouseMedicineCategory) => ({
          value: warehouse?.id ?? '',
          label: warehouse?.tenKho ?? '',
        }),
      ),
      onChange: (value: string | null) => {
        const newValue = value ? value : null;
        setFilter({
          ...filter,
          khoXuat: newValue,
        });
      },
    },
    {
      label: t('status'),
      name: 'tinhTrang',
      key: 'tinhTrang',
      value: filter.tinhTrang,
      type: TYPE_FIELD.SELECT,
      options: TINH_TRANG,
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
      name: 'ngayNhapTu',
      key: 'ngayNhapTu',
      value: filter.ngayNhapTu,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : '';
        setFilter({
          ...filter,
          ngayNhapTu: newValue,
        });
      },
    },
    {
      label: t('To_date'),
      name: 'ngayNhapDen',
      key: 'ngayNhapDen',
      value: filter.ngayNhapDen,
      type: TYPE_FIELD.DATE_PICKER,
      onChange: (value: Dayjs | null) => {
        const newValue = value ? dayjs(value).format(DATE_FORMAT.DATE) : '';
        setFilter({
          ...filter,
          ngayNhapDen: newValue,
        });
      },
    },
  ];

  const columns: ColumnsType<TProvisional> = [
    {
      title: t('STT'),
      dataIndex: 'id',
      align: 'center',
      render(_, __, index) {
        return index + 1;
      },
      width: 50,
    },
    {
      title: t('billId'),
      dataIndex: 'maPhieu',
      width: 100,
    },
    {
      title: t('importDateTo'),
      dataIndex: 'ngayNhapDen',
      width: 100,
    },
    {
      title: t('importDateFrom'),
      dataIndex: 'ngayNhapTu',
      width: 100,
    },
    { title: t('status'), dataIndex: 'tinhTrang', width: 100 },
    { title: t('importWarehouse'), dataIndex: 'khoNhap', width: 100 },
    { title: t('title'), dataIndex: 'tieuDe', width: 100 },
    {
      title: t('action'),
      dataIndex: 'action',
      fixed: 'right',
      width: 70,
      render: (_, record: TProvisional) => {
        return (
          <Flex justify='center'>
            {/* <Button size='small' icon={<EyeOutlined />} type='link'></Button> */}
            <ButtonCustom.Edit
              type='link'
              style={{ color: token['green-7'] }}
              onClick={() => {
                setSelectedProvisional(record), onOpenModal();
                onChangeModalType('edit');
              }}
              size='small'
              icon={<EditOutlined />}
            ></ButtonCustom.Edit>
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDeletePhieuDuTru(record.id)}
              okText='Ok'
            >
              <ButtonCustom.Delete
                size='small'
                type='link'
                style={{ color: token['red-7'] }}
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
              gutter={[0, 6]}
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

        <Card title={t('List_of_import')}>
          <TableCustom
            columns={columns}
            extra={
              <>
                <ButtonCustom.Create
                  type='primary'
                  icon={<PlusOutlined />}
                  onClick={() => {
                    // setselectedProvisional(record);
                    setModalType('add');
                    onOpenModal();
                    mutate();
                  }}
                >
                  {t('Add')}
                </ButtonCustom.Create>
              </>
            }
            //data={[PHIEU_NHAP]}
            data={phieuDuTru?.data?.content || []}
            pagination={{
              pageSize: phieuDuTru?.data?.pageSize,
              pageNum: phieuDuTru?.data?.pageNum,
              totalElements: phieuDuTru?.data?.totalElements,
              onChange: onPaginationChange,
            }}
            isLoading={isLoading}
            isRowSelection={true}
            scroll={{ x: 400, y: 400 }}
          ></TableCustom>
        </Card>
      </Space>
      <ProvisionalModal
        key={selectedProvisional?.id}
        modalType={modalType}
        show={isOpenModal}
        phieuDuTru={selectedProvisional}
        onHide={onCloseModal}
        onSuccess={() => {
          onOpenModal();
          mutate();
        }}
      ></ProvisionalModal>
    </>
  );
};

export default PhieuDuTru;
