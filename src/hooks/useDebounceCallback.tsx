const useDebounce = (callback: any, delay = 500) => {
  let timeout: any = null;

  return (...args: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

export default useDebounce;
