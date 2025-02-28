import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  description = "No data available",
  icon = <Activity className="h-4 w-4" />,
  trend = "",
  trendDirection = "neutral",
}: MetricCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
      {trend && (
        <CardFooter className="p-4 pt-0">
          <span
            className={`text-xs flex items-center gap-1 ${trendDirection === "up" ? "text-green-500" : trendDirection === "down" ? "text-red-500" : "text-gray-500"}`}
          >
            {trendDirection === "up" ? (
              <TrendingUp className="h-3 w-3" />
            ) : trendDirection === "down" ? (
              <TrendingUp className="h-3 w-3 transform rotate-180" />
            ) : null}
            {trend}
          </span>
        </CardFooter>
      )}
    </Card>
  );
};

const ClinicMetrics = () => {
  // Mock data for demonstration
  const patientMetrics = {
    totalPatients: "2,547",
    newPatients: "128",
    returningPatients: "89",
    averageVisitDuration: "42 min",
  };

  const appointmentMetrics = {
    totalAppointments: "187",
    completedAppointments: "142",
    cancelledAppointments: "12",
    noShows: "8",
  };

  const financialMetrics = {
    totalRevenue: "$24,500",
    pendingPayments: "$4,280",
    averageVisitValue: "$175",
    insuranceClaims: "94",
  };

  const operationalMetrics = {
    staffUtilization: "78%",
    roomUtilization: "82%",
    waitTime: "12 min",
    patientSatisfaction: "4.7/5",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Clinic Metrics</h1>
        <p className="text-muted-foreground">
          Overview of key performance indicators for your clinic.
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="operational">Operational</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Patients"
              value={patientMetrics.totalPatients}
              description="Active patients in database"
              icon={<Users className="h-4 w-4" />}
              trend="+5.2% from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Appointments Today"
              value={appointmentMetrics.totalAppointments}
              description="Scheduled for today"
              icon={<Calendar className="h-4 w-4" />}
              trend="+12% from yesterday"
              trendDirection="up"
            />
            <MetricCard
              title="Revenue (MTD)"
              value={financialMetrics.totalRevenue}
              description="Month to date revenue"
              icon={<DollarSign className="h-4 w-4" />}
              trend="+8.7% from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Avg. Wait Time"
              value={operationalMetrics.waitTime}
              description="Average patient wait time"
              icon={<Clock className="h-4 w-4" />}
              trend="-2.5 min from last week"
              trendDirection="down"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Patient Volume Trends</CardTitle>
                <CardDescription>
                  Weekly patient visits over the last 3 months
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground flex flex-col items-center">
                  <LineChart className="h-16 w-16 mb-2 text-gray-400" />
                  <p>Patient volume chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue by service category</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground flex flex-col items-center">
                  <PieChart className="h-16 w-16 mb-2 text-gray-400" />
                  <p>Revenue breakdown chart visualization would appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Patients"
              value={patientMetrics.totalPatients}
              description="Active patients in database"
              icon={<Users className="h-4 w-4" />}
            />
            <MetricCard
              title="New Patients"
              value={patientMetrics.newPatients}
              description="New patients this month"
              icon={<Users className="h-4 w-4" />}
              trend="+12% from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Returning Patients"
              value={patientMetrics.returningPatients}
              description="Return visits this month"
              icon={<Users className="h-4 w-4" />}
              trend="+5% from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Avg. Visit Duration"
              value={patientMetrics.averageVisitDuration}
              description="Average time per patient"
              icon={<Clock className="h-4 w-4" />}
              trend="-3 min from last month"
              trendDirection="down"
            />
          </div>

          <Card className="bg-white mt-4">
            <CardHeader>
              <CardTitle>Patient Demographics</CardTitle>
              <CardDescription>
                Breakdown by age, gender, and insurance type
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground flex flex-col items-center">
                <BarChart className="h-16 w-16 mb-2 text-gray-400" />
                <p>Patient demographics visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Appointments"
              value={appointmentMetrics.totalAppointments}
              description="Scheduled for today"
              icon={<Calendar className="h-4 w-4" />}
            />
            <MetricCard
              title="Completed"
              value={appointmentMetrics.completedAppointments}
              description="Appointments completed today"
              icon={<Calendar className="h-4 w-4" />}
              trend="+8% from yesterday"
              trendDirection="up"
            />
            <MetricCard
              title="Cancelled"
              value={appointmentMetrics.cancelledAppointments}
              description="Appointments cancelled today"
              icon={<Calendar className="h-4 w-4" />}
              trend="-2 from yesterday"
              trendDirection="down"
            />
            <MetricCard
              title="No-Shows"
              value={appointmentMetrics.noShows}
              description="Missed appointments today"
              icon={<Calendar className="h-4 w-4" />}
              trend="+1 from yesterday"
              trendDirection="up"
            />
          </div>

          <Card className="bg-white mt-4">
            <CardHeader>
              <CardTitle>Appointment Distribution</CardTitle>
              <CardDescription>
                Appointments by time of day and provider
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground flex flex-col items-center">
                <BarChart className="h-16 w-16 mb-2 text-gray-400" />
                <p>Appointment distribution visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Revenue"
              value={financialMetrics.totalRevenue}
              description="Month to date revenue"
              icon={<DollarSign className="h-4 w-4" />}
              trend="+8.7% from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Pending Payments"
              value={financialMetrics.pendingPayments}
              description="Outstanding balances"
              icon={<DollarSign className="h-4 w-4" />}
              trend="-2.3% from last month"
              trendDirection="down"
            />
            <MetricCard
              title="Avg. Visit Value"
              value={financialMetrics.averageVisitValue}
              description="Average revenue per visit"
              icon={<DollarSign className="h-4 w-4" />}
              trend="+$12 from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Insurance Claims"
              value={financialMetrics.insuranceClaims}
              description="Active insurance claims"
              icon={<DollarSign className="h-4 w-4" />}
              trend="-5 from last month"
              trendDirection="down"
            />
          </div>

          <Card className="bg-white mt-4">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>
                Monthly revenue over the past year
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground flex flex-col items-center">
                <LineChart className="h-16 w-16 mb-2 text-gray-400" />
                <p>Revenue trends visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operational" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Staff Utilization"
              value={operationalMetrics.staffUtilization}
              description="Provider time utilization"
              icon={<Users className="h-4 w-4" />}
              trend="+3% from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Room Utilization"
              value={operationalMetrics.roomUtilization}
              description="Exam room utilization rate"
              icon={<Activity className="h-4 w-4" />}
              trend="+5% from last month"
              trendDirection="up"
            />
            <MetricCard
              title="Avg. Wait Time"
              value={operationalMetrics.waitTime}
              description="Average patient wait time"
              icon={<Clock className="h-4 w-4" />}
              trend="-2.5 min from last week"
              trendDirection="down"
            />
            <MetricCard
              title="Patient Satisfaction"
              value={operationalMetrics.patientSatisfaction}
              description="Average satisfaction rating"
              icon={<Activity className="h-4 w-4" />}
              trend="+0.2 from last month"
              trendDirection="up"
            />
          </div>

          <Card className="bg-white mt-4">
            <CardHeader>
              <CardTitle>Operational Efficiency</CardTitle>
              <CardDescription>
                Key operational metrics over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground flex flex-col items-center">
                <LineChart className="h-16 w-16 mb-2 text-gray-400" />
                <p>Operational efficiency visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicMetrics;
