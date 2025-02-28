// Simulated API functions with optimized performance

// Cache for storing API responses
const apiCache = new Map();

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

// Function to generate a cache key from the request parameters
const generateCacheKey = (endpoint: string, params?: any) => {
  return `${endpoint}:${params ? JSON.stringify(params) : ""}`;
};

// Generic fetch function with caching
const fetchWithCache = async <T>(
  endpoint: string,
  options?: RequestInit,
  params?: any,
): Promise<T> => {
  const cacheKey = generateCacheKey(endpoint, params);
  const cachedResponse = apiCache.get(cacheKey);

  // Return cached response if it exists and hasn't expired
  if (
    cachedResponse &&
    Date.now() - cachedResponse.timestamp < CACHE_EXPIRATION
  ) {
    return cachedResponse.data;
  }

  try {
    // Simulate network delay (remove in production)
    if (process.env.NODE_ENV === "development") {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }

    // In a real app, this would be a fetch call to your API
    // const response = await fetch(endpoint, options);
    // const data = await response.json();

    // For demo purposes, we'll return mock data
    const data = getMockData(endpoint, params);

    // Cache the response
    apiCache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });

    return data as T;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Function to get mock data based on the endpoint
const getMockData = (endpoint: string, params?: any) => {
  // Mock data for different endpoints
  const mockData: Record<string, any> = {
    "/api/appointments": [
      {
        id: "1",
        patientName: "John Doe",
        patientId: "P12345",
        date: new Date(),
        time: "09:00 AM",
        duration: 30,
        type: "Check-up",
        status: "scheduled",
      },
      {
        id: "2",
        patientName: "Jane Smith",
        patientId: "P12346",
        date: new Date(),
        time: "10:30 AM",
        duration: 45,
        type: "Consultation",
        status: "scheduled",
      },
    ],
    "/api/patients": [
      {
        id: "P12345",
        name: "John Doe",
        age: 45,
        gender: "Male",
        phone: "555-123-4567",
        email: "john.doe@example.com",
        address: "123 Main St, Anytown, USA",
      },
      {
        id: "P12346",
        name: "Jane Smith",
        age: 32,
        gender: "Female",
        phone: "555-987-6543",
        email: "jane.smith@example.com",
        address: "456 Oak Ave, Somewhere, USA",
      },
    ],
    "/api/doctors": [
      {
        id: "D1001",
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        email: "sarah.johnson@example.com",
        phone: "555-111-2222",
        availability: ["Monday", "Wednesday", "Friday"],
      },
      {
        id: "D1002",
        name: "Dr. Michael Chen",
        specialty: "Neurology",
        email: "michael.chen@example.com",
        phone: "555-333-4444",
        availability: ["Tuesday", "Thursday"],
      },
    ],
    "/api/metrics": {
      patientsWaiting: 12,
      avgWaitTime: 18,
      appointmentsToday: 45,
      completedAppointments: 23,
    },
    "/api/bills": [
      {
        id: "B001",
        patientId: "P12345",
        date: "2023-05-15",
        description: "General Consultation",
        amount: 120,
        status: "pending",
      },
      {
        id: "B002",
        patientId: "P12346",
        date: "2023-04-28",
        description: "Blood Test",
        amount: 85,
        status: "paid",
      },
    ],
  };

  // Return the mock data for the requested endpoint
  return mockData[endpoint] || { error: "Endpoint not found" };
};

// API functions for different resources
export const api = {
  // Appointments
  getAppointments: () => fetchWithCache<any[]>("/api/appointments"),
  getAppointmentById: (id: string) =>
    fetchWithCache<any>("/api/appointments", undefined, { id }),
  createAppointment: (appointmentData: any) =>
    fetchWithCache<any>(
      "/api/appointments",
      { method: "POST" },
      appointmentData,
    ),
  updateAppointment: (id: string, appointmentData: any) =>
    fetchWithCache<any>(
      "/api/appointments",
      { method: "PUT" },
      { id, ...appointmentData },
    ),
  deleteAppointment: (id: string) =>
    fetchWithCache<any>("/api/appointments", { method: "DELETE" }, { id }),

  // Patients
  getPatients: () => fetchWithCache<any[]>("/api/patients"),
  getPatientById: (id: string) =>
    fetchWithCache<any>("/api/patients", undefined, { id }),
  createPatient: (patientData: any) =>
    fetchWithCache<any>("/api/patients", { method: "POST" }, patientData),
  updatePatient: (id: string, patientData: any) =>
    fetchWithCache<any>(
      "/api/patients",
      { method: "PUT" },
      { id, ...patientData },
    ),
  deletePatient: (id: string) =>
    fetchWithCache<any>("/api/patients", { method: "DELETE" }, { id }),

  // Doctors
  getDoctors: () => fetchWithCache<any[]>("/api/doctors"),
  getDoctorById: (id: string) =>
    fetchWithCache<any>("/api/doctors", undefined, { id }),

  // Metrics
  getMetrics: () => fetchWithCache<any>("/api/metrics"),

  // Bills
  getBills: () => fetchWithCache<any[]>("/api/bills"),
  getBillById: (id: string) =>
    fetchWithCache<any>("/api/bills", undefined, { id }),
  payBill: (id: string) =>
    fetchWithCache<any>(
      "/api/bills",
      { method: "PUT" },
      { id, status: "paid" },
    ),
};

// Function to clear the cache
export const clearApiCache = () => {
  apiCache.clear();
};

// Function to invalidate specific cache entries
export const invalidateCache = (endpoint: string, params?: any) => {
  const cacheKey = generateCacheKey(endpoint, params);
  apiCache.delete(cacheKey);
};
