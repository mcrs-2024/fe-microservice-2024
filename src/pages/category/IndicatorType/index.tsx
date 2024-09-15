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
  IndicatorTypeModalType,
  TFilterIndicatorType,
  TIndicatorType,
} from 'src/constants/types/category/indicatorType';
import chapterApi, { useChapter } from 'src/helpers/api/category/chapterApi';
import indicatorTypeApi, {
  useIndicatorType,
} from 'src/helpers/api/category/indicatorTypeApi';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';
import {
  categoryICDGroups,
  categoryPersonIndicator,
} from 'src/routes/routes.contants';

import ChapterModal from './IndicatorTypeModal';

/* status column render */
const IndicatorType = () => {
  const { t } = useTranslation();
  const { token } = theme.useToken();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<IndicatorTypeModalType>('add');
  const [selectedRecord, setSelectedRecord] = useState<TIndicatorType | null>();

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterIndicatorType>({
    defaultFilter: {
      personIndicatorTypeCode: '',
      personIndicatorName: '',
      personIndicatorCode: '',
    },
  });

  const { data, isLoading, mutate } = useIndicatorType(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: IndicatorTypeModalType) => {
    setModalType(type);
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await indicatorTypeApi.deleteIndicatorType(id);
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
      label: t('Person_indicator_record'),
      type: TYPE_FIELD.TEXT,
      name: 'personIndicatorCode',
      className: 'w-100',
      allowClear: true,
      value: filter.personIndicatorCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('personIndicatorCode', e.target.value),
    },
    {
      label: t('Person_indicator_record'),
      type: TYPE_FIELD.TEXT,
      name: 'personIndicatorTypeCode',
      className: 'w-100',
      allowClear: true,
      value: filter.personIndicatorTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('personIndicatorTypeCode', e.target.value),
    },
    {
      label: t('Person_indicator_name'),
      type: TYPE_FIELD.TEXT,
      name: 'personIndicatorName',
      className: 'w-100',
      allowClear: true,
      value: filter.personIndicatorName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('personIndicatorName', e.target.value),
    },
  ];

  const columns: ColumnsType<TIndicatorType> = [
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
      title: t('Person_indicator_record'),
      dataIndex: 'personIndicatorCode',
    },
    {
      title: t('Person_indicator_name'),
      dataIndex: 'personIndicatorName',
    },
    {
      title: t('Person_indicator_type_reference_name'),
      dataIndex: 'personIndicatorTypeCode',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TIndicatorType) => {
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
          title={t('Person_indicator_type_reference')}
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

export default IndicatorType;
