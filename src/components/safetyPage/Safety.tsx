import React from "react";
import { Card } from "../../components/ui/card";
import { Shield } from "lucide-react";
import TimeSelector from "../dashboard/TimeSelector";
import DashboardHeader from "../layout/DashboardHeader";

interface SafetyProps {
  selectedTime?: string;
  onTimeChange?: (time: string) => void;
  aiAnalysis?: {
    today: string;
    week: string;
    month: string;
  };
}

const Safety = ({
  selectedTime = "today",
  onTimeChange = () => {},
  aiAnalysis = {
    today:
      "Today's analysis shows a spike in cyberbullying incidents during after-school hours (3-6 PM). Most threats are coming from Instagram and TikTok. Recommended actions: Increase monitoring during peak hours and review social media privacy settings.",
    week:
      "This week has shown a 15% decrease in overall threats compared to last week. However, there's been an increase in suspicious contact attempts. The AI has identified a pattern of potential grooming behavior from multiple accounts.",
    month:
      "Monthly trend analysis reveals cyberbullying as the dominant threat (40% of all cases). Privacy concerns have decreased by 25% since implementing recommended security measures. New emerging threat pattern: Increase in spam accounts targeting teenage users.",
  },
}: SafetyProps) => {
  return (
    <div className="w-full h-full bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <DashboardHeader user={{ name: "Sarah Wilson", email: "sarah.wilson@example.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" }} notifications={3} />

      <div className="max-w-[1200px] mx-auto space-y-6 p-6 pt-20">
        <h1 className="text-2xl font-bold mb-6">AI Safety Analysis</h1>

        {/* Time Selector */}
        <TimeSelector defaultTime={selectedTime} onTimeChange={onTimeChange} />

        {/* AI Safety Analysis Card */}
        <Card className="p-6 bg-white">
          <div className="flex items-start gap-3">
            <Shield className="h-6 w-6 text-blue-500 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">AI Safety Analysis</h3>
              <p className="text-gray-600">{aiAnalysis[selectedTime] || "No data available for this time period."}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Safety;
