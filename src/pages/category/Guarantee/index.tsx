import { useEffect, useState } from 'react';
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
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import {
  GuaranteeModalType,
  TFilterGuarantee,
  TGuarantee,
  TPatient,
  TPersonIndicatorSub,
  TVisitType,
} from 'src/constants/types/category/guarantees';
import { TIndicatorType } from 'src/constants/types/category/indicatorType';
import guaranteeApi, {
  useGetAllPatient,
  useGetAllPersonIndicatorSub,
  useGetAllVisitType,
  useGuarantee,
} from 'src/helpers/api/category/guarantee';
import { useGetAllIndicatorType } from 'src/helpers/api/category/indicatorTypeApi';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryGuarantees } from 'src/routes/routes.contants';

import GuaranteeModal from './GuaranteeModal/GuaranteeModal';

const Guarantee = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<GuaranteeModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TGuarantee | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterGuarantee>({
    defaultFilter: {
      personIndicator: null,
      patientPricingClass: null,
      visitType: null,
      personIndicatorSub: null,
      effectiveFromDate: null,
      effectiveToDate: null,
    },
  });
  const { data, isLoading, mutate } = useGuarantee(pagination, debouncedFilter);

  const { data: personIndicators } = useGetAllIndicatorType();
  const { data: personIndicatorSub } = useGetAllPersonIndicatorSub();
  const { data: patients } = useGetAllPatient();
  const { data: vistiType } = useGetAllVisitType();

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: GuaranteeModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await guaranteeApi.deleteGuarantee(id);
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
      label: t('personIndicatorRecord'),
      type: TYPE_FIELD.SELECT,
      options: personIndicators?.data?.map((pic: TIndicatorType) => ({
        value: pic.id ?? null,
        label: pic.personIndicatorName ?? null,
      })),
      name: 'personIndicator',
      className: 'w-100',
      allowClear: true,
      value: filter.personIndicator,
      onChange: (value: string | null) => {
        const newValue = value ? value : '';
        onChangeFilter('personIndicator', newValue);
      },
    },
    {
      label: t('cardClass'),
      type: TYPE_FIELD.SELECT,
      options: personIndicatorSub?.data?.map((pic: TPersonIndicatorSub) => ({
        value: pic.id ?? null,
        label: pic.personIndicatorSubName ?? null,
      })),
      name: 'patientPricingClass',
      className: 'w-100',
      allowClear: true,
      value: filter.patientPricingClass,
      onChange: (value: string | null) => {
        const newValue = value ? value : '';
        onChangeFilter('patientPricingClass', newValue);
      },
    },
    {
      label: t('visitType'),
      type: TYPE_FIELD.SELECT,
      options: vistiType?.data?.map((pic: TVisitType) => ({
        value: pic.id ?? null,
        label: pic.visitTypeRefName ?? null,
      })),
      name: 'visitType',
      className: 'w-100',
      allowClear: true,
      value: filter.visitType,
      onChange: (value: string | null) => {
        const newValue = value ? value : '';
        onChangeFilter('visitType', newValue);
      },
    },
    {
      label: t('patientPricingClass'),
      type: TYPE_FIELD.SELECT,
      options: patients?.data?.map((pic: TPatient) => ({
        value: pic.id ?? null,
        label: pic.patientPricingClassRefName ?? null,
      })),
      name: 'patientPricingClass',
      className: 'w-100',
      allowClear: true,
      value: filter.patientPricingClass,
      onChange: (value: string | null) => {
        const newValue = value ? value : '';
        onChangeFilter('patientPricingClass', newValue);
      },
    },
    {
      label: t('startingDate'),
      type: TYPE_FIELD.DATE_PICKER,
      name: 'effectiveFromDate',
      className: 'w-100',
      allowClear: true,
      value: filter.effectiveFromDate,
      onChange: (_, dateString: string) => {
        onChangeFilter('effectiveFromDate', dateString);
      },
    },
    {
      label: t('completionDate'),
      type: TYPE_FIELD.DATE_PICKER,
      name: 'effectiveToDate',
      className: 'w-100',
      allowClear: true,
      value: filter.effectiveToDate,
      onChange: (_, dateString: string) => {
        onChangeFilter('effectiveToDate', dateString);
      },
    },
  ];

  const columns: ColumnsType<TGuarantee> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'stt',
      width: 120,
      align: 'center',
      render: (_, __, index) => {
        const { pageNum = 0, pageSize = 10 } = pagination;
        return pageNum * pageSize + index + 1;
      },
    },
    {
      title: t('personIndicatorRecord'),
      dataIndex: 'personIndicator',
      render: (value: string) => {
        const regs = personIndicators?.data?.find(
          (reg: any) => String(reg.id) === String(value),
        );
        return regs ? regs.personIndicatorName : null;
      },
    },
    {
      title: t('cardClass'),
      dataIndex: 'personIndicatorSub',
      render: (value: string) => {
        const regs = personIndicatorSub?.data?.find(
          (reg: any) => String(reg.id) === String(value),
        );
        return regs ? regs.personIndicatorSubName : null;
      },
    },
    {
      title: t('visitType'),
      dataIndex: 'visitType',
      render: (value: string) => {
        const regs = vistiType?.data?.find(
          (reg: any) => String(reg.id) === String(value),
        );
        return regs ? regs.visitTypeRefName : null;
      },
    },
    {
      title: t('patientPricingClass'),
      dataIndex: 'patientPricingClass',
      render: (value: string) => {
        const regs = patients?.data?.find(
          (reg: any) => String(reg.id) === String(value),
        );
        return regs ? regs.patientPricingClassRefName : null;
      },
    },
    {
      title: t('actionDate'),
      dataIndex: 'effectiveFromDate',
    },
    {
      title: t('effectiveDate'),
      dataIndex: 'effectiveToDate',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TGuarantee) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.Edit
              onClick={() => {
                setSelectedRecord(record);
                onChangeModalType('edit');
                onOpenModal();
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
              span={{ sm: 24, lg: 8 }}
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
          title={t('Guarantee_category')}
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
      <GuaranteeModal
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

export default Guarantee;
