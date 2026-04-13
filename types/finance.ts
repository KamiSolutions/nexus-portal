/**
 * Financial Management Types
 * Requisitions, approvals, and budget tracking
 */

export enum RequisitionStatus {
  DRAFT = "DRAFT",
  SUBMITTED = "SUBMITTED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  PAID = "PAID",
}

export enum RequisitionCategory {
  OPERATIONAL = "OPERATIONAL",
  CAPITAL = "CAPITAL",
  MAINTENANCE = "MAINTENANCE",
  INVENTORY = "INVENTORY",
  SERVICE = "SERVICE",
}

export interface Requisition {
  id: string;
  title: string;
  description: string;
  amount: number;
  currency: "ZAR" | "USD" | "EUR";
  category: RequisitionCategory;
  status: RequisitionStatus;

  /* Submitter information */
  submittedBy: string;
  submittedByName: string;
  subsidiaryId: string;
  departmentId: string;

  /* Approval information */
  approvedBy?: string;
  approvedByName?: string;
  rejectionReason?: string;

  /* Timestamps */
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;

  /* Attachments */
  attachments: string[];
}

export interface LoanRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  duration: number; // months
  purpose: string;
  status: RequisitionStatus;
  interestRate: number;
  monthlyRepayment: number;
  submittedAt: Date;
  approvedAt?: Date;
  approvedBy?: string;
}

export interface ApprovalWorkflow {
  id: string;
  requisitionId: string;
  approverId: string;
  approverRole: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  comments: string;
  createdAt: Date;
  updatedAt: Date;
}
