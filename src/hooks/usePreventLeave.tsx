import { useEffect } from 'react';
import { unstable_usePrompt } from 'react-router-dom';

export default function usePreventLeave(block: boolean = true): void {
  function preventCloseAndRefresh(event: BeforeUnloadEvent): string {
    const e = event || window.event;
    e.preventDefault();
    if (e) e.returnValue = 'Bạn có chắc chắn muốn thoát mà không lưu thay đổi';
    return '';
  }
  unstable_usePrompt({
    message: 'Bạn có chắc chắn muốn thoát mà không lưu thay đổi',
    when: ({ currentLocation, nextLocation }) =>
      block && currentLocation.pathname !== nextLocation.pathname,
  });
  useEffect(() => {
    if (block) {
      // for refresh, tab close
      window.addEventListener('beforeunload', preventCloseAndRefresh);
      window.addEventListener('unload', preventCloseAndRefresh);
    }
    return () => {
      window.removeEventListener('beforeunload', preventCloseAndRefresh);
      window.removeEventListener('unload', preventCloseAndRefresh);
    };
  }, [block]);
}
