import React from "react";
import TimeSelector from "./TimeSelector";
import ThreatStats from "./ThreatStats";
import CaseList from "./CaseList";
import Summary from "./Summary";
import { Card } from "../ui/card";
import { Shield } from "lucide-react";
import DashboardHeader from "../layout/DashboardHeader";

interface MonitoringPanelProps {
  selectedTime?: string;
  onTimeChange?: (time: string) => void;
  aiAnalysis?: {
    today: string;
    week: string;
    month: string;
  };
  threatData?: {
    threats: { category: string; count: number }[];
    timeline: { date: string; count: number }[];
    distribution: { type: string; percentage: number }[];
  };
  cases?: {
    id: string;
    timestamp: string;
    platform: string;
    threatType: string;
    severity: string;
    description: string;
    aiAnalysis: string;
    userAvatar: string;
  }[];
}

const defaultThreatData = {
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

const defaultCases = [
  {
    id: "1",
    timestamp: "2024-03-21 14:30",
    platform: "Instagram",
    threatType: "Cyberbullying",
    severity: "high",
    description: "Multiple hostile comments detected on recent post",
    aiAnalysis:
      "Pattern indicates coordinated harassment from multiple accounts. Recommended actions: Report accounts, enable comment filtering.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
  },
  {
    id: "2",
    timestamp: "2024-03-21 12:15",
    platform: "TikTok",
    threatType: "Suspicious Contact",
    severity: "medium",
    description: "Unknown user attempting repeated contact",
    aiAnalysis:
      "Profile exhibits common grooming behavior patterns. Recommended action: Block user and report to platform.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
  },
];

const defaultAiAnalysis = {
  today:
    "Today's analysis shows a spike in cyberbullying incidents during after-school hours (3-6 PM). Most threats are coming from Instagram and TikTok. Recommended actions: Increase monitoring during peak hours and review social media privacy settings.",
  week: "This week has shown a 15% decrease in overall threats compared to last week. However, there's been an increase in suspicious contact attempts. The AI has identified a pattern of potential grooming behavior from multiple accounts.",
  month:
    "Monthly trend analysis reveals cyberbullying as the dominant threat (40% of all cases). Privacy concerns have decreased by 25% since implementing recommended security measures. New emerging threat pattern: Increase in spam accounts targeting teenage users.",
};

const defaultUser = {
  name: "Sarah Wilson",
  email: "sarah.wilson@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
};

const MonitoringPanel = ({
  selectedTime = "today",
  onTimeChange = () => {},
  threatData = defaultThreatData,
  cases = defaultCases,
  aiAnalysis = defaultAiAnalysis,
}: MonitoringPanelProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* No more duplicate header */}
      <div className="w-full h-full bg-gray-50 p-6 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto space-y-6 pt-20">
          <TimeSelector defaultTime={selectedTime} onTimeChange={onTimeChange} />

          <Card className="p-6 bg-white">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">AI Safety Analysis</h3>
                <p className="text-gray-600">{aiAnalysis[selectedTime]}</p>
              </div>
            </div>
          </Card>

          <Summary />

          <div className="grid gap-6">
            <ThreatStats data={threatData} />
            <CaseList selectedTime={selectedTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPanel;