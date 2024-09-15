import { useEffect, useState } from 'react';
import { Breadcrumb, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import envConfig from 'src/config';
import { PERMISSION_CODES } from 'src/constants/enums/permission';
import { useAppSelector } from 'src/hooks/useRedux';
import {
  addButton,
  ButtonProps,
  resetButton,
} from 'src/redux toolkit/buttonsSlice';
import { RootStateToolKit } from 'src/redux toolkit/store';
import { LayoutState } from 'src/redux/reducers';
import { homePageRoute } from 'src/routes/routes.contants';

// constants
import { LayoutTypes } from '../constants/common';
// custom hoook
import { useRedux } from '../hooks/';

import ButtonCustom from './ButtonCustom';

interface BreadcrumbItems {
  label: string;
  path?: string;
  active?: boolean;
}

interface PageTitleProps {
  breadCrumbItems: Array<BreadcrumbItems>;
  addButton?: React.ReactNode; // Optional add button prop
}

/**
 * PageTitle
 */
const PageTitle = ({ breadCrumbItems }: PageTitleProps) => {
  const { appSelector } = useRedux();
  const { layoutType } = appSelector(LayoutState);
  const buttons = useAppSelector(
    (state: RootStateToolKit) => state.buttons?.buttons,
  );
  const dispatch = useDispatch();

  const [renderedButtons, setRenderedButtons] = useState<JSX.Element[]>([]);

  const buttonIds = buttons?.map(button => button.id).join(',');

  useEffect(() => {
    if (!buttonIds) {
      return () => {};
    }

    const newRenderedButtons = buttons?.map((button: ButtonProps) => (
      <ButtonCustom.Default
        action={button.action || PERMISSION_CODES.VIEW}
        key={button.id}
        className={button.className}
        type={button.type}
        icon={button.icon}
        onClick={button.onClick}
      >
        {button.children}
      </ButtonCustom.Default>
    ));

    setRenderedButtons(newRenderedButtons || []);
    return () => {
      dispatch(resetButton());
    };
  }, [buttonIds, dispatch]);
  return (
    <Row className='align-items-center justify-content-between'>
      <Col>
        <div
          className={classNames('page-title-box', {
            'page-title-box-alt':
              layoutType === LayoutTypes.LAYOUT_HORIZONTAL ||
              layoutType === LayoutTypes.LAYOUT_DETACHED,
          })}
        >
          <div className='page-title-right'>
            <Breadcrumb>
              <Breadcrumb.Item href={homePageRoute}>
                {envConfig.BRAND_NAME}
              </Breadcrumb.Item>

              {breadCrumbItems.map((item, index) =>
                item.active ? (
                  <Breadcrumb.Item key={index}>{item.label}</Breadcrumb.Item>
                ) : (
                  <Breadcrumb.Item
                    href={item.path || homePageRoute}
                    key={index}
                  >
                    {item.label}
                  </Breadcrumb.Item>
                ),
              )}
            </Breadcrumb>
          </div>

          {<Col xs='auto'>{renderedButtons}</Col>}
        </div>
      </Col>
    </Row>
  );
};

export default PageTitle;
