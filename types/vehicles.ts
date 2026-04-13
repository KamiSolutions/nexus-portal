/**
 * Vehicle Management Types
 * Fleet tracking, maintenance, and assignments
 */

export enum VehicleStatus {
  AVAILABLE = "AVAILABLE",
  ASSIGNED = "ASSIGNED",
  IN_MAINTENANCE = "IN_MAINTENANCE",
  DECOMMISSIONED = "DECOMMISSIONED",
}

export enum MaintenanceType {
  ROUTINE = "ROUTINE",
  REPAIR = "REPAIR",
  INSPECTION = "INSPECTION",
  REPLACEMENT = "REPLACEMENT",
}

export enum MaintenanceStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  OVERDUE = "OVERDUE",
}

export interface Vehicle {
  id: string;
  registration: string; // License plate
  make: string;
  model: string;
  year: number;
  color: string;
  vin: string; // Vehicle Identification Number

  /* Assignment */
  assignedTo?: string;
  assignedToName?: string;
  department?: string;

  /* Maintenance */
  mileage: number;
  lastServiceDate?: Date;
  nextServiceDate?: Date;
  status: VehicleStatus;

  /* Insurance & Registration */
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  insuranceExpiryDate?: Date;
  registrationExpiryDate?: Date;

  /* Tracking */
  createdAt: Date;
  updatedAt: Date;
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  vehicleRegistration: string;
  type: MaintenanceType;
  description: string;
  status: MaintenanceStatus;
  cost: number;
  mileageAt: number;

  /* Scheduling */
  scheduledDate: Date;
  completedDate?: Date;
  nextDue?: Date;

  /* Vendor */
  vendor: string;
  vendorContact?: string;
  invoiceNumber?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface VehicleAssignment {
  id: string;
  vehicleId: string;
  employeeId: string;
  employeeName: string;
  department: string;
  assignedDate: Date;
  unassignedDate?: Date;
  mileageAtAssignment: number;
  status: "ACTIVE" | "RETURNED";
}
