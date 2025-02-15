import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Bell, Settings, LogOut, User } from "lucide-react";
import { Badge } from "../ui/badge";

interface DashboardHeaderProps {
  user?: {
    name: string;
    email: string;
    avatar: string;
  };
  notifications?: number;
}

const DashboardHeader = ({
  user = {
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  notifications = 3,
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Safety Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500"
              variant="destructive"
            >
              {notifications}
            </Badge>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
