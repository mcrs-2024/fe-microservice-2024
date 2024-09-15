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
  Tag,
  theme,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { CHAPTER_STATUS } from 'src/constants/enums/category';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  IcdConfigurationModalType,
  TFilterIcdConfiguration,
  TIcdConfiguration,
} from 'src/constants/types/category/IcdConfiguration';
import chapterApi, { useChapter } from 'src/helpers/api/category/chapterApi';
import useFilter from 'src/hooks/useFilter';
import { categoryICDGroups } from 'src/routes/routes.contants';

import ChapterModal from './IcdConfiguration';

const IcdConfiguration = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<IcdConfigurationModalType>('add');
  const [selectedRecord, setSelectedRecord] =
    useState<TIcdConfiguration | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterIcdConfiguration>({
    defaultFilter: {
      icdTypeCode: '',
      icdChapterNameV: '',
    },
  });
  // const { data, isLoading, mutate } = useChapter(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: IcdConfigurationModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await chapterApi.deleteChapter(id);
      if (res.data.code) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
      // mutate();
    } catch (error) {
      console.error(error);
    }
  };

  const inputSearch: InputProps[] = [
    {
      label: t('Chapter_code'),
      type: TYPE_FIELD.TEXT,
      name: 'maChuong',
      className: 'w-100',
      allowClear: true,
      value: filter.icdTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdTypeCode', e.target.value),
    },
    {
      label: t('Service'),
      type: TYPE_FIELD.TEXT,
      name: 'icdChapterNameV',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterNameV,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterNameV', e.target.value),
    },
    {
      label: t('Group_list'),
      type: TYPE_FIELD.SELECT,
      name: 'icdChapterNameV',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterNameV,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterNameV', e.target.value),
    },
    {
      label: t('Group Code'),
      type: TYPE_FIELD.SELECT,
      name: 'icdChapterNameV',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterNameV,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterNameV', e.target.value),
    },
  ];

  const columns: ColumnsType<TIcdConfiguration> = [
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
      title: t('Chapter_code'),
      dataIndex: 'maChuong',
    },
    {
      title: t('Service'),
      dataIndex: 'tenChuong',
    },
    {
      title: t('Group_list'),
      dataIndex: 'tenChuong',
    },
    {
      title: t('Group Code'),
      dataIndex: 'tenChuong',
    },

    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TIcdConfiguration) => {
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
              span={{ sm: 24, lg: 8, xl: 12 }} // change thanh search cho đều nhau
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
          title={t('Chapter_category')}
          extra={
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
          }
          data={[]}
          isLoading={false}
          // data={data?.data?.content || []}
          // isLoading={isLoading}
          // id='id'
          // pagination={{
          //   pageSize: data?.data?.pageSize,
          //   pageNum: data?.data?.pageNum,
          //   totalElements: data?.data?.totalElements,
          //   onChange: onPaginationChange,
          // }}
        />
      </Space>
      {/* edit modal */}
      <ChapterModal
        modalType={modalType}
        isShow={isOpenModal}
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

export default IcdConfiguration;
