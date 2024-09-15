export type TPatientQueue = {
  id: string | null;
  clinic: string | null;
  numberOfWaitingPatients: string | null;
  total: string | null;
};

export type TPatientQueueFileds = keyof TPatientQueue;
