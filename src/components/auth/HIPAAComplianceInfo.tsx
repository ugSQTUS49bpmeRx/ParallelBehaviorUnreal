import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  FileText,
  Users,
  Server,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react";

interface HIPAAComplianceInfoProps {
  className?: string;
}

const HIPAAComplianceInfo: React.FC<HIPAAComplianceInfoProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <CardTitle>HIPAA Compliance Information</CardTitle>
          </div>
          <CardDescription>
            Essential information about HIPAA compliance for healthcare
            providers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">
                <Info className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="safeguards">
                <Lock className="h-4 w-4 mr-2" />
                Safeguards
              </TabsTrigger>
              <TabsTrigger value="policies">
                <FileText className="h-4 w-4 mr-2" />
                Policies
              </TabsTrigger>
              <TabsTrigger value="checklist">
                <CheckCircle className="h-4 w-4 mr-2" />
                Compliance Checklist
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">What is HIPAA?</h3>
                <p>
                  The Health Insurance Portability and Accountability Act
                  (HIPAA) is a federal law that sets standards for protecting
                  sensitive patient health information from being disclosed
                  without the patient's consent or knowledge.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Key Components</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium">Privacy Rule:</span> Protects
                    all individually identifiable health information
                  </li>
                  <li>
                    <span className="font-medium">Security Rule:</span> Sets
                    standards for electronic protected health information (ePHI)
                  </li>
                  <li>
                    <span className="font-medium">
                      Breach Notification Rule:
                    </span>{" "}
                    Requires notification following a breach of unsecured PHI
                  </li>
                  <li>
                    <span className="font-medium">Enforcement Rule:</span>{" "}
                    Establishes penalties for violations
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Who Must Comply?</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <span className="font-medium">Covered Entities:</span>{" "}
                    Healthcare providers, health plans, and healthcare
                    clearinghouses
                  </li>
                  <li>
                    <span className="font-medium">Business Associates:</span>{" "}
                    Entities that perform services for covered entities
                    involving PHI
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="safeguards" className="mt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  Administrative Safeguards
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Security management process</li>
                  <li>Security personnel</li>
                  <li>Information access management</li>
                  <li>Workforce training and management</li>
                  <li>Evaluation of security policies</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Physical Safeguards</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Facility access controls</li>
                  <li>Workstation use and security</li>
                  <li>Device and media controls</li>
                  <li>Physical access restrictions</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Technical Safeguards</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Access controls</li>
                  <li>Audit controls</li>
                  <li>Integrity controls</li>
                  <li>Transmission security</li>
                  <li>Authentication mechanisms</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                <div className="flex items-start">
                  <Server className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-blue-800">
                      Our Implementation
                    </h4>
                    <p className="text-sm text-blue-700">
                      Our platform implements all required safeguards including
                      end-to-end encryption, role-based access controls, audit
                      logging, automatic session timeouts, and secure data
                      backups.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="policies" className="mt-4 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Required Policies</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Privacy policies and procedures</li>
                  <li>Security policies and procedures</li>
                  <li>Breach notification procedures</li>
                  <li>Business Associate Agreements (BAAs)</li>
                  <li>Notice of Privacy Practices (NPP)</li>
                  <li>Authorization forms</li>
                  <li>Minimum necessary policies</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Staff Training</h3>
                <p>
                  All staff members must receive regular HIPAA training
                  covering:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Privacy and security awareness</li>
                  <li>Proper handling of PHI</li>
                  <li>Recognition and reporting of security incidents</li>
                  <li>Password management and computer security</li>
                  <li>Mobile device and remote access policies</li>
                </ul>
              </div>

              <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-amber-800">
                      Important Note
                    </h4>
                    <p className="text-sm text-amber-700">
                      Policies must be reviewed and updated regularly to reflect
                      changes in regulations and technology. Document all policy
                      reviews and updates.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="checklist" className="mt-4 space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  HIPAA Compliance Checklist
                </h3>

                <div className="space-y-2">
                  <h4 className="font-medium">Administrative Requirements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Designated Privacy and Security Officers</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Risk analysis and management plan</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Regular staff training program</span>
                    </div>
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      <span>Sanction policy for violations</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Technical Safeguards</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Unique user identification</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Emergency access procedure</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Automatic logoff implemented</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Encryption and decryption mechanisms</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Physical Safeguards</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Facility access controls</span>
                    </div>
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      <span>Workstation use policy</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Device and media controls</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Documentation</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Notice of Privacy Practices</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Business Associate Agreements</span>
                    </div>
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      <span>Authorization forms</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-md border border-red-200">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-medium text-red-800">
                      Action Required
                    </h4>
                    <p className="text-sm text-red-700">
                      Items marked with{" "}
                      <XCircle className="h-4 w-4 text-red-500 inline" />{" "}
                      require immediate attention to ensure full HIPAA
                      compliance. Please address these items as soon as
                      possible.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Download HIPAA Guide
          </Button>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Start Compliance Review
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HIPAAComplianceInfo;
