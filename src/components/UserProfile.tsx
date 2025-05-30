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
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import BookCard from "./BookCard";

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
    <div className="container mx-auto py-8 bg-background">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="md:w-1/3">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription className="flex flex-col gap-2">
                <span>{user.location}</span>
                <span>Member since {user.joinedDate}</span>
                <Badge variant="secondary" className="self-center mt-2">
                  {user.exchangesCompleted} Exchanges
                </Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="font-medium mb-2">About</h3>
                <p className="text-sm text-muted-foreground">{user.bio}</p>
              </div>
              <Separator className="my-4" />
              <div className="mb-4">
                <h3 className="font-medium mb-2">Contact</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              {isOwnProfile && (
                <Button variant="outline" className="w-full mt-4" size="sm">
                  <Settings className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}
              {!isOwnProfile && (
                <Button variant="outline" className="w-full mt-4" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" /> Send Message
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3">
          <Tabs
            defaultValue="available-books"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="available-books">
                <BookOpen className="mr-2 h-4 w-4" /> Available Books
              </TabsTrigger>
              <TabsTrigger value="exchange-requests">
                <History className="mr-2 h-4 w-4" /> Exchange Requests
              </TabsTrigger>
              <TabsTrigger value="exchange-history">
                <History className="mr-2 h-4 w-4" /> Exchange History
              </TabsTrigger>
            </TabsList>

            {/* Available Books Tab */}
            <TabsContent value="available-books" className="mt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Available Books</h2>
                {isOwnProfile && (
                  <Button onClick={() => setShowAddBookDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Book
                  </Button>
                )}
              </div>

              {availableBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableBooks.map((book) => (
                    <div key={book.id} className="relative">
                      <BookCard
                        title={book.title}
                        author={book.author}
                        coverImage={book.coverImage}
                        condition={book.condition}
                      />
                      {isOwnProfile && (
                        <div className="absolute top-2 right-2 flex gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 bg-background/80 backdrop-blur-sm"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 bg-background/80 backdrop-blur-sm text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground">
                    No books available for exchange.
                  </p>
                  {isOwnProfile && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setShowAddBookDialog(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Your First Book
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Exchange Requests Tab */}
            <TabsContent value="exchange-requests" className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Exchange Requests</h2>

              {exchangeRequests.length > 0 ? (
                <div className="space-y-6">
                  {exchangeRequests.map((request) => (
                    <Card key={request.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={request.user.avatar}
                                alt={request.user.name}
                              />
                              <AvatarFallback>
                                {request.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">
                                {request.user.name}
                              </CardTitle>
                              <CardDescription>
                                Requested on{" "}
                                {new Date(request.date).toLocaleDateString()}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge>{request.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium mb-2">Your Book</h3>
                            <div className="flex gap-4">
                              <img
                                src={request.book.coverImage}
                                alt={request.book.title}
                                className="w-20 h-28 object-cover rounded-md"
                              />
                              <div>
                                <p className="font-medium">
                                  {request.book.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {request.book.author}
                                </p>
                                <Badge variant="outline" className="mt-2">
                                  {request.book.condition}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Offered Book</h3>
                            <div className="flex gap-4">
                              <img
                                src={request.offeredBook.coverImage}
                                alt={request.offeredBook.title}
                                className="w-20 h-28 object-cover rounded-md"
                              />
                              <div>
                                <p className="font-medium">
                                  {request.offeredBook.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {request.offeredBook.author}
                                </p>
                                <Badge variant="outline" className="mt-2">
                                  {request.offeredBook.condition}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>

                        {request.message && (
                          <div className="mt-4 p-3 bg-muted rounded-md">
                            <p className="text-sm italic">
                              "{request.message}"
                            </p>
                          </div>
                        )}

                        {isOwnProfile && request.status === "pending" && (
                          <div className="flex gap-4 mt-6">
                            <Button className="flex-1">Accept Exchange</Button>
                            <Button variant="outline" className="flex-1">
                              Decline
                            </Button>
                            <Button variant="ghost">Message</Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground">
                    No exchange requests at the moment.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Exchange History Tab */}
            <TabsContent value="exchange-history" className="mt-6">
              <h2 className="text-2xl font-bold mb-6">Exchange History</h2>

              {exchangeHistory.length > 0 ? (
                <div className="space-y-6">
                  {exchangeHistory.map((exchange) => (
                    <Card key={exchange.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={exchange.user.avatar}
                                alt={exchange.user.name}
                              />
                              <AvatarFallback>
                                {exchange.user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">
                                {exchange.user.name}
                              </CardTitle>
                              <CardDescription>
                                Exchanged on{" "}
                                {new Date(exchange.date).toLocaleDateString()}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="secondary">{exchange.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="font-medium mb-2">Your Book</h3>
                            <div className="flex gap-4">
                              <img
                                src={exchange.book.coverImage}
                                alt={exchange.book.title}
                                className="w-20 h-28 object-cover rounded-md"
                              />
                              <div>
                                <p className="font-medium">
                                  {exchange.book.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {exchange.book.author}
                                </p>
                                <Badge variant="outline" className="mt-2">
                                  {exchange.book.condition}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium mb-2">Received Book</h3>
                            <div className="flex gap-4">
                              <img
                                src={exchange.offeredBook.coverImage}
                                alt={exchange.offeredBook.title}
                                className="w-20 h-28 object-cover rounded-md"
                              />
                              <div>
                                <p className="font-medium">
                                  {exchange.offeredBook.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {exchange.offeredBook.author}
                                </p>
                                <Badge variant="outline" className="mt-2">
                                  {exchange.offeredBook.condition}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground">
                    No exchange history yet.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Book Dialog */}
      <Dialog open={showAddBookDialog} onOpenChange={setShowAddBookDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Your Book</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="Book title"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Author</label>
                <Input
                  placeholder="Author name"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Genre</label>
                <Input
                  placeholder="Book genre"
                  value={newBook.genre}
                  onChange={(e) =>
                    setNewBook({ ...newBook, genre: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Condition
                </label>
                <Select
                  value={newBook.condition}
                  onValueChange={(value: Book["condition"]) =>
                    setNewBook({ ...newBook, condition: value })
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
                Asking Books
              </label>
              <Textarea
                placeholder="What books are you looking for in exchange? (e.g., Fiction novels, Science textbooks, etc.)"
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
                Bought from Rokomari
              </label>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Photos</label>
              <div className="border-2 border-dashed border-border rounded-md p-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      const imageUrls = Array.from(files).map((file) =>
                        URL.createObjectURL(file),
                      );
                      setNewBook({
                        ...newBook,
                        images: [...newBook.images, ...imageUrls],
                      });
                    }
                  }}
                  className="hidden"
                  id="image-upload-profile"
                />
                <label
                  htmlFor="image-upload-profile"
                  className="flex flex-col items-center cursor-pointer"
                >
                  <Camera className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload photos
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
                        onClick={() => {
                          setNewBook({
                            ...newBook,
                            images: newBook.images.filter(
                              (_, i) => i !== index,
                            ),
                          });
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
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
                  condition: "Very Good",
                  genre: "",
                  askingBooks: "",
                  askingPrice: "",
                  purchaseDate: "",
                  boughtFromRokomari: false,
                });
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                const bookToAdd: Book = {
                  id: Date.now().toString(),
                  title: newBook.title,
                  author: newBook.author,
                  coverImage:
                    newBook.images[0] ||
                    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80",
                  condition: newBook.condition,
                  genre: newBook.genre,
                };

                setAvailableBooks((prevBooks) => [...prevBooks, bookToAdd]);
                setShowAddBookDialog(false);

                // Reset form
                setNewBook({
                  title: "",
                  author: "",
                  images: [],
                  condition: "Very Good",
                  genre: "",
                  askingBooks: "",
                  askingPrice: "",
                  purchaseDate: "",
                  boughtFromRokomari: false,
                });
              }}
              disabled={
                !newBook.title || !newBook.author || newBook.images.length === 0
              }
            >
              Add Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
