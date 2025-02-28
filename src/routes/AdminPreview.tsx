import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, Check, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorProfile from "@/components/preview/DoctorProfile";

const AdminPreview = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Sample doctor profiles
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      bio: "Dr. Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      website: "https://example.com/dr-johnson",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      bio: "Dr. Chen is a neurologist specializing in movement disorders and neurodegenerative diseases. He completed his fellowship at Mayo Clinic and has published numerous research papers.",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      website: "https://example.com/dr-chen",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      bio: "Dr. Rodriguez is a pediatrician dedicated to providing comprehensive care for children from birth through adolescence. She has a special interest in childhood development and nutrition.",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      website: "",
    },
  ]);

  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    bio: "",
    photo: "",
    website: "",
  });

  const handleAddDoctor = () => {
    setDoctors([
      ...doctors,
      {
        id: doctors.length + 1,
        ...newDoctor,
      },
    ]);
    setNewDoctor({
      name: "",
      specialty: "",
      bio: "",
      photo: "",
      website: "",
    });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800">
          <div className="container flex h-16 items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-green-600 dark:text-green-400"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard Preview
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {darkMode ? "Switch to light mode" : "Switch to dark mode"}
                </span>
              </Button>
              <Link to="/preview">
                <Button variant="outline">Public Site</Button>
              </Link>
              <Link to="/">
                <Button>Login</Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your clinic, staff, and settings from one central
                location.
              </p>
            </div>
          </div>

          <Tabs defaultValue="doctors" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="doctors">Doctor Management</TabsTrigger>
              <TabsTrigger value="clinics">Clinic Settings</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="doctors" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Doctor Profiles</h2>
                <Button onClick={handleAddDoctor}>
                  <Plus className="h-4 w-4 mr-2" /> Add New Doctor
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* New Doctor Profile Form */}
                <DoctorProfile
                  initialData={newDoctor}
                  onSave={(data) => {
                    setNewDoctor(data);
                    handleAddDoctor();
                  }}
                />

                {/* Existing Doctor Profiles */}
                {doctors.map((doctor) => (
                  <DoctorProfile
                    key={doctor.id}
                    initialData={{
                      name: doctor.name,
                      specialty: doctor.specialty,
                      bio: doctor.bio,
                      photo: doctor.photo,
                      website: doctor.website,
                    }}
                    onSave={(data) => {
                      setDoctors(
                        doctors.map((d) =>
                          d.id === doctor.id ? { ...d, ...data } : d,
                        ),
                      );
                    }}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="clinics">
              <Card>
                <CardHeader>
                  <CardTitle>Clinic Settings</CardTitle>
                  <CardDescription>
                    Manage your clinic locations and settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    Clinic management features would be displayed here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>
                    View and generate reports for your clinic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    Reporting features would be displayed here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Management</CardTitle>
                  <CardDescription>
                    Manage billing and payments for your clinic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center py-12 text-muted-foreground">
                    Billing management features would be displayed here
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <footer className="w-full py-6 bg-white dark:bg-gray-900 border-t mt-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © 2023 Medical Assistant. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Admin Dashboard Preview
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AdminPreview;
