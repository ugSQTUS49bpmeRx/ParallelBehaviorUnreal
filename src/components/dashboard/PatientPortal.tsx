import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "./Sidebar";
import AppointmentBooking from "../appointments/AppointmentBooking";
import MedicalRecordsViewer from "../patients/MedicalRecordsViewer";
import BillingManager from "../billing/BillingManager";
import ProfileEditor from "../patients/ProfileEditor";

interface PatientPortalProps {
  patientName?: string;
  patientId?: string;
  activeTab?: string;
}

const PatientPortal = ({
  patientName = "Jane Doe",
  patientId = "P-12345",
  activeTab = "appointments",
}: PatientPortalProps) => {
  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar userType="patient" userName={patientName} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">
              Patient Portal
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {patientName}. Manage your healthcare information
              and appointments.
            </p>
          </div>

          <Tabs defaultValue={activeTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="appointments">Book Appointment</TabsTrigger>
              <TabsTrigger value="records">Medical Records</TabsTrigger>
              <TabsTrigger value="billing">Billing & Payments</TabsTrigger>
              <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <AppointmentBooking />
              </div>
            </TabsContent>

            <TabsContent value="records" className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <MedicalRecordsViewer
                  patientName={patientName}
                  patientId={patientId}
                />
              </div>
            </TabsContent>

            <TabsContent value="billing" className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <BillingManager />
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm">
                <ProfileEditor />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientPortal;
