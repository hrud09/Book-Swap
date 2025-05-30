import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Settings,
  History,
  Plus,
  Edit,
  Trash2,
  MessageCircle,
  Camera,
  X,
  ArrowLeft,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import BookCard from "./BookCard";
import { Link, useNavigate } from "react-router-dom";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  condition: "New" | "Like New" | "Very Good" | "Good" | "Fair" | "Poor";
  genre: string;
}

interface ExchangeRequest {
  id: string;
  status: "pending" | "accepted" | "declined" | "completed";
  date: string;
  book: Book;
  offeredBook: Book;
  user: {
    name: string;
    avatar: string;
  };
  message?: string;
}

interface UserProfileProps {
  userId?: string;
  isOwnProfile?: boolean;
}

const UserProfile = ({
  userId = "1",
  isOwnProfile = true,
}: UserProfileProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("available-books");
  const [showAddBookDialog, setShowAddBookDialog] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    images: [] as string[],
    condition: "Very Good" as Book["condition"],
    genre: "",
    askingBooks: "",
    askingPrice: "",
    purchaseDate: "",
    boughtFromRokomari: false,
  });
  const [availableBooks, setAvailableBooks] = useState<Book[]>([
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
      condition: "Very Good",
      genre: "Fiction",
    },
    {
      id: "2",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&q=80",
      condition: "Good",
      genre: "Fiction",
    },
    {
      id: "3",
      title: "Sapiens",
      author: "Yuval Noah Harari",
      coverImage:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&q=80",
      condition: "Like New",
      genre: "Non-Fiction",
    },
  ]);

  // Mock data for the profile
  const user = {
    id: "1",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    email: "jane.smith@example.com",
    location: "New York, NY",
    bio: "Book lover and collector. Interested in fiction, science, and history books.",
    joinedDate: "January 2023",
    exchangesCompleted: 24,
  };

  // Available books are now managed in state above

  // Mock data for exchange history
  const exchangeHistory: ExchangeRequest[] = [
    {
      id: "101",
      status: "completed",
      date: "2023-10-15",
      book: {
        id: "4",
        title: "1984",
        author: "George Orwell",
        coverImage:
          "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&q=80",
        condition: "Good",
        genre: "Fiction",
      },
      offeredBook: {
        id: "5",
        title: "Brave New World",
        author: "Aldous Huxley",
        coverImage:
          "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&q=80",
        condition: "Very Good",
        genre: "Fiction",
      },
      user: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      },
    },
    {
      id: "102",
      status: "completed",
      date: "2023-09-05",
      book: {
        id: "6",
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        coverImage:
          "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=300&q=80",
        condition: "Fair",
        genre: "Fantasy",
      },
      offeredBook: {
        id: "7",
        title: "Dune",
        author: "Frank Herbert",
        coverImage:
          "https://images.unsplash.com/photo-1531901599143-df8349d97ffa?w=300&q=80",
        condition: "Good",
        genre: "Science Fiction",
      },
      user: {
        name: "Alice Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
      },
    },
  ];

  // Mock data for exchange requests
  const exchangeRequests: ExchangeRequest[] = [
    {
      id: "201",
      status: "pending",
      date: "2023-11-01",
      book: availableBooks[0],
      offeredBook: {
        id: "8",
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        coverImage:
          "https://images.unsplash.com/photo-1603162617016-6360f13e5f94?w=300&q=80",
        condition: "Good",
        genre: "Fiction",
      },
      user: {
        name: "Robert Brown",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
      },
      message:
        "I really love this book and would like to exchange it with you.",
    },
    {
      id: "202",
      status: "pending",
      date: "2023-10-28",
      book: availableBooks[1],
      offeredBook: {
        id: "9",
        title: "Pride and Prejudice",
        author: "Jane Austen",
        coverImage:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
        condition: "Very Good",
        genre: "Fiction",
      },
      user: {
        name: "Emily Wilson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      },
      message: "Would love to exchange this classic with you!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-white" />
              <span className="text-xl font-bold">BookSwap</span>
            </Link>
          </div>
        </div>
      </header>
      <div className="container mx-auto py-8">
        <Button
          variant="outline"
          className="mb-4 hover:bg-blue-100 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      {/* Profile Sidebar */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="md:w-1/3">
          <Card className="shadow-md border-t-4 border-t-primary overflow-hidden">
            <CardHeader className="text-center bg-gradient-to-b from-blue-50 to-white pb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-100 h-16 -mt-6"></div>
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white shadow-md relative z-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary text-white text-2xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <span className="flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {user.location}
                </span>
                <span className="flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Member since {user.joinedDate}
                </span>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-yellow-400 text-black font-medium"
                  >
                    {user.exchangesCompleted} Exchanges
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white font-medium"
                  >
                    Verified User
                  </Badge>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-medium mb-2 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  About
                </h3>
                <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md">
                  {user.bio}
                </p>
              </div>
              <Separator className="my-4" />
              <div className="mb-4">
                <h3 className="font-medium mb-2 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Contact
                </h3>
                <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {user.email}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-medium mb-2 flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  Reading Preferences
                </h3>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="bg-blue-50">
                    Fiction
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    Science Fiction
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    Mystery
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50">
                    Biography
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {isOwnProfile && (
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-primary hover:bg-blue-50"
                    size="sm"
                  >
                    <Settings className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                )}
                {isOwnProfile && (
                  <Button
                    variant="outline"
                    className="w-full mt-2 border-green-500 text-green-600 hover:bg-green-50"
                    size="sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Verify Account
                  </Button>
                )}
                {!isOwnProfile && (
                  <Link to="/messages" className="w-full">
                    <Button
                      variant="primary"
                      className="w-full mt-2 bg-primary hover:bg-primary/90"
                      size="sm"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" /> Send Message
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3">
          {/* Stats Section */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Activity Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500">
                <p className="text-sm text-muted-foreground">Books Listed</p>
                <p className="text-2xl font-bold">{availableBooks.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500">
                <p className="text-sm text-muted-foreground">
                  Exchanges Completed
                </p>
                <p className="text-2xl font-bold">{user.exchangesCompleted}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-l-yellow-500">
                <p className="text-sm text-muted-foreground">
                  Pending Requests
                </p>
                <p className="text-2xl font-bold">{exchangeRequests.length}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-l-red-500">
                <p className="text-sm text-muted-foreground">Books Sold</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="available-books"
            value={activeTab}
            onValueChange={setActiveTab}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <TabsList className="grid w-full grid-cols-3 p-1 bg-blue-50">
              <TabsTrigger
                value="available-books"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Available Books
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="exchange-requests"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  Exchange Requests
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="exchange-history"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" />
                  Exchange History
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="available-books" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <BookOpen className="mr-2 h-6 w-6 text-primary" />
                  Available Books
                </h2>
                {isOwnProfile && (
                  <Button
                    onClick={() => setShowAddBookDialog(true)}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Book
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {availableBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    showExchangeButton={!isOwnProfile}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="exchange-requests" className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                Exchange Requests
              </h2>

              {exchangeRequests.length > 0 ? (
                <div className="space-y-4">
                  {exchangeRequests.map((request) => (
                    <Card key={request.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 p-4 bg-blue-50">
                            <p className="font-medium">
                              From: {request.user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Date: {request.date}
                            </p>
                            <Badge
                              className="mt-2"
                              variant={
                                request.status === "pending"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {request.status.charAt(0).toUpperCase() +
                                request.status.slice(1)}
                            </Badge>
                          </div>
                          <div className="md:w-3/4 p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1">
                                <p className="font-medium">They want:</p>
                                <div className="mt-2">
                                  <BookCard book={request.book} compact />
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">They offer:</p>
                                <div className="mt-2">
                                  <BookCard
                                    book={request.offeredBook}
                                    compact
                                  />
                                </div>
                              </div>
                            </div>
                            {request.message && (
                              <div className="mt-4 bg-blue-50 p-3 rounded-md">
                                <p className="font-medium">Message:</p>
                                <p className="text-sm">{request.message}</p>
                              </div>
                            )}
                            {isOwnProfile && request.status === "pending" && (
                              <div className="mt-4 flex gap-2 justify-end">
                                <Button
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                >
                                  Decline
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700">
                                  Accept
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No exchange requests yet.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="exchange-history" className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <History className="h-6 w-6 mr-2 text-primary" />
                Exchange History
              </h2>

              {exchangeHistory.length > 0 ? (
                <div className="space-y-4">
                  {exchangeHistory.map((exchange) => (
                    <Card key={exchange.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 p-4 bg-green-50">
                            <p className="font-medium">
                              With: {exchange.user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Date: {exchange.date}
                            </p>
                            <Badge
                              className="mt-2"
                              variant="secondary"
                              className="bg-green-500 text-white"
                            >
                              Completed
                            </Badge>
                          </div>
                          <div className="md:w-3/4 p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1">
                                <p className="font-medium">You exchanged:</p>
                                <div className="mt-2">
                                  <BookCard book={exchange.book} compact />
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">You received:</p>
                                <div className="mt-2">
                                  <BookCard
                                    book={exchange.offeredBook}
                                    compact
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No exchange history yet.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
