import { message } from 'antd';
import { RcFile, UploadFile } from 'antd/es/upload';

const checkFileSizeBeforeUpload = (
  file: RcFile | UploadFile,
  kb: number,
): boolean => {
  if (!file.size) return false;

  const sizeKB = file.size / 1024;
  const mb = kb / 1024;

  const isLargeThan = sizeKB > kb;
  if (isLargeThan) {
    const errorMessage = `Dung lượng file lớn hơn so với mức quy định, vui lòng chọn file nhỏ hơn ${mb >= 1 ? mb + 'MB' : kb + 'KB'}`;

    message.error(errorMessage);
    throw new Error(errorMessage);
  }
  return true;
};

export { checkFileSizeBeforeUpload };
