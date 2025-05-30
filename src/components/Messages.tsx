import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  Search,
  ArrowLeft,
  Send,
  MessageCircle,
  Star,
  User,
  Calendar,
} from "lucide-react";
import Header from "./Header";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

const Messages = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      userId: "101",
      userName: "Jane Smith",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      lastMessage: "I'm interested in exchanging The Great Gatsby",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      unreadCount: 2,
    },
    {
      id: "2",
      userId: "102",
      userName: "John Doe",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      lastMessage: "When can we meet for the book exchange?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      unreadCount: 0,
    },
    {
      id: "3",
      userId: "103",
      userName: "Alex Johnson",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      lastMessage: "Thanks for accepting my exchange request!",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      unreadCount: 0,
    },
    {
      id: "4",
      userId: "104",
      userName: "Sarah Williams",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      lastMessage: "Do you have any other sci-fi books available?",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      unreadCount: 0,
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      senderId: "101",
      receiverId: "current-user",
      text: "Hi there! I saw you have The Great Gatsby available for exchange.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: true,
    },
    {
      id: "m2",
      senderId: "current-user",
      receiverId: "101",
      text: "Yes, I do! What book are you offering in exchange?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: true,
    },
    {
      id: "m3",
      senderId: "101",
      receiverId: "current-user",
      text: "I have 'To Kill a Mockingbird' in very good condition. Would you be interested?",
      timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
      read: true,
    },
    {
      id: "m4",
      senderId: "101",
      receiverId: "current-user",
      text: "I'm also willing to add a small amount of money since your book is newer.",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
  ]);

  const filteredConversations = conversations.filter((conversation) =>
    conversation.userName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const selectedUser = conversations.find(
      (conv) => conv.id === selectedConversation,
    );

    if (!selectedUser) return;

    // Add new message to messages
    const newMessageObj: Message = {
      id: `m${messages.length + 1}`,
      senderId: "current-user",
      receiverId: selectedUser.userId,
      text: newMessage,
      timestamp: new Date(),
      read: false,
    };

    setMessages([...messages, newMessageObj]);

    // Update conversation last message
    setConversations(
      conversations.map((conv) =>
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: newMessage,
              lastMessageTime: new Date(),
              unreadCount: 0,
            }
          : conv,
      ),
    );

    // Clear input
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffInDays === 0) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Main content */}
      <main className="container mx-auto py-6">
        {/* Back button */}
        <div className="mb-4">
          <Button
            variant="outline"
            className="hover:bg-blue-100 flex items-center gap-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-primary" />
          Messages
        </h1>
        <div className="flex flex-col lg:flex-row h-[calc(100vh-14rem)] border rounded-lg overflow-hidden shadow-md bg-white">
          {/* Conversations sidebar */}
          <div
            className={`w-full lg:w-1/3 border-r ${selectedConversation ? "hidden lg:block" : "block"}`}
          >
            <div className="p-3 lg:p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm lg:text-base"
                />
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 lg:p-4 border-b cursor-pointer hover:bg-blue-50 transition-all duration-200 ${selectedConversation === conversation.id ? "bg-blue-100 border-l-4 border-l-primary" : ""}`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                      <AvatarImage
                        src={conversation.userAvatar}
                        alt={conversation.userName}
                      />
                      <AvatarFallback className="text-xs lg:text-sm">
                        {conversation.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium truncate text-sm lg:text-base">
                          {conversation.userName}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.lastMessageTime)}
                        </span>
                      </div>
                      <p className="text-xs lg:text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <div className="min-w-4 h-4 lg:min-w-5 lg:h-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>

          {/* Message area */}
          {selectedConversation ? (
            <div
              className={`flex-1 flex flex-col ${selectedConversation ? "block" : "hidden lg:block"}`}
            >
              {/* Conversation header */}
              <div className="p-3 lg:p-4 border-b flex items-center gap-2 lg:gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden h-8 w-8"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                {selectedConversation && (
                  <>
                    <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                      <AvatarImage
                        src={
                          conversations.find(
                            (c) => c.id === selectedConversation,
                          )?.userAvatar
                        }
                        alt={
                          conversations.find(
                            (c) => c.id === selectedConversation,
                          )?.userName
                        }
                      />
                      <AvatarFallback className="text-xs lg:text-sm">
                        {conversations
                          .find((c) => c.id === selectedConversation)
                          ?.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-sm lg:text-base">
                        {
                          conversations.find(
                            (c) => c.id === selectedConversation,
                          )?.userName
                        }
                      </h3>
                    </div>
                  </>
                )}
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-2 lg:p-4">
                <div className="space-y-3 lg:space-y-4">
                  {messages
                    .filter(
                      (message) =>
                        (message.senderId === "current-user" &&
                          message.receiverId ===
                            conversations.find(
                              (c) => c.id === selectedConversation,
                            )?.userId) ||
                        (message.receiverId === "current-user" &&
                          message.senderId ===
                            conversations.find(
                              (c) => c.id === selectedConversation,
                            )?.userId),
                    )
                    .map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] lg:max-w-[70%] rounded-lg p-2 lg:p-3 shadow-sm ${message.senderId === "current-user" ? "bg-primary text-primary-foreground" : "bg-blue-50 border border-blue-100"}`}
                        >
                          <p className="text-sm lg:text-base">{message.text}</p>
                          <div
                            className={`text-xs mt-1 ${message.senderId === "current-user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                          >
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>

              {/* Message input */}
              <div className="p-2 lg:p-4 border-t bg-gradient-to-r from-blue-50 to-white">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="min-h-[50px] lg:min-h-[60px] resize-none border-blue-200 focus:border-blue-400 shadow-sm text-sm lg:text-base"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    className="self-end transition-all duration-200 hover:scale-105 h-8 w-8 lg:h-10 lg:w-10"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-3 w-3 lg:h-4 lg:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">
                  Select a conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Messages;
