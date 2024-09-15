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
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import { TPolicyType } from 'src/constants/types/category/policyTypes';
import {
  PricePolicyTypeModalType,
  TFilterPricePolicyType,
  TPricePolicyType,
} from 'src/constants/types/category/pricePolicyType';
import { useGetAllPolicyType } from 'src/helpers/api/category/policyTypeApi';
import { useGetAllPricePolicies } from 'src/helpers/api/category/PricePoliciesApi';
import policyPriceTypeApi, {
  usePolicyPriceType,
} from 'src/helpers/api/category/pricePolicyType';
import { useGetAllVisitTypeGroup } from 'src/helpers/api/category/visitTypeGroupCode';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryPricePolicyType } from 'src/routes/routes.contants';

import PricePolicyTypeModal from './PricePolicyTypeModal/PricePolicyTypeModal';

const PricePolicyType = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const { data: pricePolicyGroup } = useGetAllPricePolicies();
  const { data: visitSources } = useGetAllVisitTypeGroup();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<PricePolicyTypeModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TPricePolicyType | null>();
  const { data: typePrice } = useGetAllPolicyType();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterPricePolicyType>({
    defaultFilter: {
      policyPriceTypeCode: null,
      policyPriceTypeGroupId: null,
      policyPriceTypeRefName: null,
    },
  });
  const { data, isLoading, mutate } = usePolicyPriceType(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: PricePolicyTypeModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await policyPriceTypeApi.deletePolicyPriceType(id);
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
      label: t('pricePolicyTypeCode'),
      type: TYPE_FIELD.SELECT,
      name: 'policyPriceTypeCode',
      className: 'w-100',
      options: typePrice?.data?.map((tPrice: TPolicyType) => ({
        value: tPrice.policyTypeId ?? null,
        label: tPrice.policyTypeRefName ?? null,
      })),
      allowClear: true,
      value: filter.policyPriceTypeCode,
      onChange: (value: string) => onChangeFilter('policyPriceTypeCode', value),
    },
    {
      label: t('pricePolicyTypeGroup'),
      type: TYPE_FIELD.SELECT,
      name: 'policyPriceTypeGroupId',
      className: 'w-100',
      allowClear: true,
      value: filter.policyPriceTypeGroupId,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('policyPriceTypeGroupId', e.target.value),
    },
    {
      label: t('pricePolicyTypeName'),
      type: TYPE_FIELD.TEXT,
      name: 'policyPriceTypeRefName',
      className: 'w-100',
      allowClear: true,
      value: filter.policyPriceTypeRefName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('policyPriceTypeRefName', e.target.value),
    },
  ];

  const columns: ColumnsType<TPricePolicyType> = [
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
      title: t('pricePolicyTypeCode'),
      dataIndex: 'policyPriceTypeCode',
    },
    {
      title: t('pricePolicyTypeName'),
      dataIndex: 'policyPriceTypeRefName',
    },
    {
      title: t('pricePolicyTypeGroup'),
      dataIndex: 'policyPriceTypeGroupId',
      render: (value: string) => {
        const data = pricePolicyGroup?.data?.find(
          (ppg: { id: any }) => String(ppg.id) === String(value),
        );
        return data ? data.policyPriceTypeGroupRefName : null;
      },
    },
    {
      title: t('visitTypeGroup'),
      dataIndex: 'visitTypeGroupId',
      render: (value: string) => {
        const data = visitSources?.data?.find(
          (visit: { id: any }) => String(visit.id) === String(value),
        );
        return data ? data.visitTypeGroupRefName : null;
      },
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TPricePolicyType) => {
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
                // mutate();
              }}
            >
              {t('Search')}
            </Button>
          </Row>
        </Card>
        <TableCustom
          columns={columns}
          title={t('Price Policy Type category')}
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
      <PricePolicyTypeModal
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

export default PricePolicyType;
