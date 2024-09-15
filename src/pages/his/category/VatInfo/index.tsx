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
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TVatInfo,
  vatInfoModalType,
} from 'src/constants/types/his/category/vatInfo';
import vatInfoApi, { useVatInfo } from 'src/helpers/api/his/category/vatInfo';
import useFilter from 'src/hooks/useFilter';
import { categoryvatInfo } from 'src/routes/routes.contants';

import VatInfoModal from './VatInfoModal';

const VatInfo = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<vatInfoModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TVatInfo | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TVatInfo>({
    defaultFilter: {
      companyName: '',
      taxCode: '',
      companyAddress: '',
    },
  });

  const { data, isLoading, mutate } = useVatInfo(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: vatInfoModalType) => {
    setModalType(type);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await vatInfoApi.deleteVatInfoModal(id);
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
      label: t('Company_Name'),
      type: TYPE_FIELD.TEXT,
      name: 'companyName',
      className: 'w-100',
      allowClear: true,
      value: filter.companyName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('companyName', e.target.value),
    },
    {
      label: t('Company_Address'),
      type: TYPE_FIELD.TEXT,
      name: 'companyAddress',
      className: 'w-100',
      allowClear: true,
      value: filter.companyAddress,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('companyAddress', e.target.value),
    },
    {
      label: t('Tax_Code'),
      type: TYPE_FIELD.TEXT,
      name: 'taxCode',
      className: 'w-100',
      allowClear: true,
      value: filter.taxCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('taxCode', e.target.value),
    },
  ];

  const columns: ColumnsType<TVatInfo> = [
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
      title: t('Company_Name'),
      dataIndex: 'companyName',
      width: 200,
    },
    {
      title: t('Company_Address'),
      dataIndex: 'companyAddress',
      width: 200,
    },
    {
      title: t('Tax_Code'),
      dataIndex: 'taxCode',
      width: 200,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TVatInfo) => {
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
              span={{ sm: 24, lg: 8, xl: 12 }}
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
          title={t('Vat_Info')}
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
                {t('Add_Vat_Info_Category')}
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
      <VatInfoModal
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

export default VatInfo;
