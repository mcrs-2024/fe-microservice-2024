export type TCatRoom = {
  id: string | null;
  roomId: string | null;
  facilityId: string | null;
  areaId: string | null;
  roomTypeId: string | null;
  roomNo: string | null;
  roomName: string | null;
  roomNameEnglish: string | null;
  roomNameUnUnicode: string | null;
  roomIsMedicare: string | null;
  roomIsService: string | null;
  roomIsArmy: string | null;
  roomIsActive: string | null;
  roomIsMinorSurgery: string | null;
  roomIsActived: string | null;
  chuyenkhoaId: string | null;
  inactiveDate: string | null;
  orderIndex: string | null;
  tang: string | null;
  nhom: string | null;
  payTypeId: string | null;
  idKhuTiepNhan: string | null;
  quanityTreatmentTable: string | null;
  loaiPhongTheoGiaId: string | null;
} & TAuditInfo;

export type TCatRoomFields = keyof TCatRoom;

export type CatRoomModalType = 'add' | 'edit' | 'view';

export type TFilterCatRoom = {
  roomName: string | null;
};
