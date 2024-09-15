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
import {
  CategoryModuleModalType,
  TCategoryModule,
  TFilterCategoryModule,
} from 'src/constants/types/category/module';
import moduleApi, { useModule } from 'src/helpers/api/category/moduleApi';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryModule } from 'src/routes/routes.contants';

import CategoryModuleModal from './ModuleModal/ModuleModal';

const CategoryModule = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<CategoryModuleModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TCategoryModule | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterCategoryModule>({
    defaultFilter: {
      moduleCode: '',
      moduleName: '',
    },
  });
  const { data, isLoading, mutate } = useModule(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: CategoryModuleModalType) => {
    setModalType(type);
  };
  const handleDelete = async (moduleId: string) => {
    try {
      const res = await moduleApi.deleteModule(moduleId);
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
      label: t('Function code'),
      type: TYPE_FIELD.TEXT,
      name: 'moduleCode',
      className: 'w-100',
      allowClear: true,
      value: filter.moduleCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('moduleCode', e.target.value),
    },
    {
      label: t('Function name'),
      type: TYPE_FIELD.TEXT,
      name: 'moduleName',
      className: 'w-100',
      allowClear: true,
      value: filter.moduleName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('moduleName', e.target.value),
    },
    // {
    //   label: t('Function url'),
    //   type: TYPE_FIELD.TEXT,
    //   name: 'moduleUrl',
    //   className: 'w-100',
    //   allowClear: true,
    //   value: filter.moduleUrl,
    //   onChange: (e: ChangeEvent<HTMLInputElement>) =>
    //     onChangeFilter('moduleUrl', e.target.value),
    // },
  ];

  const columns: ColumnsType<TCategoryModule> = [
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
      title: t('Function code'),
      dataIndex: 'moduleCode',
    },
    {
      title: t('Function name'),
      dataIndex: 'moduleName',
    },
    {
      title: t('Function url'),
      dataIndex: 'moduleUrl',
    },
    {
      title: t('Function description'),
      dataIndex: 'description',
    },
    // {
    //   title: t('Function status'),
    //   dataIndex: 'moduleStatus',
    // },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TCategoryModule) => {
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
              onConfirm={() => handleDelete(record.moduleId)}
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
                // mutate();
              }}
            >
              {t('Search')}
            </Button>
          </Row>
        </Card>
        <TableCustom
          columns={columns}
          title={t('Function category')}
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
      <CategoryModuleModal
        modalType={modalType}
        isShow={isOpenModal}
        selectedRecord={selectedRecord}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          //   mutate();
        }}
      />
    </>
  );
};

export default CategoryModule;
