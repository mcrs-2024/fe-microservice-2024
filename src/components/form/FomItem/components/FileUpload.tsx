import { useEffect, useState } from 'react';
import { Image, Modal, theme, Upload, UploadFile, UploadProps } from 'antd';
import { DEFAULT_MAX_FILE_SIZE } from 'src/constants/common/common';
import { checkFileSizeBeforeUpload } from 'src/utils/file';

type Props = UploadProps & {
  name: string;
  handleChangeFiles?: (value: any) => void;
  disabled?: boolean;
  maxCount?: number;
  fileSize?: number;
};
const FileUploadInput = (props: Props) => {
  const { handleChangeFiles, fileSize = DEFAULT_MAX_FILE_SIZE } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { token } = theme.useToken();
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);

  const onChange: UploadProps['onChange'] = ({
    fileList: newFileList,
    file,
  }) => {
    checkFileSizeBeforeUpload(file, fileSize);

    setFileList(newFileList);
    handleChangeFiles && handleChangeFiles(newFileList);
  };

  return (
    <>
      <Upload
        multiple
        listType='picture-card'
        fileList={fileList}
        beforeUpload={() => false}
        onRemove={file => {
          const updatedList = fileList.filter(f => f.uid !== file.uid);
          setFileList(updatedList);
          handleChangeFiles && handleChangeFiles(updatedList);
          return false;
        }}
        {...props}
        onChange={onChange}
      >
        {fileList.length < (props.maxCount || 1000) && '+ Upload'}
      </Upload>
    </>
  );
};
export default FileUploadInput;
