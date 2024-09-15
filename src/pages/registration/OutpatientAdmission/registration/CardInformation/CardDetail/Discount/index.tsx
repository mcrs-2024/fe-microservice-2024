import React from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import TableCustom from 'src/components/TableCustom';
import { TApplicablePolicy } from 'src/constants/types/registration/cardInformation/cardDetail';
import useFilter from 'src/hooks/useFilter';

const Discount = () => {
  const { t } = useTranslation();
  const { pagination, onPaginationChange } = useFilter({});
  //  const {
  //    data: biddingDecision,
  //    isLoading,
  //    mutate,
  //  } = useBiddingDecision(pagination);
  // const [selectedBiddingDecision, setselectedBiddingDecision] =
  //   useState<TBiddingDecision | null>(null);
  const column: ColumnsType<TApplicablePolicy> = [
    {
      title: t('ID'),
      dataIndex: 'id',
      width: 50,
      align: 'center',
    },
    {
      title: t('programName'),
      dataIndex: 'programName',
      width: 350,
    },
    {
      title: t('remainingApplications'),
      dataIndex: 'remainingApplications',
      width: 350,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 350,
    },
  ];
  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <TableCustom
          showVisibleColumns={false}
          columns={column}
          data={[]}
          // data={biddingDecision?.data?.content || []}
          // pagination={{
          //   pageNum: biddingDecision?.data?.pageNum,
          //   pageSize: biddingDecision?.data?.pageSize,
          //   totalElements: biddingDecision?.data?.totalElements,
          //   onChange: onPaginationChange,
          // }}
          isLoading={false}
          isRowSelection={false}
          bordered
          scroll={{ x: 700 }}
        ></TableCustom>
      </Space>
    </>
  );
};

export default Discount;
