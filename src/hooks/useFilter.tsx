/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import lodash from 'lodash';
import { DEFAULT_PAGINATION } from 'src/constants/common/common';
import { TPagination } from 'src/constants/types';

import useDebounce from './useDebounce';

type Props<FilterType> = {
  defaultFilter?: FilterType;
};

const DEBOUNCED_TIME = 500;
const sortObject = (obj: any) => {
  return lodash(obj).toPairs().sortBy(0).fromPairs().value() as any;
};

const useFilter = <T extends object>(props: Props<T>) => {
  const { defaultFilter = {} as T } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsValues = Object.fromEntries(searchParams.entries());
  const [renderCount, setRenderCount] = useState<number>(0);
  const [filter, setFilter] = useState<T>({
    ...defaultFilter,
    ...searchParamsValues,
  });

  const [debouncedFilter, setDebounceFilter] = useDebounce<T>(
    filter,
    DEBOUNCED_TIME,
  );

  const [pagination, setPagination] = useState<TPagination>({
    pageNum: Number(searchParams.get('pageNum')) || DEFAULT_PAGINATION.pageNum,
    pageSize:
      Number(searchParams.get('pageSize')) || DEFAULT_PAGINATION.pageSize,
  });

  const onPaginationChange = useCallback(
    (page: number, pageSize: number) => {
      setPagination(prev => ({
        ...prev,
        pageNum: page,
        pageSize,
      }));

      setSearchParams(
        sortObject({
          ...searchParamsValues,
          pageNum: page,
          pageSize,
        }),
      );
    },
    [searchParamsValues],
  );

  const onChangeFilter = useCallback(
    (type: keyof T, value: string | number) => {
      setFilter(prev => ({
        ...prev,
        [type]: value,
      }));
      setDebounceFilter(prev => ({
        ...prev,
        [type]: value,
      }));
    },
    [],
  );

  const onResetPagination = useCallback(() => {
    setPagination(DEFAULT_PAGINATION);
    setSearchParams(
      sortObject({
        ...searchParamsValues,
        pageNum: DEFAULT_PAGINATION.pageNum,
        pageSize: DEFAULT_PAGINATION.pageSize,
      }),
    );
  }, [searchParamsValues]);

  const onResetFilter = useCallback(() => {
    setFilter(defaultFilter);
    setDebounceFilter(defaultFilter);
  }, [JSON.stringify(defaultFilter)]);

  // count render
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, [filter, pagination]);

  // get value from url and set to filter and pagination
  useEffect(() => {
    const pageNum =
      Number(searchParams.get('pageNum')) || DEFAULT_PAGINATION.pageNum;
    const pageSize =
      Number(searchParams.get('pageSize')) || DEFAULT_PAGINATION.pageSize;
    setPagination({
      pageNum,
      pageSize,
    });

    const filterFromParams = Object.fromEntries(searchParams.entries());
    if (Object.keys(filterFromParams).length > 0) {
      delete filterFromParams.pageNum;
      delete filterFromParams.pageSize;
      setFilter(prev => ({
        ...prev,
        ...filterFromParams,
      }));
      setDebounceFilter(prev => ({
        ...prev,
        ...filterFromParams,
      }));
    }
  }, []);

  // reset pagination when filter change
  useEffect(() => {
    if (
      pagination.pageNum !== DEFAULT_PAGINATION.pageNum ||
      pagination.pageSize !== DEFAULT_PAGINATION.pageSize
    ) {
      setPagination(DEFAULT_PAGINATION);
    }
  }, [debouncedFilter]);

  // set filter data to params url
  useEffect(() => {
    // prevent render first time
    if (renderCount < 2) return;

    const filteredEntries = Object.entries(debouncedFilter).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([key, value]) => {
        return value !== null && value !== '' && value !== undefined;
      },
    );

    const filteredObject = Object.fromEntries(filteredEntries);
    setSearchParams(prev =>
      sortObject({
        ...prev,
        ...filteredObject,
      }),
    );
  }, [debouncedFilter]);

  return {
    pagination,
    setPagination,

    filter,
    debouncedFilter,
    setFilter,

    onResetPagination,
    onPaginationChange,

    onResetFilter,
    onChangeFilter,
  };
};

export default useFilter;
