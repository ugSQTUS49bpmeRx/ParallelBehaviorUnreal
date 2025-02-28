import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Check,
  Clock,
  User,
  Phone,
  Mail,
  CalendarDays,
} from "lucide-react";
import { useChatbot } from "@/components/ui/chatbot-provider";

interface AppointmentSimulatorProps {
  className?: string;
}

const AppointmentSimulator: React.FC<AppointmentSimulatorProps> = ({
  className,
}) => {
  const { setContextData } = useChatbot();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [doctor, setDoctor] = useState("");
  const [reason, setReason] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [step, setStep] = useState(1);

  // Mock data
  const doctors = [
    { id: "1", name: "د. سارة أحمد", specialty: "طب عام" },
    { id: "2", name: "د. محمد خالد", specialty: "أمراض باطنية" },
    { id: "3", name: "د. فاطمة علي", specialty: "أطفال" },
    { id: "4", name: "د. أحمد حسن", specialty: "جلدية" },
  ];

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
  ];

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setDoctor("");
    setReason("");
    setDate(undefined);
    setTimeSlot("");
    setStep(1);
    setIsSuccess(false);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Update chatbot context with appointment details
      setContextData({
        appointment: {
          name,
          doctor: doctors.find((d) => d.id === doctor)?.name,
          date: date ? date.toLocaleDateString() : "",
          time: timeSlot,
          reason,
        },
      });
    }, 1500);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarDays className="mr-2 h-5 w-5 text-blue-500" />
              حجز موعد جديد
            </CardTitle>
            <CardDescription>
              جرب نظام حجز المواعيد الخاص بنا بشكل تفاعلي
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              يمكنك تجربة نظام حجز المواعيد الخاص بنا من خلال النقر على الزر
              أدناه. سيتم توجيهك خلال عملية حجز موعد جديد خطوة بخطوة.
            </p>
          </CardContent>
          <CardFooter>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full"
                >
                  <Button className="w-full">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    حجز موعد جديد
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <AnimatePresence mode="wait">
                  <DialogHeader>
                    <DialogTitle>
                      {isSuccess ? "تم حجز الموعد بنجاح" : "حجز موعد جديد"}
                    </DialogTitle>
                    <DialogDescription>
                      {isSuccess
                        ? "تم تأكيد موعدك وسيتم إرسال تفاصيل الموعد إلى بريدك الإلكتروني."
                        : "يرجى إدخال المعلومات المطلوبة لحجز موعدك."}
                    </DialogDescription>
                  </DialogHeader>

                  {!isSuccess ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="space-y-4">
                        {/* Step indicator */}
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-gray-200"}`}
                          >
                            <User size={16} />
                          </div>
                          <div
                            className={`h-1 flex-1 mx-2 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}
                          ></div>
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-gray-200"}`}
                          >
                            <CalendarIcon size={16} />
                          </div>
                          <div
                            className={`h-1 flex-1 mx-2 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}
                          ></div>
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-gray-200"}`}
                          >
                            <Clock size={16} />
                          </div>
                        </div>

                        {step === 1 && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">الاسم الكامل</Label>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="name"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  className="pl-10"
                                  placeholder="أدخل اسمك الكامل"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">رقم الهاتف</Label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="phone"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="pl-10"
                                  placeholder="أدخل رقم هاتفك"
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">البريد الإلكتروني</Label>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  id="email"
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  className="pl-10"
                                  placeholder="أدخل بريدك الإلكتروني"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {step === 2 && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="doctor">اختر الطبيب</Label>
                              <Select value={doctor} onValueChange={setDoctor}>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر الطبيب" />
                                </SelectTrigger>
                                <SelectContent>
                                  {doctors.map((doc) => (
                                    <SelectItem key={doc.id} value={doc.id}>
                                      {doc.name} - {doc.specialty}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="reason">سبب الزيارة</Label>
                              <Select value={reason} onValueChange={setReason}>
                                <SelectTrigger>
                                  <SelectValue placeholder="اختر سبب الزيارة" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="consultation">
                                    استشارة طبية
                                  </SelectItem>
                                  <SelectItem value="followup">
                                    متابعة
                                  </SelectItem>
                                  <SelectItem value="checkup">
                                    فحص دوري
                                  </SelectItem>
                                  <SelectItem value="emergency">
                                    حالة طارئة
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label>اختر التاريخ</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !date && "text-muted-foreground",
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? (
                                      format(date, "PPP")
                                    ) : (
                                      <span>اختر تاريخ</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={[{ before: new Date() }]}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>اختر وقت الموعد</Label>
                              <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((slot) => (
                                  <Button
                                    key={slot}
                                    type="button"
                                    variant={
                                      timeSlot === slot ? "default" : "outline"
                                    }
                                    className="text-sm"
                                    onClick={() => setTimeSlot(slot)}
                                  >
                                    {slot}
                                  </Button>
                                ))}
                              </div>
                            </div>

                            {timeSlot && (
                              <div className="mt-6 p-4 border rounded-md bg-muted/50">
                                <h4 className="font-medium mb-2">
                                  ملخص الموعد:
                                </h4>
                                <ul className="space-y-1 text-sm">
                                  <li className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      الاسم:
                                    </span>
                                    <span>{name}</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      الطبيب:
                                    </span>
                                    <span>
                                      {
                                        doctors.find((d) => d.id === doctor)
                                          ?.name
                                      }
                                    </span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      التاريخ:
                                    </span>
                                    <span>
                                      {date ? format(date, "PPP") : ""}
                                    </span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      الوقت:
                                    </span>
                                    <span>{timeSlot}</span>
                                  </li>
                                  <li className="flex justify-between">
                                    <span className="text-muted-foreground">
                                      سبب الزيارة:
                                    </span>
                                    <span>
                                      {reason === "consultation"
                                        ? "استشارة طبية"
                                        : reason === "followup"
                                          ? "متابعة"
                                          : reason === "checkup"
                                            ? "فحص دوري"
                                            : "حالة طارئة"}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        <DialogFooter className="flex justify-between">
                          {step > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              onClick={prevStep}
                            >
                              السابق
                            </Button>
                          )}
                          <div>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={handleClose}
                              className="mr-2"
                            >
                              إلغاء
                            </Button>
                            {step < 3 ? (
                              <Button
                                type="button"
                                onClick={nextStep}
                                disabled={
                                  (step === 1 && (!name || !phone || !email)) ||
                                  (step === 2 && (!doctor || !reason || !date))
                                }
                              >
                                التالي
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting || !timeSlot}
                              >
                                {isSubmitting ? "جاري الحجز..." : "تأكيد الحجز"}
                              </Button>
                            )}
                          </div>
                        </DialogFooter>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="py-6 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                          <Check className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-medium mb-2">
                          تم حجز موعدك بنجاح!
                        </h3>
                        <p className="text-center text-muted-foreground mb-6">
                          سيتم إرسال تأكيد إلى بريدك الإلكتروني {email} مع
                          تفاصيل الموعد.
                        </p>
                        <div className="p-4 border rounded-md bg-muted/50 w-full">
                          <h4 className="font-medium mb-2">تفاصيل الموعد:</h4>
                          <ul className="space-y-1 text-sm">
                            <li className="flex justify-between">
                              <span className="text-muted-foreground">
                                الطبيب:
                              </span>
                              <span>
                                {doctors.find((d) => d.id === doctor)?.name}
                              </span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-muted-foreground">
                                التاريخ:
                              </span>
                              <span>{date ? format(date, "PPP") : ""}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-muted-foreground">
                                الوقت:
                              </span>
                              <span>{timeSlot}</span>
                            </li>
                            <li className="flex justify-between">
                              <span className="text-muted-foreground">
                                رقم التأكيد:
                              </span>
                              <span className="font-medium">
                                #
                                {Math.floor(Math.random() * 1000000)
                                  .toString()
                                  .padStart(6, "0")}
                              </span>
                            </li>
                          </ul>
                        </div>
                        <DialogFooter className="w-full mt-6">
                          <Button onClick={handleClose} className="w-full">
                            إغلاق
                          </Button>
                        </DialogFooter>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AppointmentSimulator;
