import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";

interface ThreatStatsProps {
  data?: {
    threats: {
      category: string;
      count: number;
    }[];
    timeline: {
      date: string;
      count: number;
    }[];
    distribution: {
      type: string;
      percentage: number;
    }[];
  };
}

const defaultData = {
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

const ThreatStats = ({ data = defaultData }: ThreatStatsProps) => {
  return (
    <Card className="p-6 bg-white w-full h-[400px] overflow-y-auto">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Threat Statistics
          </h2>
          <Tabs defaultValue="bar" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bar" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Bar
              </TabsTrigger>
              <TabsTrigger value="line" className="flex items-center gap-2">
                <LineChart className="w-4 h-4" />
                Line
              </TabsTrigger>
              <TabsTrigger value="pie" className="flex items-center gap-2">
                <PieChart className="w-4 h-4" />
                Pie
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bar" className="mt-4">
              <div className="h-[280px] flex items-end justify-between gap-2 pt-4">
                {data.threats.map((threat, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <div
                      className="w-16 bg-blue-500 rounded-t"
                      style={{ height: `${(threat.count / 15) * 200}px` }}
                    />
                    <span className="text-sm text-gray-600 -rotate-45 origin-top-left">
                      {threat.category}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="line" className="mt-4">
              <div className="h-[280px] relative">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <polyline
                    points={data.timeline
                      .map(
                        (point, i) =>
                          `${(i * 400) / 6},${200 - (point.count / 10) * 200}`,
                      )
                      .join(" ")}
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  {data.timeline.map((point, i) => (
                    <g key={i} transform={`translate(${(i * 400) / 6}, 220)`}>
                      <text
                        x="0"
                        y="0"
                        className="text-xs"
                        fill="#666"
                        textAnchor="middle"
                      >
                        {point.date}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </TabsContent>

            <TabsContent value="pie" className="mt-4">
              <div className="h-[280px] flex items-center justify-center">
                <svg className="w-64 h-64" viewBox="0 0 100 100">
                  {data.distribution.map((segment, i) => {
                    const startAngle =
                      data.distribution
                        .slice(0, i)
                        .reduce((sum, s) => sum + s.percentage, 0) * 3.6;
                    const endAngle = startAngle + segment.percentage * 3.6;

                    const startX =
                      50 + 40 * Math.cos(((startAngle - 90) * Math.PI) / 180);
                    const startY =
                      50 + 40 * Math.sin(((startAngle - 90) * Math.PI) / 180);
                    const endX =
                      50 + 40 * Math.cos(((endAngle - 90) * Math.PI) / 180);
                    const endY =
                      50 + 40 * Math.sin(((endAngle - 90) * Math.PI) / 180);

                    const largeArcFlag = segment.percentage > 50 ? 1 : 0;

                    return (
                      <path
                        key={i}
                        d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                        fill={
                          i === 0 ? "#ef4444" : i === 1 ? "#f59e0b" : "#22c55e"
                        }
                      />
                    );
                  })}
                </svg>
                <div className="ml-8 space-y-2">
                  {data.distribution.map((segment, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{
                          backgroundColor:
                            i === 0
                              ? "#ef4444"
                              : i === 1
                                ? "#f59e0b"
                                : "#22c55e",
                        }}
                      />
                      <span className="text-sm text-gray-600">
                        {segment.type} ({segment.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Card>
  );
};

export default ThreatStats;
