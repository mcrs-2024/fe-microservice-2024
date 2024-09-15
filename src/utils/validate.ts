/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';

const yupObject = (object: any) => Yup.object().shape(object);
const yupArray = (array: any) => Yup.array().of(array);
const isPhoneNumber = Yup.string()
  .required('Please enter phone number')
  .matches(/^[0-9]+$/, 'Must be only digits and 10 characters')
  .min(10, 'Too short')
  .max(10, 'Too long')
  .nullable();
const textOnly = Yup.string().matches(
  /^[a-zA-Z\saAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ ]+$/,
  'Must be only letters',
);
const numberOnly = Yup.string().matches(/^[0-9]+$/, 'Must be only digits');

const stringValidate = Yup.string().matches(
  /^[a-zA-Z0-9\saAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s.,!?/:;"'|+=_-]*$/,
  'Vui lòng chỉ nhập ký tự chữ, số và khoảng trắng.',
);

export { isPhoneNumber, numberOnly, textOnly, yupArray, yupObject };
