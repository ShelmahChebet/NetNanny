import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, TrendingUp } from "lucide-react";

interface SummaryProps {
  data?: {
    totalThreats: number;
    highRiskThreats: number;
    riskScore: number;
    trendDirection: "up" | "down";
    trendPercentage: number;
  };
}

const defaultData = {
  totalThreats: 32,
  highRiskThreats: 5,
  riskScore: 65,
  trendDirection: "down" as const,
  trendPercentage: 12,
};

const Summary = ({ data = defaultData }: SummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Total Threats
          </p>
          <h3 className="text-2xl font-bold mt-2">{data.totalThreats}</h3>
        </div>
        <Shield className="h-8 w-8 text-blue-500" />
      </Card>

      <Card className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            High Risk Threats
          </p>
          <h3 className="text-2xl font-bold mt-2">{data.highRiskThreats}</h3>
        </div>
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </Card>

      <Card className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Risk Score
          </p>
          <div className="flex items-center gap-2 mt-2">
            <h3 className="text-2xl font-bold">{data.riskScore}</h3>
            <Badge
              variant={
                data.trendDirection === "down" ? "default" : "destructive"
              }
              className="flex items-center gap-1"
            >
              <TrendingUp
                className={`h-4 w-4 ${data.trendDirection === "down" ? "rotate-180" : ""}`}
              />
              {data.trendPercentage}%
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Summary;
