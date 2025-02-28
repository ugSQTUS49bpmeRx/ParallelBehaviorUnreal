import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ClinicMetrics from "./ClinicMetrics";
import MultiClinicManager from "./MultiClinicManager";
import ReportsGenerator from "./ReportsGenerator";
import FinancialOverview from "./FinancialOverview";

interface AdminDashboardProps {
  userName?: string;
  userAvatar?: string;
}

const AdminDashboard = ({
  userName = "Admin User",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
}: AdminDashboardProps) => {
  const [activeSection, setActiveSection] = useState<string>("metrics");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "metrics":
        return <ClinicMetrics />;
      case "clinics":
        return <MultiClinicManager />;
      case "reports":
        return <ReportsGenerator />;
      case "finance":
        return <FinancialOverview />;
      default:
        return <ClinicMetrics />;
    }
  };

  // Custom navigation handler for the sidebar
  const handleNavigation = (path: string) => {
    // Extract the section from the path
    const section = path.split("/").pop() || "metrics";
    setActiveSection(section);
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar userType="admin" userName={userName} userAvatar={userAvatar} />
      <div className="flex-1 overflow-auto">{renderActiveSection()}</div>
    </div>
  );
};

export default AdminDashboard;
