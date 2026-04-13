/**
 * Lease Management Types
 * Property tracking and lease agreements
 */

export enum LeaseStatus {
  ACTIVE = "ACTIVE",
  UPCOMING = "UPCOMING",
  EXPIRED = "EXPIRED",
  TERMINATED = "TERMINATED",
}

export enum PropertyType {
  OFFICE = "OFFICE",
  WAREHOUSE = "WAREHOUSE",
  RETAIL = "RETAIL",
  RESIDENTIAL = "RESIDENTIAL",
  MIXED_USE = "MIXED_USE",
}

export interface Lease {
  id: string;
  property: string; // Property address
  propertyType: PropertyType;
  tenant: string; // Tenant/Business unit name

  /* Lease Terms */
  startDate: Date;
  endDate: Date;
  monthlyAmount: number;
  currency: "ZAR" | "USD" | "EUR";
  depositAmount?: number;
  tenureLength: number; // months

  /* Status & Tracking */
  status: LeaseStatus;
  renewalDate?: Date;
  renewalOption: "YES" | "NO";

  /* Contact Information */
  landlordName: string;
  landlordContact?: string;
  propertyManager?: string;
  managerContact?: string;

  /* Document Reference */
  agreementDocument?: string;
  lastReviewDate?: Date;

  /* Financial */
  totalAmount: number; // Total of monthly amount for full term
  advancePaymentSchedule?: { date: Date; amount: number }[];

  /* Tracking */
  createdAt: Date;
  updatedAt: Date;
}

export interface LeasePayment {
  id: string;
  leaseId: string;
  dueDate: Date;
  amount: number;
  paidDate?: Date;
  paymentMethods: "BANK_TRANSFER" | "CHEQUE" | "EFT";
  referenceNumber?: string;
  status: "PENDING" | "PAID" | "OVERDUE";
}

export interface PropertyInspection {
  id: string;
  leaseId: string;
  inspectionDate: Date;
  inspectionType: "INITIAL" | "QUARTERLY" | "ANNUAL" | "END_OF_LEASE";
  inspector: string;
  findings: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  actionItems?: string[];
  documentUrl?: string;
}
