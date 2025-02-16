import React from "react";
import { Card } from  "../ui/card";
import { Badge } from "../ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar } from "../ui/avatar";
import { AlertTriangle, MessageCircle, Shield } from "lucide-react";
import DashboardHeader from "../layout/DashboardHeader";

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

const defaultUser = {
  name: "Sarah Wilson",
  email: "sarah.wilson@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
};

const getCasesByTime = (selectedTime: string = "today") => {
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
  ];

  switch (selectedTime) {
    case "week":
      return todayCases;
    case "month":
      return todayCases;
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
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader user={defaultUser} notifications={3} />
      
      {/* Add padding to prevent overlap */}
      <div className="pt-24 w-full bg-white p-6 rounded-lg shadow">
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
    </div>
  );
};
  
export default CaseList;
