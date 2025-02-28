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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Beaker,
  Calendar,
  Clock,
  Download,
  FileText,
  Filter,
  Plus,
  Search,
  Share,
  Trash2,
  Upload,
  User,
} from "lucide-react";

interface Test {
  id: string;
  name: string;
  category: string;
  price: number;
  turnaroundTime: string;
  description: string;
}

interface TestRequest {
  id: string;
  patientName: string;
  patientId: string;
  testName: string;
  testId: string;
  requestDate: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  priority: "routine" | "urgent" | "stat";
  requestedBy: string;
}

interface TestResult {
  id: string;
  requestId: string;
  patientName: string;
  patientId: string;
  testName: string;
  completionDate: string;
  resultSummary: string;
  status: "normal" | "abnormal" | "critical";
  reviewedBy: string;
}

interface LaboratoryManagerProps {
  tests?: Test[];
  testRequests?: TestRequest[];
  testResults?: TestResult[];
}

const LaboratoryManager: React.FC<LaboratoryManagerProps> = ({
  tests = [
    {
      id: "T001",
      name: "Complete Blood Count (CBC)",
      category: "Hematology",
      price: 45.0,
      turnaroundTime: "1 day",
      description: "Measures red blood cells, white blood cells, and platelets",
    },
    {
      id: "T002",
      name: "Basic Metabolic Panel",
      category: "Chemistry",
      price: 65.0,
      turnaroundTime: "1 day",
      description: "Measures glucose, calcium, and electrolytes",
    },
    {
      id: "T003",
      name: "Lipid Panel",
      category: "Chemistry",
      price: 75.0,
      turnaroundTime: "1-2 days",
      description: "Measures cholesterol and triglycerides",
    },
    {
      id: "T004",
      name: "Thyroid Stimulating Hormone (TSH)",
      category: "Endocrinology",
      price: 85.0,
      turnaroundTime: "1-2 days",
      description: "Measures thyroid function",
    },
    {
      id: "T005",
      name: "Hemoglobin A1C",
      category: "Endocrinology",
      price: 95.0,
      turnaroundTime: "1-2 days",
      description: "Measures average blood glucose over 2-3 months",
    },
  ],
  testRequests = [
    {
      id: "R001",
      patientName: "John Smith",
      patientId: "P10045",
      testName: "Complete Blood Count (CBC)",
      testId: "T001",
      requestDate: "2023-06-15",
      status: "pending",
      priority: "routine",
      requestedBy: "Dr. Emily Chen",
    },
    {
      id: "R002",
      patientName: "Sarah Johnson",
      patientId: "P10046",
      testName: "Lipid Panel",
      testId: "T003",
      requestDate: "2023-06-14",
      status: "in-progress",
      priority: "urgent",
      requestedBy: "Dr. Michael Wong",
    },
    {
      id: "R003",
      patientName: "Robert Wilson",
      patientId: "P10047",
      testName: "Thyroid Stimulating Hormone (TSH)",
      testId: "T004",
      requestDate: "2023-06-13",
      status: "completed",
      priority: "routine",
      requestedBy: "Dr. Emily Chen",
    },
    {
      id: "R004",
      patientName: "Emily Davis",
      patientId: "P10048",
      testName: "Hemoglobin A1C",
      testId: "T005",
      requestDate: "2023-06-12",
      status: "cancelled",
      priority: "stat",
      requestedBy: "Dr. James Wilson",
    },
  ],
  testResults = [
    {
      id: "RES001",
      requestId: "R003",
      patientName: "Robert Wilson",
      patientId: "P10047",
      testName: "Thyroid Stimulating Hormone (TSH)",
      completionDate: "2023-06-14",
      resultSummary: "TSH: 2.5 mIU/L (Reference Range: 0.4-4.0 mIU/L)",
      status: "normal",
      reviewedBy: "Dr. Lisa Garcia",
    },
    {
      id: "RES002",
      requestId: "R005",
      patientName: "Maria Rodriguez",
      patientId: "P10049",
      testName: "Complete Blood Count (CBC)",
      completionDate: "2023-06-10",
      resultSummary: "WBC: 12.5 x10^9/L (Reference Range: 4.5-11.0 x10^9/L)",
      status: "abnormal",
      reviewedBy: "Dr. James Wilson",
    },
    {
      id: "RES003",
      requestId: "R006",
      patientName: "David Brown",
      patientId: "P10050",
      testName: "Basic Metabolic Panel",
      completionDate: "2023-06-09",
      resultSummary: "Glucose: 250 mg/dL (Reference Range: 70-99 mg/dL)",
      status: "critical",
      reviewedBy: "Dr. Emily Chen",
    },
  ],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("tests");
  const [isAddTestOpen, setIsAddTestOpen] = useState(false);
  const [isAddRequestOpen, setIsAddRequestOpen] = useState(false);
  const [isViewResultOpen, setIsViewResultOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [newTest, setNewTest] = useState({
    name: "",
    category: "",
    price: "",
    turnaroundTime: "",
    description: "",
  });

  // Filter tests based on search term
  const filteredTests = tests.filter(
    (test) =>
      test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Filter test requests based on search term
  const filteredRequests = testRequests.filter(
    (request) =>
      request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Filter test results based on search term
  const filteredResults = testResults.filter(
    (result) =>
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddTest = () => {
    // This would typically make an API call to add the test
    console.log("Adding new test:", newTest);
    setIsAddTestOpen(false);
    setNewTest({
      name: "",
      category: "",
      price: "",
      turnaroundTime: "",
      description: "",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      case "normal":
        return <Badge className="bg-green-500">Normal</Badge>;
      case "abnormal":
        return <Badge variant="secondary">Abnormal</Badge>;
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "routine":
        return <Badge variant="outline">Routine</Badge>;
      case "urgent":
        return <Badge variant="secondary">Urgent</Badge>;
      case "stat":
        return <Badge variant="destructive">STAT</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Laboratory Management</h1>
          <p className="text-muted-foreground">
            Manage tests, process samples, and view results
          </p>
        </div>
        <div className="flex gap-2">
          {activeTab === "tests" && (
            <Button onClick={() => setIsAddTestOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Test
            </Button>
          )}
          {activeTab === "requests" && (
            <Button onClick={() => setIsAddRequestOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Test Request
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${activeTab}...`}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs
        defaultValue="tests"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-4">
          <TabsTrigger value="tests">
            <Beaker className="mr-2 h-4 w-4" />
            Available Tests
          </TabsTrigger>
          <TabsTrigger value="requests">
            <Clock className="mr-2 h-4 w-4" />
            Test Requests
          </TabsTrigger>
          <TabsTrigger value="results">
            <FileText className="mr-2 h-4 w-4" />
            Test Results
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Laboratory Tests</CardTitle>
              <CardDescription>
                View and manage all available laboratory tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test ID</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Turnaround Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.id}</TableCell>
                      <TableCell>{test.name}</TableCell>
                      <TableCell>{test.category}</TableCell>
                      <TableCell>${test.price.toFixed(2)}</TableCell>
                      <TableCell>{test.turnaroundTime}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Requests</CardTitle>
              <CardDescription>
                Manage and process laboratory test requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        {request.id}
                      </TableCell>
                      <TableCell>
                        {request.patientName}
                        <div className="text-xs text-muted-foreground">
                          ID: {request.patientId}
                        </div>
                      </TableCell>
                      <TableCell>{request.testName}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        {getPriorityBadge(request.priority)}
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        {request.status === "pending" && (
                          <Button variant="ghost" size="sm">
                            <Beaker className="h-4 w-4 text-blue-500" />
                            <span className="sr-only">Process</span>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>
                View and manage completed test results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Result ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Test</TableHead>
                    <TableHead>Completion Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.id}</TableCell>
                      <TableCell>
                        {result.patientName}
                        <div className="text-xs text-muted-foreground">
                          ID: {result.patientId}
                        </div>
                      </TableCell>
                      <TableCell>{result.testName}</TableCell>
                      <TableCell>{result.completionDate}</TableCell>
                      <TableCell>{getStatusBadge(result.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedResult(result);
                            setIsViewResultOpen(true);
                          }}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="sr-only">View details</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4 text-blue-500" />
                          <span className="sr-only">Share</span>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Test Dialog */}
      <Dialog open={isAddTestOpen} onOpenChange={setIsAddTestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Laboratory Test</DialogTitle>
            <DialogDescription>
              Enter the details for the new laboratory test.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Test Name
              </label>
              <Input
                id="name"
                value={newTest.name}
                onChange={(e) =>
                  setNewTest({ ...newTest, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="category"
                className="text-right text-sm font-medium"
              >
                Category
              </label>
              <Select
                value={newTest.category}
                onValueChange={(value) =>
                  setNewTest({ ...newTest, category: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hematology">Hematology</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Microbiology">Microbiology</SelectItem>
                  <SelectItem value="Immunology">Immunology</SelectItem>
                  <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                  <SelectItem value="Toxicology">Toxicology</SelectItem>
                  <SelectItem value="Urinalysis">Urinalysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="price" className="text-right text-sm font-medium">
                Price ($)
              </label>
              <Input
                id="price"
                type="number"
                value={newTest.price}
                onChange={(e) =>
                  setNewTest({ ...newTest, price: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="turnaroundTime"
                className="text-right text-sm font-medium"
              >
                Turnaround Time
              </label>
              <Input
                id="turnaroundTime"
                value={newTest.turnaroundTime}
                onChange={(e) =>
                  setNewTest({ ...newTest, turnaroundTime: e.target.value })
                }
                className="col-span-3"
                placeholder="e.g., 1-2 days"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="description"
                className="text-right text-sm font-medium"
              >
                Description
              </label>
              <Input
                id="description"
                value={newTest.description}
                onChange={(e) =>
                  setNewTest({ ...newTest, description: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTestOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTest}>Add Test</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Test Request Dialog */}
      <Dialog open={isAddRequestOpen} onOpenChange={setIsAddRequestOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Test Request</DialogTitle>
            <DialogDescription>
              Enter the details for the new laboratory test request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="patientSearch"
                className="text-right text-sm font-medium"
              >
                Patient
              </label>
              <div className="col-span-3 relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="patientSearch"
                  placeholder="Search for patient"
                  className="pl-8"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="testSelect"
                className="text-right text-sm font-medium"
              >
                Test
              </label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select test" />
                </SelectTrigger>
                <SelectContent>
                  {tests.map((test) => (
                    <SelectItem key={test.id} value={test.id}>
                      {test.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="priority"
                className="text-right text-sm font-medium"
              >
                Priority
              </label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="stat">STAT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="requestNotes"
                className="text-right text-sm font-medium"
              >
                Notes
              </label>
              <Input
                id="requestNotes"
                placeholder="Additional notes"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddRequestOpen(false)}
            >
              Cancel
            </Button>
            <Button>Create Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Test Result Dialog */}
      <Dialog open={isViewResultOpen} onOpenChange={setIsViewResultOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Test Result Details</DialogTitle>
            <DialogDescription>
              {selectedResult?.testName} for {selectedResult?.patientName}
            </DialogDescription>
          </DialogHeader>
          {selectedResult && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">
                    Patient Information
                  </h3>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="font-medium">{selectedResult.patientName}</p>
                    <p className="text-sm">ID: {selectedResult.patientId}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Test Information</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <p className="font-medium">{selectedResult.testName}</p>
                    <p className="text-sm">Result ID: {selectedResult.id}</p>
                    <p className="text-sm">
                      Completed: {selectedResult.completionDate}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Result Summary</h3>
                <div className="bg-muted p-3 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Results</p>
                    {getStatusBadge(selectedResult.status)}
                  </div>
                  <p className="text-sm">{selectedResult.resultSummary}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">
                  Additional Information
                </h3>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">Reviewed by:</span>{" "}
                    {selectedResult.reviewedBy}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Request ID:</span>{" "}
                    {selectedResult.requestId}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 mt-2">
                <h3 className="text-sm font-medium mb-3">Actions</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share className="mr-2 h-4 w-4" />
                    Share with Patient
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload to EHR
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewResultOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LaboratoryManager;
