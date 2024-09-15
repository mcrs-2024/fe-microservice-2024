import { useEffect, useState } from 'react';
import { Image, Modal, theme, Upload, UploadFile, UploadProps } from 'antd';
import { DEFAULT_MAX_FILE_SIZE } from 'src/constants/common/common';
import { checkFileSizeBeforeUpload } from 'src/utils/file';

type Props = UploadProps & {
  name: string;
  dataURI: string;
  handleChangeFiles?: (value: any) => void;
  disabled?: boolean;
  maxCount?: number;
  fileSize?: number;
};
const ImagesUploadInput = (props: Props) => {
  const {
    dataURI,
    handleChangeFiles,
    fileSize = DEFAULT_MAX_FILE_SIZE,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  console.log('fileList:', fileList);
  const { token } = theme.useToken();

  const [selectedImage, setSelectedImage] = useState<UploadFile | null>();
  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);

  const onChange: UploadProps['onChange'] = ({
    fileList: newFileList,
    file,
  }) => {
    checkFileSizeBeforeUpload(file, fileSize);

    setFileList(newFileList);
    handleChangeFiles && handleChangeFiles(newFileList);
  };
  const onPreview = async (file: UploadFile) => {
    setSelectedImage(file);
    setOpenPreviewModal(true);
  };
  useEffect(() => {
    if (dataURI) {
      setFileList([
        {
          uid: '1',
          name: 'temp.png',
          status: 'done',
          url: dataURI,
          thumbUrl: dataURI,
          preview: dataURI,
        },
      ] as UploadFile[]);
    }
  }, [dataURI]);

  return (
    <>
      <Upload
        listType='picture-card'
        fileList={fileList}
        onPreview={onPreview}
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
        {fileList.length < (props.maxCount || 1) && '+ Upload'}
      </Upload>
      <Modal
        open={openPreviewModal}
        footer={null}
        onCancel={() => setOpenPreviewModal(false)}
        title='Image preview'
        width={350}
      >
        <Image
          src={selectedImage?.thumbUrl}
          alt=''
          style={{
            borderRadius: '6px',
            border: `1px solid ${token.colorPrimary}`,
          }}
        />
      </Modal>
    </>
  );
};
export default ImagesUploadInput;
