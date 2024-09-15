import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, Flex, message, Popconfirm, Row, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TApplicationType,
  TFilterApplicationType,
} from 'src/constants/types/category/applicationType';
import applicationTypeApi, {
  useApplicationType,
} from 'src/helpers/api/category/applicationType';
import useFilter from 'src/hooks/useFilter';
import { categoryICDGroups } from 'src/routes/routes.contants';

const ApplicationType = () => {
  const { t } = useTranslation();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const {
    pagination,
    onPaginationChange,
    filter,
    debouncedFilter,
    onChangeFilter,
    onResetFilter,
  } = useFilter<TFilterApplicationType>({
    defaultFilter: {
      applicationTypeCode: '',
      applicationTypeName: '',
    },
  });
  const { data, isLoading, mutate } = useApplicationType(
    pagination,
    debouncedFilter,
  );

  const onOpenModal = () => setIsOpenModal(true);

  const handleDelete = async (applicationTypeCode: string) => {
    try {
      const res =
        await applicationTypeApi.deleteApplication(applicationTypeCode);
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
      label: t('Application_type_code'),
      type: TYPE_FIELD.TEXT,
      name: 'applicationTypeCode',
      className: 'w-100',
      allowClear: true,
      value: filter.applicationTypeCode,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('applicationTypeCode', e.target.value),
    },
    {
      label: t('Application_type_name'),
      type: TYPE_FIELD.TEXT,
      name: 'applicationTypeName',
      className: 'w-100',
      allowClear: true,
      value: filter.applicationTypeName,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        onChangeFilter('applicationTypeName', e.target.value),
    },
  ];

  const columns: ColumnsType<TApplicationType> = [
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
      title: t('Application_type_code'),
      dataIndex: 'applicationTypeCode',
    },
    {
      title: t('Application_type_name'),
      dataIndex: 'applicationTypeName',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 120,
      align: 'center',
      fixed: 'right',
      render: (_, record: TApplicationType) => {
        return (
          <Flex justify='center'>
            {/* <ButtonCustom.Edit
              onClick={() => {
                setSelectedRecord(record);
                onOpenModal();
              }}
              type='link'
              style={{ color: token['green-7'] }}
              size='small'
              icon={<EditOutlined />}
            /> */}
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDelete(record.applicationTypeCode)}
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
          title={t('Chapter_category')}
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
    </>
  );
};

export default ApplicationType;
