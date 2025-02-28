// Authorization and permission utilities for the healthcare platform

// User roles in the system
export enum UserRole {
  ADMIN = "administrator",
  DOCTOR = "doctor",
  PATIENT = "patient",
  STAFF = "staff",
  GUEST = "guest",
}

// Permission levels for different resources
export enum PermissionLevel {
  NONE = 0,
  READ = 1,
  WRITE = 2,
  FULL = 3,
}

// Resource types in the system
export enum ResourceType {
  PATIENT_RECORD = "patient_record",
  APPOINTMENT = "appointment",
  BILLING = "billing",
  MEDICAL_REPORT = "medical_report",
  PRESCRIPTION = "prescription",
  STAFF_RECORD = "staff_record",
  CLINIC_SETTINGS = "clinic_settings",
}

// Interface for user permissions
export interface UserPermissions {
  role: UserRole;
  permissions: Record<ResourceType, PermissionLevel>;
  clinicIds?: string[];
}

// Default permissions by role
const defaultPermissions: Record<
  UserRole,
  Record<ResourceType, PermissionLevel>
> = {
  [UserRole.ADMIN]: {
    [ResourceType.PATIENT_RECORD]: PermissionLevel.FULL,
    [ResourceType.APPOINTMENT]: PermissionLevel.FULL,
    [ResourceType.BILLING]: PermissionLevel.FULL,
    [ResourceType.MEDICAL_REPORT]: PermissionLevel.FULL,
    [ResourceType.PRESCRIPTION]: PermissionLevel.FULL,
    [ResourceType.STAFF_RECORD]: PermissionLevel.FULL,
    [ResourceType.CLINIC_SETTINGS]: PermissionLevel.FULL,
  },
  [UserRole.DOCTOR]: {
    [ResourceType.PATIENT_RECORD]: PermissionLevel.WRITE,
    [ResourceType.APPOINTMENT]: PermissionLevel.WRITE,
    [ResourceType.BILLING]: PermissionLevel.READ,
    [ResourceType.MEDICAL_REPORT]: PermissionLevel.WRITE,
    [ResourceType.PRESCRIPTION]: PermissionLevel.WRITE,
    [ResourceType.STAFF_RECORD]: PermissionLevel.READ,
    [ResourceType.CLINIC_SETTINGS]: PermissionLevel.READ,
  },
  [UserRole.PATIENT]: {
    [ResourceType.PATIENT_RECORD]: PermissionLevel.READ,
    [ResourceType.APPOINTMENT]: PermissionLevel.WRITE,
    [ResourceType.BILLING]: PermissionLevel.READ,
    [ResourceType.MEDICAL_REPORT]: PermissionLevel.READ,
    [ResourceType.PRESCRIPTION]: PermissionLevel.READ,
    [ResourceType.STAFF_RECORD]: PermissionLevel.NONE,
    [ResourceType.CLINIC_SETTINGS]: PermissionLevel.NONE,
  },
  [UserRole.STAFF]: {
    [ResourceType.PATIENT_RECORD]: PermissionLevel.READ,
    [ResourceType.APPOINTMENT]: PermissionLevel.WRITE,
    [ResourceType.BILLING]: PermissionLevel.WRITE,
    [ResourceType.MEDICAL_REPORT]: PermissionLevel.READ,
    [ResourceType.PRESCRIPTION]: PermissionLevel.READ,
    [ResourceType.STAFF_RECORD]: PermissionLevel.READ,
    [ResourceType.CLINIC_SETTINGS]: PermissionLevel.READ,
  },
  [UserRole.GUEST]: {
    [ResourceType.PATIENT_RECORD]: PermissionLevel.NONE,
    [ResourceType.APPOINTMENT]: PermissionLevel.NONE,
    [ResourceType.BILLING]: PermissionLevel.NONE,
    [ResourceType.MEDICAL_REPORT]: PermissionLevel.NONE,
    [ResourceType.PRESCRIPTION]: PermissionLevel.NONE,
    [ResourceType.STAFF_RECORD]: PermissionLevel.NONE,
    [ResourceType.CLINIC_SETTINGS]: PermissionLevel.NONE,
  },
};

// Function to get user permissions
export function getUserPermissions(
  userId: string,
  role: UserRole,
): UserPermissions {
  // In a real app, this would fetch from a database
  // For now, return default permissions based on role
  return {
    role,
    permissions: defaultPermissions[role],
  };
}

