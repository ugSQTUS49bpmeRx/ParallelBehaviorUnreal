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
import { Input } from "@/components/ui/input";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Activity,
  Heart,
  Thermometer,
  Droplets,
  Lungs,
  Scale,
  Pill,
  Bell,
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  Video,
  AlertTriangle,
  Search,
  Filter,
  Plus,
} from "lucide-react";

interface VitalReading {
  id: string;
  type: string;
  value: string;
  unit: string;
  timestamp: string;
  status: "normal" | "warning" | "critical";
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  lastTaken: string;
  nextDue: string;
  adherence: number; // percentage
}

interface MonitoredPatient {
  id: string;
  name: string;
  age: number;
  condition: string;
  monitoringSince: string;
  lastReading: string;
  status: "stable" | "attention" | "critical";
  vitals: VitalReading[];
  medications: Medication[];
  contactInfo: {
    phone: string;
    email: string;
    emergencyContact: string;
  };
}

interface PatientMonitoringProps {
  patients?: MonitoredPatient[];
  selectedPatientId?: string;
  onPatientSelect?: (patientId: string) => void;
}

const PatientMonitoring: React.FC<PatientMonitoringProps> = ({
  patients = [
    {
      id: "1",
      name: "John Smith",
      age: 68,
      condition: "Hypertension, Diabetes",
      monitoringSince: "2023-03-15",
      lastReading: "2023-06-15 08:32 AM",
      status: "stable",
      vitals: [
        {
          id: "v1",
          type: "Blood Pressure",
          value: "138/85",
          unit: "mmHg",
          timestamp: "2023-06-15 08:32 AM",
          status: "warning",
        },
        {
          id: "v2",
          type: "Heart Rate",
          value: "72",
          unit: "bpm",
          timestamp: "2023-06-15 08:32 AM",
          status: "normal",
        },
        {
          id: "v3",
          type: "Blood Glucose",
          value: "142",
          unit: "mg/dL",
          timestamp: "2023-06-15 08:15 AM",
          status: "warning",
        },
        {
          id: "v4",
          type: "Weight",
          value: "185",
          unit: "lbs",
          timestamp: "2023-06-15 08:00 AM",
          status: "normal",
        },
        {
          id: "v5",
          type: "Temperature",
          value: "98.6",
          unit: "°F",
          timestamp: "2023-06-15 08:32 AM",
          status: "normal",
        },
      ],
      medications: [
        {
          id: "m1",
          name: "Lisinopril",
          dosage: "10mg",
          frequency: "Once daily",
          lastTaken: "2023-06-15 08:00 AM",
          nextDue: "2023-06-16 08:00 AM",
          adherence: 95,
        },
        {
          id: "m2",
          name: "Metformin",
          dosage: "500mg",
          frequency: "Twice daily",
          lastTaken: "2023-06-14 08:00 PM",
          nextDue: "2023-06-15 08:00 AM",
          adherence: 85,
        },
      ],
      contactInfo: {
        phone: "(555) 123-4567",
        email: "john.smith@example.com",
        emergencyContact: "Mary Smith (555) 987-6543",
      },
    },
    {
      id: "2",
      name: "Sarah Johnson",
      age: 72,
      condition: "Congestive Heart Failure",
      monitoringSince: "2023-02-10",
      lastReading: "2023-06-15 07:45 AM",
      status: "attention",
      vitals: [
        {
          id: "v6",
          type: "Blood Pressure",
          value: "145/90",
          unit: "mmHg",
          timestamp: "2023-06-15 07:45 AM",
          status: "warning",
        },
        {
          id: "v7",
          type: "Heart Rate",
          value: "88",
          unit: "bpm",
          timestamp: "2023-06-15 07:45 AM",
          status: "warning",
        },
        {
          id: "v8",
          type: "Oxygen Saturation",
          value: "94",
          unit: "%",
          timestamp: "2023-06-15 07:45 AM",
          status: "warning",
        },
        {
          id: "v9",
          type: "Weight",
          value: "162",
          unit: "lbs",
          timestamp: "2023-06-15 07:30 AM",
          status: "warning",
        },
      ],
      medications: [
        {
          id: "m3",
          name: "Furosemide",
          dosage: "40mg",
          frequency: "Once daily",
          lastTaken: "2023-06-15 08:00 AM",
          nextDue: "2023-06-16 08:00 AM",
          adherence: 90,
        },
        {
          id: "m4",
          name: "Carvedilol",
          dosage: "6.25mg",
          frequency: "Twice daily",
          lastTaken: "2023-06-14 08:00 PM",
          nextDue: "2023-06-15 08:00 AM",
          adherence: 80,
        },
      ],
      contactInfo: {
        phone: "(555) 234-5678",
        email: "sarah.johnson@example.com",
        emergencyContact: "David Johnson (555) 876-5432",
      },
    },
    {
      id: "3",
      name: "Robert Wilson",
      age: 65,
      condition: "COPD",
      monitoringSince: "2023-04-22",
      lastReading: "2023-06-14 09:15 PM",
      status: "critical",
      vitals: [
        {
          id: "v10",
          type: "Oxygen Saturation",
          value: "88",
          unit: "%",
          timestamp: "2023-06-14 09:15 PM",
          status: "critical",
        },
        {
          id: "v11",
          type: "Respiratory Rate",
          value: "24",
          unit: "breaths/min",
          timestamp: "2023-06-14 09:15 PM",
          status: "critical",
        },
        {
          id: "v12",
          type: "Heart Rate",
          value: "92",
