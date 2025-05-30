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
      selectedCondition === "all" ||
      (["1", "2", "3", "4", "5"].includes(selectedCondition)
        ? book.condition === Number(selectedCondition)
        : false);

    // Tab filter
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "fiction" &&
        [
          "Fantasy",
          "Science Fiction",
          "Mystery",
          "Romance",
          "Thriller",
          "Psychological Thriller",
          "Classic Literature",
          "Young Adult Fantasy",
          "Historical Fiction",
          "Dystopian Fiction",
          "Adventure Thriller",
          "Crime Thriller",
          "Young Adult Dystopian",
          "Epic Fantasy",
          "Coming-of-Age",
          "Young Adult Romance",
          "Literary Fiction",
          "Contemporary Fiction",
          "Historical Romance",
          "Contemporary Romance",
          "Cozy Mystery",
          "Mythology",
          "Classic Science Fiction",
          "Contemporary Literature",
        ].includes(book.genre)) ||
      (activeTab === "nonfiction" &&
        [
          "Biography",
          "History",
          "Self-Help",
          "Non-Fiction",
          "Memoir",
          "Philosophy",
          "Spirituality",
          "Psychology",
          "Business",
        ].includes(book.genre));

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
                <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                <SelectItem value="Thriller">Thriller</SelectItem>
                <SelectItem value="Psychological Thriller">
                  Psychological Thriller
                </SelectItem>
                <SelectItem value="Memoir">Memoir</SelectItem>
                <SelectItem value="Classic Literature">
                  Classic Literature
                </SelectItem>
                <SelectItem value="Philosophy">Philosophy</SelectItem>
                <SelectItem value="Young Adult Fantasy">
                  Young Adult Fantasy
                </SelectItem>
                <SelectItem value="Historical Fiction">
                  Historical Fiction
                </SelectItem>
                <SelectItem value="Dystopian Fiction">
                  Dystopian Fiction
                </SelectItem>
                <SelectItem value="Adventure Thriller">
                  Adventure Thriller
                </SelectItem>
                <SelectItem value="Crime Thriller">Crime Thriller</SelectItem>
                <SelectItem value="Spirituality">Spirituality</SelectItem>
                <SelectItem value="Young Adult Dystopian">
                  Young Adult Dystopian
                </SelectItem>
                <SelectItem value="Epic Fantasy">Epic Fantasy</SelectItem>
                <SelectItem value="Coming-of-Age">Coming-of-Age</SelectItem>
                <SelectItem value="Psychology">Psychology</SelectItem>
                <SelectItem value="Young Adult Romance">
                  Young Adult Romance
                </SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Literary Fiction">
                  Literary Fiction
                </SelectItem>
                <SelectItem value="Contemporary Fiction">
                  Contemporary Fiction
                </SelectItem>
                <SelectItem value="Historical Romance">
                  Historical Romance
                </SelectItem>
                <SelectItem value="Contemporary Romance">
                  Contemporary Romance
                </SelectItem>
                <SelectItem value="Cozy Mystery">Cozy Mystery</SelectItem>
                <SelectItem value="Mythology">Mythology</SelectItem>
                <SelectItem value="Classic Science Fiction">
                  Classic Science Fiction
                </SelectItem>
                <SelectItem value="Contemporary Literature">
                  Contemporary Literature
                </SelectItem>
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
        <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(270px,1fr))]">
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
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
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
    genre: "Non-Fiction",
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
      "https://images.unsplash.com/photo-1603162617016-6360f13e5f94?w=400&q=80",
    ],
    condition: 3,
    genre: "Thriller",
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
      "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400&q=80",
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
    genre: "Psychological Thriller",
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
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&q=80",
    ],
    condition: 3,
    genre: "Memoir",
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
      "https://images.unsplash.com/photo-1603162617016-6360f13e5f94?w=400&q=80",
    ],
    condition: 2,
    genre: "Classic Literature",
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
  {
    id: "9",
    title: "Atomic Habits",
    author: "James Clear",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    ],
    condition: 5,
    genre: "Self-Help",
    askingPrice: 250,
    rokomariPrice: 350,
    preferredExchangeBooks: ["The 7 Habits", "Think and Grow Rich"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Morgan Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Morgan",
    },
  },
  {
    id: "10",
    title: "The Alchemist",
    author: "Paulo Coelho",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    ],
    condition: 4,
    genre: "Philosophy",
    askingPrice: 180,
    rokomariPrice: 280,
    preferredExchangeBooks: ["The Prophet", "Siddhartha"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "River Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=River",
    },
  },
  {
    id: "11",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    images: [
      "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400&q=80",
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&q=80",
    ],
    condition: 3,
    genre: "Young Adult Fantasy",
    askingPrice: 200,
    rokomariPrice: 300,
    preferredExchangeBooks: ["Percy Jackson", "The Hunger Games"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Sage Williams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sage",
    },
  },
  {
    id: "12",
    title: "The Kite Runner",
    author: "Khaled Hosseini",
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    ],
    condition: 4,
    genre: "Historical Fiction",
    askingPrice: 220,
    rokomariPrice: 320,
    preferredExchangeBooks: ["A Thousand Splendid Suns", "The Book Thief"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Phoenix Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Phoenix",
    },
  },
  {
    id: "13",
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    ],
    condition: 5,
    genre: "Dystopian Fiction",
    askingPrice: 260,
    rokomariPrice: 380,
    preferredExchangeBooks: ["1984", "Brave New World"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Rowan Taylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rowan",
    },
  },
  {
    id: "14",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    images: [
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    ],
    condition: 3,
    genre: "Adventure Thriller",
    askingPrice: 190,
    rokomariPrice: 290,
    preferredExchangeBooks: ["Angels and Demons", "The Lost Symbol"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Skyler Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Skyler",
    },
  },
  {
    id: "15",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    images: [
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    ],
    condition: 4,
    genre: "Classic Literature",
    askingPrice: 170,
    rokomariPrice: 270,
    preferredExchangeBooks: ["Of Mice and Men", "The Catcher in the Rye"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Avery Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Avery",
    },
  },
  {
    id: "16",
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    images: [
      "https://images.unsplash.com/photo-1603162617016-6360f13e5f94?w=400&q=80",
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
    ],
    condition: 4,
    genre: "Crime Thriller",
    askingPrice: 230,
    rokomariPrice: 330,
    preferredExchangeBooks: ["Gone Girl", "The Silent Patient"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Blake Anderson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blake",
    },
  },
  {
    id: "17",
    title: "The Power of Now",
    author: "Eckhart Tolle",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    ],
    condition: 5,
    genre: "Spirituality",
    askingPrice: 210,
    rokomariPrice: 310,
    preferredExchangeBooks: ["A New Earth", "The Four Agreements"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Cameron Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cameron",
    },
  },
  {
    id: "18",
    title: "The Hunger Games",
    author: "Suzanne Collins",
    images: [
      "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400&q=80",
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&q=80",
    ],
    condition: 3,
    genre: "Young Adult Dystopian",
    askingPrice: 180,
    rokomariPrice: 280,
    preferredExchangeBooks: ["Divergent", "The Maze Runner"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Drew Garcia",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Drew",
    },
  },
  {
    id: "19",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    ],
    condition: 4,
    genre: "Self-Help",
    askingPrice: 200,
    rokomariPrice: 300,
    preferredExchangeBooks: ["Atomic Habits", "The 7 Habits"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Emery Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emery",
    },
  },
  {
    id: "20",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    images: [
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    ],
    condition: 5,
    genre: "Epic Fantasy",
    askingPrice: 350,
    rokomariPrice: 500,
    preferredExchangeBooks: ["The Hobbit", "Game of Thrones"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Finley Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Finley",
    },
  },
  {
    id: "21",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    images: [
      "https://images.unsplash.com/photo-1603162617016-6360f13e5f94?w=400&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    ],
    condition: 4,
    genre: "Romance",
    askingPrice: 160,
    rokomariPrice: 260,
    preferredExchangeBooks: ["Emma", "Sense and Sensibility"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Gray Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gray",
    },
  },
  {
    id: "22",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80",
    ],
    condition: 3,
    genre: "Coming-of-Age",
    askingPrice: 150,
    rokomariPrice: 250,
    preferredExchangeBooks: ["To Kill a Mockingbird", "Of Mice and Men"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Hayden Clark",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hayden",
    },
  },
  {
    id: "23",
    title: "The Book Thief",
    author: "Markus Zusak",
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    ],
    condition: 5,
    genre: "Historical Fiction",
    askingPrice: 240,
    rokomariPrice: 340,
    preferredExchangeBooks: ["The Kite Runner", "All the Light We Cannot See"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Indigo Lewis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Indigo",
    },
  },
  {
    id: "24",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&q=80",
    ],
    condition: 4,
    genre: "Psychology",
    askingPrice: 280,
    rokomariPrice: 380,
    preferredExchangeBooks: ["Predictably Irrational", "Nudge"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Jude Walker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jude",
    },
  },
  {
    id: "25",
    title: "The Fault in Our Stars",
    author: "John Green",
    images: [
      "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400&q=80",
      "https://images.unsplash.com/photo-1603162617016-6360f13e5f94?w=400&q=80",
    ],
    condition: 3,
    genre: "Young Adult Romance",
    askingPrice: 170,
    rokomariPrice: 270,
    preferredExchangeBooks: ["Looking for Alaska", "Paper Towns"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Kai Hall",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kai",
    },
  },
  {
    id: "26",
    title: "The Lean Startup",
    author: "Eric Ries",
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    ],
    condition: 5,
    genre: "Business",
    askingPrice: 290,
    rokomariPrice: 390,
    preferredExchangeBooks: ["Zero to One", "The Hard Thing About Hard Things"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Lane Allen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lane",
    },
  },
  {
    id: "27",
    title: "The Martian",
    author: "Andy Weir",
    images: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
      "https://images.unsplash.com/photo-1589409514187-c21d14df0d04?w=400&q=80",
    ],
    condition: 4,
    genre: "Science Fiction",
    askingPrice: 220,
    rokomariPrice: 320,
    preferredExchangeBooks: ["Project Hail Mary", "Artemis"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Max Young",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
    },
  },
  {
    id: "28",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    ],
    condition: 5,
    genre: "Literary Fiction",
    askingPrice: 250,
    rokomariPrice: 350,
    preferredExchangeBooks: ["The Seven Husbands of Evelyn Hugo", "Educated"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Nova King",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nova",
    },
  },
  {
    id: "29",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    ],
    condition: 4,
    genre: "Self-Help",
    askingPrice: 230,
    rokomariPrice: 330,
    preferredExchangeBooks: ["Atomic Habits", "The Power of Habit"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Ocean Wright",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ocean",
    },
  },
  {
    id: "30",
    title: "The Midnight Library",
    author: "Matt Haig",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    ],
    condition: 5,
    genre: "Contemporary Fiction",
    askingPrice: 210,
    rokomariPrice: 310,
    preferredExchangeBooks: [
      "The Seven Husbands of Evelyn Hugo",
      "Klara and the Sun",
    ],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Parker Scott",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Parker",
    },
  },
  {
    id: "31",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    images: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    ],
    condition: 4,
    genre: "Literary Fiction",
    askingPrice: 270,
    rokomariPrice: 370,
    preferredExchangeBooks: ["Never Let Me Go", "The Remains of the Day"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Quinn Torres",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Quinn2",
    },
  },
  {
    id: "32",
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    images: [
      "https://images.unsplash.com/photo-1603162617016-6360f13e5f94?w=400&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    ],
    condition: 5,
    genre: "Historical Romance",
    askingPrice: 240,
    rokomariPrice: 340,
    preferredExchangeBooks: ["Daisy Jones & The Six", "Malibu Rising"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Reese Green",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reese",
    },
  },
  {
    id: "33",
    title: "Project Hail Mary",
    author: "Andy Weir",
    images: [
      "https://images.unsplash.com/photo-1589409514187-c21d14df0d04?w=400&q=80",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
    ],
    condition: 5,
    genre: "Science Fiction",
    askingPrice: 280,
    rokomariPrice: 380,
    preferredExchangeBooks: ["The Martian", "Artemis"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Sage Adams",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sage2",
    },
  },
  {
    id: "34",
    title: "It Ends with Us",
    author: "Colleen Hoover",
    images: [
      "https://images.unsplash.com/photo-1618666012174-83b441c0bc76?w=400&q=80",
      "https://images.unsplash.com/photo-1603162617016-6360f13e5f94?w=400&q=80",
    ],
    condition: 4,
    genre: "Contemporary Romance",
    askingPrice: 200,
    rokomariPrice: 300,
    preferredExchangeBooks: ["It Starts with Us", "Verity"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Taylor Baker",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor2",
    },
  },
  {
    id: "35",
    title: "The Thursday Murder Club",
    author: "Richard Osman",
    images: [
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&q=80",
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&q=80",
    ],
    condition: 4,
    genre: "Cozy Mystery",
    askingPrice: 190,
    rokomariPrice: 290,
    preferredExchangeBooks: [
      "The Man Who Died Twice",
      "The Bullet That Missed",
    ],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Uri Nelson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Uri",
    },
  },
  {
    id: "36",
    title: "Circe",
    author: "Madeline Miller",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&q=80",
    ],
    condition: 5,
    genre: "Mythology",
    askingPrice: 260,
    rokomariPrice: 360,
    preferredExchangeBooks: ["The Song of Achilles", "Percy Jackson"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Vale Carter",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vale",
    },
  },
  {
    id: "37",
    title: "The Invisible Man",
    author: "H.G. Wells",
    images: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
    ],
    condition: 3,
    genre: "Classic Science Fiction",
    askingPrice: 140,
    rokomariPrice: 240,
    preferredExchangeBooks: ["The Time Machine", "The War of the Worlds"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "West Mitchell",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=West",
    },
  },
  {
    id: "38",
    title: "Normal People",
    author: "Sally Rooney",
    images: [
      "https://images.unsplash.com/photo-1603162617016-6360f13e5f94?w=400&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    ],
    condition: 4,
    genre: "Contemporary Literature",
    askingPrice: 220,
    rokomariPrice: 320,
    preferredExchangeBooks: ["Conversations with Friends", "Such a Fun Age"],
    isForSale: true,
    isForExchange: true,
    owner: {
      name: "Xen Perez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Xen",
    },
  },
];

export default BookGrid;
