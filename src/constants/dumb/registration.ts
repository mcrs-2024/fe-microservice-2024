const CITY = [
  {
    value: 1,
    label: 'HCM',
  },
  {
    value: 2,
    label: 'HN',
  },
];

const DISTRICT = [
  {
    value: 1,
    label: 'TAN BINH',
  },
  {
    value: 2,
    label: 'TAN PHU',
  },
];

const IS_GENERAL_HOSPITAL = [
  {
    value: 1,
    label: 'Có',
  },
  {
    value: 2,
    label: 'Không',
  },
];

const GENDER = [
  {
    value: 0,
    label: 'Nam',
  },
  {
    value: 1,
    label: 'Nữ',
  },
  {
    value: 2,
    label: 'Khác',
  },
];

const CLASSIFICATION = [
  {
    value: 1,
    label: 'Dịch vụ',
  },
  {
    value: 2,
    label: 'BHYT',
  },
  {
    value: 3,
    label: 'BHTN',
  },
  {
    value: 4,
    label: 'BHTM',
  },
];

const VISIT_TYPE = [
  {
    value: 1,
    label: 'Khám bệnh ngoại trú',
  },
  {
    value: 2,
    label: 'Khách thực hiện dịch vụ',
  },
  {
    value: 3,
    label: 'Khám cấp cứu',
  },
  {
    value: 4,
    label: 'Khám bệnh mãn tính',
  },
];

const SOURCE = [
  {
    value: 1,
    label: 'Bệnh nhân tự đến',
  },
  {
    value: 2,
    label: 'Chuyển khoa',
  },
  {
    value: 3,
    label: 'Chuyển viện',
  },
  {
    value: 4,
    label: 'Đặt hẹn',
  },
];

const FROM_HOSPITAL = [
  {
    value: 1,
    label: 'Bệnh viện chợ rẫy',
  },
  {
    value: 2,
    label: 'Bệnh viện ĐHYD',
  },
  {
    value: 3,
    label: 'Bệnh viện 30-4',
  },
  {
    value: 4,
    label: 'Bệnh viện 175',
  },
];

const ACCIDENT = [
  {
    value: 1,
    label: 'Tai nạn giao thông',
  },
  {
    value: 2,
    label: 'Bỏng',
  },
  {
    value: 3,
    label: 'Tai nạn lao động',
  },
  {
    value: 4,
    label: 'Tai nạn dưới nước',
  },
];

const FEE_PAYER = [
  {
    value: 1,
    label: 'Cán bộ cao cấp',
  },
  {
    value: 2,
    label: 'BHYT thường',
  },
  {
    value: 3,
    label: 'BHYT công an hưu trí',
  },
  {
    value: 4,
    label: 'Thu viện phí',
  },
];

const INVOICE_GROUP = [
  {
    value: 1,
    label: 'Bảo hiểm',
  },
  {
    value: 2,
    label: 'Viện phí',
  },
  {
    value: 3,
    label: 'Liên kết ngoại',
  },
  {
    value: 4,
    label: 'Liên kết chợ Rẫy',
  },
];

const APPOINTMENT_SERVICE = [
  {
    value: 1,
    label: 'Khám nội tổng quát',
  },
  {
    value: 2,
    label: 'Khám viên gan',
  },
  {
    value: 3,
    label: 'Khám ung bướu',
  },
  {
    value: 4,
    label: 'Khám mắt',
  },
];

const PRIORITY_PATIENT = [
  { value: 1, label: 'Người già ' },
  { value: 2, label: 'Người hiểm nghèo ' },
  { value: 3, label: 'Người khuyết tật' },
];

const ROUTE = [
  { value: 1, label: 'Đúng tuyến ' },
  { value: 2, label: 'Trái tuyến' },
  { value: 3, label: 'Chưa tuyến' },
];

const MEDICALLY_EXAMINATION_PLACE = [
  { value: 1, label: 'Bệnh viên a' },
  { value: 2, label: 'Bệnh viên b' },
  { value: 3, label: 'Bệnh viên c' },
];

export {
  ACCIDENT,
  APPOINTMENT_SERVICE,
  CITY,
  CLASSIFICATION,
  DISTRICT,
  FEE_PAYER,
  FROM_HOSPITAL,
  GENDER,
  INVOICE_GROUP,
  IS_GENERAL_HOSPITAL,
  MEDICALLY_EXAMINATION_PLACE,
  PRIORITY_PATIENT,
  ROUTE,
  SOURCE,
  VISIT_TYPE,
};
