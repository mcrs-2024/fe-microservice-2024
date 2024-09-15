import { useTranslation } from 'react-i18next';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Flex, message, Row } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
// components
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import {
  TAccessHistory,
  TFilterAccessHistory,
} from 'src/constants/types/admin/accessHistory';
// dummy data
import {
  accessHistoryApi,
  useAccessHistory,
} from 'src/helpers/api/admin/accessHistory';
import useFilter from 'src/hooks/useFilter';
import { accessHistoryRoute } from 'src/routes/routes.contants';

const AccessHistory = () => {
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter<TFilterAccessHistory>({
    defaultFilter: {
      userId: '',
      loginTime: new Date(),
      signoutTime: null,
      updateTime: null,
      ipAddress: '',
    },
  });

  const {
    data: accessHistory,
    isLoading,
    mutate,
  } = useAccessHistory(pagination);

  /* action column render */
  const ActionColumn = (_: any, record: TAccessHistory) => {
    return (
      <Flex>
        <ButtonCustom.Delete
          icon={<DeleteOutlined />}
          type='text'
          onClick={() => {
            handleDeleteAccessHistory([record.id], false);
          }}
        ></ButtonCustom.Delete>
      </Flex>
    );
  };

  // get all columns

  const handleDeleteAccessHistory = async (
    ids: string[],
    deleteAll: boolean,
  ) => {
    try {
      let res;
      if (deleteAll) {
        res = await accessHistoryApi.deleteAllAccessHistory();
      } else {
        res = await accessHistoryApi.deleteByIdAccessHistory({ ids });
      }
      if (res.data.code === 200) {
        message.success(res.data.message);
        mutate();
      } else {
        throw new Error(res.data.message);
      }
      mutate();
    } catch (error) {
      message.error(error);
    }
  };
  const columns: ColumnsType<TAccessHistory> = [
    {
      title: t('Code'),
      dataIndex: 'id',
    },
    {
      title: t('Login_Time'),
      dataIndex: 'loginTime',
      // Cell: ({ value }: { value: Date }) => {
      //   return <>{value?.toDateString()}</>;
      // },
    },
    {
      title: t('Logout_Time'),
      dataIndex: 'signoutTime',
      // Cell: ({ value }: { value: Date }) => {
      //   return <>{value?.toDateString()}</>;
      // },
    },
    {
      title: t('Update_Time'),
      dataIndex: 'updateTime',
      // Cell: ({ value }: { value: Date }) => {
      //   return <>{value?.toDateString()}</>;
      // },
    },
    {
      title: t('IP_Address'),
      dataIndex: 'ipAddress',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      width: 100,
      align: 'center',
      render: ActionColumn,
    },
  ];
  return (
    <>
      <Row>
        <Card className='w-100'>
          <TableCustom
            columns={columns}
            data={accessHistory?.data.content || []}
            id={'id'}
            isRowSelection={true}
            isLoading={!accessHistory && isLoading}
            pagination={{
              pageSize: accessHistory?.data?.pageSize,
              pageNum: accessHistory?.data?.pageNum,
              totalElements: accessHistory?.data?.totalElements,
              onChange: onPaginationChange,
            }}
          />
        </Card>
      </Row>
    </>
  );
};

export default AccessHistory;
