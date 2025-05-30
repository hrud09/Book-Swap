import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import BookCard from "./BookCard";
import ExchangeOffer from "./ExchangeOffer";

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

interface BookGridProps {
  books?: Book[];
}

const BookGrid = ({ books = defaultBooks }: BookGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");
  const [selectedCondition, setSelectedCondition] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showExchangeOffer, setShowExchangeOffer] = useState(false);

  const handleExchangeClick = (book: Book) => {
    setSelectedBook(book);
    setShowExchangeOffer(true);
  };

  const handleBackFromExchange = () => {
    setShowExchangeOffer(false);
    setSelectedBook(null);
  };

  const filteredBooks = books.filter((book) => {
    // Search filter
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    // Genre filter
    const matchesGenre =
      selectedGenre === "all" || book.genre === selectedGenre;

    // Condition filter
    const matchesCondition =
      selectedCondition === "all" || book.condition === selectedCondition;

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "fiction" &&
        ["Fantasy", "Science Fiction", "Mystery", "Romance"].includes(
          book.genre,
        )) ||
      (activeTab === "nonfiction" &&
        ["Biography", "History", "Self-Help", "Science"].includes(book.genre));

    return matchesSearch && matchesGenre && matchesCondition && matchesTab;
  });

  if (showExchangeOffer && selectedBook) {
    return (
      <ExchangeOffer
        targetBook={selectedBook}
        onBack={handleBackFromExchange}
        onSubmitOffer={(offer) => {
          console.log("Exchange offer submitted:", offer);
          setShowExchangeOffer(false);
          setSelectedBook(null);
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-background">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Available Books for Exchange
        </h2>
        <p className="text-muted-foreground">
          Browse books available for exchange or search for specific titles
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <div className="w-40">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                <SelectItem value="Fantasy">Fantasy</SelectItem>
                <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                <SelectItem value="Mystery">Mystery</SelectItem>
                <SelectItem value="Romance">Romance</SelectItem>
                <SelectItem value="Biography">Biography</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Self-Help">Self-Help</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-40">
            <Select
              value={selectedCondition}
              onValueChange={setSelectedCondition}
            >
              <SelectTrigger>
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Like New">Like New</SelectItem>
                <SelectItem value="Very Good">Very Good</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Books</TabsTrigger>
          <TabsTrigger value="fiction">Fiction</TabsTrigger>
          <TabsTrigger value="nonfiction">Non-Fiction</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredBooks.length} books available
        </p>
      </div>

      {/* Book Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              images={book.images}
              condition={book.condition}
              genre={book.genre}
              askingPrice={book.askingPrice}
              rokomariPrice={book.rokomariPrice}
              preferredExchangeBooks={book.preferredExchangeBooks}
              isForSale={book.isForSale}
              isForExchange={book.isForExchange}
              owner={book.owner}
              onExchangeClick={handleExchangeClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl font-medium">No books found</p>
          <p className="text-muted-foreground mt-2">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

// Sample data for default display
const defaultBooks: Book[] = [
  {
    id: "1",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    images: [
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    ],
    condition: 4,
    genre: "Fantasy",
    askingPrice: 300,
    rokomariPrice: 450,
    preferredExchangeBooks: ["Lord of the Rings", "Game of Thrones"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Alex Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
  },
  {
    id: "2",
    title: "Dune",
    author: "Frank Herbert",
    images: [
      "https://images.unsplash.com/photo-1589409514187-c21d14df0d04?w=400&q=80",
    ],
    condition: 4,
    genre: "Science Fiction",
    askingPrice: 280,
    rokomariPrice: 400,
    preferredExchangeBooks: ["Foundation", "Ender's Game"],
    isForSale: false,
    isForExchange: true,
    owner: {
      name: "Sam Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
    },
  },
  {
    id: "3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&q=80",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    ],
    condition: 5,
    genre: "Science",
    askingPrice: 320,
    rokomariPrice: 420,
    preferredExchangeBooks: ["Homo Deus", "21 Lessons"],
    isForSale: true,
    isForExchange: false,
    owner: {
      name: "Jamie Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamie",
    },
  },
  {
    id: "4",
    title: "Gone Girl",
    author: "Gillian Flynn",
    images: [
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80",
    ],
    condition: 3,
    genre: "Mystery",
    askingPrice: 200,
    rokomariPrice: 350,
    preferredExchangeBooks: [
      "The Girl with the Dragon Tattoo",
      "Big Little Lies",
    ],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Taylor Reed",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor",
    },
  },
  {
    id: "5",
    title: "Becoming",
    author: "Michelle Obama",
    images: [
      "https://images.unsplash.com/photo-1603162525937-96db6bd03a69?w=400&q=80",
    ],
    condition: 5,
    genre: "Biography",
    rokomariPrice: 500,
    preferredExchangeBooks: ["Educated", "Born a Crime"],
    isForSale: false,
    isForExchange: true,
    owner: {
      name: "Jordan Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    },
  },
  {
    id: "6",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80",
    ],
    condition: 4,
    genre: "Mystery",
    askingPrice: 240,
    rokomariPrice: 380,
    preferredExchangeBooks: ["The Thursday Murder Club", "Gone Girl"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Casey Morgan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Casey",
    },
  },
  {
    id: "7",
    title: "Educated",
    author: "Tara Westover",
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80",
    ],
    condition: 3,
    genre: "Biography",
    askingPrice: 180,
    rokomariPrice: 320,
    preferredExchangeBooks: ["Becoming", "The Glass Castle"],
    isForSale: true,
    isForExchange: false,
    owner: {
      name: "Riley Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riley",
    },
  },
  {
    id: "8",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    ],
    condition: 2,
    genre: "Romance",
    askingPrice: 120,
    rokomariPrice: 250,
    preferredExchangeBooks: ["Pride and Prejudice", "Jane Eyre"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Quinn Adams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn",
    },
  },
];

export default BookGrid;
