import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  User,
  Bell,
  Lock,
  Shield,
  Palette,
  HelpCircle,
  LogOut,
  Mail,
} from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

        <Card className="p-6 bg-white shadow-sm">
          <div className="space-y-4">
            {/* Account Settings */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-start space-x-3 p-6"
            >
              <User className="h-5 w-5 text-gray-700" />
              <span className="text-lg">Account Settings</span>
            </Button>

            {/* Notifications */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-start space-x-3 p-6"
            >
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="text-lg">Notifications</span>
            </Button>

            {/* Privacy & Security */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-start space-x-3 p-6"
            >
              <Lock className="h-5 w-5 text-gray-700" />
              <span className="text-lg">Privacy & Security</span>
            </Button>

            {/* Theme Customization */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-start space-x-3 p-6"
            >
              <Palette className="h-5 w-5 text-gray-700" />
              <span className="text-lg">Theme Customization</span>
            </Button>

            {/* Help & Support */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-start space-x-3 p-6"
            >
              <HelpCircle className="h-5 w-5 text-gray-700" />
              <span className="text-lg">Help & Support</span>
            </Button>

            {/* Contact Us */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-start space-x-3 p-6"
            >
              <Mail className="h-5 w-5 text-gray-700" />
              <span className="text-lg">Contact Us</span>
            </Button>

            {/* Log Out */}
            <Button
              variant="outline"
              className="w-full flex items-center justify-start space-x-3 p-6"
            >
              <LogOut className="h-5 w-5 text-gray-700" />
              <span className="text-lg">Log Out</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;