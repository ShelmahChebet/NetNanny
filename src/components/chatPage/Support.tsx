import React from "react";
import { Card } from "../../components/ui/card" //"@/components/ui/card";
import { Button } from "../../components/ui/button" //"@/components/ui/button";
import { Input } from "../../components/ui/input" //"@/components/ui/input";
import { ScrollArea } from "../ui/scroll-area" //@/components/ui/scroll-area";
import { Avatar } from "../ui/avatar"; //"@/components/ui/avatar";
import { Badge } from "../ui/badge";
import { AlertCircle, Send, Phone } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
}

interface FullPageSupportChatProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  onEmergency?: () => void;
}

const defaultMessages: Message[] = [
  {
    id: "1",
    type: "system",
    content: "Welcome to Safe Social Support! How can I help you today?",
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    type: "assistant",
    content:
      "I'm here to help you with any safety concerns or questions you might have.",
    timestamp: new Date().toISOString(),
  },
];

const FullPageSupportChat = ({
  messages = defaultMessages,
  onSendMessage = () => {},
  onEmergency = () => {},
}: FullPageSupportChatProps) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full h-screen bg-gray-50 p-6">
      <Card className="w-full h-full bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-primary text-primary-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=support"
                alt="Support"
              />
            </Avatar>
            <div>
              <h3 className="font-semibold">Support Chat</h3>
              <p className="text-xs opacity-90">We're here to help</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-1"
              onClick={onEmergency}
            >
              <Phone className="h-4 w-4" />
              Emergency
            </Button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] ${message.type === "user" ? "bg-primary text-primary-foreground" : message.type === "system" ? "bg-muted" : "bg-secondary"} rounded-lg p-3`}
                >
                  {message.type === "system" && (
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="h-4 w-4" />
                      <Badge variant="outline">System Message</Badge>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FullPageSupportChat;