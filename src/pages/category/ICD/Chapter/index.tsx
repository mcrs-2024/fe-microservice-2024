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
import { CHAPTER_STATUS } from 'src/constants/enums/category';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import {
  ChapterModalType,
  TChapter,
  TFilterChapter,
} from 'src/constants/types/category/chapter';
import chapterApi, { useChapter } from 'src/helpers/api/category/chapterApi';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import { categoryICDGroups } from 'src/routes/routes.contants';
import { getItem } from 'src/utils/localStorage';

import ChapterModal from './ChapterModal';

const Chapter = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ChapterModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TChapter | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterChapter>({
    defaultFilter: {
      icdChapterCode: '',
      icdChapterName: '',
    },
  });
  const { data, isLoading, mutate } = useChapter(pagination, debouncedFilter);

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: ChapterModalType) => {
    setModalType(type);
  };
  const handleDelete = async (icdChapterCode: string) => {
    try {
      const res = await chapterApi.deleteChapter(icdChapterCode);
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
      label: t('Chapter_code'),
      type: TYPE_FIELD.TEXT,
      name: 'icdChapterCode',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterCode', e.target.value),
    },
    {
      label: t('Chapter_name'),
      type: TYPE_FIELD.TEXT,
      name: 'icdChapterName',
      className: 'w-100',
      allowClear: true,
      value: filter.icdChapterName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdChapterName', e.target.value),
    },
  ];

  const columns: ColumnsType<TChapter> = [
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
      title: t('Chapter_code'),
      dataIndex: 'icdChapterCode',
    },
    {
      title: t('icdTypeCode'),
      dataIndex: 'icdTypeId',
      render: icdTypeId => {
        return icdTypeId === '1' ? 'ICD 9' : 'ICD 10';
      },
    },
    {
      title: t('Chapter_name'),
      dataIndex: 'icdChapterName',
      render: (text, record) => {
        const currentLang: string = getItem('i18nextLng') || 'EN';
        return currentLang === 'EN'
          ? record.icdChapterNameE
          : record.icdChapterNameV;
      },
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TChapter) => {
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
              onConfirm={() => handleDelete(record.icdChapterCode)}
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
          title={t('Chapter_category')}
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
      <ChapterModal
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

export default Chapter;
