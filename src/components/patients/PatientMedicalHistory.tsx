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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calendar,
  CalendarIcon,
  FileText,
  Plus,
  Search,
  User,
  Edit,
  Trash2,
  AlertCircle,
  Pill,
  Activity,
  Syringe,
  Cigarette,
  Wine,
  Heart,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  medicalRecordNumber: string;
}

interface MedicalCondition {
  id: string;
  name: string;
  diagnosisDate: string;
  status: "active" | "resolved" | "in-remission";
  notes?: string;
  severity: "mild" | "moderate" | "severe";
  treatingDoctor: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  reason: string;
  status: "active" | "discontinued" | "completed";
  notes?: string;
}

interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: "mild" | "moderate" | "severe";
  diagnosedDate: string;
  notes?: string;
}

interface Immunization {
  id: string;
  vaccine: string;
  date: string;
  administeredBy: string;
  lotNumber?: string;
  notes?: string;
}

interface FamilyHistory {
  id: string;
  condition: string;
  relationship: string;
  notes?: string;
}

interface SocialHistory {
  smokingStatus: "never" | "former" | "current" | "unknown";
  smokingNotes?: string;
  alcoholUse: "none" | "occasional" | "moderate" | "heavy" | "unknown";
  alcoholNotes?: string;
  exerciseFrequency: "none" | "occasional" | "regular" | "unknown";
  exerciseNotes?: string;
  occupation?: string;
  dietaryRestrictions?: string;
  notes?: string;
}

interface PatientMedicalHistoryProps {
  patient?: Patient;
  medicalConditions?: MedicalCondition[];
  medications?: Medication[];
  allergies?: Allergy[];
  immunizations?: Immunization[];
  familyHistory?: FamilyHistory[];
  socialHistory?: SocialHistory;
  onAddCondition?: (condition: Omit<MedicalCondition, "id">) => void;
  onAddMedication?: (medication: Omit<Medication, "id">) => void;
  onAddAllergy?: (allergy: Omit<Allergy, "id">) => void;
  onAddImmunization?: (immunization: Omit<Immunization, "id">) => void;
  onAddFamilyHistory?: (familyHistory: Omit<FamilyHistory, "id">) => void;
  onUpdateSocialHistory?: (socialHistory: SocialHistory) => void;
  className?: string;
}

