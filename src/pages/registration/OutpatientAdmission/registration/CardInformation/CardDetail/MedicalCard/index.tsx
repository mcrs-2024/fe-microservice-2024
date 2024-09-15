import React from 'react';
import { useTranslation } from 'react-i18next';
import { Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import TableCustom from 'src/components/TableCustom';
import { TApplicablePolicy } from 'src/constants/types/registration/cardInformation/cardDetail';
import useFilter from 'src/hooks/useFilter';

const MedicalCard = () => {
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
      title: t('promotionCode'),
      dataIndex: 'promotionCode',
      width: 350,
    },
    {
      title: t('cardTypeName'),
      dataIndex: 'cardTypeName',
      width: 350,
    },
    {
      title: t('issueDate'),
      dataIndex: 'issueDate',
      width: 350,
    },
    {
      title: t('status'),
      dataIndex: 'status',
      width: 350,
    },
    {
      title: t('quantityPurchase'),
      dataIndex: 'quantityPurchase',
      width: 350,
    },
  ];
  return (
    <>
      <TableCustom
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
        showVisibleColumns={false}
        bordered
        scroll={{ x: 700 }}
      ></TableCustom>
    </>
  );
};

export default MedicalCard;
