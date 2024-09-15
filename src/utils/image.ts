import { RcFile } from 'antd/es/upload';
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
// dataURI is header + base64 value
const getDataURI = (file: RcFile) => {
  if (!file) return '';
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};
const dataURItoBlob = (dataURI: string) => {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

const dataURIToBase64 = (dataURI: string) => {
  return dataURI.split(',')[1];
};
const base64ToBlob = (base64: string) => {
  const parts = base64.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; i++) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};
const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};
// create preview url from base64
export const createPreviewURL = (base64: string | null) => {
  try {
    if (!base64) return null;
    const blob = base64ToBlob(base64);
    const previewUrl = URL.createObjectURL(blob as Blob);
    return previewUrl;
  } catch (error) {
    return null;
  }
};
export {
  base64ToBlob,
  blobToBase64,
  dataURIToBase64,
  dataURItoBlob,
  getBase64,
  getDataURI,
};
