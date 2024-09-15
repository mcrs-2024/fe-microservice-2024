import React, { useRef } from 'react';
import { Nav, Offcanvas, Tab } from 'react-bootstrap';
// actions
import SimpleBar from 'simplebar-react';
import { LayoutState } from 'src/redux/reducers';

// components
import ThemeCustomizer from '../../components/ThemeCustomizer/';
// hooks
import { useRedux } from '../../hooks/';
import { hideRightSidebar } from '../../redux/actions';

interface RightSideBarProps {
  hideRightSidebar?: () => void;
  title?: string;
  children?: any;
}

const RightSideBar = (props: RightSideBarProps) => {
  const { dispatch, appSelector } = useRedux();
  const rightBarNodeRef: any = useRef(null);

  const { isOpenRightSideBar } = appSelector(LayoutState);

  /**
   * Handle the click anywhere in doc
   */
  // const handleOtherClick = useCallback(
  //   (e: any) => {
  //     if (isOpenRightSideBar) {
  //       if (
  //         rightBarNodeRef &&
  //         rightBarNodeRef.current &&
  //         rightBarNodeRef.current.contains(e.target)
  //       ) {
  //         return;
  //       } else {
  //         dispatch(hideRightSidebar());
  //       }
  //     }
  //   },
  //   [rightBarNodeRef, dispatch, isOpenRightSideBar]
  // );

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleOtherClick, false);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOtherClick, false);
  //   };
  // }, [handleOtherClick]);

  /**
   * Toggles the right sidebar
   */
  const handleRightSideBar = () => {
    dispatch(hideRightSidebar());
  };

  return (
    <React.Fragment>
      <Offcanvas
        show={isOpenRightSideBar}
        onHide={handleRightSideBar}
        className='right-bar'
        placement='end'
      >
        <div className='h-100' ref={rightBarNodeRef}>
          <SimpleBar
            style={{ maxHeight: '100%', zIndex: 10000 }}
            scrollbarMaxSize={320}
          >
            <Tab.Container defaultActiveKey='themecustomizer'>
              <Nav
                variant='tabs'
                as='ul'
                className='nav-bordered nav-justified'
              >
                <Nav.Item as='li'>
                  <Nav.Link eventKey='chats' className='py-2'>
                    <i className='mdi mdi-message-text-outline d-block font-22 my-1' />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as='li'>
                  <Nav.Link eventKey='tasks' className='py-2'>
                    <i className='mdi mdi-format-list-checkbox d-block font-22 my-1' />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as='li'>
                  <Nav.Link eventKey='themecustomizer' className='py-2'>
                    <i className='mdi mdi-cog-outline d-block font-22 my-1' />
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className='pt-0'>
                <Tab.Pane eventKey='chats'>
                  {/* <Chats chats={chats} /> */}
                </Tab.Pane>
                <Tab.Pane eventKey='tasks'>
                  {/* <Tasks tasks={tasks} /> */}
                </Tab.Pane>
                <Tab.Pane eventKey='themecustomizer'>
                  <ThemeCustomizer />
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </SimpleBar>
        </div>
      </Offcanvas>
      <div className='rightbar-overlay'></div>
    </React.Fragment>
  );
};

export default RightSideBar;
