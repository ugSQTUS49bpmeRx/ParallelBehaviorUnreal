import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Shield,
  Lock,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";

interface UserAgreementProps {
  onAccept?: () => void;
  onDecline?: () => void;
  className?: string;
}

const UserAgreement: React.FC<UserAgreementProps> = ({
  onAccept = () => {},
  onDecline = () => {},
  className,
}) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedHIPAA, setAcceptedHIPAA] = useState(false);

  const allAccepted = acceptedTerms && acceptedPrivacy && acceptedHIPAA;

  return (
    <div className={className}>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">User Agreement</CardTitle>
          <CardDescription>
            Please review and accept the following terms to continue using the
            Healthcare Management Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="terms" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="terms">
                <FileText className="h-4 w-4 mr-2" />
                Terms of Service
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Lock className="h-4 w-4 mr-2" />
                Privacy Policy
              </TabsTrigger>
              <TabsTrigger value="hipaa">
                <Shield className="h-4 w-4 mr-2" />
                HIPAA Compliance
              </TabsTrigger>
            </TabsList>

            <TabsContent value="terms" className="mt-4 space-y-4">
              <div className="max-h-80 overflow-y-auto border rounded-md p-4 bg-muted/20">
                <h3 className="text-lg font-semibold mb-2">Terms of Service</h3>
                <p className="mb-4">
                  Welcome to the Healthcare Management Platform. By accessing or
                  using our services, you agree to be bound by these Terms of
                  Service.
                </p>

                <h4 className="font-medium mb-2">1. Acceptance of Terms</h4>
                <p className="mb-4">
                  By accessing or using the Healthcare Management Platform, you
                  acknowledge that you have read, understood, and agree to be
                  bound by these Terms of Service. If you do not agree to these
                  terms, you must not access or use our services.
                </p>

                <h4 className="font-medium mb-2">2. Description of Services</h4>
                <p className="mb-4">
                  The Healthcare Management Platform provides tools for
                  healthcare providers to manage patient information,
                  appointments, billing, and other healthcare-related
                  activities. The specific features and functionality may change
                  from time to time.
                </p>

                <h4 className="font-medium mb-2">3. User Accounts</h4>
                <p className="mb-4">
                  To access certain features of the platform, you must create a
                  user account. You are responsible for maintaining the
                  confidentiality of your account credentials and for all
                  activities that occur under your account. You agree to notify
                  us immediately of any unauthorized use of your account.
                </p>

                <h4 className="font-medium mb-2">4. User Responsibilities</h4>
                <p className="mb-4">
                  You agree to use the platform in compliance with all
                  applicable laws and regulations, including but not limited to
                  healthcare privacy laws such as HIPAA. You are responsible for
                  ensuring that your use of the platform does not violate any
                  patient's rights or privacy.
                </p>

                <h4 className="font-medium mb-2">5. Intellectual Property</h4>
                <p className="mb-4">
                  All content, features, and functionality of the platform,
                  including but not limited to text, graphics, logos, icons,
                  images, audio clips, digital downloads, data compilations, and
                  software, are the exclusive property of the Healthcare
                  Management Platform or its licensors.
                </p>

                <h4 className="font-medium mb-2">6. Limitation of Liability</h4>
                <p className="mb-4">
                  To the maximum extent permitted by law, the Healthcare
                  Management Platform shall not be liable for any indirect,
                  incidental, special, consequential, or punitive damages, or
                  any loss of profits or revenues, whether incurred directly or
                  indirectly, or any loss of data, use, goodwill, or other
                  intangible losses.
                </p>

                <h4 className="font-medium mb-2">7. Termination</h4>
                <p className="mb-4">
                  We reserve the right to terminate or suspend your account and
                  access to the platform at our sole discretion, without notice,
                  for conduct that we believe violates these Terms of Service or
                  is harmful to other users of the platform, us, or third
                  parties, or for any other reason.
                </p>

                <h4 className="font-medium mb-2">8. Changes to Terms</h4>
                <p className="mb-4">
                  We reserve the right to modify these Terms of Service at any
                  time. We will provide notice of significant changes by posting
                  the new Terms of Service on the platform and/or by sending you
                  an email. Your continued use of the platform after such
                  modifications will constitute your acknowledgment and
                  agreement to the modified terms.
                </p>

                <h4 className="font-medium mb-2">9. Governing Law</h4>
                <p className="mb-4">
                  These Terms of Service shall be governed by and construed in
                  accordance with the laws of [Jurisdiction], without regard to
                  its conflict of law provisions.
                </p>

                <h4 className="font-medium mb-2">10. Contact Information</h4>
                <p>
                  If you have any questions about these Terms of Service, please
                  contact us at support@healthcareplatform.com.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have read and agree to the Terms of Service
                </label>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="mt-4 space-y-4">
              <div className="max-h-80 overflow-y-auto border rounded-md p-4 bg-muted/20">
                <h3 className="text-lg font-semibold mb-2">Privacy Policy</h3>
                <p className="mb-4">
                  This Privacy Policy describes how the Healthcare Management
                  Platform collects, uses, and discloses your information when
                  you use our services.
                </p>

                <h4 className="font-medium mb-2">1. Information We Collect</h4>
                <p className="mb-4">
                  We collect several types of information from and about users
                  of our platform, including:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>
                    Personal information such as name, email address, and
                    professional credentials
                  </li>
                  <li>
                    Patient health information that you input into the platform
                  </li>
                  <li>Usage data about how you interact with our platform</li>
                  <li>Device and connection information</li>
                </ul>

                <h4 className="font-medium mb-2">
                  2. How We Use Your Information
                </h4>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process and complete transactions</li>
                  <li>
                    Send you technical notices, updates, security alerts, and
                    support messages
                  </li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h4 className="font-medium mb-2">
                  3. Disclosure of Your Information
                </h4>
                <p className="mb-4">We may disclose your information:</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>To comply with any court order, law, or legal process</li>
                  <li>
                    To enforce our rights arising from any contracts between you
                    and us
                  </li>
                  <li>
                    If we believe disclosure is necessary to protect the rights,
                    property, or safety of our company, our customers, or others
                  </li>
                </ul>

                <h4 className="font-medium mb-2">4. Data Security</h4>
                <p className="mb-4">
                  We implement appropriate technical and organizational measures
                  to protect the security of your personal information. However,
                  no method of transmission over the Internet or electronic
                  storage is 100% secure, and we cannot guarantee absolute
                  security.
                </p>

                <h4 className="font-medium mb-2">5. HIPAA Compliance</h4>
                <p className="mb-4">
                  As a provider of services to healthcare entities, we are
                  committed to maintaining compliance with the Health Insurance
                  Portability and Accountability Act (HIPAA). We implement all
                  required safeguards for protected health information (PHI) and
                  enter into Business Associate Agreements (BAAs) with covered
                  entities as required by law.
                </p>

                <h4 className="font-medium mb-2">6. Your Rights</h4>
                <p className="mb-4">
                  Depending on your location, you may have certain rights
                  regarding your personal information, such as the right to
                  access, correct, or delete your personal information. Please
                  contact us to exercise these rights.
                </p>

                <h4 className="font-medium mb-2">
                  7. Changes to Our Privacy Policy
                </h4>
                <p className="mb-4">
                  We may update our Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last Updated" date.
                </p>

                <h4 className="font-medium mb-2">8. Contact Information</h4>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at privacy@healthcareplatform.com.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy"
                  checked={acceptedPrivacy}
                  onCheckedChange={(checked) => setAcceptedPrivacy(!!checked)}
                />
                <label
                  htmlFor="privacy"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have read and agree to the Privacy Policy
                </label>
              </div>
            </TabsContent>

            <TabsContent value="hipaa" className="mt-4 space-y-4">
              <div className="max-h-80 overflow-y-auto border rounded-md p-4 bg-muted/20">
                <h3 className="text-lg font-semibold mb-2">
                  HIPAA Compliance Agreement
                </h3>
                <p className="mb-4">
                  This HIPAA Compliance Agreement outlines the responsibilities
                  and obligations related to the protection of Protected Health
                  Information (PHI) when using the Healthcare Management
                  Platform.
                </p>

                <div className="bg-amber-50 p-3 rounded-md border border-amber-200 mb-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-medium text-amber-800">
                        Important Notice
                      </h4>
                      <p className="text-sm text-amber-700">
                        This agreement is a legally binding document that
                        establishes your obligations regarding the protection of
                        patient health information under HIPAA regulations.
                      </p>
                    </div>
                  </div>
                </div>

                <h4 className="font-medium mb-2">1. Definitions</h4>
                <p className="mb-4">
                  <strong>Protected Health Information (PHI):</strong>{" "}
                  Individually identifiable health information that is
                  transmitted or maintained in any form or medium.
                </p>
                <p className="mb-4">
                  <strong>Covered Entity:</strong> A healthcare provider, health
                  plan, or healthcare clearinghouse that transmits health
                  information electronically.
                </p>
                <p className="mb-4">
                  <strong>Business Associate:</strong> A person or entity that
                  performs certain functions or activities that involve the use
                  or disclosure of PHI on behalf of a covered entity.
                </p>

                <h4 className="font-medium mb-2">2. User Responsibilities</h4>
                <p className="mb-4">
                  By using the Healthcare Management Platform, you agree to:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>
                    Use appropriate safeguards to prevent unauthorized use or
                    disclosure of PHI
                  </li>
                  <li>Report any unauthorized use or disclosure of PHI</li>
                  <li>
                    Ensure that any agents or subcontractors who receive PHI
                    agree to the same restrictions
                  </li>
                  <li>
                    Make PHI available for patients to access and amend as
                    required by HIPAA
                  </li>
                  <li>
                    Maintain appropriate documentation of disclosures of PHI
                  </li>
                  <li>
                    Return or destroy all PHI upon termination of service, if
                    feasible
                  </li>
                </ul>

                <h4 className="font-medium mb-2">
                  3. Platform Security Measures
                </h4>
                <p className="mb-4">
                  The Healthcare Management Platform implements the following
                  security measures to protect PHI:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>
                    End-to-end encryption for all PHI in transit and at rest
                  </li>
                  <li>
                    Role-based access controls to limit PHI access to authorized
                    users
                  </li>
                  <li>
                    Audit logging of all access to and modifications of PHI
                  </li>
                  <li>
                    Automatic session timeouts to prevent unauthorized access
                  </li>
                  <li>
                    Regular security assessments and vulnerability testing
                  </li>
                  <li>Secure backup and disaster recovery procedures</li>
                </ul>

                <h4 className="font-medium mb-2">4. Breach Notification</h4>
                <p className="mb-4">
                  In the event of a breach of unsecured PHI, the platform will:
                </p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>
                    Notify affected users without unreasonable delay and in no
                    case later than 60 days after discovery
                  </li>
                  <li>
                    Provide information about what happened, what information
                    was involved, steps individuals should take, what we are
                    doing to investigate and mitigate, and contact procedures
                  </li>
                  <li>
                    Assist covered entities in meeting their breach notification
                    obligations
                  </li>
                </ul>

                <h4 className="font-medium mb-2">5. Compliance Verification</h4>
                <p className="mb-4">
                  The Healthcare Management Platform undergoes regular
                  third-party audits to verify HIPAA compliance. Users may
                  request documentation of these audits by contacting
                  compliance@healthcareplatform.com.
                </p>

                <h4 className="font-medium mb-2">6. Contact Information</h4>
                <p>
                  For questions or concerns regarding HIPAA compliance, please
                  contact our Privacy Officer at hipaa@healthcareplatform.com.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hipaa"
                  checked={acceptedHIPAA}
                  onCheckedChange={(checked) => setAcceptedHIPAA(!!checked)}
                />
                <label
                  htmlFor="hipaa"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I have read and agree to the HIPAA Compliance Agreement
                </label>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-muted rounded-md">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <h4 className="font-medium">Important Information</h4>
                <p className="text-sm text-muted-foreground">
                  By accepting these agreements, you acknowledge your
                  responsibility to protect patient information and comply with
                  all applicable healthcare privacy laws. Failure to comply may
                  result in termination of access and potential legal
                  consequences.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onDecline}>
            Decline
          </Button>
          <Button
            onClick={onAccept}
            disabled={!allAccepted}
            className={!allAccepted ? "opacity-50 cursor-not-allowed" : ""}
          >
            {allAccepted ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> Accept All Terms
              </>
            ) : (
              "Please Accept All Terms"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserAgreement;
