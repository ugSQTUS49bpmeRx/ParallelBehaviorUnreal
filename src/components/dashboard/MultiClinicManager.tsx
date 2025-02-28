import React, { useState } from "react";
import {
  PlusCircle,
  Trash2,
  Building2,
  Users,
  MapPin,
  Edit,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";
import { Badge } from "../ui/badge";

interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  staffCount: number;
  status: "active" | "inactive";
}

interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  clinics: string[];
}

interface MultiClinicManagerProps {
  clinics?: Clinic[];
  staff?: Staff[];
}

const MultiClinicManager = ({
  clinics = [
    {
      id: "1",
      name: "Main Street Medical",
      address: "123 Main St, Anytown, USA",
      phone: "(555) 123-4567",
      staffCount: 12,
      status: "active",
    },
    {
      id: "2",
      name: "Westside Health Center",
      address: "456 West Ave, Anytown, USA",
      phone: "(555) 987-6543",
      staffCount: 8,
      status: "active",
    },
    {
      id: "3",
      name: "Northside Clinic",
      address: "789 North Blvd, Anytown, USA",
      phone: "(555) 456-7890",
      staffCount: 5,
      status: "inactive",
    },
  ],
  staff = [
    {
      id: "1",
      name: "Dr. Jane Smith",
      role: "Physician",
      email: "jane.smith@clinic.com",
      clinics: ["1", "2"],
    },
    {
      id: "2",
      name: "Dr. John Doe",
      role: "Physician",
      email: "john.doe@clinic.com",
      clinics: ["1"],
    },
    {
      id: "3",
      name: "Sarah Johnson",
      role: "Nurse",
      email: "sarah.johnson@clinic.com",
      clinics: ["1", "3"],
    },
    {
      id: "4",
      name: "Michael Brown",
      role: "Administrator",
      email: "michael.brown@clinic.com",
      clinics: ["2"],
    },
    {
      id: "5",
      name: "Lisa Garcia",
      role: "Receptionist",
      email: "lisa.garcia@clinic.com",
      clinics: ["1", "2", "3"],
    },
  ],
}: MultiClinicManagerProps) => {
  const [isAddClinicOpen, setIsAddClinicOpen] = useState(true);
  const [isAssignStaffOpen, setIsAssignStaffOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("clinics");
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [newClinic, setNewClinic] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleAddClinic = () => {
    // This would typically make an API call to add the clinic
    console.log("Adding new clinic:", newClinic);
    setIsAddClinicOpen(false);
    setNewClinic({ name: "", address: "", phone: "" });
  };

  const handleAssignStaff = () => {
    // This would typically make an API call to assign staff to clinics
    console.log(
      "Assigning staff:",
      selectedStaff,
      "to clinic:",
      selectedClinic,
    );
    setIsAssignStaffOpen(false);
  };

  return (
    <div className="w-full h-full bg-background p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Multi-Clinic Management</h1>
          <p className="text-muted-foreground">
            Manage your clinics and staff assignments
          </p>
        </div>
        <Button onClick={() => setIsAddClinicOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Clinic
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="clinics">
            <Building2 className="mr-2 h-4 w-4" />
            Clinics
          </TabsTrigger>
          <TabsTrigger value="staff">
            <Users className="mr-2 h-4 w-4" />
            Staff Assignment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="clinics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clinics.map((clinic) => (
              <Card key={clinic.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{clinic.name}</CardTitle>
                    <Badge
                      variant={
                        clinic.status === "active" ? "default" : "secondary"
                      }
                    >
                      {clinic.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center text-sm">
                      <MapPin className="mr-1 h-3 w-3" />
                      {clinic.address}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Phone:
                      </span>
                      <span className="text-sm">{clinic.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Staff Count:
                      </span>
                      <span className="text-sm">{clinic.staffCount}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedClinic(clinic);
                      setIsAssignStaffOpen(true);
                    }}
                  >
                    <Users className="mr-2 h-3 w-3" />
                    Assign Staff
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-2 h-3 w-3" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="staff" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Staff Assignments</CardTitle>
              <CardDescription>
                Manage which staff members work at each clinic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Assigned Clinics</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((staffMember) => (
                    <TableRow key={staffMember.id}>
                      <TableCell className="font-medium">
                        {staffMember.name}
                      </TableCell>
                      <TableCell>{staffMember.role}</TableCell>
                      <TableCell>{staffMember.email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {staffMember.clinics.map((clinicId) => {
                            const clinic = clinics.find(
                              (c) => c.id === clinicId,
                            );
                            return clinic ? (
                              <Badge
                                key={clinicId}
                                variant="secondary"
                                className="text-xs"
                              >
                                {clinic.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedStaff(staffMember);
                            setIsAssignStaffOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-3 w-3" />
                          Edit Assignments
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

      {/* Add Clinic Dialog */}
      <Dialog open={isAddClinicOpen} onOpenChange={setIsAddClinicOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Clinic</DialogTitle>
            <DialogDescription>
              Enter the details for the new clinic location.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                value={newClinic.name}
                onChange={(e) =>
                  setNewClinic({ ...newClinic, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="address"
                className="text-right text-sm font-medium"
              >
                Address
              </label>
              <Input
                id="address"
                value={newClinic.address}
                onChange={(e) =>
                  setNewClinic({ ...newClinic, address: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="phone" className="text-right text-sm font-medium">
                Phone
              </label>
              <Input
                id="phone"
                value={newClinic.phone}
                onChange={(e) =>
                  setNewClinic({ ...newClinic, phone: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddClinicOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddClinic}>Add Clinic</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Staff Dialog */}
      <Dialog open={isAssignStaffOpen} onOpenChange={setIsAssignStaffOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedStaff
                ? `Edit Assignments for ${selectedStaff.name}`
                : selectedClinic
                  ? `Assign Staff to ${selectedClinic.name}`
                  : "Assign Staff"}
            </DialogTitle>
            <DialogDescription>
              {selectedStaff
                ? "Select which clinics this staff member should be assigned to."
                : "Select which staff members should be assigned to this clinic."}
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto py-4">
            {selectedStaff ? (
              // If a staff member is selected, show clinics to assign them to
              <div className="space-y-2">
                {clinics.map((clinic) => (
                  <div key={clinic.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`clinic-${clinic.id}`}
                      defaultChecked={selectedStaff.clinics.includes(clinic.id)}
                    />
                    <label htmlFor={`clinic-${clinic.id}`} className="text-sm">
                      {clinic.name}{" "}
                      {clinic.status === "inactive" && (
                        <span className="text-muted-foreground">
                          (Inactive)
                        </span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            ) : selectedClinic ? (
              // If a clinic is selected, show staff to assign to it
              <div className="space-y-2">
                {staff.map((staffMember) => (
                  <div
                    key={staffMember.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      id={`staff-${staffMember.id}`}
                      defaultChecked={staffMember.clinics.includes(
                        selectedClinic.id,
                      )}
                    />
                    <label
                      htmlFor={`staff-${staffMember.id}`}
                      className="text-sm"
                    >
                      {staffMember.name} - {staffMember.role}
                    </label>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignStaffOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAssignStaff}>Save Assignments</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MultiClinicManager;
