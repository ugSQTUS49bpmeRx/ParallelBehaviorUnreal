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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Beaker,
  FileUp,
  Search,
  Plus,
  X,
  Check,
  AlertCircle,
  Calendar,
  User,
} from "lucide-react";

interface TestCategory {
  id: string;
  name: string;
  tests: LaboratoryTest[];
}

interface LaboratoryTest {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  turnaroundTime: string;
  requiresFasting: boolean;
  commonUses?: string[];
}

interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  email: string;
  medicalRecordNumber: string;
}

interface TestRequestFormProps {
  patients?: Patient[];
  onSubmit?: (data: any) => void;
  className?: string;
}

// Comprehensive list of laboratory tests organized by category
const testCategories: TestCategory[] = [
  {
    id: "hematology",
    name: "Hematology",
    tests: [
      {
        id: "cbc",
        name: "Complete Blood Count (CBC)",
        description:
          "Measures red blood cells, white blood cells, and platelets",
        category: "Hematology",
        price: 45.0,
        turnaroundTime: "1 day",
        requiresFasting: false,
        commonUses: [
          "Anemia",
          "Infection",
          "Leukemia",
          "General health screening",
        ],
      },
      {
        id: "hemoglobin",
        name: "Hemoglobin",
        description: "Measures the amount of hemoglobin in blood",
        category: "Hematology",
        price: 25.0,
        turnaroundTime: "1 day",
        requiresFasting: false,
      },
      {
        id: "hematocrit",
        name: "Hematocrit",
        description: "Measures the percentage of red blood cells in blood",
        category: "Hematology",
        price: 25.0,
        turnaroundTime: "1 day",
        requiresFasting: false,
      },
      {
        id: "coagulation",
        name: "Coagulation Panel",
        description: "Measures blood clotting factors",
        category: "Hematology",
        price: 65.0,
        turnaroundTime: "1 day",
        requiresFasting: false,
      },
      {
        id: "esr",
        name: "Erythrocyte Sedimentation Rate (ESR)",
        description: "Measures how quickly red blood cells settle",
        category: "Hematology",
        price: 35.0,
        turnaroundTime: "1 day",
        requiresFasting: false,
      },
    ],
  },
  {
    id: "chemistry",
    name: "Clinical Chemistry",
    tests: [
      {
        id: "bmp",
        name: "Basic Metabolic Panel",
        description: "Measures glucose, calcium, and electrolytes",
        category: "Chemistry",
        price: 65.0,
        turnaroundTime: "1 day",
        requiresFasting: true,
        commonUses: [
          "Kidney function",
          "Electrolyte balance",
          "Blood sugar monitoring",
        ],
      },
      {
        id: "cmp",
        name: "Comprehensive Metabolic Panel",
        description:
          "Measures liver and kidney function, electrolytes, and blood sugar",
        category: "Chemistry",
        price: 85.0,
        turnaroundTime: "1 day",
        requiresFasting: true,
      },
      {
        id: "lipid",
        name: "Lipid Panel",
        description: "Measures cholesterol and triglycerides",
        category: "Chemistry",
        price: 75.0,
        turnaroundTime: "1-2 days",
        requiresFasting: true,
      },
      {
        id: "liver",
        name: "Liver Function Tests",
        description:
          "Measures enzymes and proteins that reflect liver function",
        category: "Chemistry",
        price: 70.0,
        turnaroundTime: "1 day",
        requiresFasting: true,
      },
      {
        id: "kidney",
        name: "Kidney Function Tests",
        description: "Measures substances that reflect kidney function",
        category: "Chemistry",
        price: 70.0,
        turnaroundTime: "1 day",
        requiresFasting: true,
      },
      {
        id: "glucose",
        name: "Glucose Test",
        description: "Measures blood sugar levels",
        category: "Chemistry",
        price: 30.0,
        turnaroundTime: "1 day",
        requiresFasting: true,
      },
    ],
  },
  {
    id: "endocrinology",
    name: "Endocrinology",
    tests: [
      {
        id: "tsh",
        name: "Thyroid Stimulating Hormone (TSH)",
        description: "Measures thyroid function",
        category: "Endocrinology",
        price: 85.0,
        turnaroundTime: "1-2 days",
        requiresFasting: false,
        commonUses: ["Thyroid disorders", "Hypothyroidism", "Hyperthyroidism"],
      },
      {
        id: "t4",
        name: "Thyroxine (T4)",
        description: "Measures thyroid hormone levels",
        category: "Endocrinology",
        price: 75.0,
        turnaroundTime: "1-2 days",
        requiresFasting: false,
      },
      {
        id: "t3",
        name: "Triiodothyronine (T3)",
        description: "Measures thyroid hormone levels",
        category: "Endocrinology",
        price: 75.0,
        turnaroundTime: "1-2 days",
        requiresFasting: false,
      },
      {
        id: "a1c",
        name: "Hemoglobin A1C",
        description: "Measures average blood glucose over 2-3 months",
        category: "Endocrinology",
        price: 95.0,
        turnaroundTime: "1-2 days",
        requiresFasting: false,
      },
      {
        id: "cortisol",
        name: "Cortisol",
        description: "Measures stress hormone levels",
        category: "Endocrinology",
        price: 90.0,
        turnaroundTime: "1-2 days",
        requiresFasting: false,
      },
    ],
  },
  {
    id: "microbiology",
    name: "Microbiology",
    tests: [
      {
        id: "culture",
        name: "Bacterial Culture",
        description: "Identifies bacterial infections",
        category: "Microbiology",
        price: 120.0,
        turnaroundTime: "2-3 days",
        requiresFasting: false,
        commonUses: ["Bacterial infections", "Antibiotic selection"],
      },
      {
        id: "sensitivity",
        name: "Antibiotic Sensitivity",
        description: "Determines which antibiotics will be effective",
        category: "Microbiology",
        price: 150.0,
        turnaroundTime: "2-3 days",
        requiresFasting: false,
      },
      {
        id: "strep",
        name: "Strep Test",
        description: "Tests for streptococcal infections",
        category: "Microbiology",
        price: 60.0,
        turnaroundTime: "1 day",
        requiresFasting: false,
      },
      {
        id: "covid",
        name: "COVID-19 PCR Test",
        description: "Tests for SARS-CoV-2 infection",
        category: "Microbiology",
        price: 150.0,
        turnaroundTime: "1-2 days",
        requiresFasting: false,
      },
    ],
  },
  {
    id: "immunology",
    name: "Immunology",
    tests: [
      {
        id: "allergy",
        name: "Allergy Panel",
        description: "Tests for allergic reactions to common substances",
        category: "Immunology",
        price: 250.0,
        turnaroundTime: "3-5 days",
        requiresFasting: false,
        commonUses: ["Allergy diagnosis", "Immunotherapy planning"],
      },
      {
        id: "ana",
        name: "Antinuclear Antibody (ANA)",
        description: "Tests for autoimmune disorders",
        category: "Immunology",
        price: 120.0,
        turnaroundTime: "2-3 days",
        requiresFasting: false,
      },
      {
        id: "crp",
        name: "C-Reactive Protein (CRP)",
        description: "Measures inflammation in the body",
        category: "Immunology",
        price: 70.0,
        turnaroundTime: "1 day",
        requiresFasting: false,
      },
    ],
  },
  {
    id: "urinalysis",
    name: "Urinalysis",
    tests: [
      {
        id: "urinalysis",
        name: "Complete Urinalysis",
        description:
          "Analyzes physical, chemical, and microscopic properties of urine",
        category: "Urinalysis",
        price: 55.0,
        turnaroundTime: "1 day",
        requiresFasting: false,
        commonUses: [
          "Kidney function",
          "Urinary tract infections",
          "Diabetes screening",
        ],
      },
      {
        id: "urine-culture",
        name: "Urine Culture",
        description: "Tests for bacterial infections in the urinary tract",
        category: "Urinalysis",
        price: 95.0,
        turnaroundTime: "2-3 days",
        requiresFasting: false,
      },
      {
        id: "urine-protein",
        name: "Urine Protein Test",
        description: "Measures protein levels in urine",
        category: "Urinalysis",
        price: 45.0,
        turnaroundTime: "1 day",
        requiresFasting: false,
      },
    ],
  },
  {
    id: "toxicology",
    name: "Toxicology",
    tests: [
      {
        id: "drug-screen",
        name: "Drug Screen",
        description: "Tests for presence of drugs in the system",
        category: "Toxicology",
        price: 120.0,
        turnaroundTime: "1-2 days",
        requiresFasting: false,
        commonUses: ["Substance abuse monitoring", "Pre-employment screening"],
      },
      {
        id: "alcohol",
        name: "Blood Alcohol Level",
        description: "Measures alcohol concentration in blood",
        category: "Toxicology",
        price: 85.0,
        turnaroundTime: "1 day",
        requiresFasting: false,
      },
      {
        id: "heavy-metals",
        name: "Heavy Metals Screen",
        description: "Tests for toxic metals like lead, mercury, and arsenic",
        category: "Toxicology",
        price: 250.0,
        turnaroundTime: "3-5 days",
        requiresFasting: false,
      },
    ],
  },
  {
    id: "molecular",
    name: "Molecular Diagnostics",
    tests: [
      {
        id: "genetic",
        name: "Genetic Testing",
        description: "Analyzes DNA for genetic disorders",
        category: "Molecular",
        price: 500.0,
        turnaroundTime: "7-14 days",
        requiresFasting: false,
        commonUses: [
          "Hereditary disease risk",
          "Carrier screening",
          "Pharmacogenetics",
        ],
      },
      {
        id: "pcr",
        name: "PCR Test",
        description: "Detects specific genetic material",
        category: "Molecular",
        price: 200.0,
        turnaroundTime: "2-3 days",
        requiresFasting: false,
      },
    ],
  },
];

