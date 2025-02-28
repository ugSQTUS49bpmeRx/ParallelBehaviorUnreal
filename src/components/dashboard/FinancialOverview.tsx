import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  LineChart,
  PieChart,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  FileText,
  Download,
} from "lucide-react";

interface FinancialOverviewProps {
  clinicData?: {
    totalRevenue: number;
    pendingPayments: number;
    recentTransactions: Array<{
      id: string;
      date: string;
      patient: string;
      amount: number;
      status: "paid" | "pending" | "overdue";
    }>;
    monthlyRevenue: Array<{
      month: string;
      revenue: number;
    }>;
    revenueByService: Array<{
      service: string;
      amount: number;
      percentage: number;
    }>;
  };
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({
  clinicData = {
    totalRevenue: 124500,
    pendingPayments: 18750,
    recentTransactions: [
      {
        id: "INV-001",
        date: "2023-06-15",
        patient: "John Smith",
        amount: 150,
        status: "paid",
      },
      {
        id: "INV-002",
        date: "2023-06-14",
        patient: "Sarah Johnson",
        amount: 250,
        status: "paid",
      },
      {
        id: "INV-003",
        date: "2023-06-13",
        patient: "Michael Brown",
        amount: 180,
        status: "pending",
      },
      {
        id: "INV-004",
        date: "2023-06-12",
        patient: "Emily Davis",
        amount: 320,
        status: "overdue",
      },
      {
        id: "INV-005",
        date: "2023-06-11",
        patient: "Robert Wilson",
        amount: 95,
        status: "paid",
      },
    ],
    monthlyRevenue: [
      { month: "Jan", revenue: 8200 },
      { month: "Feb", revenue: 9400 },
      { month: "Mar", revenue: 11500 },
      { month: "Apr", revenue: 10200 },
      { month: "May", revenue: 12800 },
      { month: "Jun", revenue: 14500 },
    ],
    revenueByService: [
      { service: "Consultations", amount: 45000, percentage: 36 },
      { service: "Procedures", amount: 32500, percentage: 26 },
      { service: "Lab Tests", amount: 28000, percentage: 22 },
      { service: "Prescriptions", amount: 19000, percentage: 16 },
    ],
  },
}) => {
  const [timeframe, setTimeframe] = useState("monthly");

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financial Overview</h1>
        <div className="flex items-center gap-4">
          <Select defaultValue={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={16} />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${clinicData.totalRevenue.toLocaleString()}
            </div>
            <div className="flex items-center pt-1 text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              <span>+12.5% from last {timeframe}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Payments
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${clinicData.pendingPayments.toLocaleString()}
            </div>
            <div className="flex items-center pt-1 text-sm text-red-600">
              <ArrowDownRight className="h-4 w-4 mr-1" />
              <span>+4.2% from last {timeframe}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Payments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="pt-1 text-sm text-muted-foreground">
              Due in the next 7 days
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="billing" className="mb-6">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clinicData.recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.id}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.patient}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.status === "paid"
                              ? "bg-green-100 text-green-800"
                              : transaction.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {transaction.status.charAt(0).toUpperCase() +
                            transaction.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Revenue Trends</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  {/* Placeholder for actual chart */}
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <BarChart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Monthly Revenue Chart
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Data visualization would appear here
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {clinicData.monthlyRevenue.slice(-3).map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-sm text-muted-foreground">
                        {item.month}
                      </span>
                      <span className="text-lg font-medium">
                        ${item.revenue}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Revenue by Service</CardTitle>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  {/* Placeholder for actual chart */}
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <PieChart className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Revenue Distribution Chart
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Data visualization would appear here
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {clinicData.revenueByService.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-sm">{item.service}</span>
                      <span className="text-sm font-medium">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecasting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Forecasting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md">
                {/* Placeholder for actual forecasting tool */}
                <div className="text-center max-w-md mx-auto">
                  <div className="flex justify-center mb-4">
                    <LineChart className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Financial Forecasting Tool
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This section would contain financial projections, cash flow
                    forecasts, and budget planning tools.
                  </p>
                  <Button variant="outline" className="mr-2">
                    Generate Forecast
                  </Button>
                  <Button variant="outline">Adjust Parameters</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialOverview;
