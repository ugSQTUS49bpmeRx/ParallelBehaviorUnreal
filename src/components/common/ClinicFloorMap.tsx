import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Building2,
  Users,
  Stethoscope,
  Pill,
  Beaker,
  ClipboardList,
  Coffee,
  DoorOpen,
  X,
  Check,
} from "lucide-react";

interface Room {
  id: string;
  name: string;
  type: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number; width: number; height: number };
  color: string;
}

interface ClinicFloorMapProps {
  className?: string;
}

const ClinicFloorMap: React.FC<ClinicFloorMapProps> = ({ className }) => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Define rooms with their positions on the floor map
  const rooms: Room[] = [
    {
      id: "reception",
      name: "منطقة الاستقبال",
      type: "reception",
      description: "نقطة الاتصال الأولى للمرضى، حيث يتم تسجيل المرضى وتوجيههم",
      icon: <Users className="h-5 w-5" />,
      position: { x: 10, y: 10, width: 150, height: 100 },
      color: "bg-blue-100 border-blue-300",
    },
    {
      id: "waiting",
      name: "منطقة الانتظار",
      type: "waiting",
      description: "مساحة مريحة للمرضى للانتظار قبل المواعيد",
      icon: <Coffee className="h-5 w-5" />,
      position: { x: 170, y: 10, width: 200, height: 100 },
      color: "bg-green-100 border-green-300",
    },
    {
      id: "exam1",
      name: "غرفة الفحص 1",
      type: "examination",
      description: "غرفة فحص مجهزة بالكامل للكشف الطبي",
      icon: <Stethoscope className="h-5 w-5" />,
      position: { x: 10, y: 120, width: 100, height: 100 },
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      id: "exam2",
      name: "غرفة الفحص 2",
      type: "examination",
      description: "غرفة فحص مجهزة بالكامل للكشف الطبي",
      icon: <Stethoscope className="h-5 w-5" />,
      position: { x: 120, y: 120, width: 100, height: 100 },
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      id: "exam3",
      name: "غرفة الفحص 3",
      type: "examination",
      description: "غرفة فحص مجهزة بالكامل للكشف الطبي",
      icon: <Stethoscope className="h-5 w-5" />,
      position: { x: 230, y: 120, width: 100, height: 100 },
      color: "bg-yellow-100 border-yellow-300",
    },
    {
      id: "lab",
      name: "المختبر",
      type: "laboratory",
      description: "مرافق التشخيص والاختبار لتحليل العينات",
      icon: <Beaker className="h-5 w-5" />,
      position: { x: 10, y: 230, width: 150, height: 120 },
      color: "bg-purple-100 border-purple-300",
    },
    {
      id: "pharmacy",
      name: "الصيدلية",
      type: "pharmacy",
      description: "توزيع الأدوية والمشورة الدوائية",
      icon: <Pill className="h-5 w-5" />,
      position: { x: 170, y: 230, width: 150, height: 120 },
      color: "bg-red-100 border-red-300",
    },
    {
      id: "admin",
      name: "المكاتب الإدارية",
      type: "administrative",
      description: "مركز العمليات الإدارية والمالية",
      icon: <ClipboardList className="h-5 w-5" />,
      position: { x: 330, y: 230, width: 120, height: 120 },
      color: "bg-gray-100 border-gray-300",
    },
    {
      id: "entrance",
      name: "المدخل الرئيسي",
      type: "entrance",
      description: "المدخل الرئيسي للمركز الصحي",
      icon: <DoorOpen className="h-5 w-5" />,
      position: { x: 380, y: 10, width: 70, height: 50 },
      color: "bg-indigo-100 border-indigo-300",
    },
  ];

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsDialogOpen(true);
  };

  return (
    <div className={cn("w-full", className)}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-green-600" />
            مخطط المركز الصحي
          </CardTitle>
          <CardDescription>
            انقر على أي غرفة لعرض المزيد من المعلومات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-[400px] border rounded-md bg-gray-50">
            {/* Floor map grid lines */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
              {Array.from({ length: 12 * 6 }).map((_, i) => (
                <div key={i} className="border border-dashed border-gray-200" />
              ))}
            </div>

            {/* Rooms */}
            {rooms.map((room) => (
              <TooltipProvider key={room.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      className={cn(
                        "absolute border-2 rounded-md flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-md",
                        room.color,
                      )}
                      style={{
                        left: `${room.position.x}px`,
                        top: `${room.position.y}px`,
                        width: `${room.position.width}px`,
                        height: `${room.position.height}px`,
                      }}
                      onClick={() => handleRoomClick(room)}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay:
                          Number(room.id.replace(/[^0-9]/g, "")) * 0.1 || 0.1,
                      }}
                    >
                      <div className="flex items-center justify-center mb-1">
                        {room.icon}
                      </div>
                      <div className="text-xs font-medium text-center">
                        {room.name}
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{room.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}

            {/* Legend */}
            <div className="absolute bottom-2 right-2 bg-white p-2 rounded-md shadow-sm border text-xs">
              <div className="font-bold mb-1">مفتاح المخطط:</div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-sm mr-1"></div>
                  <span>الاستقبال</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-sm mr-1"></div>
                  <span>الانتظار</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded-sm mr-1"></div>
                  <span>غرف الفحص</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-100 border border-purple-300 rounded-sm mr-1"></div>
                  <span>المختبر</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-100 border border-red-300 rounded-sm mr-1"></div>
                  <span>الصيدلية</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded-sm mr-1"></div>
                  <span>المكاتب الإدارية</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-sm text-muted-foreground">
          يمكنك النقر على أي غرفة لعرض تفاصيل أكثر عن وظائفها وخدماتها
        </CardFooter>
      </Card>

      {/* Room Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AnimatePresence>
          {isDialogOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    {selectedRoom?.icon && (
                      <span className="mr-2">{selectedRoom.icon}</span>
                    )}
                    {selectedRoom?.name}
                  </DialogTitle>
                  <DialogDescription>
                    {selectedRoom?.description}
                  </DialogDescription>
                </DialogHeader>

                {selectedRoom && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">الخدمات المقدمة:</h4>
                      <ul className="space-y-1">
                        {selectedRoom.type === "reception" && (
                          <>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>تسجيل المرضى الجدد</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>جدولة المواعيد</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>استقبال المدفوعات</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>توجيه المرضى</span>
                            </li>
                          </>
                        )}

                        {selectedRoom.type === "waiting" && (
                          <>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>مقاعد مريحة</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>مواد تثقيفية صحية</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>نظام إدارة الانتظار</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>شاشات معلومات</span>
                            </li>
                          </>
                        )}

                        {selectedRoom.type === "examination" && (
                          <>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>فحوصات طبية شاملة</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>أجهزة طبية متخصصة</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>تشخيص الحالات</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>وصف العلاجات</span>
                            </li>
                          </>
                        )}

                        {selectedRoom.type === "laboratory" && (
                          <>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>تحليل الدم</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>اختبارات التشخيص</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>نتائج سريعة ودقيقة</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>تكامل مع السجلات الطبية</span>
                            </li>
                          </>
                        )}

                        {selectedRoom.type === "pharmacy" && (
                          <>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>صرف الوصفات الطبية</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>إدارة مخزون الأدوية</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>استشارات دوائية</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>تتبع تفاعلات الأدوية</span>
                            </li>
                          </>
                        )}

                        {selectedRoom.type === "administrative" && (
                          <>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>إدارة الموارد البشرية</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>المحاسبة والفواتير</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>إدارة المرافق</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>تخطيط الموارد</span>
                            </li>
                          </>
                        )}

                        {selectedRoom.type === "entrance" && (
                          <>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>استقبال الزوار</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>توجيه المرضى</span>
                            </li>
                            <li className="flex items-center">
                              <Check className="mr-2 h-4 w-4 text-green-500" />
                              <span>معلومات عامة</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        <X className="h-4 w-4 mr-2" />
                        إغلاق
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Dialog>
    </div>
  );
};

export default ClinicFloorMap;
