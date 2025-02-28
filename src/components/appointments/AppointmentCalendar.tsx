import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, addDays, isSameDay } from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  Edit,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: Date;
  time: string;
  duration: number; // in minutes
  type: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  notes?: string;
}

interface AppointmentCalendarProps {
  appointments?: Appointment[];
  onAppointmentClick?: (appointment: Appointment) => void;
  onDateChange?: (date: Date) => void;
  onAddAppointment?: (date: Date) => void;
  onEditAppointment?: (appointment: Appointment) => void;
  onCancelAppointment?: (appointmentId: string) => void;
}

const AppointmentCalendar = ({
  appointments = [
    {
      id: "1",
      patientName: "John Doe",
      patientId: "P12345",
      date: new Date(),
      time: "09:00 AM",
      duration: 30,
      type: "Check-up",
      status: "scheduled" as const,
    },
    {
      id: "2",
      patientName: "Jane Smith",
      patientId: "P12346",
      date: new Date(),
      time: "10:30 AM",
      duration: 45,
      type: "Consultation",
      status: "scheduled" as const,
    },
    {
      id: "3",
      patientName: "Robert Johnson",
      patientId: "P12347",
      date: addDays(new Date(), 1),
      time: "02:00 PM",
      duration: 60,
      type: "Follow-up",
      status: "scheduled" as const,
    },
  ],
  onAppointmentClick = () => {},
  onDateChange = () => {},
  onAddAppointment = () => {},
  onEditAppointment = () => {},
  onCancelAppointment = () => {},
}: AppointmentCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [view, setView] = useState<"day" | "week">("day");

  // Filter appointments for the selected date
  const appointmentsForSelectedDate = appointments.filter((appointment) =>
    isSameDay(appointment.date, selectedDate),
  );

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
    onAppointmentClick(appointment);
  };

  const getStatusBadgeVariant = (status: Appointment["status"]) => {
    switch (status) {
      case "completed":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "no-show":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-white w-full h-full flex flex-col">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">Appointment Calendar</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("day")}
            className={
              view === "day" ? "bg-primary text-primary-foreground" : ""
            }
          >
            Day
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setView("week")}
            className={
              view === "week" ? "bg-primary text-primary-foreground" : ""
            }
          >
            Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onAddAppointment(selectedDate)}
          >
            <Plus className="h-4 w-4 mr-1" /> Add Appointment
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Calendar sidebar */}
        <div className="w-64 border-r p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />

          <div className="mt-4">
            <h3 className="font-medium mb-2">Appointment Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Badge variant="default" className="mr-2">
                  Scheduled
                </Badge>
                <span>Upcoming appointments</span>
              </div>
              <div className="flex items-center">
                <Badge variant="secondary" className="mr-2">
                  Completed
                </Badge>
                <span>Finished appointments</span>
              </div>
              <div className="flex items-center">
                <Badge variant="destructive" className="mr-2">
                  Cancelled
                </Badge>
                <span>Cancelled appointments</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="mr-2">
                  No-show
                </Badge>
                <span>Missed appointments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() - (view === "day" ? 1 : 7));
                  setSelectedDate(newDate);
                  onDateChange(newDate);
                }}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {format(selectedDate, "MMMM d, yyyy")}
              </h2>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(newDate.getDate() + (view === "day" ? 1 : 7));
                  setSelectedDate(newDate);
                  onDateChange(newDate);
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {view === "day" ? (
            <div className="space-y-4">
              {appointmentsForSelectedDate.length > 0 ? (
                appointmentsForSelectedDate.map((appointment) => (
                  <Card
                    key={appointment.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{appointment.patientName}</CardTitle>
                          <CardDescription>
                            Patient ID: {appointment.patientId}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={getStatusBadgeVariant(appointment.status)}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>
                            {appointment.time} ({appointment.duration} min)
                          </span>
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{format(appointment.date, "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center col-span-2">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Type: {appointment.type}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditAppointment(appointment);
                        }}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onCancelAppointment(appointment.id);
                        }}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                  <p className="text-muted-foreground mb-4">
                    No appointments scheduled for this day
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => onAddAppointment(selectedDate)}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Appointment
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-7 gap-px bg-muted">
                {Array.from({ length: 7 }).map((_, i) => {
                  const date = new Date(selectedDate);
                  date.setDate(date.getDate() - date.getDay() + i);
                  return (
                    <div key={i} className="bg-card p-2">
                      <div className="text-center py-1 font-medium">
                        {format(date, "EEE")}
                      </div>
                      <div className="text-center text-sm text-muted-foreground">
                        {format(date, "MMM d")}
                      </div>
                      <div className="mt-2 space-y-1">
                        {appointments
                          .filter((app) => isSameDay(app.date, date))
                          .slice(0, 3)
                          .map((app) => (
                            <div
                              key={app.id}
                              className="text-xs p-1 rounded bg-primary/10 cursor-pointer hover:bg-primary/20"
                              onClick={() => handleAppointmentClick(app)}
                            >
                              {app.time} - {app.patientName.split(" ")[0]}
                            </div>
                          ))}
                        {appointments.filter((app) => isSameDay(app.date, date))
                          .length > 3 && (
                          <div className="text-xs text-center text-muted-foreground">
                            +
                            {appointments.filter((app) =>
                              isSameDay(app.date, date),
                            ).length - 3}{" "}
                            more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent>
          {selectedAppointment && (
            <>
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
                <DialogDescription>
                  View details for {selectedAppointment.patientName}'s
                  appointment
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">Patient</h4>
                    <p>{selectedAppointment.patientName}</p>
                    <p className="text-sm text-muted-foreground">
                      ID: {selectedAppointment.patientId}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Status</h4>
                    <Badge
                      variant={getStatusBadgeVariant(
                        selectedAppointment.status,
                      )}
                    >
                      {selectedAppointment.status.charAt(0).toUpperCase() +
                        selectedAppointment.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium">Date</h4>
                    <p>{format(selectedAppointment.date, "MMMM d, yyyy")}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Time</h4>
                    <p>
                      {selectedAppointment.time} ({selectedAppointment.duration}{" "}
                      minutes)
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium">Appointment Type</h4>
                  <p>{selectedAppointment.type}</p>
                </div>

                {selectedAppointment.notes && (
                  <div>
                    <h4 className="text-sm font-medium">Notes</h4>
                    <p className="text-sm">{selectedAppointment.notes}</p>
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => onEditAppointment(selectedAppointment)}
                >
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onCancelAppointment(selectedAppointment.id);
                    setIsDetailsOpen(false);
                  }}
                >
                  <X className="h-4 w-4 mr-1" /> Cancel Appointment
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentCalendar;
