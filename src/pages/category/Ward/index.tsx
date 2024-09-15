import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DeleteOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Card, message, Row, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { InputProps } from 'src/components/form/FomItem';
import InputFields from 'src/components/form/InputFields';
import PageTitle from 'src/components/PageTitle';
import TableCustom from 'src/components/TableCustom';
import { TYPE_FIELD } from 'src/constants/enums/common';
import {
  TDistrict,
  TProvince,
  TWard,
} from 'src/constants/types/category/Province';
import ProvinceApi from 'src/helpers/api/category/province';
import { categoryProvince } from 'src/routes/routes.contants';

const CategoryWard = () => {
  const { t } = useTranslation();
  const [provinces, setProvinces] = useState<TProvince[]>([]);
  const [districts, setDistricts] = useState<TDistrict[]>([]);
  const [wards, setWards] = useState<TWard[]>([]);
  const [filter, setFilter] = useState<{
    values: { provinceCode: string; districtCode: string };
  }>({
    values: { provinceCode: '01', districtCode: '001' },
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

  const handleChange = (key: string, value: string) => {
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
        response.data.data.map((district: TDistrict) => ({
          id: district.code,
          codeName: district.codeName,
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

  const fetchWards = async (districtCode: string) => {
    try {
      const response = await ProvinceApi.getWards(districtCode);
      setWards(
        response.data.data.map((ward: TWard) => ({
          id: ward.code,
          codeName: ward.codeName,
          fullName: ward.fullName,
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
      name: 'provinceCode',
      key: 'provinceCode',
      label: t('Registration City'),
      type: TYPE_FIELD.SELECT,
      options: provinces,
      value: filter.values.provinceCode,
      onChange: (value: string) => {
        handleChange('provinceCode', value);
      },
    },
    {
      name: 'districtCode',
      key: 'districtCode',
      label: t('District'),
      type: TYPE_FIELD.SELECT,
      options: districts.map(district => ({
        label: district.fullName,
        value: district.id,
      })),
      value: filter.values.districtCode,
      onChange: (value: string) => {
        handleChange('districtCode', value);
      },
    },
  ];

  useEffect(() => {
    if (filter.values.provinceCode) {
      fetchDistricts(filter.values.provinceCode);
      setFilter(prevFilter => ({
        ...prevFilter,
        values: {
          ...prevFilter.values,
          districtCode: '',
        },
      }));
      setWards([]); // Reset wards when province changes
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [filter.values.provinceCode]);

  useEffect(() => {
    if (filter.values.districtCode) {
      fetchWards(filter.values.districtCode);
    } else {
      setWards([]);
    }
  }, [filter.values.districtCode]);

  const columns: ColumnsType<TWard> = [
    {
      title: t('Serial_Number'),
      dataIndex: 'id',
      width: 120,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: t('WardcodeName'),
      dataIndex: 'codeName',
    },
    {
      title: t('WardfullName'),
      dataIndex: 'fullName',
    },
  ];

  return (
    <>
      <Space direction='vertical' className='d-flex'>
        <Card>
          <Row>
            <InputFields
              inputs={inputs}
              span={{ sm: 24, lg: 12 }}
              gutter={[0, 8]}
            />
          </Row>
          <Row
            justify={'end'}
            className='d-flex align-items-center'
            style={{
              columnGap: '8px',
            }}
          >
            <Button
              icon={<ReloadOutlined />}
              onClick={() => {
                setFilter({ values: { provinceCode: '', districtCode: '' } });
                setDistricts([]);
                setWards([]);
              }}
            >
              {t('Delete_Search')}
            </Button>
            <Button
              type='primary'
              icon={<SearchOutlined />}
              onClick={() => {
                // Implement search functionality if needed
              }}
            >
              {t('Search')}
            </Button>
          </Row>
        </Card>
        <TableCustom
          data={wards}
          columns={columns}
          title={t('Ward category')}
          isLoading={false}
        />
      </Space>
    </>
  );
};

export default CategoryWard;
