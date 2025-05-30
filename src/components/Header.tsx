import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  MessageSquare,
  User,
  Menu,
  Plus,
  Camera,
  X,
  Bell,
  Check,
  Clock,
  Gift,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notification data
  const notifications = [
    {
      id: "1",
      type: "exchange_request",
      title: "New Exchange Request",
      message:
        "John Doe wants to exchange 'The Great Gatsby' with your 'To Kill a Mockingbird'",
      time: "5 minutes ago",
      read: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: "2",
      type: "exchange_accepted",
      title: "Exchange Accepted!",
      message: "Sarah Wilson accepted your exchange request for 'Dune'",
      time: "1 hour ago",
      read: false,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      id: "3",
      type: "message",
      title: "New Message",
      message: "Alex Johnson sent you a message about book condition",
      time: "2 hours ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      id: "4",
      type: "exchange_completed",
      title: "Exchange Completed",
      message: "Your exchange with Emma Davis has been marked as completed",
      time: "1 day ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    },
    {
      id: "5",
      type: "book_interest",
      title: "Book Interest",
      message: "3 people are interested in your 'Harry Potter' book",
      time: "2 days ago",
      read: true,
      avatar: null,
    },
    {
      id: "6",
      type: "review",
      title: "New Review",
      message: "Michael Brown left a 5-star review for your exchange",
      time: "3 days ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "exchange_request":
        return <ArrowRight className="h-4 w-4 text-blue-500" />;
      case "exchange_accepted":
        return <Check className="h-4 w-4 text-green-500" />;
      case "exchange_completed":
        return <Gift className="h-4 w-4 text-purple-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "review":
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BookSwap</span>
          </Link>
        </div>

        {/* Navigation - desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/UserProfile">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <User className="h-4 w-4" />
              <span>Profile</span>
            </Button>
          </Link>
          <Link to="/messages">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Messages</span>
            </Button>
          </Link>
          {/* Add Book Button - assuming it triggers a global/context state */}
          {/* <Button size="sm" onClick={() => setShowAddBookDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>*/}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="text-primary relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notification Panel */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 lg:w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">Notifications</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowNotifications(false)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {unreadCount > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      You have {unreadCount} unread notification
                      {unreadCount > 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <ScrollArea className="max-h-96">
                  <div className="p-2">
                    {notifications.map((notification, index) => (
                      <div key={notification.id}>
                        <div
                          className={`p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                            !notification.read
                              ? "bg-blue-50 border-l-4 border-l-blue-500"
                              : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {notification.avatar ? (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={notification.avatar} />
                                  <AvatarFallback className="text-xs">
                                    {notification.title.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                                  {getNotificationIcon(notification.type)}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-sm truncate">
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-muted-foreground">
                                  {notification.time}
                                </span>
                                <div className="flex items-center gap-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < notifications.length - 1 && (
                          <Separator className="my-1" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-3 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Mark All Read
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      View All
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border p-4 bg-background relative">
          <nav className="flex flex-col space-y-2">
            <Link to="/UserProfile">
              <Button variant="ghost" className="w-full justify-start">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Link to="/messages">
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="ml-auto bg-red-500 text-white text-xs h-5 w-5 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </nav>

          {/* Mobile Notification Panel */}
          {showNotifications && (
            <div className="absolute left-4 right-4 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Notifications</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNotifications(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {unreadCount > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    You have {unreadCount} unread notification
                    {unreadCount > 1 ? "s" : ""}
                  </p>
                )}
              </div>

              <ScrollArea className="max-h-80">
                <div className="p-2">
                  {notifications.slice(0, 4).map((notification, index) => (
                    <div key={notification.id}>
                      <div
                        className={`p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${
                          !notification.read
                            ? "bg-blue-50 border-l-4 border-l-blue-500"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {notification.avatar ? (
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={notification.avatar} />
                                <AvatarFallback className="text-xs">
                                  {notification.title.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="h-6 w-6 bg-gray-100 rounded-full flex items-center justify-center">
                                {getNotificationIcon(notification.type)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm truncate">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0 ml-2"></div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <span className="text-xs text-muted-foreground mt-1">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      {index < 3 && <Separator className="my-1" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-3 border-t border-gray-100">
                <Button variant="outline" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
