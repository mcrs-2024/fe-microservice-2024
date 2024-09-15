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
import { TCategory } from 'src/constants/types/category/category';
import {
  Icd10ModalType,
  TFilterIcd10,
  TIcd10,
} from 'src/constants/types/category/ICD10';
import { useGetAllBlockIDC } from 'src/helpers/api/category/blockICD';
import icd10Api, { useIcd10 } from 'src/helpers/api/category/icd10';
import { useGetAllGroupICD } from 'src/helpers/api/categoryGroupICD/categoryGroupICD';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';

import Icd10Modal from './Icd10Modal';

const ICD10 = () => {
  const { t } = useTranslation();
  const { data: blockICDs } = useGetAllBlockIDC();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<Icd10ModalType>('add');
  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const [selectedRecord, setSelectedRecord] = useState<TIcd10 | null>(null);

  const onChangeModalType = (type: Icd10ModalType) => {
    setModalType(type);
    setIsOpenModal(true);
  };

  const {
    pagination,
    onPaginationChange,
    filter,
    onChangeFilter,
    debouncedFilter,
  } = useFilter<TFilterIcd10>({
    defaultFilter: {
      icdCode: '',
      icdName: '',
    },
  });

  const { data, isLoading, mutate } = useIcd10(pagination, debouncedFilter);
  const { token } = theme.useToken();
  const handleDelete = async (id: string | null) => {
    try {
      const res = await icd10Api.deleteIcd10(id);
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
      label: t('ICD10_code'),
      type: TYPE_FIELD.TEXT,
      name: 'icdCode',
      className: 'w-100',
      allowClear: true,
      value: filter.icdCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdCode', e.target.value),
    },
    {
      label: t('Desease_name'),
      type: TYPE_FIELD.TEXT,
      name: 'icdName',
      className: 'w-100',
      allowClear: true,
      value: filter.icdName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdName', e.target.value),
    },
  ];
  const columns: ColumnsType<TCategory> = [
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
      title: t('ICD10_code'),
      dataIndex: 'icdCode',
    },
    {
      title: t('Desease_name'),
      dataIndex: 'icdNameV',
    },
    {
      title: t('Block Code'),
      dataIndex: 'icdBlocksId',
      render: (value: string) => {
        const block = blockICDs?.data.find(
          data => String(data.id) === String(value),
        );
        return block ? block.icdBlocksName : null;
      },
    },
    {
      title: t('billable'),
      dataIndex: 'billable',
      render: (value: boolean) => {
        return value === true ? 'Có' : 'Không';
      },
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TIcd10) => {
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
      <Space direction='vertical' className='d-flex'>
        <Card>
          <Row>
            <InputFields
              inputs={inputSearch}
              span={{ sm: 24, lg: 8, xl: 12 }}
              gutter={[0, 8]}
            ></InputFields>
          </Row>
          <Row
            justify={'end'}
            className='d-flex align-items-center'
            style={{
              columnGap: '8px',
            }}
          >
            <Button icon={<ReloadOutlined />} style={{ marginRight: '1%' }}>
              {t('Delete_Search')}
            </Button>
            <Button type='primary' icon={<SearchOutlined />}>
              {t('Search')}
            </Button>
          </Row>
        </Card>
        <TableCustom
          columns={columns}
          title={t('ICD 10')}
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
      <Icd10Modal
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

export default ICD10;
