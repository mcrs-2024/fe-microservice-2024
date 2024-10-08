import React, { Suspense } from 'react';

const loading = () => <div className=''></div>;

interface DefaultLayoutProps {
  layout: {
    layoutType: string;
    layoutWidth: string;
    leftSideBarTheme: string;
    leftSideBarType: string;
    showRightSidebar: boolean;
  };
  children?: any;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  // get the child view which we would like to render
  const children = props['children'] || null;

  return (
    <>
      <Suspense fallback={loading()}>{children}</Suspense>
    </>
  );
};
export default DefaultLayout;
