import { TPagination } from '../types';

export const DEFAULT_PAGINATION: TPagination = {
  pageNum: 0,
  pageSize: 10,
};
export const DATE_FORMAT = {
  DATE_TIME: 'HH:mm:ss, DD-MM-YYYY',
  DATE: 'DD-MM-YYYY',
  TIME: 'HH:mm:ss',
  TIMESTAMP: 'YYYY-MM-DDTHH:mm:ss',
};
export const DEFAULT_MAX_FILE_SIZE = 1024 * 1024 * 2; // 2MB
