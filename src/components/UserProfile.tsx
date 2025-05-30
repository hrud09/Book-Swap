import React, { useState, useEffect } from "react";
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
  User,
  MapPin,
  Calendar,
  Mail,
  Heart,
  Share2,
  Bell,
  BookMarked,
  Star,
  Award,
  Bookmark,
  ThumbsUp,
  Gift,
  TrendingUp,
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  Search,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import BookCard from "./BookCard";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  condition: "New" | "Like New" | "Very Good" | "Good" | "Fair" | "Poor";
  genre: string;
  askingPrice?: number;
  rokomariPrice?: number;
  preferredExchangeBooks?: string[];
  isForSale?: boolean;
  isForExchange?: boolean;
  owner?: {
    name: string;
    avatar: string;
  };
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
    askingBooks: "",
    askingPrice: "",
    condition: "Very Good" as Book["condition"],
    purchaseDate: "",
    boughtFromRokomari: false,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setNewBook({ ...newBook, images: [...newBook.images, ...imageUrls] });
    }
  };

  const removeImage = (index: number) => {
    setNewBook({
      ...newBook,
      images: newBook.images.filter((_, i) => i !== index),
    });
  };

  const handleAddBook = () => {
    // Add the new book to the available books list
    const newBookToAdd: Book = {
      id: Date.now().toString(),
      title: newBook.title,
      author: newBook.author,
      coverImage:
        newBook.images[0] ||
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
      condition: newBook.condition,
      genre: "Fiction", // Default genre
    };

    setAvailableBooks([newBookToAdd, ...availableBooks]);

    // Reset form and close dialog
    setNewBook({
      title: "",
      author: "",
      images: [],
      askingBooks: "",
      askingPrice: "",
      condition: "Very Good",
      purchaseDate: "",
      boughtFromRokomari: false,
    });
    setShowAddBookDialog(false);
  };

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
    {
      id: "4",
      title: "1984",
      author: "George Orwell",
      coverImage:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&q=80",
      condition: "Good",
      genre: "Dystopian",
    },
    {
      id: "5",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverImage:
        "https://images.unsplash.com/photo-1603162617016-6360f13e5f94?w=300&q=80",
      condition: "Very Good",
      genre: "Romance",
    },
    {
      id: "6",
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      coverImage:
        "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=300&q=80",
      condition: "Like New",
      genre: "Fantasy",
    },
    {
      id: "7",
      title: "Dune",
      author: "Frank Herbert",
      coverImage:
        "https://images.unsplash.com/photo-1589409514187-c21d14df0d04?w=300&q=80",
      condition: "Good",
      genre: "Science Fiction",
    },
    {
      id: "8",
      title: "The Alchemist",
      author: "Paulo Coelho",
      coverImage:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
      condition: "Good",
      genre: "Fiction",
    },
    {
      id: "9",
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      coverImage:
        "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=300&q=80",
      condition: "Very Good",
      genre: "Fantasy",
    },
    {
      id: "10",
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      coverImage:
        "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=300&q=80",
      condition: "Good",
      genre: "Fantasy",
    },
    {
      id: "11",
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      coverImage:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&q=80",
      condition: "Like New",
      genre: "Science",
    },
    {
      id: "12",
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      coverImage:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
      condition: "Good",
      genre: "Fiction",
    },
    {
      id: "13",
      title: "The Da Vinci Code",
      author: "Dan Brown",
      coverImage:
        "https://images.unsplash.com/photo-1589998059171-988d887df646?w=300&q=80",
      condition: "Very Good",
      genre: "Mystery",
    },
  ]);

  // Mock data for the profile
  const user = {
    id: "1",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    email: "jane.smith@example.com",
    location: "New York, NY",
    bio: "Book lover and collector. Interested in fiction, science, and history books. Always looking for new reads and interesting exchanges!",
    joinedDate: "January 2023",
    exchangesCompleted: 24,
    followers: 156,
    following: 89,
    booksAdded: 42,
    exchangeRating: 4.8,
    socialLinks: {
      twitter: "@janebooks",
      instagram: "jane.reads",
      goodreads: "janesmith",
    },
    badges: ["Top Exchanger", "Book Enthusiast", "Verified User"],
    favoriteGenres: [
      "Fiction",
      "Science Fiction",
      "Mystery",
      "Biography",
      "History",
    ],
    recentActivity: [
      {
        type: "exchange",
        book: "Dune",
        with: "Alex Johnson",
        date: "2023-11-01",
      },
      { type: "added", book: "The Great Gatsby", date: "2023-10-25" },
      { type: "review", book: "1984", rating: 5, date: "2023-10-15" },
    ],
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
      {/* Add Book Dialog */}
      <Dialog open={showAddBookDialog} onOpenChange={setShowAddBookDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Your Book for Exchange</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Title *
                </label>
                <Input
                  placeholder="Book title"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Author *
                </label>
                <Input
                  placeholder="Author name"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Book Images *
              </label>
              <div className="border-2 border-dashed border-border rounded-md p-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload book photos
                  </span>
                </label>
              </div>

              {newBook.images.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {newBook.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Book ${index + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                What books are you looking for?
              </label>
              <Textarea
                placeholder="Describe the types of books you'd like to exchange for (e.g., Fiction novels, Science textbooks, Mystery books, etc.)"
                value={newBook.askingBooks}
                onChange={(e) =>
                  setNewBook({ ...newBook, askingBooks: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Asking Price (Optional)
                </label>
                <Input
                  placeholder="Price in BDT (if selling)"
                  value={newBook.askingPrice}
                  onChange={(e) =>
                    setNewBook({ ...newBook, askingPrice: e.target.value })
                  }
                  type="number"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Book Condition *
                </label>
                <Select
                  value={newBook.condition}
                  onValueChange={(value) =>
                    setNewBook({
                      ...newBook,
                      condition: value as Book["condition"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Like New">Like New</SelectItem>
                    <SelectItem value="Very Good">Very Good</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Purchase Date
              </label>
              <Input
                type="date"
                value={newBook.purchaseDate}
                onChange={(e) =>
                  setNewBook({ ...newBook, purchaseDate: e.target.value })
                }
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="rokomari-checkbox"
                checked={newBook.boughtFromRokomari}
                onCheckedChange={(checked) =>
                  setNewBook({
                    ...newBook,
                    boughtFromRokomari: checked as boolean,
                  })
                }
              />
              <label
                htmlFor="rokomari-checkbox"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I bought this book from Rokomari
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowAddBookDialog(false);
                setNewBook({
                  title: "",
                  author: "",
                  images: [],
                  askingBooks: "",
                  askingPrice: "",
                  condition: "Very Good",
                  purchaseDate: "",
                  boughtFromRokomari: false,
                });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddBook}
              disabled={
                !newBook.title || !newBook.author || newBook.images.length === 0
              }
            >
              Add Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Header */}
      <Header />
      <div className="container mx-auto py-4">
        <Button
          variant="outline"
          className="mb-4 hover:bg-blue-100 flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>
      </div>

      {/* Profile Content */}
      <div className="flex flex-col md:flex-row gap-8 container mx-auto px-4">
        {/* Profile Sidebar */}
        <div className="md:w-1/3">
          <Card className="shadow-xl border-none rounded-xl overflow-hidden bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center bg-gradient-to-b from-blue-50/50 to-white pb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 to-blue-100/50 h-16 -mt-6"></div>
                <div className="relative">
                  <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-white shadow-lg relative z-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-white text-2xl">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isOwnProfile && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-4 right-1/3 bg-white/90 hover:bg-white rounded-full h-8 w-8"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <span className="flex items-center justify-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  {user.location}
                </span>
                <span className="flex items-center justify-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  Member since {user.joinedDate}
                </span>

                {/* Social Stats */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="bg-blue-50 p-2 rounded-md">
                    <p className="text-lg font-bold">{user.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-md">
                    <p className="text-lg font-bold">{user.following}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-md">
                    <p className="text-lg font-bold">{user.booksAdded}</p>
                    <p className="text-xs text-muted-foreground">Books</p>
                  </div>
                </div>

                <div className="flex justify-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-yellow-400 text-black font-medium"
                  >
                    <Award className="h-3 w-3 mr-1" />
                    {user.exchangesCompleted} Exchanges
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-blue-500 text-white font-medium"
                  >
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    {user.exchangeRating}
                  </Badge>
                </div>

                {/* User Badges */}
                <div className="flex flex-wrap justify-center gap-1 mt-2">
                  {user.badges.map((badge, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-medium mb-2 flex items-center gap-1">
                  <User className="h-4 w-4 text-primary" />
                  About
                </h3>
                <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md">
                  {user.bio}
                </p>
              </div>
              <Separator className="my-4" />
              <div className="mb-4">
                <h3 className="font-medium mb-2 flex items-center gap-1">
                  <Mail className="h-4 w-4 text-primary" />
                  Contact
                </h3>
                <p className="text-sm text-muted-foreground bg-blue-50 p-3 rounded-md flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  {user.email}
                </p>

                {/* Social Media Links */}
                <div className="mt-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="bg-blue-400 text-white p-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </div>
                    {user.socialLinks.twitter}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </div>
                    {user.socialLinks.instagram}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="bg-amber-600 text-white p-1 rounded-full">
                      <BookOpen className="h-3.5 w-3.5" />
                    </div>
                    {user.socialLinks.goodreads}
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="mb-4">
                <h3 className="font-medium mb-2 flex items-center gap-1">
                  <BookMarked className="h-4 w-4 text-primary" />
                  Reading Preferences
                </h3>
                <div className="flex flex-wrap gap-1">
                  {user.favoriteGenres.map((genre, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="mb-4">
                <h3 className="font-medium mb-2 flex items-center gap-1">
                  <History className="h-4 w-4 text-primary" />
                  Recent Activity
                </h3>
                <div className="space-y-2">
                  {user.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="text-xs bg-blue-50 p-2 rounded-md flex items-center gap-2"
                    >
                      {activity.type === "exchange" && (
                        <ArrowLeft className="h-3 w-3 text-green-500" />
                      )}
                      {activity.type === "added" && (
                        <Plus className="h-3 w-3 text-blue-500" />
                      )}
                      {activity.type === "review" && (
                        <Star className="h-3 w-3 text-amber-500" />
                      )}
                      <div>
                        {activity.type === "exchange" && (
                          <span>
                            Exchanged <strong>{activity.book}</strong> with{" "}
                            {activity.with}
                          </span>
                        )}
                        {activity.type === "added" && (
                          <span>
                            Added <strong>{activity.book}</strong> to collection
                          </span>
                        )}
                        {activity.type === "review" && (
                          <span>
                            Reviewed <strong>{activity.book}</strong> -{" "}
                            {activity.rating}/5 stars
                          </span>
                        )}
                        <p className="text-muted-foreground mt-0.5">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
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
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Upgrade Account
                  </Button>
                )}
                {!isOwnProfile && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-blue-500 text-blue-600 hover:bg-blue-50"
                      size="sm"
                    >
                      <User className="mr-2 h-4 w-4" /> Follow
                    </Button>
                    <Link to="/messages" className="flex-1">
                      <Button
                        variant="default"
                        className="w-full bg-primary hover:bg-primary/90"
                        size="sm"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" /> Message
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3">
          {/* Stats Section */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-primary" />
              Activity Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Books Listed</p>
                  <BookOpen className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold">{availableBooks.length}</p>
                <p className="text-xs text-green-600 mt-1">+3 this month</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Exchanges</p>
                  <ArrowLeft className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold">{user.exchangesCompleted}</p>
                <p className="text-xs text-green-600 mt-1">+5 this month</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-l-yellow-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold">{exchangeRequests.length}</p>
                <p className="text-xs text-blue-600 mt-1">2 new requests</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Books Sold</p>
                  <DollarSign className="h-5 w-5 text-red-500" />
                </div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-green-600 mt-1">৳1,850 earned</p>
              </div>
            </div>
          </div>

          <Tabs
            defaultValue="available-books"
            value={activeTab}
            onValueChange={setActiveTab}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden mt-6"
          >
            <TabsList className="grid w-full grid-cols-5 p-1 bg-blue-50">
              <TabsTrigger
                value="available-books"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">Available Books</span>
                  <span className="sm:hidden">Books</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="exchange-requests"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">Exchange Requests</span>
                  <span className="sm:hidden">Requests</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="exchange-history"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <History className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">Exchange History</span>
                  <span className="sm:hidden">History</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="wishlist"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">Wishlist</span>
                  <span className="sm:hidden">Wishlist</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">Reviews</span>
                  <span className="sm:hidden">Reviews</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="available-books" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    <BookOpen className="mr-2 h-6 w-6 text-primary" />
                    Available Books
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Books available for exchange or sale
                  </p>
                </div>
                {isOwnProfile && (
                  <Button
                    onClick={() => setShowAddBookDialog(true)}
                    className="bg-green-600 hover:bg-green-700 transition-all duration-200 hover:scale-105"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Book
                  </Button>
                )}
              </div>

              {/* Search and Filter */}
              <div className="mb-6 flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or author"
                    className="pl-10"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    <SelectItem value="fiction">Fiction</SelectItem>
                    <SelectItem value="scifi">Science Fiction</SelectItem>
                    <SelectItem value="mystery">Mystery</SelectItem>
                    <SelectItem value="biography">Biography</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="like-new">Like New</SelectItem>
                    <SelectItem value="very-good">Very Good</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {availableBooks.map((book) => (
                  <div key={book.id} className="w-full max-w-[280px] mx-auto">
                    <BookCard
                      id={book.id}
                      title={book.title}
                      author={book.author}
                      images={[book.coverImage]}
                      condition={
                        book.condition === "New"
                          ? 5
                          : book.condition === "Like New"
                            ? 4
                            : book.condition === "Very Good"
                              ? 3
                              : book.condition === "Good"
                                ? 2
                                : 1
                      }
                      genre={book.genre}
                      askingPrice={200}
                      rokomariPrice={300}
                      isForSale={true}
                      isForExchange={true}
                      owner={{
                        name: user.name,
                        avatar: user.avatar
                      }}
                      onExchangeClick={(book) => console.log("Exchange clicked", book)}
                      onReviewClick={(book) => console.log("Review clicked", book)}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-primary text-white"
                  >
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="exchange-requests" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    <ArrowLeft className="h-6 w-6 mr-2 text-primary" />
                    Exchange Requests
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your incoming and outgoing exchange requests
                  </p>
                </div>
                <div>
                  <Tabs defaultValue="incoming" className="w-[300px]">
                    <TabsList>
                      <TabsTrigger value="incoming" className="flex-1">
                        Incoming (2)
                      </TabsTrigger>
                      <TabsTrigger value="outgoing" className="flex-1">
                        Outgoing (1)
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              {exchangeRequests.length > 0 ? (
                <div className="space-y-4">
                  {exchangeRequests.map((request) => (
                    <Card
                      key={request.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 p-4 bg-gradient-to-br from-blue-50 to-blue-100">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={request.user.avatar}
                                  alt={request.user.name}
                                />
                                <AvatarFallback>
                                  {request.user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {request.user.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {request.date}
                                </p>
                              </div>
                            </div>
                            <Badge
                              className="mt-3"
                              variant={
                                request.status === "pending"
                                  ? "outline"
                                  : "secondary"
                              }
                            >
                              {request.status.charAt(0).toUpperCase() +
                                request.status.slice(1)}
                            </Badge>

                            <div className="mt-4 flex flex-col gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full justify-start"
                              >
                                <MessageCircle className="h-3.5 w-3.5 mr-2" />{" "}
                                Message
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full justify-start"
                              >
                                <User className="h-3.5 w-3.5 mr-2" /> View
                                Profile
                              </Button>
                            </div>
                          </div>
                          <div className="md:w-3/4 p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1">
                                <p className="font-medium flex items-center gap-1">
                                  <BookOpen className="h-4 w-4 text-blue-500" />
                                  They want:
                                </p>
                                <div className="mt-2">
                                  <BookCard
                                    id={request.book.id}
                                    title={request.book.title}
                                    author={request.book.author}
                                    images={[request.book.coverImage]}
                                    condition={
                                      request.book.condition === "New"
                                        ? 5
                                        : request.book.condition === "Like New"
                                          ? 4
                                          : request.book.condition === "Very Good"
                                            ? 3
                                            : request.book.condition === "Good"
                                              ? 2
                                              : 1
                                    }
                                    genre={request.book.genre}
                                    isForSale={true}
                                    isForExchange={true}
                                    owner={request.user}
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium flex items-center gap-1">
                                  <ArrowLeft className="h-4 w-4 text-green-500" />
                                  They offer:
                                </p>
                                <div className="mt-2">
                                  <BookCard
                                    id={request.offeredBook.id}
                                    title={request.offeredBook.title}
                                    author={request.offeredBook.author}
                                    images={[request.offeredBook.coverImage]}
                                    condition={
                                      request.offeredBook.condition === "New"
                                        ? 5
                                        : request.offeredBook.condition === "Like New"
                                          ? 4
                                          : request.offeredBook.condition === "Very Good"
                                            ? 3
                                            : request.offeredBook.condition === "Good"
                                              ? 2
                                              : 1
                                    }
                                    genre={request.offeredBook.genre}
                                    isForSale={true}
                                    isForExchange={true}
                                    owner={request.user}
                                  />
                                </div>
                              </div>
                            </div>
                            {request.message && (
                              <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
                                <p className="font-medium flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4 text-blue-500" />
                                  Message:
                                </p>
                                <p className="text-sm mt-1">
                                  {request.message}
                                </p>
                              </div>
                            )}
                            {isOwnProfile && request.status === "pending" && (
                              <div className="mt-4 flex gap-2 justify-end">
                                <Button
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                >
                                  <X className="h-4 w-4 mr-2" /> Decline
                                </Button>
                                <Button className="bg-green-600 hover:bg-green-700">
                                  <Check className="h-4 w-4 mr-2" /> Accept
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-blue-500 text-blue-500 hover:bg-blue-50"
                                >
                                  <MessageCircle className="h-4 w-4 mr-2" />{" "}
                                  Counter Offer
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
                <div className="text-center py-12 bg-blue-50 rounded-lg">
                  <BookOpen className="h-12 w-12 text-blue-300 mx-auto mb-3" />
                  <p className="text-lg font-medium">
                    No exchange requests yet
                  </p>
                  <p className="text-muted-foreground">
                    When someone wants to exchange books with you, requests will
                    appear here
                  </p>
                  <Button className="mt-4">Browse Books</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="exchange-history" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    <History className="h-6 w-6 mr-2 text-primary" />
                    Exchange History
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your completed book exchanges
                  </p>
                </div>
                <Select defaultValue="all-time">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="this-year">This Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {exchangeHistory.length > 0 ? (
                <div className="space-y-4">
                  {exchangeHistory.map((exchange) => (
                    <Card
                      key={exchange.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4 p-4 bg-gradient-to-br from-green-50 to-green-100">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={exchange.user.avatar}
                                  alt={exchange.user.name}
                                />
                                <AvatarFallback>
                                  {exchange.user.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {exchange.user.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {exchange.date}
                                </p>
                              </div>
                            </div>
                            <Badge
                              className="mt-3 bg-green-500 text-white"
                              variant="secondary"
                            >
                              Completed
                            </Badge>

                            <div className="mt-4 flex flex-col gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full justify-start"
                              >
                                <Star className="h-3.5 w-3.5 mr-2 text-yellow-500" />{" "}
                                Leave Review
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full justify-start"
                              >
                                <User className="h-3.5 w-3.5 mr-2" /> View
                                Profile
                              </Button>
                            </div>
                          </div>
                          <div className="md:w-3/4 p-4">
                            <div className="flex flex-col md:flex-row gap-4">
                              <div className="flex-1">
                                <p className="font-medium flex items-center gap-1">
                                  <ArrowRight className="h-4 w-4 text-red-500" />
                                  You exchanged:
                                </p>
                                <div className="mt-2">
                                  <BookCard
                                    id={exchange.book.id}
                                    title={exchange.book.title}
                                    author={exchange.book.author}
                                    images={[exchange.book.coverImage]}
                                    condition={
                                      exchange.book.condition === "New"
                                        ? 5
                                        : exchange.book.condition === "Like New"
                                          ? 4
                                          : exchange.book.condition === "Very Good"
                                            ? 3
                                            : exchange.book.condition === "Good"
                                              ? 2
                                              : 1
                                    }
                                    genre={exchange.book.genre}
                                    isForSale={true}
                                    isForExchange={true}
                                    owner={exchange.user}
                                  />
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium flex items-center gap-1">
                                  <ArrowLeft className="h-4 w-4 text-green-500" />
                                  You received:
                                </p>
                                <div className="mt-2">
                                  <BookCard
                                    id={exchange.offeredBook.id}
                                    title={exchange.offeredBook.title}
                                    author={exchange.offeredBook.author}
                                    images={[exchange.offeredBook.coverImage]}
                                    condition={
                                      exchange.offeredBook.condition === "New"
                                        ? 5
                                        : exchange.offeredBook.condition === "Like New"
                                          ? 4
                                          : exchange.offeredBook.condition === "Very Good"
                                            ? 3
                                            : exchange.offeredBook.condition === "Good"
                                              ? 2
                                              : 1
                                    }
                                    genre={exchange.offeredBook.genre}
                                    isForSale={true}
                                    isForExchange={true}
                                    owner={exchange.user}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 p-3 rounded-md border border-green-100 bg-green-50">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Check className="h-5 w-5 text-green-500" />
                                  <span className="font-medium">
                                    Exchange completed successfully
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-primary"
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-blue-50 rounded-lg">
                  <History className="h-12 w-12 text-blue-300 mx-auto mb-3" />
                  <p className="text-lg font-medium">No exchange history yet</p>
                  <p className="text-muted-foreground">
                    Your completed exchanges will appear here
                  </p>
                  <Button className="mt-4">Browse Books to Exchange</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="wishlist" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    <Heart className="h-6 w-6 mr-2 text-primary" />
                    Wishlist
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Books you're interested in acquiring
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-blue-300 hover:bg-blue-50"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add to Wishlist
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card
                    key={i}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[3/4] w-full relative">
                      <img
                        src={`https://images.unsplash.com/photo-154494795095${i}-fa07a98d237f?w=300&q=80`}
                        alt="Wishlist book"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
                      >
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-1">
                        Wishlist Book {i}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Author Name
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline">Fiction</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600"
                        >
                          <Search className="h-3.5 w-3.5 mr-1" /> Find
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold flex items-center">
                    <Star className="h-6 w-6 mr-2 text-primary" />
                    Reviews
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reviews from your exchanges
                  </p>
                </div>
                <Tabs defaultValue="received" className="w-[300px]">
                  <TabsList>
                    <TabsTrigger value="received" className="flex-1">
                      Received (8)
                    </TabsTrigger>
                    <TabsTrigger value="given" className="flex-1">
                      Given (6)
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card
                    key={i}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`}
                          />
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">User Name {i}</p>
                              <div className="flex items-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                                <span className="ml-2 text-sm text-muted-foreground">
                                  4.0
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              2023-10-{10 + i}
                            </p>
                          </div>
                          <p className="mt-2 text-sm">
                            Great exchange experience! The book was in excellent
                            condition as described and the exchange process was
                            smooth.
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <Badge variant="outline" className="bg-blue-50">
                              For: The Great Gatsby
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <ThumbsUp className="h-3.5 w-3.5" /> Helpful (3)
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
