import React from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BarChart3,
  ClipboardList,
  FileText,
  MessageCircle,
  Clock,
  Settings,
  Home,
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  className?: string;
  items?: {
    title: string;
    icon: React.ReactNode;
    href: string;
    description: string;
  }[];
  onNavigate?: (href: string) => void;
  isMinimized?: boolean;
  onMinimizeToggle?: () => void;
}

const defaultItems = [
  {
    title: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    href: "/",
    description: "Overview of all monitoring activities",
  },
  {
    title: "Time-Based Monitoring",
    icon: <Clock className="w-5 h-5" />,
    href: "/monitoring",
    description: "View threats by time period",
  },
  {
    title: "Case List",
    icon: <ClipboardList className="w-5 h-5" />,
    href: "/cases",
    description: "List of all safety incidents",
  },
  {
    title: "Threat Statistics",
    icon: <BarChart3 className="w-5 h-5" />,
    href: "/stats",
    description: "Detailed threat analytics",
  },
  {
    title: "Safety Reports",
    icon: <FileText className="w-5 h-5" />,
    href: "/reports",
    description: "Generated safety analysis reports",
  },
  {
    title: "Support Chat",
    icon: <MessageCircle className="w-5 h-5" />,
    href: "/chat",
    description: "Get help from AI assistant",
  },
];

const Sidebar = ({
  className,
  items = defaultItems,
  isMinimized = false,
  onMinimizeToggle = () => {},
}: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={cn(
        "flex flex-col h-full border-r bg-white transition-all duration-300",
        isMinimized ? "w-[80px]" : "w-[280px]",
        className,
      )}
    >
      <ScrollArea className="flex-1">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <h2 className="mb-4 px-4 text-xl font-semibold tracking-tight">
                Navigation
              </h2>
              <TooltipProvider>
                {items.map((item, index) => (
                  <div key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-2 py-6",
                            isMinimized && "justify-center px-0",
                          )}
                          onClick={() => navigate(item.href)}
                          data-active={location.pathname === item.href}
                          className={cn(
                            "w-full justify-start gap-2 py-6",
                            isMinimized && "justify-center px-0",
                            location.pathname === item.href && "bg-accent",
                          )}
                        >
                          {item.icon}
                          {!isMinimized && <span>{item.title}</span>}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.description}</p>
                      </TooltipContent>
                    </Tooltip>
                    {index < items.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </TooltipProvider>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="mt-auto p-4 space-y-2">
        <Button
          variant="outline"
          className={cn(
            "w-full gap-2",
            isMinimized ? "justify-center px-0" : "justify-start",
          )}
          onClick={() => navigate("/settings")}
        >
          <Settings className="w-5 h-5" />
          {!isMinimized && <span>Settings</span>}
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "w-full gap-2",
            isMinimized ? "justify-center px-0" : "justify-start",
          )}
          onClick={onMinimizeToggle}
        >
          <ChevronLeft
            className={cn(
              "w-5 h-5 transition-transform",
              isMinimized && "rotate-180",
            )}
          />
          {!isMinimized && <span>Minimize</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
