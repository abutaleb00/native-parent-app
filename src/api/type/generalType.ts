export type Klass = {
  id: number;
  name: string;
  students: Student[];
};

export type Student = {
  studentId: number;
  name: string;
};

export type MediaType = {
  source: string;
  type: string;
  url: string | string[];
  description?: string;
};

export type absentData = {
  studentId: number;
  startDate: string;
};

export type transportData = {
  personId: number;
  date: string;
};

export type leaveData = {
  personId: number;
  dateFrom: string;
  dateTo: string;
  type: string;
  reason: string;
};

export type LeaveType = {
  personId: number;
  dateFrom: string;
  dateTo: string;
  type: string;
  status: string;
  reason: string;
  rejectReason: string;
};
