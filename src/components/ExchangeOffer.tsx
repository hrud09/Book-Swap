import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Star,
  Upload,
  X,
  DollarSign,
  BookOpen,
  Calendar,
  Camera,
  ArrowLeft,
} from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  images: string[];
  condition: number;
  genre: string;
  askingPrice?: number;
  rokomariPrice?: number;
  preferredExchangeBooks?: string[];
  isForSale: boolean;
  isForExchange: boolean;
  owner: {
    name: string;
    avatar: string;
  };
}

interface MyBook {
  id: string;
  title: string;
  author: string;
  images: string[];
  condition: number;
  genre: string;
  description: string;
  buyingDate: string;
  estimatedValue: number;
}

interface ExchangeOfferProps {
  targetBook?: Book;
  onBack?: () => void;
  onSubmitOffer?: (offer: any) => void;
}

const ExchangeOffer = ({
  targetBook = {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    ],
    condition: 4,
    genre: "Fiction",
    askingPrice: 250,
    rokomariPrice: 350,
    preferredExchangeBooks: ["To Kill a Mockingbird", "1984"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    },
  },
  onBack = () => {},
  onSubmitOffer = () => {},
}: ExchangeOfferProps) => {
  const [offerType, setOfferType] = useState<"money" | "books" | "both">(
    "both",
  );
  const [moneyOffer, setMoneyOffer] = useState("");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [showAddBookDialog, setShowAddBookDialog] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    images: [] as string[],
    condition: 5,
    genre: "",
    description: "",
    buyingDate: "",
    estimatedValue: 0,
  });

  const [myBooks, setMyBooks] = useState<MyBook[]>([
    {
      id: "101",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      images: [
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80",
      ],
      condition: 4,
      genre: "Fiction",
      description: "Classic American literature in good condition",
      buyingDate: "2023-01-15",
      estimatedValue: 200,
    },
    {
      id: "102",
      title: "1984",
      author: "George Orwell",
      images: [
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
      ],
      condition: 3,
      genre: "Dystopian Fiction",
      description: "Well-read copy with some wear on edges",
      buyingDate: "2022-11-20",
      estimatedValue: 180,
    },
    {
      id: "103",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      images: [
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      ],
      condition: 5,
      genre: "Romance",
      description: "Like new condition, barely read",
      buyingDate: "2023-06-10",
      estimatedValue: 220,
    },
  ]);

  const renderConditionStars = (condition: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < condition ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ));
  };

  const toggleBookSelection = (bookId: string) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const calculateTotalValue = () => {
    const booksValue = myBooks
      .filter((book) => selectedBooks.includes(book.id))
      .reduce((sum, book) => sum + book.estimatedValue, 0);
    const money = parseFloat(moneyOffer) || 0;
    return booksValue + money;
  };

  const handleSubmitOffer = () => {
    const offer = {
      targetBookId: targetBook.id,
      type: offerType,
      moneyAmount: parseFloat(moneyOffer) || 0,
      offeredBooks: myBooks.filter((book) => selectedBooks.includes(book.id)),
      message,
      totalValue: calculateTotalValue(),
    };
    onSubmitOffer(offer);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Convert files to URLs for preview
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

  return (
    <div className="container mx-auto p-4 max-w-6xl bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Make an Offer</h1>
          <p className="text-muted-foreground">
            Create your offer for &quot;{targetBook.title}&quot;
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Target Book Info */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Book Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img
                  src={targetBook.images[0]}
                  alt={targetBook.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{targetBook.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {targetBook.author}
                  </p>
                  <div className="flex items-center mt-2">
                    {renderConditionStars(targetBook.condition)}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {targetBook.condition}/5
                    </span>
                  </div>
                </div>

                {targetBook.isForSale && targetBook.askingPrice && (
                  <div className="p-3 bg-green-50 rounded-md">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Asking Price:</span>
                      <span className="text-lg font-bold text-green-600">
                        ৳{targetBook.askingPrice}
                      </span>
                    </div>
                    {targetBook.rokomariPrice && (
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-xs text-muted-foreground">
                          New Price:
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ৳{targetBook.rokomariPrice}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {targetBook.preferredExchangeBooks &&
                  targetBook.preferredExchangeBooks.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">
                        Owner prefers:
                      </h4>
                      <div className="space-y-1">
                        {targetBook.preferredExchangeBooks.map(
                          (book, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {book}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Offer Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="both"
                onValueChange={(value) => setOfferType(value as any)}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="money">Money Only</TabsTrigger>
                  <TabsTrigger value="books">Books Only</TabsTrigger>
                  <TabsTrigger value="both">Books + Money</TabsTrigger>
                </TabsList>

                <TabsContent value="money" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Offer Amount (৳)
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter your offer amount"
                      value={moneyOffer}
                      onChange={(e) => setMoneyOffer(e.target.value)}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="books" className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium">
                        Select books to offer:
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddBookDialog(true)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Add Book
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {myBooks.map((book) => (
                        <div
                          key={book.id}
                          className={`border rounded-md p-3 cursor-pointer transition-colors ${
                            selectedBooks.includes(book.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => toggleBookSelection(book.id)}
                        >
                          <div className="flex gap-3">
                            <img
                              src={book.images[0]}
                              alt={book.title}
                              className="w-16 h-20 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">
                                {book.title}
                              </h4>
                              <p className="text-xs text-muted-foreground truncate">
                                {book.author}
                              </p>
                              <div className="flex items-center mt-1">
                                {renderConditionStars(book.condition)}
                              </div>
                              <p className="text-xs font-medium text-green-600 mt-1">
                                Est. Value: ৳{book.estimatedValue}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="both" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Additional Money (৳)
                    </label>
                    <Input
                      type="number"
                      placeholder="Optional additional amount"
                      value={moneyOffer}
                      onChange={(e) => setMoneyOffer(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium">
                        Select books to offer:
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddBookDialog(true)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Add Book
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {myBooks.map((book) => (
                        <div
                          key={book.id}
                          className={`border rounded-md p-3 cursor-pointer transition-colors ${
                            selectedBooks.includes(book.id)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => toggleBookSelection(book.id)}
                        >
                          <div className="flex gap-3">
                            <img
                              src={book.images[0]}
                              alt={book.title}
                              className="w-16 h-20 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">
                                {book.title}
                              </h4>
                              <p className="text-xs text-muted-foreground truncate">
                                {book.author}
                              </p>
                              <div className="flex items-center mt-1">
                                {renderConditionStars(book.condition)}
                              </div>
                              <p className="text-xs font-medium text-green-600 mt-1">
                                Est. Value: ৳{book.estimatedValue}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Total Value Display */}
              {(selectedBooks.length > 0 || moneyOffer) && (
                <div className="mt-6 p-4 bg-muted rounded-md">
                  <h3 className="font-medium mb-2">Offer Summary</h3>
                  <div className="space-y-1 text-sm">
                    {selectedBooks.length > 0 && (
                      <div className="flex justify-between">
                        <span>Books Value:</span>
                        <span>
                          ৳
                          {myBooks
                            .filter((book) => selectedBooks.includes(book.id))
                            .reduce(
                              (sum, book) => sum + book.estimatedValue,
                              0,
                            )}
                        </span>
                      </div>
                    )}
                    {moneyOffer && (
                      <div className="flex justify-between">
                        <span>Money:</span>
                        <span>৳{moneyOffer}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total Offer:</span>
                      <span>৳{calculateTotalValue()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="mt-6">
                <label className="text-sm font-medium mb-2 block">
                  Message to Owner (Optional)
                </label>
                <Textarea
                  placeholder="Add a personal message to explain your offer..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleSubmitOffer}
                disabled={!selectedBooks.length && !moneyOffer}
              >
                Submit Offer
              </Button>
            </CardFooter>
          </Card>
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
                  Buying Date
                </label>
                <Input
                  type="date"
                  value={newBook.buyingDate}
                  onChange={(e) =>
                    setNewBook({ ...newBook, buyingDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Condition (1-5)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={newBook.condition}
                  onChange={(e) =>
                    setNewBook({
                      ...newBook,
                      condition: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Estimated Value (৳)
                </label>
                <Input
                  type="number"
                  placeholder="Estimated value"
                  value={newBook.estimatedValue}
                  onChange={(e) =>
                    setNewBook({
                      ...newBook,
                      estimatedValue: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                Description
              </label>
              <Textarea
                placeholder="Describe the book's condition, any notes..."
                value={newBook.description}
                onChange={(e) =>
                  setNewBook({ ...newBook, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Photos</label>
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
                        onClick={() => removeImage(index)}
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
              onClick={() => setShowAddBookDialog(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Add book to myBooks list
                const bookToAdd: MyBook = {
                  id: Date.now().toString(), // Simple ID generation
                  title: newBook.title,
                  author: newBook.author,
                  images: newBook.images,
                  condition: newBook.condition,
                  genre: newBook.genre,
                  description: newBook.description,
                  buyingDate: newBook.buyingDate,
                  estimatedValue: newBook.estimatedValue,
                };

                setMyBooks((prevBooks) => [...prevBooks, bookToAdd]);
                setShowAddBookDialog(false);

                // Reset form
                setNewBook({
                  title: "",
                  author: "",
                  images: [],
                  condition: 5,
                  genre: "",
                  description: "",
                  buyingDate: "",
                  estimatedValue: 0,
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

export default ExchangeOffer;
