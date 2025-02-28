import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Clock, Calendar } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendDirection = "neutral",
  color = "bg-blue-500",
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div
              className={`${color} bg-opacity-10 p-3 rounded-full mr-4 flex items-center justify-center`}
            >
              {icon}
            </div>
            <div>
              <div className="text-2xl font-bold">{value}</div>
              {trend && (
                <p
                  className={`text-xs ${trendDirection === "up" ? "text-green-500" : trendDirection === "down" ? "text-red-500" : "text-gray-500"}`}
                >
                  {trend}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

interface RealTimeMetricsProps {
  refreshInterval?: number; // in milliseconds
  className?: string;
}

const RealTimeMetrics: React.FC<RealTimeMetricsProps> = ({
  refreshInterval = 5000,
  className,
}) => {
  // Initial mock data
  const [metrics, setMetrics] = useState({
    patientsWaiting: 12,
    avgWaitTime: 18, // in minutes
    appointmentsToday: 45,
    completedAppointments: 23,
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate random fluctuations in metrics
      setMetrics({
        patientsWaiting: Math.max(
          0,
          metrics.patientsWaiting + Math.floor(Math.random() * 3) - 1,
        ),
        avgWaitTime: Math.max(
          5,
          metrics.avgWaitTime + Math.floor(Math.random() * 5) - 2,
        ),
        appointmentsToday: metrics.appointmentsToday,
        completedAppointments: Math.min(
          metrics.appointmentsToday,
          metrics.completedAppointments + Math.floor(Math.random() * 2),
        ),
      });
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [metrics, refreshInterval]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Activity className="mr-2 h-5 w-5 text-blue-500" />
        Real-Time Clinic Metrics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Patients Waiting"
          value={metrics.patientsWaiting}
          icon={<Users className="h-5 w-5 text-blue-500" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Average Wait Time"
          value={`${metrics.avgWaitTime} min`}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          trend={metrics.avgWaitTime > 20 ? "Above target" : "Within target"}
          trendDirection={metrics.avgWaitTime > 20 ? "down" : "up"}
          color="bg-amber-500"
        />
        <MetricCard
          title="Today's Appointments"
          value={metrics.appointmentsToday}
          icon={<Calendar className="h-5 w-5 text-indigo-500" />}
          color="bg-indigo-500"
        />
        <MetricCard
          title="Completed Appointments"
          value={`${metrics.completedAppointments}/${metrics.appointmentsToday}`}
          icon={<Activity className="h-5 w-5 text-green-500" />}
          trend={`${Math.round(
            (metrics.completedAppointments / metrics.appointmentsToday) * 100,
          )}% complete`}
          trendDirection="up"
          color="bg-green-500"
        />
      </div>
      <motion.p
        className="text-xs text-muted-foreground mt-2 text-right"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Last updated: {new Date().toLocaleTimeString()}
      </motion.p>
    </motion.div>
  );
};

export default RealTimeMetrics;
