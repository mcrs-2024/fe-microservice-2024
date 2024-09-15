const WAREHOUSE_OPTIONS = [
  {
    value: 1,
    label: 'Kho kiểm kê',
  },
  {
    value: 2,
    label: 'Kho phẫu thuật',
  },
  {
    value: 3,
    label: 'Kho quầy thuốc',
  },
  {
    value: 4,
    label: 'Kho thuốc tổng',
  },
];

const MEDICINE_STATUS = [
  {
    value: 1,
    label: 'Bình thường',
  },
  {
    value: 2,
    label: 'Hết hạn',
  },
  {
    value: 3,
    label: 'Gần hết hạn',
  },
  {
    value: 4,
    label: 'Hết',
  },
];
const CHAPTER_STATUS_OPTIONS = [
  { value: 1, label: 'Hoạt động' },
  { value: 0, label: 'Không hoạt động' },
];

const PAYMENT_TYPE_OPTIONS = [{ value: 1, label: 'VND đồng' }];

export {
  CHAPTER_STATUS_OPTIONS,
  MEDICINE_STATUS,
  PAYMENT_TYPE_OPTIONS,
  WAREHOUSE_OPTIONS,
};
