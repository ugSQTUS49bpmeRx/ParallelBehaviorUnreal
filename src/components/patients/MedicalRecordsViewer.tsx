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
  Download,
  FileText,
  TestTube,
  Calendar,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface TestResult {
  id: string;
  name: string;
  date: string;
  doctor: string;
  status: "normal" | "abnormal" | "pending";
  details: string;
}

interface Treatment {
  id: string;
  name: string;
  date: string;
  doctor: string;
  notes: string;
  medications: string[];
}

interface Document {
  id: string;
  name: string;
  date: string;
  type: string;
  size: string;
}

interface MedicalRecordsViewerProps {
  patientName?: string;
  patientId?: string;
  testResults?: TestResult[];
  treatments?: Treatment[];
  documents?: Document[];
}

const MedicalRecordsViewer = ({
  patientName = "Jane Doe",
  patientId = "P-12345",
  testResults = [
    {
      id: "TR-001",
      name: "Complete Blood Count",
      date: "2023-05-15",
      doctor: "Dr. Smith",
      status: "normal",
      details: "All values within normal range.",
    },
    {
      id: "TR-002",
      name: "Lipid Panel",
      date: "2023-04-22",
      doctor: "Dr. Johnson",
      status: "abnormal",
      details: "Elevated LDL cholesterol levels. Recommended dietary changes.",
    },
    {
      id: "TR-003",
      name: "Thyroid Function Test",
      date: "2023-03-10",
      doctor: "Dr. Williams",
      status: "pending",
      details: "Results pending laboratory analysis.",
    },
  ],
  treatments = [
    {
      id: "TM-001",
      name: "Hypertension Management",
      date: "2023-06-05",
      doctor: "Dr. Smith",
      notes: "Blood pressure stabilizing with current medication regimen.",
      medications: ["Lisinopril 10mg", "Hydrochlorothiazide 12.5mg"],
    },
    {
      id: "TM-002",
      name: "Diabetes Follow-up",
      date: "2023-05-20",
      doctor: "Dr. Johnson",
      notes: "A1C levels improved. Continue with current management plan.",
      medications: ["Metformin 500mg", "Glipizide 5mg"],
    },
  ],
  documents = [
    {
      id: "DOC-001",
      name: "Annual Physical Report",
      date: "2023-06-10",
      type: "PDF",
      size: "1.2 MB",
    },
    {
      id: "DOC-002",
      name: "Vaccination Record",
      date: "2023-04-15",
      type: "PDF",
      size: "0.8 MB",
    },
    {
      id: "DOC-003",
      name: "Specialist Referral",
      date: "2023-03-22",
      type: "PDF",
      size: "0.5 MB",
    },
  ],
}: MedicalRecordsViewerProps) => {
  const [selectedTestResult, setSelectedTestResult] =
    useState<TestResult | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(
    null,
  );

  const getStatusBadge = (status: "normal" | "abnormal" | "pending") => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-500">Normal</Badge>;
      case "abnormal":
        return <Badge variant="destructive">Abnormal</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full min-h-[600px] p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Medical Records</h1>
        <div className="flex items-center mt-2">
          <p className="text-gray-600">Patient: {patientName}</p>
          <p className="text-gray-600 ml-4">ID: {patientId}</p>
        </div>
      </div>

      <Tabs defaultValue="test-results" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="test-results" className="flex-1">
            <TestTube className="mr-2 h-4 w-4" />
            Test Results
          </TabsTrigger>
          <TabsTrigger value="treatment-history" className="flex-1">
            <Calendar className="mr-2 h-4 w-4" />
            Treatment History
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="test-results" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-lg font-medium">Test Results</h3>
              {testResults.map((result) => (
                <Card
                  key={result.id}
                  className={`cursor-pointer hover:border-primary transition-colors ${selectedTestResult?.id === result.id ? "border-primary" : ""}`}
                  onClick={() => setSelectedTestResult(result)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{result.name}</CardTitle>
                      {getStatusBadge(result.status)}
                    </div>
                    <CardDescription>Date: {result.date}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <p className="text-sm text-gray-500">
                      Doctor: {result.doctor}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="md:col-span-2">
              {selectedTestResult ? (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{selectedTestResult.name}</CardTitle>
                      {getStatusBadge(selectedTestResult.status)}
                    </div>
                    <CardDescription>
                      Date: {selectedTestResult.date} | Doctor:{" "}
                      {selectedTestResult.doctor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-medium mb-2">Details</h4>
                    <p>{selectedTestResult.details}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Results
                    </Button>
                    <Button>Request Follow-up</Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg p-8">
                  <p className="text-gray-500">
                    Select a test result to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="treatment-history" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              <h3 className="text-lg font-medium">Treatment History</h3>
              {treatments.map((treatment) => (
                <Card
                  key={treatment.id}
                  className={`cursor-pointer hover:border-primary transition-colors ${selectedTreatment?.id === treatment.id ? "border-primary" : ""}`}
                  onClick={() => setSelectedTreatment(treatment)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {treatment.name}
                    </CardTitle>
                    <CardDescription>Date: {treatment.date}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    <p className="text-sm text-gray-500">
                      Doctor: {treatment.doctor}
                    </p>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="md:col-span-2">
              {selectedTreatment ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedTreatment.name}</CardTitle>
                    <CardDescription>
                      Date: {selectedTreatment.date} | Doctor:{" "}
                      {selectedTreatment.doctor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p>{selectedTreatment.notes}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Medications</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedTreatment.medications.map(
                          (medication, index) => (
                            <li key={index}>{medication}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Download Treatment Plan
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="h-full flex items-center justify-center border rounded-lg p-8">
                  <p className="text-gray-500">
                    Select a treatment to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Medical Documents</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((document) => (
              <Card key={document.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    {document.name}
                  </CardTitle>
                  <CardDescription>Date: {document.date}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between text-sm">
                    <span>Type: {document.type}</span>
                    <span>Size: {document.size}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MedicalRecordsViewer;
