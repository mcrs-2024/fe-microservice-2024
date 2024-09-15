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
  ActiveIngredientModalType,
  TActiveIngredient,
  TFilterActiveIngredient,
  TGroupActiveIngredient,
} from 'src/constants/types/category/activeIngredient';
import activeIngredientApi, {
  useActiveIngredient,
  useGetAllGroupActiveIngredient,
} from 'src/helpers/api/category/activeIngredient';
import useFilter from 'src/hooks/useFilter';
import { categoryActiveIngredient } from 'src/routes/routes.contants';

import ActiveIngredientModal from './ActiveIngredientModal/ActiveIngredientModal';

const ActiveIngredient = () => {
  const { t } = useTranslation();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ActiveIngredientModalType>('add');
  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const [selectedRecord, setSelectedRecord] =
    useState<TActiveIngredient | null>(null);
  const onChangeModalType = (type: ActiveIngredientModalType) => {
    setModalType(type);
  };
  const { data: groupActiveIngredients } = useGetAllGroupActiveIngredient();

  const {
    filter,
    onChangeFilter,
    onResetFilter,
    debouncedFilter,
    pagination,
    onPaginationChange,
  } = useFilter<TFilterActiveIngredient>({
    defaultFilter: {
      interactionGroupId: '',
      levelName: '',
      ingredientCode01: '',
      ingredientName01: '',
      ingredientCode02: '',
      ingredientName02: '',
      levelCode: '',
    },
  });

  const { data, isLoading, mutate } = useActiveIngredient(
    pagination,
    debouncedFilter,
  );

  const { token } = theme.useToken();
  const handleDelete = async (id: string | null) => {
    try {
      const res = await activeIngredientApi.deleteActiveIngredient(id);
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
      label: t('Group Code'),
      type: TYPE_FIELD.AUTO_COMPLETE,
      options: groupActiveIngredients?.data?.map(
        (groupActiveIngredient: TGroupActiveIngredient) => ({
          value: groupActiveIngredient.id ?? null,
          label: groupActiveIngredient.interactionGroupName ?? null,
        }),
      ),
      name: 'interactionGroupId',
      className: 'w-100',
      allowClear: true,
      value: filter.interactionGroupId,
      onChange: (value: string) => onChangeFilter('interactionGroupId', value),
    },
    {
      label: t('levelCode'),
      type: TYPE_FIELD.TEXT,
      name: 'levelCode',
      className: 'w-100',
      allowClear: true,
      value: filter.levelCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('levelCode', e.target.value),
    },
    {
      label: t('levelName'),
      type: TYPE_FIELD.TEXT,
      name: 'levelName',
      className: 'w-100',
      allowClear: true,
      value: filter.levelName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('levelName', e.target.value),
    },
    {
      label: t('drugActiveIngredientCode01'),
      type: TYPE_FIELD.TEXT,
      name: 'ingredientCode01',
      className: 'w-100',
      allowClear: true,
      value: filter.ingredientCode01,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('ingredientCode01', e.target.value),
    },
    {
      label: t('drugActiveIngredientName01'),
      type: TYPE_FIELD.TEXT,
      name: 'ingredientName01',
      className: 'w-100',
      allowClear: true,
      value: filter.ingredientName01,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('ingredientName01', e.target.value),
    },
    {
      label: t('drugActiveIngredientCode02'),
      type: TYPE_FIELD.TEXT,
      name: 'ingredientCode02',
      className: 'w-100',
      allowClear: true,
      value: filter.ingredientCode02,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('ingredientCode02', e.target.value),
    },
    {
      label: t('drugActiveIngredientName02'),
      type: TYPE_FIELD.TEXT,
      name: 'ingredientName02',
      className: 'w-100',
      allowClear: true,
      value: filter.ingredientName02,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('ingredientName02', e.target.value),
    },
  ];
  const columns: ColumnsType<TActiveIngredient> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 150,
      render: (_, __, index) => {
        const { pageNum = 0, pageSize = 10 } = pagination;
        return pageNum * pageSize + index + 1;
      },
    },
    {
      title: t('Group_Acitve_Substance'),
      dataIndex: 'interactionGroupId',
      width: 150,
      render: (value: string) => {
        const data = groupActiveIngredients?.data.find(
          gai => String(gai.id) === String(value),
        );
        console.log('data:', data?.interactionGroupName);
        return data ? data.interactionGroupName : null;
      },
    },
    {
      title: t('Code_HC01'),
      dataIndex: 'drugActiveIngredientCode01',
      width: 150,
    },
    {
      title: t('Name_HC01'),
      dataIndex: 'drugActiveIngredientName01',
      width: 150,
    },
    {
      title: t('Code_HC02'),
      dataIndex: 'drugActiveIngredientCode02',
      width: 150,
    },
    {
      title: t('Name_HC02'),
      dataIndex: 'drugActiveIngredientName02',
      width: 150,
    },

    {
      title: t('levelCode'),
      dataIndex: 'levelCode',
      width: 150,
    },
    {
      title: t('levelName'),
      dataIndex: 'levelName',
      width: 150,
    },
    {
      title: t('interactiveLaunch'),
      dataIndex: 'interactiveLaunch',
      width: 150,
    },
    {
      title: t('mechanismConsequence'),
      dataIndex: 'mechanismConsequence',
      width: 150,
    },
    {
      title: t('handlingManagement'),
      dataIndex: 'handlingManagement',
      width: 150,
    },
    {
      title: t('referenceSource'),
      dataIndex: 'referenceSource',
      width: 150,
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TActiveIngredient) => {
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
            ></ButtonCustom.Edit>
            <Popconfirm
              title='Bạn có chắc chắn muốn xóa nhân viên này?'
              onConfirm={() => handleDelete(record.id)}
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
        {/* products list */}
        <TableCustom
          columns={columns}
          title={t('Active_ingredient')}
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
          isRowSelection={true}
          loading={false}
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

      <ActiveIngredientModal
        key={1}
        modalType={modalType}
        show={isOpenModal}
        selectedRecord={selectedRecord}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          // mutate();
        }}
      />
    </>
  );
};

export default ActiveIngredient;
