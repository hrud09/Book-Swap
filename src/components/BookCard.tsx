import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  ArrowLeftRight,
  BookOpen,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookCardProps {
  id?: string;
  title?: string;
  author?: string;
  images?: string[]; // Multiple images
  condition?: number; // 1-5 rating
  genre?: string;
  askingPrice?: number; // Price for selling
  rokomariPrice?: number; // New book price from rokomari.com
  preferredExchangeBooks?: string[]; // Books owner wants in exchange
  isForSale?: boolean; // Whether book is for sale
  isForExchange?: boolean; // Whether book is for exchange
  summary?: string; // Book summary for tooltip
  reviewUrl?: string; // URL to book review
  owner?: {
    name: string;
    avatar: string;
  };
  onExchangeClick?: (book: any) => void;
  onReviewClick?: (book: any) => void;
}

const BookCard = ({
  id = "1",
  title = "The Great Gatsby",
  author = "F. Scott Fitzgerald",
  images = [
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80",
  ],
  condition = 4,
  genre = "Fiction",
  askingPrice = 250,
  rokomariPrice = 350,
  preferredExchangeBooks = ["To Kill a Mockingbird", "1984"],
  isForSale = true,
  isForExchange = true,
  summary = "A classic novel set in the Jazz Age, The Great Gatsby follows the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan. Through the eyes of narrator Nick Carraway, the story explores themes of decadence, idealism, social upheaval, and the American Dream.",
  reviewUrl = "/book-review/1",
  owner = {
    name: "John Doe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
  onExchangeClick = () => {},
  onReviewClick = () => {},
}: BookCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  // Render stars based on condition rating
  const renderConditionStars = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`${index < condition ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
        />
      ));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Determine card style based on exchange/sale status
  const getCardStyle = () => {
    if (isForSale && isForExchange) {
      return "border-l-4 border-l-[#9333ea] bg-gradient-to-br from-white to-purple-50 hover:shadow-purple-200";
    } else if (isForSale) {
      return "border-l-4 border-l-red-500 bg-gradient-to-br from-white to-red-50 hover:shadow-red-200";
    } else if (isForExchange) {
      return "border-l-4 border-l-blue-500 bg-gradient-to-br from-white to-blue-50 hover:shadow-blue-200";
    }
    return "";
  };

  return (
    <Card
      className={`w-full max-w-[480px] sm:max-w-xs h-[480px] overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300 mx-auto ${getCardStyle()}`}
    >
      <div className="relative w-full h-1/2 overflow-hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <img
                src={images[currentImageIndex]}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="max-w-[250px] bg-white text-black border border-gray-200 shadow-lg p-3 text-xs"
            >
              <p>{summary}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Image navigation */}
        {images.length > 1 && (
          <>
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-black/50 hover:bg-black/70 text-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Image indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}

        <Badge className="absolute top-2 right-2 bg-primary/80 hover:bg-primary">
          {genre}
        </Badge>

        {/* Sale/Exchange badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isForSale && (
            <Badge
              variant="secondary"
              className="text-xs bg-red-500 text-white font-medium shadow-sm"
            >
              <DollarSign className="h-3 w-3 mr-1" />
              For Sale
            </Badge>
          )}
          {isForExchange && (
            <Badge
              variant="secondary"
              className="text-xs bg-blue-500 text-white font-medium shadow-sm"
            >
              <ArrowLeftRight className="h-3 w-3 mr-1" />
              Exchange
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pb-2 pt-4">
        <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{author}</p>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs text-muted-foreground mr-1">Condition:</span>
          <div className="flex">{renderConditionStars()}</div>
        </div>

        {/* Pricing information */}
        <div className="mb-3 space-y-1">
          {isForSale && askingPrice && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-green-600">
                Asking Price:
              </span>
              <span className="text-sm font-bold text-green-600">
                ৳{askingPrice}
              </span>
            </div>
          )}
          {rokomariPrice && (
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">
                New (Rokomari):
              </span>
              <span className="text-xs text-muted-foreground">
                ৳{rokomariPrice}
              </span>
            </div>
          )}
        </div>

        {/* Preferred exchange books */}
        {isForExchange &&
          preferredExchangeBooks &&
          preferredExchangeBooks.length > 0 && (
            <div className="mb-3">
              <span className="text-xs text-muted-foreground mb-1 block">
                Wants in exchange:
              </span>
              <div className="flex flex-wrap gap-1">
                {preferredExchangeBooks.slice(0, 2).map((book, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs px-1 py-0"
                  >
                    {book.length > 15 ? `${book.substring(0, 15)}...` : book}
                  </Badge>
                ))}
                {preferredExchangeBooks.length > 2 && (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    +{preferredExchangeBooks.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img
              src={owner.avatar}
              alt={owner.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-muted-foreground">{owner.name}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex flex-col gap-2">
        <Button
          className={`w-full font-medium transition-all duration-300 hover:scale-[1.02] ${!isForSale && isForExchange ? "bg-yellow-400 text-white hover:bg-yellow-500" : ""}`}
          variant={
            isForSale && isForExchange
              ? "default"
              : isForSale
                ? "destructive"
                : "secondary"
          }
          onClick={() =>
            onExchangeClick({
              id,
              title,
              author,
              images,
              condition,
              genre,
              askingPrice,
              rokomariPrice,
              preferredExchangeBooks,
              isForSale,
              isForExchange,
              summary,
              reviewUrl,
              owner,
            })
          }
        >
          {isForSale && isForExchange
            ? "Buy / Exchange"
            : isForSale
              ? "Buy"
              : "Exchange"}
        </Button>

        <Button
          className="w-full font-medium transition-all duration-300 hover:scale-[1.02]"
          variant="outline"
          onClick={() =>
            onReviewClick({
              id,
              title,
              author,
              reviewUrl,
            })
          }
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Read Review
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
