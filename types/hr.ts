/**
 * Human Resources Types
 * Leave, contracts, and employee management
 */

export enum LeaveType {
  ANNUAL = "ANNUAL",
  SICK = "SICK",
  COMPASSIONATE = "COMPASSIONATE",
  UNPAID = "UNPAID",
  MATERNITY = "MATERNITY",
  PATERNITY = "PATERNITY",
  STUDY = "STUDY",
}

export enum LeaveStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  daysRequested: number;
  reason: string;
  status: LeaveStatus;
  approvedBy?: string;
  approvedByName?: string;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  attachments: string[];
}

export interface Contract {
  id: string;
  employeeId: string;
  employeeName: string;
  contractType: "PERMANENT" | "FIXED_TERM" | "CONTRACTOR";
  title: string;
  department: string;
  startDate: Date;
  endDate?: Date;
  salary: number;
  currency: "ZAR" | "USD";
  reportingTo: string;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED" | "TERMINATED";
  documentUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmployeeProfile {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  department: string;
  title: string;
  manager: string;
  joinDate: Date;
  idNumber: string;
  bankDetails?: {
    accountHolder: string;
    accountNumber: string;
    bankName: string;
    branchCode: string;
  };
}
