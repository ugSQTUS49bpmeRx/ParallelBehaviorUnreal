import React from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { pageData } from "@/data/pageData";
import { cn } from "@/lib/utils";
import { pageVariants } from "@/lib/animations";

// Define the structure of a page section
interface PageSection {
  id: string;
  type: "hero" | "content" | "cards" | "features" | "cta" | "component";
  title?: string;
  subtitle?: string;
  content?: string;
  items?: Array<{
    id: string;
    title: string;
    description: string;
    icon?: string;
    image?: string;
    link?: string;
  }>;
  background?: string;
  componentName?: string;
  componentProps?: Record<string, any>;
}

// Define the structure of a page
interface Page {
  id: string;
  title: string;
  description: string;
  sections: PageSection[];
  metaTags?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
}

interface DynamicPageProps {
  className?: string;
  pageId?: string;
}

const DynamicPage: React.FC<DynamicPageProps> = ({
  className,
  pageId: propPageId,
}) => {
  // Use the pageId from props or from URL params
  const { pageId: urlPageId } = useParams<{ pageId: string }>();
  const pageId = propPageId || urlPageId;

  // Find the page data based on the pageId
  const page = pageData.find((p) => p.id === pageId);

  // If page not found, show a 404 message
  if (!page) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-lg text-muted-foreground mb-6">
            The page you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  // Update document title and meta tags
  React.useEffect(() => {
    if (page.metaTags?.title) {
      document.title = page.metaTags.title;
    } else {
      document.title = page.title;
    }

    // Update meta description if provided
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && page.metaTags?.description) {
      metaDescription.setAttribute("content", page.metaTags.description);
    }

    // Update meta keywords if provided
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && page.metaTags?.keywords) {
      metaKeywords.setAttribute("content", page.metaTags.keywords);
    }
  }, [page]);

  // Function to dynamically render a component
  const renderDynamicComponent = (
    componentName: string,
    props: Record<string, any> = {},
  ) => {
    // Import components dynamically
    const components: Record<string, React.ComponentType<any>> = {
      // Add all components that might be used in dynamic pages
      AppointmentBooking: React.lazy(
        () => import("@/components/appointments/AppointmentBooking"),
      ),
      AppointmentCalendar: React.lazy(
        () => import("@/components/appointments/AppointmentCalendar"),
      ),
      AvailabilityManager: React.lazy(
        () => import("@/components/appointments/AvailabilityManager"),
      ),
      LoginForm: React.lazy(() => import("@/components/auth/LoginForm")),
      HIPAAComplianceInfo: React.lazy(
        () => import("@/components/auth/HIPAAComplianceInfo"),
      ),
      UserAgreement: React.lazy(
        () => import("@/components/auth/UserAgreement"),
      ),
      BillingManager: React.lazy(
        () => import("@/components/billing/BillingManager"),
      ),
      AppointmentSimulator: React.lazy(
        () => import("@/components/common/AppointmentSimulator"),
      ),
      ClinicFloorMap: React.lazy(
        () => import("@/components/common/ClinicFloorMap"),
      ),
      RealTimeMetrics: React.lazy(
        () => import("@/components/common/RealTimeMetrics"),
      ),
      AdminDashboard: React.lazy(
        () => import("@/components/dashboard/AdminDashboard"),
      ),
      ClinicMetrics: React.lazy(
        () => import("@/components/dashboard/ClinicMetrics"),
      ),
      DoctorDashboard: React.lazy(
        () => import("@/components/dashboard/DoctorDashboard"),
      ),
      FinancialOverview: React.lazy(
        () => import("@/components/dashboard/FinancialOverview"),
      ),
      MultiClinicDashboard: React.lazy(
        () => import("@/components/dashboard/MultiClinicDashboard"),
      ),
      PatientPortal: React.lazy(
        () => import("@/components/dashboard/PatientPortal"),
      ),
      ReportsGenerator: React.lazy(
        () => import("@/components/dashboard/ReportsGenerator"),
      ),
      Sidebar: React.lazy(() => import("@/components/dashboard/Sidebar")),
      PatientMonitoring: React.lazy(
        () => import("@/components/home-monitoring/PatientMonitoring"),
      ),
      LaboratoryManager: React.lazy(
        () => import("@/components/laboratory/LaboratoryManager"),
      ),
      MedicalRecordsViewer: React.lazy(
        () => import("@/components/patients/MedicalRecordsViewer"),
      ),
      PatientRecordsViewer: React.lazy(
        () => import("@/components/patients/PatientRecordsViewer"),
      ),
      ProfileEditor: React.lazy(
        () => import("@/components/patients/ProfileEditor"),
      ),
    };

    const Component = components[componentName];
    if (!Component) {
      console.error(`Component ${componentName} not found`);
      return <div>Component not found: {componentName}</div>;
    }

    return (
      <React.Suspense
        fallback={<div className="p-4">Loading component...</div>}
      >
        <Component {...props} />
      </React.Suspense>
    );
  };

  // Render a section based on its type
  const renderSection = (section: PageSection) => {
    switch (section.type) {
      case "hero":
        return (
          <section
            key={section.id}
            className={cn(
              "py-16 px-4 text-center",
              section.background ||
                "bg-gradient-to-r from-primary/20 to-primary/10",
            )}
          >
            <div className="max-w-4xl mx-auto">
              {section.title && (
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {section.title}
                </h1>
              )}
              {section.subtitle && (
                <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                  {section.subtitle}
                </p>
              )}
              {section.content && (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
            </div>
          </section>
        );

      case "content":
        return (
          <section
            key={section.id}
            className={cn("py-12 px-4", section.background || "bg-white")}
          >
            <div className="max-w-4xl mx-auto">
              {section.title && (
                <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              )}
              {section.subtitle && (
                <p className="text-xl text-muted-foreground mb-6">
                  {section.subtitle}
                </p>
              )}
              {section.content && (
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
            </div>
          </section>
        );

      case "cards":
        return (
          <section
            key={section.id}
            className={cn("py-12 px-4", section.background || "bg-gray-50")}
          >
            <div className="max-w-6xl mx-auto">
              {section.title && (
                <h2 className="text-3xl font-bold mb-4 text-center">
                  {section.title}
                </h2>
              )}
              {section.subtitle && (
                <p className="text-xl text-muted-foreground mb-8 text-center">
                  {section.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items?.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.icon && (
                      <div className="text-primary mb-4">
                        <span className="text-3xl">{item.icon}</span>
                      </div>
                    )}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-40 object-cover rounded-md mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        className="inline-block mt-4 text-primary hover:underline"
                      >
                        Learn more →
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );

      case "features":
        return (
          <section
            key={section.id}
            className={cn("py-12 px-4", section.background || "bg-white")}
          >
            <div className="max-w-6xl mx-auto">
              {section.title && (
                <h2 className="text-3xl font-bold mb-4 text-center">
                  {section.title}
                </h2>
              )}
              {section.subtitle && (
                <p className="text-xl text-muted-foreground mb-8 text-center">
                  {section.subtitle}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {section.items?.map((item) => (
                  <div key={item.id} className="flex items-start">
                    {item.icon && (
                      <div className="bg-primary/10 p-3 rounded-full mr-4">
                        <span className="text-primary text-xl">
                          {item.icon}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case "cta":
        return (
          <section
            key={section.id}
            className={cn(
              "py-16 px-4 text-center",
              section.background || "bg-primary text-primary-foreground",
            )}
          >
            <div className="max-w-4xl mx-auto">
              {section.title && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {section.title}
                </h2>
              )}
              {section.subtitle && (
                <p className="text-xl mb-8">{section.subtitle}</p>
              )}
              {section.content && (
                <div
                  className="prose prose-lg max-w-none prose-invert mb-8"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
              {section.items && section.items.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4">
                  {section.items.map((item) => (
                    <a
                      key={item.id}
                      href={item.link}
                      className="inline-block bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </section>
        );

      case "component":
        if (!section.componentName) return null;
        return (
          <section
            key={section.id}
            className={cn("py-8 px-4", section.background || "bg-white")}
          >
            <div className="max-w-6xl mx-auto">
              {section.title && (
                <h2 className="text-3xl font-bold mb-4 text-center">
                  {section.title}
                </h2>
              )}
              {section.subtitle && (
                <p className="text-xl text-muted-foreground mb-8 text-center">
                  {section.subtitle}
                </p>
              )}
              {renderDynamicComponent(
                section.componentName,
                section.componentProps,
              )}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className={cn("min-h-screen", className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {page.sections.map(renderSection)}
    </motion.div>
  );
};

export default DynamicPage;
