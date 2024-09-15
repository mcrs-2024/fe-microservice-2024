import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, message, Popconfirm, Row, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
// components
import ConfirmModal from 'src/components/modal/ConfirmModal';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import {
  TFilterSystemLogs,
  TSystemLogs,
} from 'src/constants/types/admin/systemLogs';
// dummy data
import {
  auditLogsApi,
  systemLogsApi,
  useSystemLogs,
} from 'src/helpers/api/admin/log';
import useFilter from 'src/hooks/useFilter';
import { systemLogsRoute } from 'src/routes/routes.contants';

const SystemLogs = () => {
  const [isShowConfirmDeleteModal, setIsShowConfirmDeleteModal] =
    useState<boolean>(false);
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter<TFilterSystemLogs>({
    defaultFilter: {
      errorCode: null,
      errorMessages: '',
      apiMethod: '',
      apiRoute: '',
      payload: '',
      timeCreated: null,
    },
  });

  const { data: systemLogs, isLoading, mutate } = useSystemLogs(pagination);

  /* status column render */
  const ErrorCodeColumn = (errorCode: number) => {
    let color: string | undefined;
    switch (errorCode) {
      case 500:
        color = 'volcano';
        break;
      default:
        color = 'green';
        break;
    }
    return (
      <span>
        <Tag color={color}>{errorCode}</Tag>
      </span>
    );
  };

  const MethodColumn = (method: string) => {
    let color: string | undefined;
    switch (method) {
      case 'POST':
        color = 'orange';
        break;
      default:
        color = 'green';
        break;
    }
    return (
      <span>
        <Tag color={color}>{method}</Tag>
      </span>
    );
  };

  /* action column render */
  const ActionColumn = (_: any, record: TSystemLogs) => {
    return (
      <ul className='list-inline table-action m-0'>
        <li className='list-inline-item'>
          <Link to='#' className='action-icon'>
            <i className='mdi mdi-eye'></i>
          </Link>
        </li>
        <li
          className='list-inline-item'
          onClick={() => {
            setIsShowConfirmDeleteModal(true);
            // handleDeleteSystemLog([row.original.logId], false);
          }}
        >
          <Link to='#' className='action-icon'>
            <i className='mdi mdi-delete'></i>
          </Link>
        </li>
      </ul>
    );
  };

  const DetailErrorMessageColumn = (_: any, record: TSystemLogs) => {
    const errorMessage = record.errorMessages;
    const className = 'text-truncate';
    return (
      <span className={className} style={{ maxWidth: '150px' }}>
        {errorMessage}
      </span>
    );
  };

  const handleDeleteAll = async () => {
    try {
      const res = await auditLogsApi.deleteAllAuditLog();
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

  // get all columns
  const columns: ColumnsType<TSystemLogs> = [
    {
      title: t('Error_Code'),
      dataIndex: 'errorCode',
      render: ErrorCodeColumn,
      width: 80,
    },
    {
      title: t('Details'),
      dataIndex: 'errorMessages',
      ellipsis: true,
    },
    {
      title: 'Method',
      dataIndex: 'apiMethod',
      render: MethodColumn,
      width: 100,
    },
    {
      title: 'API',
      dataIndex: 'apiRoute',
    },
    {
      title: t('Payload'),
      dataIndex: 'payload',
      // ellipsis: true,
      width: 450,
    },
    {
      title: t('Time'),
      dataIndex: 'timeCreated',
    },
    {
      title: t('Action'),
      dataIndex: 'action',
      fixed: 'right',
      render: ActionColumn,
      width: 100,
    },
  ];

  const handleDeleteSystemLog = async (ids: string[], deleteAll: boolean) => {
    try {
      let res;
      if (deleteAll) {
        res = await systemLogsApi.deleteAllSystemLog();
      } else {
        res = await systemLogsApi.deleteByIdSystemLog({ ids });
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

  const onShowAndHideModal = () => {
    setIsShowConfirmDeleteModal(prev => !prev);
  };

  const onAcceptModal = () => {};

  return (
    <>
      <Row>
        {/* logs list */}
        <TableCustom
          columns={columns}
          title='System Logs'
          extra={
            <Popconfirm
              title={t('are_you_sure_you_want_to_delete_this_record')}
              onConfirm={() => handleDeleteAll()}
            >
              <Button type='primary'>{t('Delete all')}</Button>
            </Popconfirm>
          }
          data={systemLogs?.data.content || []}
          isLoading={!systemLogs && isLoading}
          isRowSelection={true}
          // onRowSelectStateChange={setSelectedSystemLogList}
          pagination={{
            pageSize: systemLogs?.data?.pageSize,
            pageNum: systemLogs?.data?.pageNum,
            totalElements: systemLogs?.data?.totalElements,
            onChange: onPaginationChange,
          }}
        />
      </Row>

      <ConfirmModal
        onAccept={() => setIsShowConfirmDeleteModal(false)}
        onClose={onShowAndHideModal}
        isShow={isShowConfirmDeleteModal}
        text={t('Are_you_sure_delete_systemLog')}
      />
    </>
  );
};

export default SystemLogs;
