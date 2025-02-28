import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  FileText,
  Calendar,
  Activity,
  Pill,
  Beaker,
  User,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface PatientRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  patientId: string;
  lastVisit: string;
  medicalHistory: {
    condition: string;
    diagnosedDate: string;
    status: string;
  }[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    prescribedDate: string;
  }[];
  labResults: {
    test: string;
    date: string;
    result: string;
    normalRange: string;
    status: "normal" | "abnormal";
  }[];
  notes: {
    date: string;
    provider: string;
    content: string;
  }[];
}

interface PatientRecordsViewerProps {
  patients?: PatientRecord[];
  selectedPatientId?: string;
  onPatientSelect?: (patientId: string) => void;
}

const mockPatients: PatientRecord[] = [
  {
    id: "1",
    name: "John Smith",
    dateOfBirth: "1980-05-15",
    patientId: "P10045",
    lastVisit: "2023-04-10",
    medicalHistory: [
      {
        condition: "Hypertension",
        diagnosedDate: "2018-03-22",
        status: "Ongoing",
      },
      {
        condition: "Type 2 Diabetes",
        diagnosedDate: "2019-07-14",
        status: "Ongoing",
      },
    ],
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        prescribedDate: "2022-11-05",
      },
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        prescribedDate: "2022-11-05",
      },
    ],
    labResults: [
      {
        test: "Blood Glucose",
        date: "2023-03-15",
        result: "140 mg/dL",
        normalRange: "70-99 mg/dL",
        status: "abnormal",
      },
      {
        test: "HbA1c",
        date: "2023-03-15",
        result: "7.1%",
        normalRange: "4.0-5.6%",
        status: "abnormal",
      },
      {
        test: "Blood Pressure",
        date: "2023-04-10",
        result: "138/85 mmHg",
        normalRange: "120/80 mmHg",
        status: "abnormal",
      },
    ],
    notes: [
      {
        date: "2023-04-10",
        provider: "Dr. Emily Chen",
        content:
          "Patient reports improved energy levels. Blood pressure slightly elevated. Continuing current medication regimen with follow-up in 3 months.",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    dateOfBirth: "1992-11-23",
    patientId: "P10046",
    lastVisit: "2023-04-05",
    medicalHistory: [
      { condition: "Asthma", diagnosedDate: "2010-06-12", status: "Ongoing" },
      {
        condition: "Seasonal Allergies",
        diagnosedDate: "2015-03-30",
        status: "Seasonal",
      },
    ],
    medications: [
      {
        name: "Albuterol Inhaler",
        dosage: "90mcg",
        frequency: "As needed",
        prescribedDate: "2023-01-15",
      },
      {
        name: "Cetirizine",
        dosage: "10mg",
        frequency: "Once daily",
        prescribedDate: "2023-03-01",
      },
    ],
    labResults: [
      {
        test: "Spirometry",
        date: "2023-02-20",
        result: "FEV1: 85% predicted",
        normalRange: ">80% predicted",
        status: "normal",
      },
      {
        test: "IgE Levels",
        date: "2023-02-20",
        result: "190 IU/mL",
        normalRange: "<100 IU/mL",
        status: "abnormal",
      },
    ],
    notes: [
      {
        date: "2023-04-05",
        provider: "Dr. Michael Wong",
        content:
          "Patient experiencing increased allergy symptoms with spring season. Adjusted medication and recommended HEPA air purifier for home use.",
      },
    ],
  },
];