// Check if user has permission for a specific action on a resource
export function hasPermission(
  userPermissions: UserPermissions,
  resourceType: ResourceType,
  requiredLevel: PermissionLevel,
  resourceOwnerId?: string,
): boolean {
  // Special case: users can always access their own records regardless of role
  // (except for certain admin-only operations)
  if (
    resourceOwnerId &&
    resourceOwnerId === "current-user-id" &&
    requiredLevel !== PermissionLevel.FULL
  ) {
    return true;
  }

  const permissionLevel = userPermissions.permissions[resourceType];
  return permissionLevel >= requiredLevel;
}

// Function to check if a user can access a specific clinic
export function canAccessClinic(
  userPermissions: UserPermissions,
  clinicId: string,
): boolean {
  // Admins can access all clinics
  if (userPermissions.role === UserRole.ADMIN) {
    return true;
  }

  // Other roles can only access clinics they're assigned to
  return userPermissions.clinicIds?.includes(clinicId) || false;
}

// HIPAA compliance check for sensitive operations
export function isHIPAACompliant(
  operation: string,
  userPermissions: UserPermissions,
  resourceType: ResourceType,
  metadata?: Record<string, any>,
): boolean {
  // Log the access attempt for audit purposes
  logAccessAttempt(operation, userPermissions, resourceType, metadata);

  // Check for specific HIPAA requirements based on operation
  switch (operation) {
    case "export":
    case "print":
    case "email":
      // These operations require additional verification
      return (
        userPermissions.role === UserRole.ADMIN ||
        userPermissions.role === UserRole.DOCTOR
      );
    case "delete":
      // Only admins can delete records (for HIPAA compliance)
      return userPermissions.role === UserRole.ADMIN;
    default:
      // For other operations, check normal permissions
      return hasPermission(
        userPermissions,
        resourceType,
        PermissionLevel.WRITE,
      );
  }
}

// Function to log access attempts for audit purposes
function logAccessAttempt(
  operation: string,
  userPermissions: UserPermissions,
  resourceType: ResourceType,
  metadata?: Record<string, any>,
): void {
  // In a real app, this would log to a secure audit database
  console.log("Access attempt:", {
    timestamp: new Date().toISOString(),
    operation,
    userRole: userPermissions.role,
    resourceType,
    allowed: hasPermission(userPermissions, resourceType, PermissionLevel.READ),
    metadata,
  });
}

// Function to verify user authentication
export function verifyAuthentication(token: string): {
  isAuthenticated: boolean;
  userId?: string;
  role?: UserRole;
} {
  // In a real app, this would verify the token with your auth provider
  // For demo purposes, we'll just check if the token exists
  if (!token) {
    return { isAuthenticated: false };
  }

  // Mock verification - in a real app this would decode and verify the JWT
  return {
    isAuthenticated: true,
    userId: "user-123",
    role: UserRole.DOCTOR, // This would come from the token
  };
}

// Function to handle login and generate auth token
export async function login(
  email: string,
  password: string,
  userType: string,
): Promise<{ success: boolean; token?: string; error?: string }> {
  // In a real app, this would validate credentials against a database
  // and generate a proper JWT token

  // For demo purposes, we'll just check if the email and password are not empty
  if (!email || !password) {
    return { success: false, error: "Email and password are required" };
  }

  // Mock successful login
  return {
    success: true,
    token: `mock-token-${userType}-${Date.now()}`,
  };
}

// Function to check if current user can view patient data
export function canViewPatientData(
  patientId: string,
  userPermissions: UserPermissions,
): boolean {
  // Admins and doctors can view any patient data
  if (
    userPermissions.role === UserRole.ADMIN ||
    userPermissions.role === UserRole.DOCTOR
  ) {
    return true;
  }

  // Patients can only view their own data
  if (userPermissions.role === UserRole.PATIENT) {
    return patientId === "current-user-id";
  }

  // Staff members need specific permission
  if (userPermissions.role === UserRole.STAFF) {
    return hasPermission(
      userPermissions,
      ResourceType.PATIENT_RECORD,
      PermissionLevel.READ,
    );
  }

  return false;
}

// Function to get current user's role-based dashboard route
export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return "/admin";
    case UserRole.DOCTOR:
      return "/doctor";
    case UserRole.PATIENT:
      return "/patient";
    case UserRole.STAFF:
      return "/staff";
    default:
      return "/";
  }
}
