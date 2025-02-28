import React, { useState } from "react";
import { Calendar } from "../ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Clock,
  Calendar as CalendarIcon,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  isRecurring: boolean;
}

interface AvailabilityManagerProps {
  availableTimeSlots?: TimeSlot[];
  onSave?: (timeSlots: TimeSlot[]) => void;
  onDelete?: (timeSlotId: string) => void;
}

const AvailabilityManager = ({
  availableTimeSlots = [
    {
      id: "1",
      day: "Monday",
      startTime: "09:00",
      endTime: "12:00",
      isRecurring: true,
    },
    {
      id: "2",
      day: "Monday",
      startTime: "14:00",
      endTime: "17:00",
      isRecurring: true,
    },
    {
      id: "3",
      day: "Wednesday",
      startTime: "10:00",
      endTime: "15:00",
      isRecurring: true,
    },
    {
      id: "4",
      day: "Friday",
      startTime: "09:00",
      endTime: "13:00",
      isRecurring: false,
    },
  ],
  onSave = () => {},
  onDelete = () => {},
}: AvailabilityManagerProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(availableTimeSlots);
  const [isAddingTimeSlot, setIsAddingTimeSlot] = useState(false);
  const [newTimeSlot, setNewTimeSlot] = useState<Partial<TimeSlot>>({
    day: "Monday",
    startTime: "09:00",
    endTime: "17:00",
    isRecurring: false,
  });

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeOptions = [];
  for (let hour = 8; hour < 20; hour++) {
    for (let minute of ["00", "30"]) {
      timeOptions.push(`${hour.toString().padStart(2, "0")}:${minute}`);
    }
  }

  const handleAddTimeSlot = () => {
    if (newTimeSlot.day && newTimeSlot.startTime && newTimeSlot.endTime) {
      const newSlot: TimeSlot = {
        id: Date.now().toString(),
        day: newTimeSlot.day,
        startTime: newTimeSlot.startTime,
        endTime: newTimeSlot.endTime,
        isRecurring: newTimeSlot.isRecurring || false,
      };
      setTimeSlots([...timeSlots, newSlot]);
      setIsAddingTimeSlot(false);
      setNewTimeSlot({
        day: "Monday",
        startTime: "09:00",
        endTime: "17:00",
        isRecurring: false,
      });
      onSave([...timeSlots, newSlot]);
    }
  };

  const handleDeleteTimeSlot = (id: string) => {
    const updatedTimeSlots = timeSlots.filter((slot) => slot.id !== id);
    setTimeSlots(updatedTimeSlots);
    onDelete(id);
    onSave(updatedTimeSlots);
  };

  return (
    <div className="w-full h-full bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Availability Manager</h1>

        <Tabs defaultValue="weekly">
          <TabsList className="mb-6">
            <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="blocked">Blocked Time</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Weekly Availability</h2>
              <Button onClick={() => setIsAddingTimeSlot(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Time Slot
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timeSlots.map((slot) => (
                <Card key={slot.id} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{slot.day}</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTimeSlot(slot.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {slot.startTime} - {slot.endTime}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`recurring-${slot.id}`}
                        checked={slot.isRecurring}
                        disabled
                      />
                      <label
                        htmlFor={`recurring-${slot.id}`}
                        className="text-sm"
                      >
                        Recurring weekly
                      </label>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date</CardTitle>
                    <CardDescription>
                      Choose a date to set your availability
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="md:w-1/2">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Time Slots for {date?.toLocaleDateString()}
                    </CardTitle>
                    <CardDescription>
                      Manage your availability for the selected date
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>9:00 AM - 12:00 PM</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" /> Block
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>1:00 PM - 5:00 PM</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" /> Block
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="blocked">
            <Card>
              <CardHeader>
                <CardTitle>Blocked Time Periods</CardTitle>
                <CardDescription>
                  Manage your unavailable time slots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <h3 className="font-medium">Vacation</h3>
                      <p className="text-sm text-gray-500">
                        July 15, 2023 - July 30, 2023
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <h3 className="font-medium">Conference</h3>
                      <p className="text-sm text-gray-500">
                        August 10, 2023 - August 12, 2023
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" /> Add Blocked Period
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={isAddingTimeSlot} onOpenChange={setIsAddingTimeSlot}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Time Slot</DialogTitle>
              <DialogDescription>
                Create a new time slot for your availability schedule.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="day" className="text-right">
                  Day
                </label>
                <Select
                  value={newTimeSlot.day}
                  onValueChange={(value) =>
                    setNewTimeSlot({ ...newTimeSlot, day: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekdays.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="startTime" className="text-right">
                  Start Time
                </label>
                <Select
                  value={newTimeSlot.startTime}
                  onValueChange={(value) =>
                    setNewTimeSlot({ ...newTimeSlot, startTime: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select start time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={`start-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="endTime" className="text-right">
                  End Time
                </label>
                <Select
                  value={newTimeSlot.endTime}
                  onValueChange={(value) =>
                    setNewTimeSlot({ ...newTimeSlot, endTime: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select end time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((time) => (
                      <SelectItem key={`end-${time}`} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="recurring" className="text-right">
                  Recurring
                </label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="recurring"
                    checked={newTimeSlot.isRecurring}
                    onCheckedChange={(checked) =>
                      setNewTimeSlot({ ...newTimeSlot, isRecurring: checked })
                    }
                  />
                  <label htmlFor="recurring" className="text-sm">
                    Repeat weekly
                  </label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddingTimeSlot(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddTimeSlot}>Add Time Slot</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AvailabilityManager;
