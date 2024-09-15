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
  Tag,
  theme,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { DATE_FORMAT } from 'src/constants/common/common';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import {
  FacilityModalType,
  TFacility,
  TFilterFacility,
} from 'src/constants/types/category/facilities';
import facilitiesApi, {
  useFacilities,
} from 'src/helpers/api/category/facilities';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryFacility } from 'src/routes/routes.contants';

import FacilitiesModal from './FacilityModal/FacilityModal';

const Facilities = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<FacilityModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TFacility | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterFacility>({
    defaultFilter: {
      facilityFullName: '',
    },
  });
  const { data, isLoading, mutate } = useFacilities(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: FacilityModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await facilitiesApi.deleteFacilities(id);
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
      label: t('facilityFullName'),
      type: TYPE_FIELD.TEXT,
      name: 'facilityFullName',
      className: 'w-100',
      allowClear: true,
      value: filter.facilityFullName,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        onChangeFilter('facilityFullName', e.target.value);
      },
    },
  ];

  const columns: ColumnsType<TFacility> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 120,
      align: 'center',
      render: (_, __, index) => {
        const { pageNum = 0, pageSize = 10 } = pagination;
        return pageNum * pageSize + index + 1;
      },
    },
    {
      title: t('customerID'),
      dataIndex: 'customerCode',
      width: 200,
    },
    {
      title: t('facilityID'),
      dataIndex: 'facilityCode',
      width: 200,
    },
    {
      title: t('healthcareFacilityCode'),
      dataIndex: 'healthcareFacilityCode',
      width: 200,
    },
    {
      title: t('facilityFullName'),
      dataIndex: 'facilityFullName',
      width: 200,
    },
    {
      title: t('facilityFullNameUnUnicode'),
      dataIndex: 'facilityFullNameUnUnicode',
      width: 200,
    },
    {
      title: t('facilityShortName'),
      dataIndex: 'facilityShortName',
      width: 200,
    },
    {
      title: t('prefixName'),
      dataIndex: 'prefixName',
      width: 200,
    },
    {
      title: t('managementAuthority'),
      dataIndex: 'managementAuthority',
      width: 200,
    },
    {
      title: t('higherAuthorityName'),
      dataIndex: 'higherAuthorityName',
      width: 200,
    },
    {
      title: t('higherAuthorityShortName'),
      dataIndex: 'higherAuthorityShortName',
      width: 200,
    },
    {
      title: t('hospitalClass'),
      dataIndex: 'hospitalClass',
      width: 200,
    },
    {
      title: t('customerNote'),
      dataIndex: 'customerNote',
      width: 200,
    },
    {
      title: t('provinceID'),
      dataIndex: 'provinceCode',
      width: 200,
    },
    {
      title: t('districtID'),
      dataIndex: 'districtCode',
      width: 200,
    },
    {
      title: t('wardID'),
      dataIndex: 'wardCode',
      width: 200,
    },
    {
      title: t('telephone'),
      dataIndex: 'telephone',
      width: 200,
    },
    {
      title: t('telephone2'),
      dataIndex: 'telephoneSecond',
      width: 200,
    },
    {
      title: t('hotline'),
      dataIndex: 'hotline',
      width: 200,
    },
    {
      title: t('email'),
      dataIndex: 'email',
      width: 200,
    },
    {
      title: t('website'),
      dataIndex: 'website',
      width: 200,
    },
    {
      title: t('fax'),
      dataIndex: 'fax',
      width: 200,
    },
    {
      title: t('tax'),
      dataIndex: 'tax',
      width: 200,
    },
    {
      title: t('pharmacyTax'),
      dataIndex: 'pharmacyTax',
      width: 200,
    },
    {
      title: t('isActived'),
      dataIndex: 'isActived',
      width: 200,
      render: (value: boolean) => {
        return value === true ? t('Yes') : t('No');
      },
    },
    {
      title: t('insuranceUsername'),
      dataIndex: 'insuranceUsername',
      width: 200,
    },
    {
      title: t('vaccineGateUsername'),
      dataIndex: 'vaccineGateUsername',
      width: 200,
    },
    {
      title: t('nationalPharmacyCode'),
      dataIndex: 'nationalPharmacyCode',
      width: 200,
    },
    {
      title: t('representative'),
      dataIndex: 'representative',
      width: 200,
    },
    {
      title: t('position'),
      dataIndex: 'position',
      width: 200,
    },
    {
      title: t('haveInsurance'),
      dataIndex: 'haveInsurance',
      width: 200,
      render: (value: boolean) => {
        return value === true ? t('Yes') : t('No');
      },
    },
    {
      title: t('smsAllow'),
      dataIndex: 'smsAllow',
      width: 200,
      render: (value: boolean) => {
        return value === true ? t('Yes') : t('No');
      },
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TFacility) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.Edit
              onClick={() => {
                setSelectedRecord(record);
                onChangeModalType('edit');
                onOpenModal();
                mutate();
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
        {/* filter container */}
        <Card>
          {/* filter inputs */}
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 12 }}
              gutter={[0, 8]}
            ></InputFields>
          </Row>
          {/* filter actions */}
          <Row
            justify={'end'}
            className='d-flex align-items-center'
            style={{
              columnGap: '8px',
            }}
          >
            {/* reset filter */}
            <Button icon={<ReloadOutlined />} onClick={onResetFilter}>
              {t('Delete_Search')}
            </Button>
            {/* trigger filter */}
            <Button
              type='primary'
              icon={<SearchOutlined />}
              onClick={() => {
                mutate();
              }}
            >
              {t('Search')}
            </Button>
          </Row>
        </Card>
        <TableCustom
          columns={columns}
          title={t('Facility category')}
          extra={
            <>
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
            </>
          }
          scroll={{ x: 500, y: 500 }}
          data={data?.data?.content || []}
          isLoading={isLoading}
          id='id'
          pagination={{
            pageSize: data?.data?.pageSize,
            pageNum: data?.data?.pageNum,
            totalElements: data?.data?.totalElements,
            onChange: onPaginationChange,
          }}
        />
      </Space>
      {/* edit modal */}
      <FacilitiesModal
        modalType={modalType}
        isShow={isOpenModal}
        selectedRecord={selectedRecord}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      />
    </>
  );
};

export default Facilities;
