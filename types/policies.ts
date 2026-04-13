/**
 * Policy and Claims Management Types
 * Insurance policies, claims, and settlements
 */

export enum ClaimStatus {
  SUBMITTED = "SUBMITTED",
  UNDER_REVIEW = "UNDER_REVIEW",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  SETTLED = "SETTLED",
}

export enum ClaimType {
  MEDICAL = "MEDICAL",
  PROPERTY = "PROPERTY",
  LIABILITY = "LIABILITY",
  TRAVEL = "TRAVEL",
  EQUIPMENT = "EQUIPMENT",
  OTHER = "OTHER",
}

export interface Policy {
  id: string;
  policyNumber: string; // e.g., POL-2024-00001
  provider: string; // Insurance provider name
  policyType: string; // General Liability, Property, etc.

  /* Coverage */
  coverageStart: Date;
  coverageEnd: Date;
  coverageAmount: number;
  currency: "ZAR" | "USD" | "EUR";

  /* Holder Information */
  holderName: string;
  holderDepartment: string;
  subsidiary: string;

  /* Administrative */
  premiumAmount: number;
  paymentFrequency: "MONTHLY" | "QUARTERLY" | "ANNUAL";
  lastRenewalDate: Date;
  nextRenewalDate: Date;

  /* Contact */
  providerContact: string;
  brokerName?: string;
  brokerContact?: string;

  /* Status */
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
  documentUrl?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface Claim {
  id: string;
  claimNumber: string; // e.g., CLAIM-2024-00001
  policyId: string;
  policyNumber: string;
  claimType: ClaimType;

  /* Claim Details */
  description: string;
  incidentDate: Date;
  claimAmount: number;
  currency: "ZAR" | "USD" | "EUR";

  /* Submitter */
  submittedBy: string;
  submittedByName: string;
  submittedAt: Date;

  /* Status & Processing */
  status: ClaimStatus;
  approvedAmount?: number;
  rejectionReason?: string;

  /* Assignment */
  assignedTo?: string; // Claims adjuster
  internalNotes?: string;

  /* Settlement */
  settledAmount?: number;
  settlementDate?: Date;

  /* Documentation */
  attachments: string[]; // File references
  createdAt: Date;
  updatedAt: Date;
}

export interface ClaimNoteApproval {
  id: string;
  claimId: string;
  noteType: "INTERNAL" | "CUSTOMER_FACING";
  content: string;
  approvedBy: string;
  approvedAt: Date;
}
