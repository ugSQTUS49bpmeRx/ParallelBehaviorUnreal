import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  Building2,
  FileText,
  DollarSign,
  Calendar,
  ClipboardList,
  Clock,
  FileSearch,
  CreditCard,
  UserCog,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  userType?: "admin" | "doctor" | "patient";
  userName?: string;
  userAvatar?: string;
}

const Sidebar = ({
  userType = "admin",
  userName = "Dr. Jane Smith",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=healthcare",
}: SidebarProps) => {
  // Define navigation items based on user type
  const getNavItems = () => {
    switch (userType) {
      case "admin":
        return [
          { icon: <Home size={20} />, label: "Dashboard", path: "/admin" },
          {
            icon: <Users size={20} />,
            label: "Staff Management",
            path: "/admin/staff",
          },
          {
            icon: <Building2 size={20} />,
            label: "Multi-Clinic Management",
            path: "/admin/clinics",
          },
          {
            icon: <FileText size={20} />,
            label: "Reports",
            path: "/admin/reports",
          },
          {
            icon: <DollarSign size={20} />,
            label: "Financial Overview",
            path: "/admin/finance",
          },
        ];
      case "doctor":
        return [
          { icon: <Home size={20} />, label: "Dashboard", path: "/doctor" },
          {
            icon: <Calendar size={20} />,
            label: "Appointments",
            path: "/doctor/appointments",
          },
          {
            icon: <ClipboardList size={20} />,
            label: "Patient Records",
            path: "/doctor/patients",
          },
          {
            icon: <Clock size={20} />,
            label: "Availability",
            path: "/doctor/availability",
          },
        ];
      case "patient":
        return [
          { icon: <Home size={20} />, label: "Dashboard", path: "/patient" },
          {
            icon: <Calendar size={20} />,
            label: "Book Appointment",
            path: "/patient/book",
          },
          {
            icon: <FileSearch size={20} />,
            label: "Medical Records",
            path: "/patient/records",
          },
          {
            icon: <CreditCard size={20} />,
            label: "Billing & Payments",
            path: "/patient/billing",
          },
          {
            icon: <UserCog size={20} />,
            label: "Profile Settings",
            path: "/patient/profile",
          },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* User profile section */}
      <div className="p-6 flex flex-col items-center">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="font-medium text-lg">{userName}</h3>
        <p className="text-sm text-gray-500 capitalize">{userType}</p>
      </div>

      <Separator />

      {/* Navigation links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <span className="text-primary">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer with logout */}
      <div className="p-4 mt-auto">
        <Separator className="mb-4" />
        <Button
          variant="outline"
          className="w-full flex items-center gap-2"
          size="sm"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
