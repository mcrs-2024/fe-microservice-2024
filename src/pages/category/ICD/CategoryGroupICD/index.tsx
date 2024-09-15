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
import {
  BlockICDModalType,
  TBlockICD,
  TFilterBlockICD,
} from 'src/constants/types/category/blockICD';
import { TChapter } from 'src/constants/types/category/chapter';
import BlockICDApi, { useBlockICD } from 'src/helpers/api/category/blockICD';
import { useGetAllChapter } from 'src/helpers/api/category/chapterApi';
import useFilter from 'src/hooks/useFilter';
import { addButton } from 'src/redux toolkit/buttonsSlice';

import GroupICDModal from './GroupICDModal/GroupICDModal';

const GroupICD = () => {
  const { t } = useTranslation();
  const { data: chapters } = useGetAllChapter();

  const [groupICD, setSelectedGroupICD] = useState<TBlockICD | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<BlockICDModalType>('add');

  const onOpenModal = () => setIsOpenModal(true);
  const onCloseModal = () => setIsOpenModal(false);
  const onChangeModalType = (type: BlockICDModalType) => {
    setModalType(type);
  };

  const {
    pagination,
    onPaginationChange,
    filter,
    onChangeFilter,
    debouncedFilter,
  } = useFilter<TFilterBlockICD>({
    defaultFilter: {
      icdBlocksCode: '',
      icdBlocksName: '',
      icdChapterId: '',
    },
  });
  const { data, isLoading, mutate } = useBlockICD(pagination, debouncedFilter);
  const { token } = theme.useToken();
  const handleDeleteUser = async (id: string) => {
    try {
      const res = await BlockICDApi.deleteBlockICD(id);
      if (res.data.code) {
        message.success(res.data.message);
        mutate();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const inputSearch: InputProps[] = [
    {
      label: t('Group Code'),
      type: TYPE_FIELD.TEXT,
      name: 'icdBlocksCode',
      className: 'w-100',
      allowClear: true,
      value: filter.icdBlocksCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdBlocksCode', e.target.value),
    },
    {
      label: t('Group Name'),
      type: TYPE_FIELD.TEXT,
      name: 'icdBlocksName',
      className: 'w-100',
      allowClear: true,
      value: filter.icdBlocksName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('icdBlocksName', e.target.value),
    },
    {
      label: t('Code Category'),
      name: 'icdChapterId',
      className: 'w-100',
      value: filter.icdChapterId,
      type: TYPE_FIELD.SELECT,
      options: chapters?.data?.map((data: TChapter) => ({
        value: data.id ?? null,
        label: data.icdChapterName ?? null,
      })),
      allowClear: true,
      onChange: (value: string) => onChangeFilter('icdChapterId', value),
    },
  ];
  const columns: ColumnsType<TBlockICD> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 250,
      render: (_, __, index) => {
        const { pageNum = 0, pageSize = 10 } = pagination;
        return pageNum * pageSize + index + 1;
      },
    },
    {
      title: t('Group Code'),
      dataIndex: 'icdBlocksCode',
    },
    {
      title: t('Group Name'),
      dataIndex: 'icdBlocksName',
    },
    {
      title: t('Code Category'),
      dataIndex: 'icdChapterId',
      render: (value: string) => {
        const data = chapters?.data?.find(
          (chapter: { id: any }) => String(chapter.id) === String(value),
        );
        return data ? data.icdChapterName : null;
      },
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TBlockICD) => {
        return (
          <Flex justify='center'>
            <ButtonCustom.Edit
              onClick={() => {
                setSelectedGroupICD(record);
                onOpenModal();
                onChangeModalType('edit');
              }}
              type='link'
              style={{ color: token['green-7'] }}
              size='small'
              icon={<EditOutlined />}
            ></ButtonCustom.Edit>
            <Popconfirm
              title='Bạn có chắc chắn muốn xóa nhân viên này?'
              onConfirm={() => handleDeleteUser(record.id)}
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
        {/* products list */}
        <TableCustom
          columns={columns}
          title={t('Category Group ICD')}
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
        />
      </Space>

      <GroupICDModal
        key={groupICD?.id}
        modalType={modalType}
        show={isOpenModal}
        category={groupICD}
        onHide={onCloseModal}
        onSuccess={() => {
          onCloseModal();
          mutate();
        }}
      />
    </>
  );
};

export default GroupICD;
