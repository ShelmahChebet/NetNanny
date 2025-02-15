import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card } from "../ui/card";

interface TimeSelectorProps {
  onTimeChange?: (time: string) => void;
  defaultTime?: string;
}

const TimeSelector = ({
  onTimeChange = () => {},
  defaultTime = "today",
}: TimeSelectorProps) => {
  return (
    <Card className="w-full bg-white p-4">
      <Tabs
        defaultValue={defaultTime}
        className="w-full"
        onValueChange={onTimeChange}
      >
        <TabsList className="grid w-full grid-cols-3 h-12">
          <TabsTrigger value="today" className="text-lg">
            Today
          </TabsTrigger>
          <TabsTrigger value="week" className="text-lg">
            Week
          </TabsTrigger>
          <TabsTrigger value="month" className="text-lg">
            Month
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-4">
          <div className="text-sm text-muted-foreground">
            Viewing data for today
          </div>
        </TabsContent>
        <TabsContent value="week" className="mt-4">
          <div className="text-sm text-muted-foreground">
            Viewing data for this week
          </div>
        </TabsContent>
        <TabsContent value="month" className="mt-4">
          <div className="text-sm text-muted-foreground">
            Viewing data for this month
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default TimeSelector;
