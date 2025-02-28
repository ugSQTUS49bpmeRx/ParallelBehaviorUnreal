import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreditCard,
  DollarSign,
  FileText,
  History,
  Plus,
  Receipt,
  Search,
} from "lucide-react";

interface Bill {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
}

interface Payment {
  id: string;
  date: string;
  method: string;
  amount: number;
  reference: string;
}

interface BillingManagerProps {
  bills?: Bill[];
  payments?: Payment[];
  onPayBill?: (billId: string) => void;
  onMakePayment?: (amount: number, method: string) => void;
}

const BillingManager = ({
  bills = [
    {
      id: "B001",
      date: "2023-05-15",
      description: "General Consultation",
      amount: 120,
      status: "pending",
    },
    {
      id: "B002",
      date: "2023-04-28",
      description: "Blood Test",
      amount: 85,
      status: "paid",
    },
    {
      id: "B003",
      date: "2023-06-02",
      description: "X-Ray Scan",
      amount: 250,
      status: "overdue",
    },
    {
      id: "B004",
      date: "2023-05-10",
      description: "Physical Therapy",
      amount: 175,
      status: "pending",
    },
  ],
  payments = [
    {
      id: "P001",
      date: "2023-04-28",
      method: "Credit Card",
      amount: 85,
      reference: "REF-CC-001",
    },
    {
      id: "P002",
      date: "2023-03-15",
      method: "Bank Transfer",
      amount: 320,
      reference: "REF-BT-002",
    },
    {
      id: "P003",
      date: "2023-02-20",
      method: "PayPal",
      amount: 150,
      reference: "REF-PP-003",
    },
  ],
  onPayBill = () => {},
  onMakePayment = () => {},
}: BillingManagerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(true);

  const filteredBills = bills.filter(
    (bill) =>
      bill.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalOutstanding = bills
    .filter((bill) => bill.status !== "paid")
    .reduce((sum, bill) => sum + bill.amount, 0);

  const handlePayBill = (billId: string) => {
    onPayBill(billId);
  };

  const handleMakePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (!isNaN(amount) && amount > 0) {
      onMakePayment(amount, paymentMethod);
      setPaymentAmount("");
      setIsPaymentDialogOpen(false);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Billing & Payments</h1>
        <p className="text-gray-500">
          Manage your bills, make payments, and view payment history
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Receipt className="mr-2 h-5 w-5" />
              Outstanding Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${totalOutstanding.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">
              {bills.filter((b) => b.status !== "paid").length} unpaid bills
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <History className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{payments.length}</p>
            <p className="text-sm text-gray-500 mt-1">
              Payments in last 90 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Dialog
              open={isPaymentDialogOpen}
              onOpenChange={setIsPaymentDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="flex-1">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Make Payment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Make a Payment</DialogTitle>
                  <DialogDescription>
                    Enter payment details to process your transaction.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="amount">Amount ($)</label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="method">Payment Method</label>
                    <Select
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="bank-transfer">
                          Bank Transfer
                        </SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleMakePayment}>Process Payment</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant="outline" className="flex-1">
              <FileText className="mr-2 h-4 w-4" />
              Download Statement
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bills" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="bills">Bills</TabsTrigger>
          <TabsTrigger value="payment-history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="bills" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search bills..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-4 text-sm font-medium">
                  <div>Bill #</div>
                  <div>Date</div>
                  <div>Description</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                {filteredBills.length > 0 ? (
                  <div className="divide-y">
                    {filteredBills.map((bill) => (
                      <div
                        key={bill.id}
                        className="grid grid-cols-5 p-4 text-sm"
                      >
                        <div>{bill.id}</div>
                        <div>{bill.date}</div>
                        <div>{bill.description}</div>
                        <div>${bill.amount.toFixed(2)}</div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex h-2 w-2 rounded-full ${
                              bill.status === "paid"
                                ? "bg-green-500"
                                : bill.status === "pending"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <span className="capitalize">{bill.status}</span>
                          {bill.status !== "paid" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-2"
                              onClick={() => handlePayBill(bill.id)}
                            >
                              Pay
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-500">
                    No bills found matching your search.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-history" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="rounded-md border">
                <div className="grid grid-cols-5 bg-muted/50 p-4 text-sm font-medium">
                  <div>Payment #</div>
                  <div>Date</div>
                  <div>Method</div>
                  <div>Amount</div>
                  <div>Reference</div>
                </div>
                <div className="divide-y">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="grid grid-cols-5 p-4 text-sm"
                    >
                      <div>{payment.id}</div>
                      <div>{payment.date}</div>
                      <div className="flex items-center gap-2">
                        {payment.method === "Credit Card" && (
                          <CreditCard className="h-4 w-4" />
                        )}
                        {payment.method === "Bank Transfer" && (
                          <DollarSign className="h-4 w-4" />
                        )}
                        {payment.method === "PayPal" && (
                          <DollarSign className="h-4 w-4" />
                        )}
                        {payment.method}
                      </div>
                      <div>${payment.amount.toFixed(2)}</div>
                      <div>{payment.reference}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Export Payment History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingManager;
