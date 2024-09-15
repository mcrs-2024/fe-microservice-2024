import React, { useState } from 'react';
import { BarsOutlined } from '@ant-design/icons';
import { Button, Checkbox, Dropdown, Flex, Menu, Tooltip } from 'antd';
import { ColumnType } from 'antd/es/table';

type Props = {
  originColumns: Array<ColumnType<any>>;
  onChange: (columns: Array<ColumnType<any>>) => void;
};

const VisibleColumnsDropdown = (props: Props) => {
  const { originColumns, onChange } = props;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    originColumns.map(column => column.dataIndex as string),
  );
  const [selectedColumns, setSelectedColumns] =
    useState<string[]>(visibleColumns);

  const handleOkColumn = () => {
    setVisibleColumns(selectedColumns);
    onChange(
      originColumns.filter(column =>
        selectedColumns.includes(column.dataIndex as string),
      ),
    );
    setDropdownVisible(false);
  };

  const handleResetColumn = () => {
    setSelectedColumns(originColumns.map(column => column.dataIndex as string));
    setVisibleColumns(originColumns.map(column => column.dataIndex as string));
    onChange(originColumns);
    setDropdownVisible(false);
  };
  const handleDropdownVisibleChange = (visible: boolean) => {
    setDropdownVisible(visible);
  };
  const handleColumnFilter = (checkedValues: string[]) => {
    setSelectedColumns(checkedValues);
  };
  const optionsDisplay = originColumns.map(column => ({
    label: column.title,
    value: column.dataIndex as string,
  }));
  return (
    <Tooltip title='Cột hiển thị'>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key='columnFilter'>
              <div
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Checkbox.Group
                  className='table-custom-visible-columns-checkbox-group'
                  options={optionsDisplay}
                  value={selectedColumns}
                  onChange={handleColumnFilter}
                  style={{ flexDirection: 'column' }}
                />
              </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key='buttonGroup'>
              <Flex justify='center' align='center'>
                <Button onClick={handleResetColumn}>Reset</Button>
                <Button
                  type='primary'
                  onClick={handleOkColumn}
                  style={{ backgroundColor: '#0FAC56', marginLeft: 4 }}
                >
                  OK
                </Button>
              </Flex>
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
        open={dropdownVisible}
        onOpenChange={handleDropdownVisibleChange}
        placement='bottomLeft'
      >
        <Button type='default'>
          <BarsOutlined />
        </Button>
      </Dropdown>
    </Tooltip>
  );
};

export default VisibleColumnsDropdown;
