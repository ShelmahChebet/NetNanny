import React from "react";
import DashboardHeader from "./layout/DashboardHeader";
import Sidebar from "./layout/Sidebar";
import MonitoringPanel from "./dashboard/MonitoringPanel";
import SupportChat from "./chat/SupportChat";

interface HomeProps {
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
  notifications?: number;
  selectedTime?: string;
  onTimeChange?: (time: string) => void;
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
    severity: "low" | "medium" | "high";
    description: string;
    aiAnalysis: string;
    userAvatar: string;
  }[];
}

const defaultUser = {
  name: "Sarah Wilson",
  email: "sarah.wilson@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
};

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

const Home = () => {
  const [isSidebarMinimized, setIsSidebarMinimized] = React.useState(false);
  const [isChatMinimized, setIsChatMinimized] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader user={defaultUser} notifications={3} />

      <div className="flex pt-16">
        <Sidebar
          isMinimized={isSidebarMinimized}
          onMinimizeToggle={() => setIsSidebarMinimized(!isSidebarMinimized)}
        />

        <main className="flex-1">
          <MonitoringPanel
            selectedTime="today"
            threatData={defaultThreatData}
            cases={defaultCases}
          />
        </main>
      </div>

      <SupportChat
        isOpen={true}
        isMinimized={isChatMinimized}
        onMinimizeToggle={() => setIsChatMinimized(!isChatMinimized)}
      />
    </div>
  );
};

export default Home;
