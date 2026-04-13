/**
 * User and Authentication Types
 * Defines user profiles and role-based access control
 */

export enum UserRole {
  ADMIN = 'ADMIN',
  FINANCE = 'FINANCE',
  HR = 'HR',
  OPERATIONS = 'OPERATIONS',
  VIEWER = 'VIEWER',
}

export enum Subsidiary {
  APEX = 'APEX',          // Apex Division
  FINANCE = 'NXS_FINANCE', // NXS Finance
  MANAGEMENT = 'NXS_MGMT', // NXS Management
}

export interface User {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  subsidiary: Subsidiary;
  phone?: string;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthContext {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
}