const PatientRecordsViewer: React.FC<PatientRecordsViewerProps> = ({
  patients = mockPatients,
  selectedPatientId = "1",
  onPatientSelect = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedPatient =
    patients.find((patient) => patient.id === selectedPatientId) || patients[0];

  return (
    <div className="bg-white w-full h-full flex flex-col p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patient Records</h1>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Patient List */}
        <div className="col-span-3 border rounded-lg overflow-hidden">
          <div className="p-3 bg-muted font-medium">Patient List</div>
          <div className="divide-y max-h-[calc(100vh-220px)] overflow-y-auto">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-3 cursor-pointer hover:bg-muted/50 ${selectedPatientId === patient.id ? "bg-muted/50" : ""}`}
                  onClick={() => onPatientSelect(patient.id)}
                >
                  <div className="font-medium">{patient.name}</div>
                  <div className="text-sm text-muted-foreground flex justify-between">
                    <span>ID: {patient.patientId}</span>
                    <span>DOB: {patient.dateOfBirth}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No patients found
              </div>
            )}
          </div>
        </div>

        {/* Patient Details */}
        <div className="col-span-9 border rounded-lg overflow-hidden">
          {selectedPatient && (
            <>
              <div className="p-4 bg-muted flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">{selectedPatient.name}</h2>
                  <div className="text-sm text-muted-foreground">
                    Patient ID: {selectedPatient.patientId} | DOB:{" "}
                    {selectedPatient.dateOfBirth} | Last Visit:{" "}
                    {selectedPatient.lastVisit}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Records
                </Button>
              </div>

              <div className="p-4">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="w-full justify-start mb-4">
                    <TabsTrigger value="overview">
                      <FileText className="h-4 w-4 mr-2" />
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="history">
                      <Calendar className="h-4 w-4 mr-2" />
                      Medical History
                    </TabsTrigger>
                    <TabsTrigger value="medications">
                      <Pill className="h-4 w-4 mr-2" />
                      Medications
                    </TabsTrigger>
                    <TabsTrigger value="lab-results">
                      <Beaker className="h-4 w-4 mr-2" />
                      Lab Results
                    </TabsTrigger>
                    <TabsTrigger value="notes">
                      <FileText className="h-4 w-4 mr-2" />
                      Notes
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Activity className="h-5 w-5 mr-2" />
                            Medical Conditions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedPatient.medicalHistory.map(
                              (item, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between"
                                >
                                  <span>{item.condition}</span>
                                  <Badge variant="outline">{item.status}</Badge>
                                </li>
                              ),
                            )}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Pill className="h-5 w-5 mr-2" />
                            Current Medications
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {selectedPatient.medications.map((med, index) => (
                              <li key={index}>
                                <div className="font-medium">
                                  {med.name} ({med.dosage})
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {med.frequency}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="col-span-2">
                        <CardHeader>
                          <CardTitle className="flex items-center">
                            <Beaker className="h-5 w-5 mr-2" />
                            Recent Lab Results
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedPatient.labResults
                              .slice(0, 3)
                              .map((result, index) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center border-b pb-2"
                                >
                                  <div>
                                    <div className="font-medium">
                                      {result.test}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      {result.date}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-medium">
                                      {result.result}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      Normal: {result.normalRange}
                                    </div>
                                  </div>
                                  <Badge
                                    variant={
                                      result.status === "normal"
                                        ? "secondary"
                                        : "destructive"
                                    }
                                  >
                                    {result.status}
                                  </Badge>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="history">
                    <Card>
                      <CardHeader>
                        <CardTitle>Medical History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedPatient.medicalHistory.map(
                            (condition, index) => (
                              <div key={index} className="border-b pb-4">
                                <div className="flex justify-between items-center">
                                  <h3 className="text-lg font-medium">
                                    {condition.condition}
                                  </h3>
                                  <Badge variant="outline">
                                    {condition.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Diagnosed: {condition.diagnosedDate}
                                </p>
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="medications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Current Medications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedPatient.medications.map(
                            (medication, index) => (
                              <div key={index} className="border-b pb-4">
                                <h3 className="text-lg font-medium">
                                  {medication.name}
                                </h3>
                                <div className="grid grid-cols-3 gap-4 mt-2">
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Dosage
                                    </p>
                                    <p>{medication.dosage}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Frequency
                                    </p>
                                    <p>{medication.frequency}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">
                                      Prescribed
                                    </p>
                                    <p>{medication.prescribedDate}</p>
                                  </div>
                                </div>
                              </div>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="lab-results">
                    <Card>
                      <CardHeader>
                        <CardTitle>Lab Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedPatient.labResults.map((result, index) => (
                            <div key={index} className="border-b pb-4">
                              <div className="flex justify-between items-center">
                                <h3 className="text-lg font-medium">
                                  {result.test}
                                </h3>
                                <Badge
                                  variant={
                                    result.status === "normal"
                                      ? "secondary"
                                      : "destructive"
                                  }
                                >
                                  {result.status}
                                </Badge>
                              </div>
                              <div className="grid grid-cols-3 gap-4 mt-2">
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Date
                                  </p>
                                  <p>{result.date}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Result
                                  </p>
                                  <p>{result.result}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    Normal Range
                                  </p>
                                  <p>{result.normalRange}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notes">
                    <Card>
                      <CardHeader>
                        <CardTitle>Clinical Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedPatient.notes.map((note, index) => (
                            <div key={index} className="border-b pb-4">
                              <div className="flex items-center gap-2 mb-2">
                                <User className="h-5 w-5" />
                                <span className="font-medium">
                                  {note.provider}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  ({note.date})
                                </span>
                              </div>
                              <p className="text-sm">{note.content}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientRecordsViewer;
