import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DoubleLeftOutlined,
  DoubleRightOutlined,
  RollbackOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { Button, message, Row, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ButtonCustom from 'src/components/ButtonCustom';
import TableCustom from 'src/components/TableCustom';
import { TMenu } from 'src/constants/types/admin/menu';
import { menuApi } from 'src/helpers/api/admin/menu';

import FunctionGroupTable from './FunctionGroupTable';

import './style.scss';

type Props = {
  filters: { roleCode?: string };
};

const UserFunctionTable: React.FC<Props> = ({ filters }) => {
  const [menus, setMenus] = useState<TMenu[]>([]);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [keysNotBelong, setKeysNotBelong] = useState<React.Key[]>([]);
  const [keysBelong, setKeysBelong] = useState<React.Key[]>([]);

  // transform data from api to data for table
  const fetchMenus = async () => {
    try {
      setIsLoading(true);
      const res = await menuApi.findAllByOneRoleCode(filters.roleCode || '');
      if (res.data.code === 200) {
        setMenus(getMenuItems(res.data.data));
      }
    } catch (error) {
      message.error('Lỗi khi lấy dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };
  const getMenuItems = (menus: TMenu[]): TMenu[] => {
    return (
      menus?.map(item => {
        return {
          ...item,
          key: item.menuId,
          isBelong: Boolean(item.isBelong),
          children: getMenuItems(item.children || []),
        };
      }) || []
    );
  };

  // filter menu by isBelong
  const filterMenusByIsBelong = (
    menus: TMenu[],
    isBeLong: boolean,
  ): TMenu[] => {
    // Helper function to check if a menu or any of its children should be included
    function shouldInclude(menu: TMenu): boolean {
      if (menu.isBelong === isBeLong) return true;
      if (menu.children) {
        return menu.children.some(child => shouldInclude(child));
      }
      return false;
    }

    // Helper function to filter children recursively
    function filterChildren(menu: TMenu): TMenu {
      if (!menu.children) return menu;
      const filteredChildren = menu.children
        .filter(child => shouldInclude(child))
        .map(filterChildren);
      return { ...menu, children: filteredChildren };
    }

    // Filter menus and their children
    return menus.filter(menu => shouldInclude(menu)).map(filterChildren);
  };
  const handleRemoveSubItemFromRole = (menus: TMenu[]): TMenu[] => {
    return menus.map(item => {
      // If the item's key is not in keysBelong, return it without changes
      const isHaveSubItem = item.children && item.children?.length > 0;
      if (!keysBelong.includes(item.key || '') && !isHaveSubItem) {
        return item;
      }

      // If the item has children, recursively handle them first
      if (isHaveSubItem) {
        const updatedChildren = item.children
          ? handleRemoveSubItemFromRole(item.children)
          : [];

        // Determine if any child is not in keysBelong, indicating not all sub-items are removed
        const hasChildrenBelong = updatedChildren.some(
          child => child.isBelong === true,
        );
        // Update the item
        return {
          ...item,
          // Set isBelong to false if all children are to be removed, true otherwise
          isBelong: hasChildrenBelong,
          // Include the updated children
          children: updatedChildren,
        };
      } else {
        // if item has no children, set isBelong to false
        return { ...item, isBelong: false };
      }
    });
  };
  const handleAddSubItemToRole = (menus: TMenu[]): TMenu[] => {
    return menus.map(item => {
      // If the item's key is not in keysBelong, return it without changes
      const isHaveSubItem = item.children && item.children?.length > 0;

      if (!keysNotBelong.includes(item.key || '') && !isHaveSubItem) {
        return item;
      }

      // If the item has children, recursively handle them first
      if (isHaveSubItem) {
        const updatedChildren = item.children
          ? handleAddSubItemToRole(item.children)
          : [];

        // Determine if any child is not in keysBelong, indicating not all sub-items are removed
        const hasChildrenBelong = updatedChildren.some(
          child => child.isBelong === true,
        );
        // Update the item
        return {
          ...item,
          // Set isBelong to false if all children are to be removed, true otherwise
          isBelong: hasChildrenBelong,
          // Include the updated children
          children: updatedChildren,
        };
      } else {
        // if item has no children, set isBelong to false
        return { ...item, isBelong: true };
      }
    });
  };
  const removeMenuFromRole = () => {
    // swith isBelong from true -> false any menu item in keysBelong array
    const updatedMenus = handleRemoveSubItemFromRole(menus);
    console.log('removeMenuFromRole', updatedMenus);
    setKeysBelong([]);
    setMenus(updatedMenus);
  };
  const addSubItemToRole = () => {
    // swith isBelong from false -> true any menu item in keysNotBelong array
    const updatedMenus = handleAddSubItemToRole(menus);
    console.log('addSubItemToRole', updatedMenus);
    setKeysNotBelong([]);
    setMenus(updatedMenus);
  };

  const handleSave = async () => {
    if (filters?.roleCode && menus.length > 0) {
      setIsSaveLoading(true);
      try {
        const res = await menuApi.updateMenuByRole(filters?.roleCode, menus);
        if (res.data.code === 200) {
          message.success(res.data.message);
        } else message.error(res.data.message);
      } catch {
        message.error('Cập nhật thất bại');
      } finally {
        setIsSaveLoading(false);
      }
    } else {
      message.error('Vui lòng chọn nhóm tài khoản');
    }
  };

  const columns: ColumnsType<any> = [
    {
      key: 1,
      title: t('Feature_authorization'),
      dataIndex: '',
      width: '47%',
      render: () => (
        <FunctionGroupTable
          menus={filterMenusByIsBelong(menus, false)}
          selectedKeys={keysNotBelong}
          setKeys={setKeysNotBelong}
        />
      ),
    },
    {
      key: 2,
      align: 'center',
      title: (
        <Row justify={'center'}>
          <ButtonCustom.View icon={<RollbackOutlined />} onClick={fetchMenus} />
        </Row>
      ),
      dataIndex: '',
      render: () => (
        <Row align={'middle'} justify={'center'}>
          <Space direction='vertical'>
            <ButtonCustom.Edit
              onClick={removeMenuFromRole}
              danger
              type='primary'
              icon={<DoubleLeftOutlined />}
            />
            <ButtonCustom.Edit
              onClick={addSubItemToRole}
              type='primary'
              icon={<DoubleRightOutlined />}
            />
          </Space>
        </Row>
      ),
    },
    {
      key: 3,
      title: t('Functional_attribute_group'),
      dataIndex: '',
      width: '47%',
      render: () => (
        <FunctionGroupTable
          menus={filterMenusByIsBelong(menus, true)}
          selectedKeys={keysBelong}
          setKeys={setKeysBelong}
        />
      ),
    },
  ];

  useEffect(() => {
    if (filters.roleCode) fetchMenus();
  }, [filters.roleCode]);

  return (
    <div className='user-function-table-container'>
      <div className='user-function-table'>
        <TableCustom
          data={[{ key: 1 }]}
          columns={columns}
          bordered={true}
          isLoading={isLoading}
          title={t('Feature_authorization')}
          showVisibleColumns={false}
          extra={
            <ButtonCustom.Edit
              type='primary'
              icon={<SaveOutlined />}
              onClick={handleSave}
              loading={isSaveLoading}
            >
              Save
            </ButtonCustom.Edit>
          }
        />
      </div>
    </div>
  );
};

export default UserFunctionTable;
