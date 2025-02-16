import React from "react";
import Summary from "../dashboard/Summary";
import ThreatStats from "../dashboard/ThreatStats";
import { Shield } from "lucide-react";
import DashboardHeader from "../layout/DashboardHeader";

const Threats = () => {
  const customData = {
    totalThreats: 50,
    highRiskThreats: 10,
    riskScore: 75,
    trendDirection: "up" as const,
    trendPercentage: 20,
  };

  const threatStatsData = {
    threats: [
      { category: "Cyberbullying", count: 12 },
      { category: "Inappropriate Content", count: 8 },
      { category: "Suspicious Contact", count: 5 },
      { category: "Privacy Concerns", count: 7 },
    ],
    timeline: [
      { date: "Mon", count: 3 },
      { date: "Tue", count: 5 },
      { date: "Wed", count: 2 },
      { date: "Thu", count: 7 },
      { date: "Fri", count: 4 },
      { date: "Sat", count: 3 },
      { date: "Sun", count: 6 },
    ],
    distribution: [
      { type: "High Risk", percentage: 15 },
      { type: "Medium Risk", percentage: 35 },
      { type: "Low Risk", percentage: 50 },
    ],
  };

  return (
    <div className="min-h-screen bg-white-100">
      {/* Dashboard Header */}
      <DashboardHeader user={{ name: "Sarah Wilson", email: "sarah.wilson@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" }} notifications={3} />
      
      <div className="p-6 pt-16">
        <h1 className="text-2xl font-bold mb-6">Summary Dashboard</h1>

        {/* Card for Total Threats */}
        <div className="p-6 flex items-center justify-between bg-white rounded-lg shadow-md mb-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Threats
            </p>
            <h3 className="text-2xl font-bold mt-2">{customData.totalThreats}</h3>
          </div>
          <Shield className="h-8 w-8 text-blue-500" />
        </div>

        {/* Include the Summary component */}
        <Summary data={customData} />

        {/* Include the ThreatStats component */}
        <ThreatStats data={threatStatsData} />
      </div>
    </div>
  );
};

export default Threats;
