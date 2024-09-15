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
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { ORGANIZATION } from 'src/constants/dumb/organization';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  DebtModalType,
  TDebt,
  TFilterDebt,
} from 'src/constants/types/category/Debt';
import { TOrganization } from 'src/constants/types/category/organization';
import debtApi, { useDebt } from 'src/helpers/api/category/debt';
import { useGetAllOrganization } from 'src/helpers/api/category/organization';
import useFilter from 'src/hooks/useFilter';
import { categoryICDGroups } from 'src/routes/routes.contants';

import DebtModal from './DebtModal';

const Debt = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<DebtModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TDebt | null>();

  const { data: organizations } = useGetAllOrganization();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterDebt>({
    defaultFilter: {
      organisationId: null,
      contactName: null,
    },
  });
  const { data, isLoading, mutate } = useDebt(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: DebtModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await debtApi.deleteDebt(id);
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
      label: t('Organisation'),
      type: TYPE_FIELD.SELECT,
      name: 'organisationId',
      options: organizations?.data?.map((organization: TOrganization) => ({
        value: organization.id ?? null,
        label: organization.organisationName ?? null,
      })),
      className: 'w-100',
      allowClear: true,
      value: filter.organisationId,
      onChange: (value: string) => onChangeFilter('organisationId', value),
    },
    {
      label: t('Contract_name'),
      type: TYPE_FIELD.TEXT,
      name: 'contactName',
      className: 'w-200',
      allowClear: true,
      value: filter.contactName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('contactName', e.target.value),
    },
  ];

  const columns: ColumnsType<TDebt> = [
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
      title: t('policyThirdPartyId'),
      dataIndex: 'policyThirdPartyId',
      width: 200,
    },
    {
      title: t('Organisation'),
      dataIndex: 'organisationId',
      width: 200,
      render: (value: number) => {
        const organization = ORGANIZATION.find(
          org => Number(org.value) === Number(value),
        );
        return organization ? organization.label : null;
      },
    },
    {
      title: t('Contract_name'),
      dataIndex: 'contactName',
      width: 200,
    },
    {
      title: t('contactTel'),
      dataIndex: 'contactTel',
      width: 200,
    },
    {
      title: t('contactFax'),
      dataIndex: 'contactFax',
      width: 200,
    },
    {
      title: t('contactEmail'),
      dataIndex: 'contactEmail',
      width: 200,
    },
    {
      title: t('contractRenewalDate'),
      dataIndex: 'contractRenewalDate',
      width: 200,
    },
    {
      title: t('contractStartDate'),
      dataIndex: 'contractStartDate',
      width: 200,
    },
    {
      title: t('contractEndDate'),
      dataIndex: 'contractEndDate',
      width: 200,
    },
    {
      title: t('contractDrawnUpBy'),
      dataIndex: 'contractDrawnUpBy',
      width: 200,
    },
    {
      title: t('contractSignedBy'),
      dataIndex: 'contractSignedBy',
      width: 200,
    },
    {
      title: t('contractSignDate'),
      dataIndex: 'contractSignDate',
      width: 200,
    },
    {
      title: t('comment'),
      dataIndex: 'comment',
      width: 200,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TDebt) => {
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
          title={t('Liability_object_reference')}
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
          scroll={{ x: 800, y: 800 }}
        />
      </Space>
      {/* edit modal */}
      <DebtModal
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

export default Debt;
