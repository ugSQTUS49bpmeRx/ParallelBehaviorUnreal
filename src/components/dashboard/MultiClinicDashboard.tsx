import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Users,
  Calendar,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  Phone,
  ChevronRight,
} from "lucide-react";

interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  status: "active" | "inactive";
  metrics: {
    patients: number;
    appointments: number;
    revenue: number;
    waitTime: number;
  };
}

interface MultiClinicDashboardProps {
  clinics?: Clinic[];
  selectedClinicId?: string;
  onClinicSelect?: (clinicId: string) => void;
}

const MultiClinicDashboard: React.FC<MultiClinicDashboardProps> = ({
  clinics = [
    {
      id: "1",
      name: "Main Street Medical",
      address: "123 Main St, Anytown, USA",
      phone: "(555) 123-4567",
      status: "active",
      metrics: {
        patients: 1248,
        appointments: 187,
        revenue: 24500,
        waitTime: 12,
      },
    },
    {
      id: "2",
      name: "Westside Health Center",
      address: "456 West Ave, Anytown, USA",
      phone: "(555) 987-6543",
      status: "active",
      metrics: {
        patients: 876,
        appointments: 142,
        revenue: 18750,
        waitTime: 15,
      },
    },
    {
      id: "3",
      name: "Northside Clinic",
      address: "789 North Blvd, Anytown, USA",
      phone: "(555) 456-7890",
      status: "inactive",
      metrics: {
        patients: 543,
        appointments: 0,
        revenue: 0,
        waitTime: 0,
      },
    },
    {
      id: "4",
      name: "Downtown Medical Plaza",
      address: "101 Center St, Anytown, USA",
      phone: "(555) 321-7654",
      status: "active",
      metrics: {
        patients: 1052,
        appointments: 165,
        revenue: 21300,
        waitTime: 10,
      },
    },
  ],
  selectedClinicId = "1",
  onClinicSelect = () => {},
}) => {
  const [timeframe, setTimeframe] = useState("weekly");
  const [activeTab, setActiveTab] = useState("overview");

  const selectedClinic =
    clinics.find((clinic) => clinic.id === selectedClinicId) || clinics[0];

  // Calculate total metrics across all active clinics
  const totalMetrics = clinics
    .filter((clinic) => clinic.status === "active")
    .reduce(
      (acc, clinic) => {
        return {
          patients: acc.patients + clinic.metrics.patients,
          appointments: acc.appointments + clinic.metrics.appointments,
          revenue: acc.revenue + clinic.metrics.revenue,
          clinics: acc.clinics + 1,
        };
      },
      { patients: 0, appointments: 0, revenue: 0, clinics: 0 },
    );

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Multi-Clinic Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and monitor all your clinic locations
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Building2 className="mr-2 h-4 w-4" />
            Add New Clinic
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Clinics</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMetrics.clinics}</div>
            <div className="text-xs text-muted-foreground">
              {clinics.filter((c) => c.status === "active").length} active,{" "}
              {clinics.filter((c) => c.status === "inactive").length} inactive
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Patients
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalMetrics.patients.toLocaleString()}
            </div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+5.2% from last {timeframe}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalMetrics.appointments.toLocaleString()}
            </div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+3.8% from last {timeframe}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${totalMetrics.revenue.toLocaleString()}
            </div>
            <div className="flex items-center pt-1 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              <span>+7.4% from last {timeframe}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Clinic Locations</CardTitle>
              <CardDescription>
                Overview of all clinic locations and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clinics.map((clinic) => (
                  <div
                    key={clinic.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedClinicId === clinic.id ? "border-primary bg-primary/5" : "hover:border-primary/50"}`}
                    onClick={() => onClinicSelect(clinic.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{clinic.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {clinic.address}
                        </div>
                      </div>
                      <Badge
                        variant={
                          clinic.status === "active" ? "default" : "secondary"
                        }
                      >
                        {clinic.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          Patients
                        </div>
                        <div className="font-medium">
                          {clinic.metrics.patients.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          Appointments
                        </div>
                        <div className="font-medium">
                          {clinic.metrics.appointments.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">
                          Revenue
                        </div>
                        <div className="font-medium">
                          ${clinic.metrics.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Selected Clinic Details</CardTitle>
              <CardDescription>
                {selectedClinic.name} -{" "}
                {selectedClinic.status === "active" ? "Active" : "Inactive"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">
                  Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedClinic.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{selectedClinic.phone}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Key Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Patients</span>
                    </div>
                    <span className="font-medium">
                      {selectedClinic.metrics.patients.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Appointments</span>
                    </div>
                    <span className="font-medium">
                      {selectedClinic.metrics.appointments.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Revenue</span>
                    </div>
                    <span className="font-medium">
                      ${selectedClinic.metrics.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Avg. Wait Time</span>
                    </div>
                    <span className="font-medium">
                      {selectedClinic.metrics.waitTime} min
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full">
                  View Detailed Dashboard
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <Tabs
            defaultValue="overview"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex justify-between items-center">
              <CardTitle>Performance Comparison</CardTitle>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>
              Compare performance metrics across all clinic locations
            </CardDescription>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-muted/20 rounded-md">
            <div className="text-center">
              <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Performance comparison chart would appear here
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Showing {activeTab} metrics for {timeframe} timeframe
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Export Data</Button>
          <Button variant="outline">View Detailed Report</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MultiClinicDashboard;
