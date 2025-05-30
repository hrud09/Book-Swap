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
  Bell
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

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Assuming Add Book dialog state is managed globally or passed down if needed in the header
  // const [showAddBookDialog, setShowAddBookDialog] = useState(false);

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
           <Button variant="ghost" size="sm" className="text-primary relative">
              <Bell className="h-5 w-5" />
              {/* Notification count - assuming it's a prop or context */}
              {/* <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>*/}
            </Button>
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
        <div className="md:hidden border-t border-border p-4 bg-background">
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
            {/* Add Book Button */}
            {/* <Button
              className="w-full"
              onClick={() => setShowAddBookDialog(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Book
            </Button>*/}
             <Button variant="ghost" className="w-full justify-start">
               <Bell className="h-4 w-4 mr-2" />
               Notifications
             </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 