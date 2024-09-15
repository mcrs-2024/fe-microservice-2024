import { Card, Tabs, TabsProps } from 'antd';

import 'src/assets/scss/custom/components/tabs-custom.scss';
type Props = TabsProps;

const TabsCustom = (props: Props) => {
  const { ...otherProps } = props;
  return (
    <Card size='small' className='tabs-custom-container' bordered={false}>
      <Tabs {...otherProps} />
    </Card>
  );
};

export default TabsCustom;
