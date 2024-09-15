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
import { TDistrict, TProvince } from 'src/constants/types/category/Province';
import ProvinceApi from 'src/helpers/api/category/province';
import useFilter from 'src/hooks/useFilter';
import { categoryProvince } from 'src/routes/routes.contants';

const CategoryDistinc = () => {
  const { t } = useTranslation();
  const [provinces, setProvinces] = useState<TProvince[]>([]);
  const [districts, setDistricts] = useState<TDistrict[]>([]);
  const [filter, setFilter] = useState<{ values: { code: string } }>({
    values: { code: '01' },
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await ProvinceApi.getProvinces();
        setProvinces(
          response.data.data.map((province: TProvince) => ({
            label: province.fullName,
            value: province.code,
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

  const handleChange = (key: string, value: string | null) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      values: {
        ...prevFilter.values,
        [key]: value,
      },
    }));
  };

  const fetchDistricts = async (provinceCode: string) => {
    try {
      const response = await ProvinceApi.getDistricts(provinceCode);
      setDistricts(
        response.data.data.map((district: any) => ({
          id: district.code,
          code: district.code,
          fullName: district.fullName,
        })),
      );
      if (!response.data.code) {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const inputs: InputProps[] = [
    {
      name: 'code',
      key: 'code',
      label: t('Registration City'),
      type: TYPE_FIELD.SELECT,
      options: provinces,
      defaultValue: '01',
      value: filter.values.code,
      onChange: (value: string | null) => {
        handleChange('code', value);
      },
    },
  ];

  useEffect(() => {
    if (filter.values.code) {
      fetchDistricts(filter.values.code);
      setFilter(prevFilter => ({
        ...prevFilter,
        values: {
          ...prevFilter.values,
          registrationDistrict: '',
        },
      }));
    } else {
      setDistricts([]);
    }
  }, [filter.values.code]);

  const columns: ColumnsType<TDistrict> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 120,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: t('DistrictcodeName'),
      dataIndex: 'code',
    },
    {
      title: t('DistrictfullName'),
      dataIndex: 'fullName',
    },
  ];
  return (
    <>
      {/* header */}
      <Space direction='vertical' className='d-flex'>
        <Card>
          {/* filter inputs */}
          <Row>
            <InputFields inputs={inputs} gutter={[0, 8]}></InputFields>
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
            <Button icon={<ReloadOutlined />}>{t('Delete_Search')}</Button>
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
          data={districts}
          columns={columns}
          title={t('District category')}
          isLoading={false}
        />
      </Space>
    </>
  );
};

export default CategoryDistinc;