const TestRequestForm: React.FC<TestRequestFormProps> = ({
  patients = [
    {
      id: "P10045",
      name: "John Smith",
      dateOfBirth: "1980-05-15",
      gender: "Male",
      contactNumber: "(555) 123-4567",
      email: "john.smith@example.com",
      medicalRecordNumber: "MRN12345",
    },
    {
      id: "P10046",
      name: "Sarah Johnson",
      dateOfBirth: "1992-11-23",
      gender: "Female",
      contactNumber: "(555) 987-6543",
      email: "sarah.johnson@example.com",
      medicalRecordNumber: "MRN12346",
    },
    {
      id: "P10047",
      name: "Robert Wilson",
      dateOfBirth: "1975-08-30",
      gender: "Male",
      contactNumber: "(555) 456-7890",
      email: "robert.wilson@example.com",
      medicalRecordNumber: "MRN12347",
    },
  ],
  onSubmit = () => {},
  className = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(testCategories[0].id);
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("routine");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isPatientFasting, setIsPatientFasting] = useState(false);
  const [showPatientSearch, setShowPatientSearch] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.medicalRecordNumber
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setShowPatientSearch(false);
  };

  const handleTestToggle = (testId: string) => {
    setSelectedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId],
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }

    if (selectedTests.length === 0) {
      alert("Please select at least one test");
      return;
    }

    // Prepare data for submission
    const requestData = {
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      tests: selectedTests.map((testId) => {
        const category = testCategories.find((cat) =>
          cat.tests.some((test) => test.id === testId),
        );
        const test = category?.tests.find((test) => test.id === testId);
        return {
          id: testId,
          name: test?.name,
          category: test?.category,
        };
      }),
      priority: isUrgent ? "urgent" : priority,
      notes,
      isFasting: isPatientFasting,
      requestDate: new Date().toISOString(),
      files: uploadedFiles.map((file) => file.name), // In a real app, you'd upload these files
    };

    onSubmit(requestData);
    setConfirmDialogOpen(true);
  };

  const resetForm = () => {
    setSelectedPatient(null);
    setSelectedTests([]);
    setNotes("");
    setPriority("routine");
    setIsUrgent(false);
    setIsPatientFasting(false);
    setUploadedFiles([]);
    setConfirmDialogOpen(false);
  };

  // Find all tests that match the selected IDs
  const selectedTestObjects = selectedTests
    .map((testId) => {
      let foundTest: LaboratoryTest | undefined;
      testCategories.forEach((category) => {
        const test = category.tests.find((test) => test.id === testId);
        if (test) foundTest = test;
      });
      return foundTest;
    })
    .filter(Boolean) as LaboratoryTest[];

  // Check if any selected test requires fasting
  const anyTestRequiresFasting = selectedTestObjects.some(
    (test) => test.requiresFasting,
  );

  return (
    <div className={`bg-white ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="h-5 w-5 text-primary" />
            طلب فحوصات مخبرية
          </CardTitle>
          <CardDescription>
            اختر المريض والفحوصات المطلوبة وأرفق أي صور أو مستندات ضرورية
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Patient Selection */}
          <div className="space-y-2">
            <Label>المريض</Label>
            {selectedPatient ? (
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{selectedPatient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ID: {selectedPatient.id} | DOB:{" "}
                      {selectedPatient.dateOfBirth} | {selectedPatient.gender}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPatient(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Button
                  variant="outline"
                  className="w-full justify-between"
                  onClick={() => setShowPatientSearch(!showPatientSearch)}
                >
                  <span>اختر المريض</span>
                  <Search className="h-4 w-4" />
                </Button>
                {showPatientSearch && (
                  <Card className="absolute z-10 w-full mt-1 shadow-lg">
                    <CardHeader className="py-2 px-3">
                      <Input
                        placeholder="ابحث عن المريض بالاسم أو الرقم"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-dashed"
                      />
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-60">
                        {filteredPatients.length > 0 ? (
                          <div className="divide-y">
                            {filteredPatients.map((patient) => (
                              <div
                                key={patient.id}
                                className="p-3 hover:bg-muted cursor-pointer"
                                onClick={() => handlePatientSelect(patient)}
                              >
                                <p className="font-medium">{patient.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  ID: {patient.id} | DOB: {patient.dateOfBirth}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-3 text-center text-muted-foreground">
                            لا توجد نتائج
                          </div>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Test Selection */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>الفحوصات المطلوبة</Label>
              <Badge variant="outline">{selectedTests.length} فحص محدد</Badge>
            </div>

            <Tabs value={activeCategory} onValueChange={setActiveCategory}>
              <TabsList className="w-full flex-wrap h-auto">
                {testCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {testCategories.map((category) => (
                <TabsContent
                  key={category.id}
                  value={category.id}
                  className="border rounded-md p-3 mt-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {category.tests.map((test) => (
                      <div
                        key={test.id}
                        className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedTests.includes(test.id) ? "bg-primary/10 border-primary" : "hover:bg-muted"}`}
                        onClick={() => handleTestToggle(test.id)}
                      >
                        <div className="flex items-start gap-2">
                          <Checkbox
                            checked={selectedTests.includes(test.id)}
                            onCheckedChange={() => handleTestToggle(test.id)}
                            className="mt-1"
                          />
                          <div>
                            <div className="font-medium">{test.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {test.description}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {test.turnaroundTime}
                              </Badge>
                              {test.requiresFasting && (
                                <Badge variant="secondary" className="text-xs">
                                  يتطلب صيام
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                ${test.price.toFixed(2)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Fasting Status */}
          {anyTestRequiresFasting && (
            <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-md">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">
                    تنبيه: بعض الفحوصات تتطلب صيام
                  </p>
                  <p className="text-sm text-yellow-700">
                    يرجى التأكد من أن المريض صائم لمدة 8-12 ساعة قبل أخذ العينة
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Checkbox
                      id="fasting"
                      checked={isPatientFasting}
                      onCheckedChange={(checked) =>
                        setIsPatientFasting(!!checked)
                      }
                    />
                    <Label htmlFor="fasting" className="text-yellow-800">
                      المريض صائم
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Priority Selection */}
          <div className="space-y-2">
            <Label>الأولوية</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="urgent"
                  checked={isUrgent}
                  onCheckedChange={(checked) => setIsUrgent(!!checked)}
                />
                <Label htmlFor="urgent" className="text-red-600 font-medium">
                  عاجل
                </Label>
              </div>
              {!isUrgent && (
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">روتيني</SelectItem>
                    <SelectItem value="priority">أولوية</SelectItem>
                    <SelectItem value="stat">STAT (فوري)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>إرفاق صور أو مستندات</Label>
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <FileUp className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                اسحب وأفلت الملفات هنا أو انقر للتصفح
              </p>
              <Input
                type="file"
                className="hidden"
                id="file-upload"
                multiple
                onChange={handleFileUpload}
              />
              <Button variant="outline" asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  تصفح الملفات
                </label>
              </Button>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">
                  الملفات المرفقة ({uploadedFiles.length})
                </h4>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 border rounded-md"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية</Label>
            <Textarea
              id="notes"
              placeholder="أضف أي ملاحظات أو تعليمات خاصة هنا"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setPreviewDialogOpen(true)}>
            معاينة
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedPatient || selectedTests.length === 0}
          >
            إرسال طلب الفحص
          </Button>
        </CardFooter>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>معاينة طلب الفحص</DialogTitle>
            <DialogDescription>
              راجع تفاصيل طلب الفحص قبل الإرسال
            </DialogDescription>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">معلومات المريض</h3>
                  <div className="p-3 border rounded-md">
                    <p className="font-medium">{selectedPatient.name}</p>
                    <p className="text-sm">ID: {selectedPatient.id}</p>
                    <p className="text-sm">
                      تاريخ الميلاد: {selectedPatient.dateOfBirth}
                    </p>
                    <p className="text-sm">الجنس: {selectedPatient.gender}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">تفاصيل الطلب</h3>
                  <div className="p-3 border rounded-md">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">الأولوية:</p>
                      <Badge variant={isUrgent ? "destructive" : "outline"}>
                        {isUrgent
                          ? "عاجل"
                          : priority === "routine"
                            ? "روتيني"
                            : priority === "priority"
                              ? "أولوية"
                              : "STAT (فوري)"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm font-medium">حالة الصيام:</p>
                      <Badge
                        variant={isPatientFasting ? "secondary" : "outline"}
                      >
                        {isPatientFasting ? "صائم" : "غير صائم"}
                      </Badge>
                    </div>
                    <p className="text-sm mt-1">
                      <span className="font-medium">تاريخ الطلب:</span>{" "}
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">
                  الفحوصات المطلوبة ({selectedTests.length})
                </h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-2 text-sm">اسم الفحص</th>
                        <th className="text-left p-2 text-sm">القسم</th>
                        <th className="text-left p-2 text-sm">وقت النتيجة</th>
                        <th className="text-left p-2 text-sm">يتطلب صيام</th>
                        <th className="text-right p-2 text-sm">السعر</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedTestObjects.map((test) => (
                        <tr key={test.id}>
                          <td className="p-2 text-sm">{test.name}</td>
                          <td className="p-2 text-sm">{test.category}</td>
                          <td className="p-2 text-sm">{test.turnaroundTime}</td>
                          <td className="p-2 text-sm">
                            {test.requiresFasting ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )}
                          </td>
                          <td className="p-2 text-sm text-right">
                            ${test.price.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-muted/50">
                        <td
                          colSpan={4}
                          className="p-2 text-sm font-medium text-right"
                        >
                          المجموع:
                        </td>
                        <td className="p-2 text-sm font-medium text-right">
                          $
                          {selectedTestObjects
                            .reduce((sum, test) => sum + test.price, 0)
                            .toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-1">
                    الملفات المرفقة ({uploadedFiles.length})
                  </h3>
                  <div className="p-3 border rounded-md">
                    <ul className="space-y-1">
                      {uploadedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="text-sm flex items-center gap-2"
                        >
                          <FileUp className="h-4 w-4 text-muted-foreground" />
                          <span>{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024).toFixed(1)} KB)
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {notes && (
                <div>
                  <h3 className="text-sm font-medium mb-1">ملاحظات إضافية</h3>
                  <div className="p-3 border rounded-md">
                    <p className="text-sm">{notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPreviewDialogOpen(false)}
            >
              عودة للتعديل
            </Button>
            <Button onClick={handleSubmit}>تأكيد وإرسال</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تم إرسال طلب الفحص بنجاح</DialogTitle>
            <DialogDescription>
              تم إرسال طلب الفحص وسيتم معالجته في أقرب وقت ممكن
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center py-4">
            <div className="rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <p className="text-center text-muted-foreground">
            يمكنك متابعة حالة الطلب والاطلاع على النتائج من خلال قسم "نتائج
            الفحوصات"
          </p>
          <DialogFooter>
            <Button onClick={resetForm}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestRequestForm;
