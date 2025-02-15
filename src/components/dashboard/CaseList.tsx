import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/ui/avatar";
import { AlertTriangle, MessageCircle, Shield } from "lucide-react";

interface CaseItem {
  id: string;
  timestamp: string;
  platform: string;
  threatType: string;
  severity: "low" | "medium" | "high";
  description: string;
  aiAnalysis: string;
  userAvatar: string;
}

interface CaseListProps {
  cases?: CaseItem[];
  selectedTime?: string;
}

const todayCases: CaseItem[] = [
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

const weekCases: CaseItem[] = [
  ...todayCases,
  {
    id: "3",
    timestamp: "2024-03-20 15:45",
    platform: "Snapchat",
    threatType: "Privacy Risk",
    severity: "medium",
    description: "Location sharing enabled in multiple stories",
    aiAnalysis:
      "User has been sharing precise location data in stories. Recommended action: Review privacy settings and disable location sharing.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
  },
  {
    id: "4",
    timestamp: "2024-03-19 09:30",
    platform: "Discord",
    threatType: "Suspicious Link",
    severity: "high",
    description: "Potentially malicious link shared in DM",
    aiAnalysis:
      "Link analysis shows phishing attempt targeting gaming credentials. Recommended action: Block sender and enable link scanning.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
  },
];

const monthCases: CaseItem[] = [
  ...weekCases,
  {
    id: "5",
    timestamp: "2024-03-15 11:20",
    platform: "YouTube",
    threatType: "Inappropriate Content",
    severity: "high",
    description: "Exposure to age-inappropriate content in recommendations",
    aiAnalysis:
      "Content filtering settings need adjustment. Recommended action: Enable restricted mode and review watch history.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
  },
  {
    id: "6",
    timestamp: "2024-03-10 16:45",
    platform: "WhatsApp",
    threatType: "Harassment",
    severity: "medium",
    description: "Repeated unwanted messages from unknown number",
    aiAnalysis:
      "Pattern suggests potential harassment. Recommended action: Block number and report to WhatsApp.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
  },
];

const getCasesByTime = (selectedTime: string = "today") => {
  switch (selectedTime) {
    case "week":
      return weekCases;
    case "month":
      return monthCases;
    default:
      return todayCases;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const CaseList = ({ selectedTime = "today" }: CaseListProps) => {
  const cases = getCasesByTime(selectedTime);

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Recent Cases</h2>
        <Badge variant="outline" className="px-3 py-1">
          {cases.length} Active Cases
        </Badge>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {cases.map((caseItem) => (
          <AccordionItem key={caseItem.id} value={caseItem.id}>
            <Card className="p-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10">
                      <img src={caseItem.userAvatar} alt="User avatar" />
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">
                        {caseItem.platform}
                      </p>
                      <p className="text-sm text-gray-500">
                        {caseItem.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getSeverityColor(caseItem.severity)}>
                      {caseItem.severity.toUpperCase()}
                    </Badge>
                    <Badge variant="outline">{caseItem.threatType}</Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium">Incident Description</p>
                      <p className="text-gray-600">{caseItem.description}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium">AI Analysis</p>
                      <p className="text-gray-600">{caseItem.aiAnalysis}</p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Get Help
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default CaseList;
