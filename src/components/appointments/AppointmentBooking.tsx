import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Check, Clock, Calendar as CalendarIcon, User } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface AppointmentBookingProps {
  doctors?: Doctor[];
  onBookAppointment?: (doctorId: string, date: Date, timeSlot: string) => void;
  isDialogOpen?: boolean;
}

const AppointmentBooking = ({
  doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      specialty: "Neurology",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrics",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
  ],
  onBookAppointment = () => {},
  isDialogOpen = true,
}: AppointmentBookingProps) => {
  const [selectedDoctor, setSelectedDoctor] = useState<string | undefined>(
    undefined,
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(
    undefined,
  );
  const [step, setStep] = useState(1);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  // Mock time slots
  const timeSlots: TimeSlot[] = [
    { id: "1", time: "9:00 AM", available: true },
    { id: "2", time: "10:00 AM", available: true },
    { id: "3", time: "11:00 AM", available: false },
    { id: "4", time: "1:00 PM", available: true },
    { id: "5", time: "2:00 PM", available: true },
    { id: "6", time: "3:00 PM", available: false },
    { id: "7", time: "4:00 PM", available: true },
  ];

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setStep(2);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) setStep(3);
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    setConfirmationOpen(true);
  };

  const handleConfirmAppointment = () => {
    if (selectedDoctor && selectedDate && selectedTimeSlot) {
      onBookAppointment(selectedDoctor, selectedDate, selectedTimeSlot);
      // Reset form after booking
      setSelectedDoctor(undefined);
      setSelectedDate(undefined);
      setSelectedTimeSlot(undefined);
      setStep(1);
      setConfirmationOpen(false);
    }
  };

  const selectedDoctorData = doctors.find(
    (doctor) => doctor.id === selectedDoctor,
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white">
      <h2 className="text-2xl font-bold mb-6">Book an Appointment</h2>

      {/* Step indicator */}
      <div className="flex items-center mb-8">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-gray-200"}`}
        >
          <User size={16} />
        </div>
        <div
          className={`h-1 w-16 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}
        ></div>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-gray-200"}`}
        >
          <CalendarIcon size={16} />
        </div>
        <div
          className={`h-1 w-16 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}
        ></div>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-gray-200"}`}
        >
          <Clock size={16} />
        </div>
      </div>

      {/* Step 1: Select Doctor */}
      {step === 1 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Select a Doctor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <Card
                key={doctor.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${selectedDoctor === doctor.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => handleDoctorSelect(doctor.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{doctor.name}</CardTitle>
                      <CardDescription>{doctor.specialty}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleDoctorSelect(doctor.id)}
                  >
                    Select
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Date */}
      {step === 2 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => setStep(1)}>
              Back
            </Button>
            <h3 className="text-xl font-semibold">Select a Date</h3>
          </div>

          {selectedDoctorData && (
            <div className="mb-4 flex items-center gap-3">
              <img
                src={selectedDoctorData.image}
                alt={selectedDoctorData.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{selectedDoctorData.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedDoctorData.specialty}
                </p>
              </div>
            </div>
          )}

          <div className="border rounded-lg p-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={[{ before: new Date() }]}
              className="mx-auto"
            />
          </div>
        </div>
      )}

      {/* Step 3: Select Time Slot */}
      {step === 3 && selectedDate && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="outline" size="sm" onClick={() => setStep(2)}>
              Back
            </Button>
            <h3 className="text-xl font-semibold">Select a Time</h3>
          </div>

          {selectedDoctorData && (
            <div className="mb-2 flex items-center gap-3">
              <img
                src={selectedDoctorData.image}
                alt={selectedDoctorData.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium">{selectedDoctorData.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedDoctorData.specialty}
                </p>
              </div>
            </div>
          )}

          <p className="mb-4 text-sm font-medium">
            Date: {format(selectedDate, "PPPP")}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {timeSlots.map((slot) => (
              <Button
                key={slot.id}
                variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                className={`h-auto py-3 ${!slot.available ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!slot.available}
                onClick={() =>
                  slot.available && handleTimeSlotSelect(slot.time)
                }
              >
                {slot.time}
                {slot.available ? null : (
                  <span className="text-xs block mt-1">Unavailable</span>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Your Appointment</DialogTitle>
            <DialogDescription>
              Please review the details of your appointment below.
            </DialogDescription>
          </DialogHeader>

          {selectedDoctorData && selectedDate && selectedTimeSlot && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDoctorData.image}
                  alt={selectedDoctorData.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-medium">{selectedDoctorData.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedDoctorData.specialty}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{format(selectedDate, "PPPP")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedTimeSlot}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmationOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmAppointment}>
              Confirm Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentBooking;
