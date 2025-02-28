import React, { useState } from "react";
import Sidebar from "./Sidebar";
import AppointmentCalendar from "../appointments/AppointmentCalendar";
import PatientRecordsViewer from "../patients/PatientRecordsViewer";
import AvailabilityManager from "../appointments/AvailabilityManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Activity,
  Calendar,
  Clock,
  FileText,
  Users,
  CheckCircle,
  AlertCircle,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DoctorDashboardProps {
  doctorName?: string;
  doctorAvatar?: string;
  specialty?: string;
}

const DoctorDashboard = ({
  doctorName = "Dr. Jane Smith",
  doctorAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=doctor",
  specialty = "Cardiology",
}: DoctorDashboardProps) => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  // Mock data for doctor dashboard
  const todayAppointments = [
    {
      time: "09:00 AM",
      patientName: "John Doe",
      reason: "Follow-up",
      status: "confirmed",
    },
    {
      time: "10:30 AM",
      patientName: "Sarah Johnson",
      reason: "Consultation",
      status: "confirmed",
    },
    {
      time: "11:45 AM",
      patientName: "Michael Brown",
      reason: "Test Results",
      status: "confirmed",
    },
    {
      time: "02:15 PM",
      patientName: "Emily Davis",
      reason: "New Patient",
      status: "confirmed",
    },
    {
      time: "03:30 PM",
      patientName: "Robert Wilson",
      reason: "Follow-up",
      status: "confirmed",
    },
  ];

  const pendingTasks = [
    {
      id: "1",
      task: "Review lab results for Patient #P12345",
      priority: "high",
      due: "Today",
    },
    {
      id: "2",
      task: "Complete medical report for insurance",
      priority: "medium",
      due: "Tomorrow",
    },
    {
      id: "3",
      task: "Follow up with referred specialist",
      priority: "low",
      due: "This week",
    },
  ];

  const recentNotifications = [
    {
      id: "1",
      message: "New lab results available for Patient #P12345",
      time: "30 minutes ago",
      read: false,
    },
    {
      id: "2",
      message: "Appointment rescheduled with Sarah Johnson",
      time: "2 hours ago",
      read: true,
    },
    {
      id: "3",
      message: "Reminder: Staff meeting tomorrow at 8:30 AM",
      time: "Yesterday",
      read: true,
    },
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return renderOverview();
      case "appointments":
        return <AppointmentCalendar />;
      case "patients":
        return <PatientRecordsViewer />;
      case "availability":
        return <AvailabilityManager />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                Today's Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {todayAppointments.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Next: {todayAppointments[0]?.patientName} at{" "}
                {todayAppointments[0]?.time}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTasks.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {pendingTasks.filter((t) => t.priority === "high").length} high
                priority
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Bell className="mr-2 h-4 w-4 text-amber-500" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {recentNotifications.filter((n) => !n.read).length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {recentNotifications.length} total notifications
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
              <CardDescription>
                Your appointments for {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.reason}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.time}</p>
                      <p
                        className={`text-xs ${appointment.status === "confirmed" ? "text-green-500" : "text-amber-500"}`}
                      >
                        {appointment.status.charAt(0).toUpperCase() +
                          appointment.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Tasks</CardTitle>
                <CardDescription>
                  Tasks that require your attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-start justify-between border-b pb-2 last:border-0 last:pb-0"
                    >
                      <div className="flex items-start">
                        <div
                          className={`p-2 rounded-full mr-3 ${task.priority === "high" ? "bg-red-100" : task.priority === "medium" ? "bg-amber-100" : "bg-blue-100"}`}
                        >
                          <AlertCircle
                            className={`h-4 w-4 ${task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-amber-500" : "text-blue-500"}`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{task.task}</p>
                          <p className="text-sm text-muted-foreground">
                            Due: {task.due}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Complete
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Notifications</CardTitle>
                <CardDescription>
                  Updates and alerts for your attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start border-b pb-2 last:border-0 last:pb-0 ${!notification.read ? "bg-blue-50 -mx-6 px-6" : ""}`}
                    >
                      <div className="flex-1">
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-sm text-muted-foreground">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  // Custom navigation handler for the sidebar
  const handleNavigation = (path: string) => {
    // Extract the section from the path
    const section = path.split("/").pop() || "overview";
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar
        userType="doctor"
        userName={doctorName}
        userAvatar={doctorAvatar}
      />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {doctorName.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground">
            {specialty} |{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <Tabs
          value={activeSection}
          onValueChange={setActiveSection}
          className="w-full"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="overview">
              <Activity className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="mr-2 h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="patients">
              <Users className="mr-2 h-4 w-4" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="availability">
              <Clock className="mr-2 h-4 w-4" />
              Availability
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeSection}>
            {renderActiveSection()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;
