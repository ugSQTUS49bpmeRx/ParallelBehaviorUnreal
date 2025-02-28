// This file contains the data for all dynamic pages in the application

export const pageData = [
  {
    id: "home",
    title: "Healthcare Management Platform",
    description: "A comprehensive clinic management solution",
    metaTags: {
      title: "Healthcare Management Platform - Home",
      description:
        "A comprehensive clinic management solution that streamlines healthcare operations",
      keywords:
        "healthcare, clinic management, patient records, appointments, billing",
    },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Integrated Clinic Management Platform",
        subtitle:
          "Streamline your healthcare operations with our intuitive interface",
        content:
          "<p class='text-lg'>A comprehensive solution for administrators, doctors, and patients.</p>",
      },
      {
        id: "features",
        type: "features",
        title: "Key Features",
        subtitle: "Everything you need to manage your healthcare facility",
        items: [
          {
            id: "dashboard",
            title: "Dashboard Overview",
            description:
              "Clean, organized display of key clinic metrics with sections for digital patient records, appointment booking, billing, reports, and multi-clinic management",
            icon: "📊",
          },
          {
            id: "checklist",
            title: "Checklist Interface",
            description:
              "Visual confirmation of available features with green checkmarks for easy feature identification",
            icon: "✅",
          },
          {
            id: "appointments",
            title: "Appointment Scheduling",
            description:
              "Integrated calendar system allowing patients to book appointments online while giving staff tools to manage availability",
            icon: "📅",
          },
          {
            id: "records",
            title: "Patient Records System",
            description:
              "Secure, HIPAA-compliant digital storage for patient information with easy search and retrieval",
            icon: "🔒",
          },
          {
            id: "financial",
            title: "Financial Tools",
            description:
              "Automated billing, payment processing, and financial reporting capabilities",
            icon: "💰",
          },
          {
            id: "laboratory",
            title: "Laboratory Management",
            description:
              "Comprehensive laboratory test management, results tracking, and integration with patient records",
            icon: "🧪",
          },
        ],
      },
      {
        id: "demo-components",
        type: "component",
        title: "Interactive Demo",
        subtitle: "Try out some of our features",
        componentName: "AppointmentSimulator",
      },
      {
        id: "cta",
        type: "cta",
        title: "Ready to transform your healthcare practice?",
        subtitle: "Get started today and experience the difference",
        items: [
          {
            id: "signup",
            title: "Sign Up Now",
            link: "/signup",
          },
          {
            id: "demo",
            title: "Request Demo",
            link: "/request-demo",
          },
        ],
      },
    ],
  },
  {
    id: "laboratory-management",
    title: "Laboratory Management System",
    description:
      "Comprehensive laboratory test management and results tracking",
    metaTags: {
      title: "Laboratory Management System - Healthcare Platform",
      description:
        "Streamline your laboratory operations with our comprehensive management system",
      keywords: "laboratory management, test results, medical lab, healthcare",
    },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Laboratory Management System",
        subtitle:
          "Streamline your laboratory operations and integrate with patient records",
        background: "bg-gradient-to-r from-purple-500/20 to-blue-500/20",
      },
      {
        id: "features",
        type: "features",
        title: "Key Features",
        subtitle: "Everything you need to manage your laboratory efficiently",
        items: [
          {
            id: "test-management",
            title: "Test Management",
            description:
              "Define and manage all types of laboratory tests with customizable parameters and reference ranges",
            icon: "🧪",
          },
          {
            id: "sample-tracking",
            title: "Sample Tracking",
            description:
              "Track samples from collection to results with barcode integration and chain of custody",
            icon: "📋",
          },
          {
            id: "result-reporting",
            title: "Result Reporting",
            description:
              "Generate comprehensive reports in multiple formats with automatic flagging of abnormal results",
            icon: "📊",
          },
          {
            id: "integration",
            title: "EMR Integration",
            description:
              "Seamless integration with patient records for a complete medical history view",
            icon: "🔄",
          },
        ],
      },
      {
        id: "lab-component",
        type: "component",
        componentName: "LaboratoryManager",
      },
      {
        id: "benefits",
        type: "cards",
        title: "Benefits of Our Laboratory System",
        items: [
          {
            id: "efficiency",
            title: "Increased Efficiency",
            description:
              "Reduce manual work and streamline processes to handle more tests with the same resources",
            image:
              "https://images.unsplash.com/photo-1581093458791-9d15482442f5?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "accuracy",
            title: "Improved Accuracy",
            description:
              "Minimize human error with automated calculations and result validation",
            image:
              "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "compliance",
            title: "Regulatory Compliance",
            description:
              "Stay compliant with healthcare regulations including HIPAA and laboratory-specific standards",
            image:
              "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
          },
        ],
      },
      {
        id: "cta",
        type: "cta",
        title: "Ready to transform your laboratory operations?",
        subtitle: "Get started today and experience the difference",
        items: [
          {
            id: "contact",
            title: "Contact Us",
            link: "/contact",
          },
        ],
      },
    ],
  },
  {
    id: "hipaa-compliance",
    title: "HIPAA Compliance Information",
    description:
      "Essential information about HIPAA compliance for healthcare providers",
    metaTags: {
      title: "HIPAA Compliance Information - Healthcare Platform",
      description:
        "Learn about HIPAA compliance requirements and how our platform helps you stay compliant",
      keywords:
        "HIPAA, compliance, healthcare regulations, patient privacy, data security",
    },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "HIPAA Compliance Information",
        subtitle:
          "Understanding and implementing healthcare privacy regulations",
        background: "bg-gradient-to-r from-blue-500/20 to-green-500/20",
      },
      {
        id: "intro",
        type: "content",
        content: `<p>The Health Insurance Portability and Accountability Act (HIPAA) is a federal law that sets standards for protecting sensitive patient health information from being disclosed without the patient's consent or knowledge.</p>
        <p>As a healthcare provider, understanding and implementing HIPAA requirements is essential for both legal compliance and maintaining patient trust.</p>`,
      },
      {
        id: "hipaa-component",
        type: "component",
        componentName: "HIPAAComplianceInfo",
      },
      {
        id: "implementation",
        type: "features",
        title: "How Our Platform Helps With HIPAA Compliance",
        items: [
          {
            id: "security",
            title: "End-to-End Encryption",
            description:
              "All patient data is encrypted both in transit and at rest using industry-standard encryption protocols",
            icon: "🔒",
          },
          {
            id: "access-control",
            title: "Role-Based Access Controls",
            description:
              "Granular permission settings ensure staff members can only access the information they need",
            icon: "👥",
          },
          {
            id: "audit",
            title: "Comprehensive Audit Trails",
            description:
              "Every action in the system is logged with user information, timestamp, and action details",
            icon: "📝",
          },
          {
            id: "backups",
            title: "Secure Backups",
            description:
              "Automated, encrypted backups ensure data can be recovered without compromising security",
            icon: "💾",
          },
        ],
      },
      {
        id: "agreement",
        type: "component",
        title: "User Agreement",
        subtitle: "Review our HIPAA-compliant user agreement",
        componentName: "UserAgreement",
      },
    ],
  },
  {
    id: "multi-clinic-management",
    title: "Multi-Clinic Management",
    description:
      "Efficiently manage multiple clinic locations from a single dashboard",
    metaTags: {
      title: "Multi-Clinic Management - Healthcare Platform",
      description:
        "Centralized management solution for healthcare organizations with multiple locations",
      keywords:
        "multi-clinic, healthcare management, clinic chain, centralized administration",
    },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Multi-Clinic Management",
        subtitle: "Centralized control for distributed healthcare operations",
        background: "bg-gradient-to-r from-indigo-500/20 to-purple-500/20",
      },
      {
        id: "features",
        type: "features",
        title: "Key Features",
        subtitle: "Powerful tools for managing multiple locations",
        items: [
          {
            id: "centralized",
            title: "Centralized Dashboard",
            description:
              "View key metrics across all locations in a single, unified interface",
            icon: "📊",
          },
          {
            id: "standardization",
            title: "Standardized Protocols",
            description:
              "Implement consistent procedures and protocols across all clinic locations",
            icon: "📋",
          },
          {
            id: "resource",
            title: "Resource Allocation",
            description:
              "Optimize staff scheduling and resource distribution based on demand patterns",
            icon: "👥",
          },
          {
            id: "comparative",
            title: "Comparative Analytics",
            description:
              "Compare performance metrics between locations to identify best practices and areas for improvement",
            icon: "📈",
          },
        ],
      },
      {
        id: "dashboard",
        type: "component",
        componentName: "MultiClinicDashboard",
      },
      {
        id: "benefits",
        type: "cards",
        title: "Benefits of Centralized Management",
        background: "bg-gray-50",
        items: [
          {
            id: "efficiency",
            title: "Operational Efficiency",
            description:
              "Streamline administrative tasks and reduce duplication of efforts across locations",
            image:
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "consistency",
            title: "Consistent Patient Experience",
            description:
              "Ensure patients receive the same high-quality care regardless of which location they visit",
            image:
              "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "insights",
            title: "Data-Driven Insights",
            description:
              "Gain valuable insights from cross-location data analysis to inform strategic decisions",
            image:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
          },
        ],
      },
      {
        id: "cta",
        type: "cta",
        title: "Ready to unify your clinic network?",
        subtitle: "Get started with our multi-clinic management solution",
        items: [
          {
            id: "demo",
            title: "Request Demo",
            link: "/request-demo",
          },
        ],
      },
    ],
  },
  {
    id: "remote-patient-monitoring",
    title: "Remote Patient Monitoring",
    description:
      "Monitor patients' health remotely with real-time data collection and analysis",
    metaTags: {
      title: "Remote Patient Monitoring - Healthcare Platform",
      description:
        "Advanced remote monitoring solutions for continuous patient care outside clinical settings",
      keywords:
        "remote monitoring, telehealth, patient care, chronic disease management, home healthcare",
    },
    sections: [
      {
        id: "hero",
        type: "hero",
        title: "Remote Patient Monitoring",
        subtitle:
          "Extend care beyond clinic walls with continuous health monitoring",
        background: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
      },
      {
        id: "intro",
        type: "content",
        content: `<p>Remote Patient Monitoring (RPM) uses digital technologies to collect medical and health data from patients in one location and securely transmit it to healthcare providers in a different location for assessment and recommendations.</p>
        <p>Our RPM solution enables healthcare providers to monitor patients with chronic conditions, post-surgical recovery, or those requiring regular vital sign checks without requiring frequent in-person visits.</p>`,
      },
      {
        id: "features",
        type: "features",
        title: "Key Features",
        subtitle: "Comprehensive tools for effective remote monitoring",
        items: [
          {
            id: "vital-tracking",
            title: "Real-time Vital Tracking",
            description:
              "Monitor blood pressure, heart rate, blood glucose, weight, and other vital signs with automated alerts for abnormal readings",
            icon: "❤️",
          },
          {
            id: "medication",
            title: "Medication Adherence",
            description:
              "Track patient medication compliance and send reminders to improve treatment effectiveness",
            icon: "💊",
          },
          {
            id: "integration",
            title: "Device Integration",
            description:
              "Compatible with a wide range of FDA-approved monitoring devices for seamless data collection",
            icon: "📱",
          },
          {
            id: "telehealth",
            title: "Integrated Telehealth",
            description:
              "Initiate video consultations directly from the monitoring interface when intervention is needed",
            icon: "📹",
          },
        ],
      },
      {
        id: "monitoring-component",
        type: "component",
        componentName: "PatientMonitoring",
      },
      {
        id: "benefits",
        type: "cards",
        title: "Benefits of Remote Monitoring",
        background: "bg-gray-50",
        items: [
          {
            id: "early-intervention",
            title: "Early Intervention",
            description:
              "Detect health deterioration early, allowing for timely medical intervention before conditions worsen",
            image:
              "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "reduced-readmissions",
            title: "Reduced Hospital Readmissions",
            description:
              "Lower readmission rates by identifying and addressing issues before they require hospitalization",
            image:
              "https://images.unsplash.com/photo-1519494140681-8b17d830a3e9?q=80&w=600&auto=format&fit=crop",
          },
          {
            id: "patient-engagement",
            title: "Increased Patient Engagement",
            description:
              "Empower patients to take an active role in managing their health with real-time feedback and education",
            image:
              "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
          },
        ],
      },
      {
        id: "cta",
        type: "cta",
        title: "Transform your approach to patient care",
        subtitle: "Implement remote monitoring for better outcomes",
        items: [
          {
            id: "learn-more",
            title: "Learn More",
            link: "/contact",
          },
        ],
      },
    ],
  },
];
