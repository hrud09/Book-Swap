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
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
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
import BookGrid from "./BookGrid";
import Header from "./Header";

const Home = () => {
  // Mock state for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddBookDialog, setShowAddBookDialog] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    images: [] as string[],
    askingBooks: "",
    askingPrice: "",
    condition: "Very Good",
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
    // Here you would typically save the book to your backend/database
    console.log("Adding book:", newBook);

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Book grid component */}
        <BookGrid />
      </main>

      {/* Footer */}
      <footer className="bg-muted py-6 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen className="h-5 w-5 text-primary mr-2" />
              <span className="font-semibold">BookSwap</span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} BookSwap. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

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
    </div>
  );
};

export default Home;
