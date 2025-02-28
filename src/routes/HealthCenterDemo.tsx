import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DoctorDirectory from "@/components/preview/DoctorDirectory";

const HealthCenterDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
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
              className="h-6 w-6 text-green-600"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <h1 className="text-xl font-bold text-gray-900">المركز الصحي</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#" className="text-sm font-medium hover:text-primary">
              الرئيسية
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              خدماتنا
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              الأطباء
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              المواعيد
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary">
              اتصل بنا
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button>تسجيل الدخول</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <DoctorDirectory />
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-white border-t mt-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2023 المركز الصحي. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                سياسة الخصوصية
              </Link>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                الشروط والأحكام
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthCenterDemo;
