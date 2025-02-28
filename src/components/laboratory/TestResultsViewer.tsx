import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Beaker,
  Calendar,
  Download,
  Eye,
  FileText,
  Filter,
  Printer,
  Search,
  Share2,
  User,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

interface TestResult {
  id: string;
  patientId: string;
  patientName: string;
  testId: string;
  testName: string;
  category: string;
  requestDate: string;
  completionDate: string;
  status: "completed" | "pending" | "processing" | "cancelled";
  results: TestParameter[];
  notes?: string;
  doctorName: string;
  labTechnician: string;
  reportNumber: string;
}

interface TestParameter {
  name: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: "normal" | "abnormal" | "critical";
}

interface TestResultsViewerProps {
  results?: TestResult[];
  onDownload?: (resultId: string) => void;
  onShare?: (resultId: string) => void;
  onPrint?: (resultId: string) => void;
  className?: string;
}

const TestResultsViewer: React.FC<TestResultsViewerProps> = ({
  results = [
    {
      id: "R001",
      patientId: "P10045",
      patientName: "John Smith",
      testId: "T001",
      testName: "Complete Blood Count (CBC)",
      category: "Hematology",
      requestDate: "2023-06-10",
      completionDate: "2023-06-11",
      status: "completed" as const,
      results: [
        {
          name: "White Blood Cell (WBC)",
          value: "7.5",
          unit: "x10^9/L",
          referenceRange: "4.5-11.0",
          status: "normal" as const,
        },
        {
          name: "Red Blood Cell (RBC)",
          value: "5.2",
          unit: "x10^12/L",
          referenceRange: "4.5-5.9",
          status: "normal" as const,
        },
        {
          name: "Hemoglobin (Hgb)",
          value: "14.2",
          unit: "g/dL",
          referenceRange: "13.5-17.5",
          status: "normal" as const,
        },
        {
          name: "Hematocrit (Hct)",
          value: "42",
          unit: "%",
          referenceRange: "41-50",
          status: "normal" as const,
        },
        {
          name: "Platelet Count",
          value: "250",
          unit: "x10^9/L",
          referenceRange: "150-450",
          status: "normal" as const,
        },
      ],
      doctorName: "Dr. Emily Chen",
      labTechnician: "Mark Johnson",
      reportNumber: "LAB-CBC-23061101",
    },
    {
      id: "R002",
      patientId: "P10045",
      patientName: "John Smith",
      testId: "T002",
      testName: "Lipid Panel",
      category: "Chemistry",
      requestDate: "2023-06-10",
      completionDate: "2023-06-11",
      status: "completed" as const,
      results: [
        {
          name: "Total Cholesterol",
          value: "220",
          unit: "mg/dL",
          referenceRange: "<200",
          status: "abnormal" as const,
        },
        {
          name: "HDL Cholesterol",
          value: "45",
          unit: "mg/dL",
          referenceRange: ">40",
          status: "normal" as const,
        },
        {
          name: "LDL Cholesterol",
          value: "145",
          unit: "mg/dL",
          referenceRange: "<100",
          status: "abnormal" as const,
        },
        {
          name: "Triglycerides",
          value: "150",
          unit: "mg/dL",
          referenceRange: "<150",
          status: "normal" as const,
        },
      ],
      notes:
        "Patient should consider dietary changes and follow-up in 3 months.",
      doctorName: "Dr. Emily Chen",
      labTechnician: "Sarah Williams",
      reportNumber: "LAB-LIP-23061102",
    },
    {
      id: "R003",
      patientId: "P10046",
      patientName: "Sarah Johnson",
      testId: "T003",
      testName: "Comprehensive Metabolic Panel",
      category: "Chemistry",
      requestDate: "2023-06-12",
      completionDate: "2023-06-13",
      status: "completed" as const,
      results: [
        {
          name: "Glucose",
          value: "110",
          unit: "mg/dL",
          referenceRange: "70-99",
          status: "abnormal" as const,
        },
        {
          name: "Calcium",
          value: "9.5",
          unit: "mg/dL",
          referenceRange: "8.5-10.5",
          status: "normal" as const,
        },
        {
          name: "Sodium",
          value: "140",
          unit: "mmol/L",
          referenceRange: "135-145",
          status: "normal" as const,
        },
        {
          name: "Potassium",
          value: "4.0",
          unit: "mmol/L",
          referenceRange: "3.5-5.0",
          status: "normal" as const,
        },
        {
          name: "Creatinine",
          value: "0.9",
          unit: "mg/dL",
          referenceRange: "0.6-1.2",
          status: "normal" as const,
        },
        {
          name: "BUN",
          value: "15",
          unit: "mg/dL",
          referenceRange: "7-20",
          status: "normal" as const,
        },
      ],
      doctorName: "Dr. Michael Wong",
      labTechnician: "David Brown",
      reportNumber: "LAB-CMP-23061301",
    },
    {
      id: "R004",
      patientId: "P10047",
      patientName: "Robert Wilson",
      testId: "T004",
      testName: "Thyroid Stimulating Hormone (TSH)",
      category: "Endocrinology",
      requestDate: "2023-06-14",
      completionDate: "",
      status: "processing" as const,
      results: [],
      doctorName: "Dr. Lisa Garcia",
      labTechnician: "",
      reportNumber: "LAB-TSH-23061401",
    },
  ],
  onDownload = () => {},
  onShare = () => {},
  onPrint = () => {},
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  // Filter results based on search term and active tab
  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "completed")
      return matchesSearch && result.status === "completed";
    if (activeTab === "pending")
      return (
        matchesSearch &&
        (result.status === "pending" || result.status === "processing")
      );

    return matchesSearch;
  });

  const handleViewResult = (result: TestResult) => {
    setSelectedResult(result);
    setDetailsOpen(true);
  };

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">مكتمل</Badge>;
      case "processing":
        return <Badge variant="secondary">قيد المعالجة</Badge>;
      case "pending":
        return <Badge variant="outline">قيد الانتظار</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getParameterStatusIcon = (status: TestParameter["status"]) => {
    switch (status) {
      case "normal":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "abnormal":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "critical":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5 text-primary" />
            نتائج الفحوصات المخبرية
          </CardTitle>
          <CardDescription>
            عرض وإدارة نتائج الفحوصات المخبرية للمرضى
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن اسم المريض أو نوع الفحص أو رقم التقرير"
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              تصفية
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="completed">مكتمل</TabsTrigger>
              <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              <ScrollArea className="h-[calc(100vh-350px)] min-h-[400px]">
                <div className="space-y-4">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((result) => (
                      <Card key={result.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="flex-1 p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium">
                                  {result.testName}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {result.category} | رقم التقرير:{" "}
                                  {result.reportNumber}
                                </p>
                              </div>
                              {getStatusBadge(result.status)}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-2">
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>المريض: {result.patientName}</span>
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>تاريخ الطلب: {result.requestDate}</span>
                              </div>
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span>طلب بواسطة: {result.doctorName}</span>
                              </div>
                              {result.completionDate && (
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>
                                    تاريخ الاكتمال: {result.completionDate}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="bg-muted/20 p-4 flex flex-row md:flex-col justify-between md:justify-center items-center gap-2 border-t md:border-t-0 md:border-l">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => handleViewResult(result)}
                              disabled={result.status !== "completed"}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              عرض النتائج
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                              onClick={() => onDownload(result.id)}
                              disabled={result.status !== "completed"}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              تنزيل PDF
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">
                        لا توجد نتائج مطابقة للبحث
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Test Result Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl">
          {selectedResult && selectedResult.status === "completed" && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-center">
                  <DialogTitle>نتائج فحص {selectedResult.testName}</DialogTitle>
                  <Badge className="bg-green-500">مكتمل</Badge>
                </div>
                <DialogDescription>
                  رقم التقرير: {selectedResult.reportNumber} | تاريخ الاكتمال:{" "}
                  {selectedResult.completionDate}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Patient and Test Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">معلومات المريض</h3>
                    <div className="p-3 border rounded-md">
                      <p>
                        <span className="font-medium">الاسم:</span>{" "}
                        {selectedResult.patientName}
                      </p>
                      <p>
                        <span className="font-medium">رقم المريض:</span>{" "}
                        {selectedResult.patientId}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">معلومات الفحص</h3>
                    <div className="p-3 border rounded-md">
                      <p>
                        <span className="font-medium">الفحص:</span>{" "}
                        {selectedResult.testName}
                      </p>
                      <p>
                        <span className="font-medium">القسم:</span>{" "}
                        {selectedResult.category}
                      </p>
                      <p>
                        <span className="font-medium">تاريخ الطلب:</span>{" "}
                        {selectedResult.requestDate}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Test Results Table */}
                <div>
                  <h3 className="text-sm font-medium mb-2">نتائج الفحص</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>المعيار</TableHead>
                        <TableHead>النتيجة</TableHead>
                        <TableHead>الوحدة</TableHead>
                        <TableHead>المعدل الطبيعي</TableHead>
                        <TableHead className="text-center">الحالة</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedResult.results.map((param, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {param.name}
                          </TableCell>
                          <TableCell
                            className={
                              param.status !== "normal" ? "font-bold" : ""
                            }
                          >
                            {param.value}
                          </TableCell>
                          <TableCell>{param.unit}</TableCell>
                          <TableCell>{param.referenceRange}</TableCell>
                          <TableCell className="text-center">
                            {getParameterStatusIcon(param.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Notes Section */}
                {selectedResult.notes && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">ملاحظات</h3>
                    <div className="p-3 border rounded-md">
                      <p>{selectedResult.notes}</p>
                    </div>
                  </div>
                )}

                {/* Footer Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium">طلب بواسطة:</p>
                    <p>{selectedResult.doctorName}</p>
                  </div>
                  <div>
                    <p className="font-medium">فني المختبر:</p>
                    <p>{selectedResult.labTechnician}</p>
                  </div>
                  <div>
                    <p className="font-medium">تاريخ التقرير:</p>
                    <p>{selectedResult.completionDate}</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => onShare(selectedResult.id)}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  مشاركة
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onPrint(selectedResult.id)}
                >
                  <Printer className="h-4 w-4 mr-1" />
                  طباعة
                </Button>
                <Button onClick={() => onDownload(selectedResult.id)}>
                  <Download className="h-4 w-4 mr-1" />
                  تنزيل PDF
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestResultsViewer;
