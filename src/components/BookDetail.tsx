import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, MessageCircle, User, BookOpen, Calendar } from "lucide-react";

interface BookDetailProps {
  book?: {
    id: string;
    title: string;
    author: string;
    coverImage: string;
    description: string;
    condition: number;
    genre: string[];
    publishedYear: number;
    owner: {
      id: string;
      name: string;
      avatar: string;
      rating: number;
      booksAvailable: number;
    };
  };
}

const BookDetail = ({
  book = {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    condition: 4,
    genre: ["Fiction", "Classic", "Romance"],
    publishedYear: 1925,
    owner: {
      id: "101",
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      rating: 4.8,
      booksAvailable: 12,
    },
  },
}: BookDetailProps) => {
  const [exchangeDialogOpen, setExchangeDialogOpen] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  // Mock user's books available for exchange
  const myBooks = [
    {
      id: "101",
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      coverImage:
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80",
    },
    {
      id: "102",
      title: "1984",
      author: "George Orwell",
      coverImage:
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
    },
    {
      id: "103",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverImage:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    },
  ];

  const toggleBookSelection = (bookId: string) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const handleExchangeRequest = () => {
    // Here you would handle the exchange request submission
    console.log("Exchange request submitted with books:", selectedBooks);
    console.log("Message:", message);
    setExchangeDialogOpen(false);
  };

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

  return (
    <div className="container mx-auto p-4 max-w-6xl bg-background">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Book Cover and Quick Info */}
        <div className="md:col-span-1">
          <Card className="overflow-hidden h-full flex flex-col">
            <div className="relative pt-[140%] bg-muted">
              <img
                src={book.coverImage}
                alt={book.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <CardContent className="flex-grow p-4">
              <div className="flex items-center space-x-2 mb-2">
                {renderConditionStars(book.condition)}
                <span className="text-sm text-muted-foreground">
                  Condition: {book.condition}/5
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {book.genre.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <Button
                className="w-full"
                onClick={() => setExchangeDialogOpen(true)}
              >
                Request Exchange
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Book Details */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{book.title}</CardTitle>
              <div className="text-lg text-muted-foreground">{book.author}</div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="owner">Owner</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <BookOpen className="h-4 w-4" /> Description
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {book.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Published
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {book.publishedYear}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="owner">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={book.owner.avatar}
                        alt={book.owner.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{book.owner.name}</h3>
                      <div className="flex items-center">
                        <div className="flex mr-2">
                          {Array(5)
                            .fill(0)
                            .map((_, index) => (
                              <Star
                                key={index}
                                className={`h-4 w-4 ${index < Math.floor(book.owner.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {book.owner.rating}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />{" "}
                          {book.owner.booksAvailable} books available
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> Message Owner
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Exchange Request Dialog */}
      <Dialog open={exchangeDialogOpen} onOpenChange={setExchangeDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Request Exchange</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <h3 className="text-sm font-medium mb-2">Select books to offer:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {myBooks.map((book) => (
                <div
                  key={book.id}
                  className={`border rounded-md p-2 cursor-pointer transition-colors ${selectedBooks.includes(book.id) ? "border-primary bg-primary/5" : "border-border"}`}
                  onClick={() => toggleBookSelection(book.id)}
                >
                  <div className="aspect-[2/3] mb-2 bg-muted overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium truncate">
                    {book.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {book.author}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-medium mb-2">Add a message:</h3>
            <Textarea
              placeholder="Tell the owner why you're interested in this book..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExchangeDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExchangeRequest}
              disabled={selectedBooks.length === 0}
            >
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookDetail;
