import { ReactNode } from 'react';
import { ItemType } from 'antd/es/menu/interface';

type Props = {
  accordion?: boolean;
  activeKey?: React.Key | React.Key[];
  defaultActiveKey?: React.Key | React.Key[];
  bordered?: boolean;
  items?: ItemType[];
  extra?: ReactNode;
  size?: number | undefined;
};