const PatientMedicalHistory: React.FC<PatientMedicalHistoryProps> = ({
  patient = {
    id: "P10045",
    name: "John Smith",
    dateOfBirth: "1980-05-15",
    gender: "Male",
    contactNumber: "(555) 123-4567",
    email: "john.smith@example.com",
    medicalRecordNumber: "MRN12345",
  },
  medicalConditions = [
    {
      id: "MC001",
      name: "Hypertension",
      diagnosisDate: "2018-03-22",
      status: "active" as const,
      notes: "Well-controlled with medication",
      severity: "moderate" as const,
      treatingDoctor: "Dr. Emily Chen",
    },
    {
      id: "MC002",
      name: "Type 2 Diabetes",
      diagnosisDate: "2019-07-14",
      status: "active" as const,
      notes: "Managing with diet and medication",
      severity: "moderate" as const,
      treatingDoctor: "Dr. Emily Chen",
    },
    {
      id: "MC003",
      name: "Seasonal Allergies",
      diagnosisDate: "2015-05-10",
      status: "active" as const,
      severity: "mild" as const,
      treatingDoctor: "Dr. Michael Wong",
    },
  ],
  medications = [
    {
      id: "MED001",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      startDate: "2022-11-05",
      prescribedBy: "Dr. Emily Chen",
      reason: "Hypertension",
      status: "active" as const,
    },
    {
      id: "MED002",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      startDate: "2022-11-05",
      prescribedBy: "Dr. Emily Chen",
      reason: "Type 2 Diabetes",
      status: "active" as const,
    },
    {
      id: "MED003",
      name: "Cetirizine",
      dosage: "10mg",
      frequency: "Once daily as needed",
      startDate: "2023-03-01",
      endDate: "2023-09-30",
      prescribedBy: "Dr. Michael Wong",
      reason: "Seasonal Allergies",
      status: "active" as const,
      notes: "Take during allergy season",
    },
  ],
  allergies = [
    {
      id: "ALG001",
      allergen: "Penicillin",
      reaction: "Rash, hives",
      severity: "moderate" as const,
      diagnosedDate: "2010-08-15",
      notes: "Avoid all penicillin-based antibiotics",
    },
    {
      id: "ALG002",
      allergen: "Pollen",
      reaction: "Sneezing, itchy eyes",
      severity: "mild" as const,
      diagnosedDate: "2015-05-10",
    },
  ],
  immunizations = [
    {
      id: "IMM001",
      vaccine: "Influenza",
      date: "2022-10-15",
      administeredBy: "Dr. Lisa Garcia",
      lotNumber: "FL2022-456",
    },
    {
      id: "IMM002",
      vaccine: "COVID-19 (Pfizer)",
      date: "2021-04-10",
      administeredBy: "Dr. James Wilson",
      lotNumber: "PF2021-789",
      notes: "First dose",
    },
    {
      id: "IMM003",
      vaccine: "COVID-19 (Pfizer)",
      date: "2021-05-01",
      administeredBy: "Dr. James Wilson",
      lotNumber: "PF2021-901",
      notes: "Second dose",
    },
  ],
  familyHistory = [
    {
      id: "FH001",
      condition: "Hypertension",
      relationship: "Father",
      notes: "Diagnosed at age 50",
    },
    {
      id: "FH002",
      condition: "Type 2 Diabetes",
      relationship: "Mother",
      notes: "Diagnosed at age 45",
    },
    {
      id: "FH003",
      condition: "Coronary Artery Disease",
      relationship: "Paternal Grandfather",
      notes: "Died at age 65 from heart attack",
    },
  ],
  socialHistory = {
    smokingStatus: "former" as const,
    smokingNotes: "Quit in 2015, smoked 1 pack/day for 10 years",
    alcoholUse: "occasional" as const,
    alcoholNotes: "1-2 drinks per week",
    exerciseFrequency: "regular" as const,
    exerciseNotes: "Walks 30 minutes, 3 times per week",
    occupation: "Software Engineer",
    dietaryRestrictions: "Low carb diet for diabetes management",
  },
  onAddCondition = () => {},
  onAddMedication = () => {},
  onAddAllergy = () => {},
  onAddImmunization = () => {},
  onAddFamilyHistory = () => {},
  onUpdateSocialHistory = () => {},
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState("conditions");
  const [addConditionOpen, setAddConditionOpen] = useState(false);
  const [addMedicationOpen, setAddMedicationOpen] = useState(false);
  const [addAllergyOpen, setAddAllergyOpen] = useState(false);
  const [addImmunizationOpen, setAddImmunizationOpen] = useState(false);
  const [addFamilyHistoryOpen, setAddFamilyHistoryOpen] = useState(false);
  const [editSocialHistoryOpen, setEditSocialHistoryOpen] = useState(false);

  // Form states
  const [newCondition, setNewCondition] = useState<Partial<MedicalCondition>>({
    status: "active",
    severity: "moderate",
  });
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    status: "active",
  });
  const [newAllergy, setNewAllergy] = useState<Partial<Allergy>>({
    severity: "moderate",
  });
  const [newImmunization, setNewImmunization] = useState<Partial<Immunization>>(
    {},
  );
  const [newFamilyHistory, setNewFamilyHistory] = useState<
    Partial<FamilyHistory>
  >({});
  const [editedSocialHistory, setEditedSocialHistory] =
    useState<SocialHistory>(socialHistory);

  // Date selection states
  const [conditionDate, setConditionDate] = useState<Date>();
  const [medicationStartDate, setMedicationStartDate] = useState<Date>();
  const [medicationEndDate, setMedicationEndDate] = useState<Date>();
  const [allergyDate, setAllergyDate] = useState<Date>();
  const [immunizationDate, setImmunizationDate] = useState<Date>();

  const handleAddCondition = () => {
    if (
      !newCondition.name ||
      !newCondition.status ||
      !newCondition.severity ||
      !conditionDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    onAddCondition({
      name: newCondition.name!,
      diagnosisDate: format(conditionDate, "yyyy-MM-dd"),
      status: newCondition.status as "active" | "resolved" | "in-remission",
      severity: newCondition.severity as "mild" | "moderate" | "severe",
      notes: newCondition.notes,
      treatingDoctor: newCondition.treatingDoctor || "",
    });

    setNewCondition({ status: "active", severity: "moderate" });
    setConditionDate(undefined);
    setAddConditionOpen(false);
  };

  const handleAddMedication = () => {
    if (
      !newMedication.name ||
      !newMedication.dosage ||
      !newMedication.frequency ||
      !medicationStartDate ||
      !newMedication.prescribedBy ||
      !newMedication.reason
    ) {
      alert("Please fill in all required fields");
      return;
    }

    onAddMedication({
      name: newMedication.name!,
      dosage: newMedication.dosage!,
      frequency: newMedication.frequency!,
      startDate: format(medicationStartDate, "yyyy-MM-dd"),
      endDate: medicationEndDate
        ? format(medicationEndDate, "yyyy-MM-dd")
        : undefined,
      prescribedBy: newMedication.prescribedBy!,
      reason: newMedication.reason!,
      status: newMedication.status as "active" | "discontinued" | "completed",
      notes: newMedication.notes,
    });

    setNewMedication({ status: "active" });
    setMedicationStartDate(undefined);
    setMedicationEndDate(undefined);
    setAddMedicationOpen(false);
  };

  const handleAddAllergy = () => {
    if (
      !newAllergy.allergen ||
      !newAllergy.reaction ||
      !newAllergy.severity ||
      !allergyDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    onAddAllergy({
      allergen: newAllergy.allergen!,
      reaction: newAllergy.reaction!,
      severity: newAllergy.severity as "mild" | "moderate" | "severe",
      diagnosedDate: format(allergyDate, "yyyy-MM-dd"),
      notes: newAllergy.notes,
    });

    setNewAllergy({ severity: "moderate" });
    setAllergyDate(undefined);
    setAddAllergyOpen(false);
  };

  const handleAddImmunization = () => {
    if (
      !newImmunization.vaccine ||
      !immunizationDate ||
      !newImmunization.administeredBy
    ) {
      alert("Please fill in all required fields");
      return;
    }

    onAddImmunization({
      vaccine: newImmunization.vaccine!,
      date: format(immunizationDate, "yyyy-MM-dd"),
      administeredBy: newImmunization.administeredBy!,
      lotNumber: newImmunization.lotNumber,
      notes: newImmunization.notes,
    });

    setNewImmunization({});
    setImmunizationDate(undefined);
    setAddImmunizationOpen(false);
  };

  const handleAddFamilyHistory = () => {
    if (!newFamilyHistory.condition || !newFamilyHistory.relationship) {
      alert("Please fill in all required fields");
      return;
    }

    onAddFamilyHistory({
      condition: newFamilyHistory.condition!,
      relationship: newFamilyHistory.relationship!,
      notes: newFamilyHistory.notes,
    });

    setNewFamilyHistory({});
    setAddFamilyHistoryOpen(false);
  };

  const handleUpdateSocialHistory = () => {
    onUpdateSocialHistory(editedSocialHistory);
    setEditSocialHistoryOpen(false);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "mild":
        return <Badge variant="outline">خفيف</Badge>;
      case "moderate":
        return <Badge variant="secondary">متوسط</Badge>;
      case "severe":
        return <Badge variant="destructive">شديد</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">نشط</Badge>;
      case "resolved":
        return <Badge variant="secondary">تم حله</Badge>;
      case "in-remission":
        return <Badge variant="outline">في طور الشفاء</Badge>;
      case "discontinued":
        return <Badge variant="destructive">متوقف</Badge>;
      case "completed":
        return <Badge variant="secondary">مكتمل</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className={`bg-white ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                التاريخ الطبي للمريض
              </CardTitle>
              <CardDescription>
                عرض وإدارة التاريخ الطبي الكامل للمريض
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-md">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{patient.name}</p>
                <p className="text-xs text-muted-foreground">
                  {patient.medicalRecordNumber} | {patient.dateOfBirth} |{" "}
                  {patient.gender}
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="conditions">
                <Activity className="h-4 w-4 mr-2" />
                الحالات الطبية
              </TabsTrigger>
              <TabsTrigger value="medications">
                <Pill className="h-4 w-4 mr-2" />
                الأدوية
              </TabsTrigger>
              <TabsTrigger value="allergies">
                <AlertCircle className="h-4 w-4 mr-2" />
                الحساسية
              </TabsTrigger>
              <TabsTrigger value="immunizations">
                <Syringe className="h-4 w-4 mr-2" />
                التطعيمات
              </TabsTrigger>
              <TabsTrigger value="family">
                <Users className="h-4 w-4 mr-2" />
                التاريخ العائلي
              </TabsTrigger>
              <TabsTrigger value="social">
                <User className="h-4 w-4 mr-2" />
                التاريخ الاجتماعي
              </TabsTrigger>
            </TabsList>

            {/* Medical Conditions Tab */}
            <TabsContent value="conditions">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">الحالات الطبية</h3>
                <Button onClick={() => setAddConditionOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  إضافة حالة طبية
                </Button>
              </div>

              <div className="space-y-4">
                {medicalConditions.length > 0 ? (
                  medicalConditions.map((condition) => (
                    <Card key={condition.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {condition.name}
                          </CardTitle>
                          {getStatusBadge(condition.status)}
                        </div>
                        <CardDescription>
                          تاريخ التشخيص: {condition.diagnosisDate} | الشدة:{" "}
                          {getSeverityBadge(condition.severity)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {condition.notes && (
                          <p className="text-sm mb-2">{condition.notes}</p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          الطبيب المعالج: {condition.treatingDoctor}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">لا توجد حالات طبية مسجلة</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Medications Tab */}
            <TabsContent value="medications">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">الأدوية</h3>
                <Button onClick={() => setAddMedicationOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  إضافة دواء
                </Button>
              </div>

              <div className="space-y-4">
                {medications.length > 0 ? (
                  medications.map((medication) => (
                    <Card key={medication.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {medication.name} ({medication.dosage})
                          </CardTitle>
                          {getStatusBadge(medication.status)}
                        </div>
                        <CardDescription>
                          الجرعة: {medication.frequency} | السبب:{" "}
                          {medication.reason}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="font-medium">تاريخ البدء:</span>{" "}
                            {medication.startDate}
                          </div>
                          {medication.endDate && (
                            <div>
                              <span className="font-medium">تاريخ الانتهاء:</span>{" "}
                              {medication.endDate}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">وصفه:</span>{" "}
                            {medication.prescribedBy}
                          </div>
                        </div>
                        {medication.notes && (
                          <p className="text-sm mt-2">{medication.notes}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">لا توجد أدوية مسجلة</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Allergies Tab */}
            <TabsContent value="allergies">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">الحساسية</h3>
                <Button onClick={() => setAddAllergyOpen(true)}>
                  <Plus className="h-4 w-4 mr-1" />
                  إضافة حساسية
                </Button>
              </div>

              <div className="space-y-4">
                {allergies.length > 0 ? (
                  allergies.map((allergy) => (
                    <Card key={allergy.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">
                            {allergy.allergen}
                          </CardTitle>
                          {getSeverityBadge(allergy.severity)}
