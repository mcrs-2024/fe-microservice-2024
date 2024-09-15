import { ChangeEvent, useEffect, useState } from 'react';
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
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
import { TProvince } from 'src/constants/types/category/Province';
import ProvinceApi from 'src/helpers/api/category/province';
import useFilter from 'src/hooks/useFilter';
import { categoryProvince } from 'src/routes/routes.contants';

const CategoryProvince = () => {
  const { t } = useTranslation();
  const [provinces, setProvinces] = useState<TProvince[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await ProvinceApi.getProvinces();
        setProvinces(
          response.data.data.map((province: TProvince) => ({
            id: province.code,
            code: province.code,
            codeName: province.codeName,
            fullName: province.fullName,
          })),
        );
        if (!response.data.code) {
          message.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProvinces();
  }, []);

  const columns: ColumnsType<TProvince> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 120,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: t('ProvinceCodeName'),
      dataIndex: 'code',
    },
    {
      title: t('ProvincefullName'),
      dataIndex: 'fullName',
    },
  ];
  return (
    <>
      {/* header */}
      <Space direction='vertical' className='d-flex'>
        <TableCustom
          data={provinces}
          columns={columns}
          title={t('Province category')}
          isLoading={false}
        />
      </Space>
    </>
  );
};

export default CategoryProvince;
