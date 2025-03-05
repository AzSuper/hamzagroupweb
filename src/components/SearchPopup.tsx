"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Product {
  id: number;
  name: string;
  desc: string;
  category: string;
  pdf_path: string;
  image_path: string;
  pdf_link: string;
  image_link: string;
}

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onProductSelect: (product: Product) => void;
}

const SearchPopup = ({ isOpen, onClose, onProductSelect }: SearchPopupProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch products from API
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      axios
        .get("https://hamzaserver-production.up.railway.app/api/materials")
        .then((response) => {
          setProducts(response.data);
          // Select 4 random products as recommendations
          const shuffled = [...response.data].sort(() => 0.5 - Math.random());
          setRecommendedProducts(shuffled.slice(0, 4));
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setIsLoading(false);
        });
    }
  }, [isOpen]);

  // Focus search input when popup opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Handle search input change
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(filtered);
  }, [searchQuery, products]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      handleClose();
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Clean up when closing
  const handleClose = () => {
    setSearchQuery("");
    onClose();
  };

  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-3xl p-0 overflow-hidden max-h-[90vh] bg-white">
        <div className="flex flex-col w-full">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative p-4 border-b">
            <div className="relative flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for products..."
                className="w-full px-4 py-3 pl-10 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </form>

          {/* Content Area */}
          <div className="overflow-y-auto max-h-[70vh] p-4">
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && searchQuery && searchResults.length === 0 && (
              <div className="text-center py-8">
               <p className="text-gray-600">No products found for &quot;{searchQuery}&quot;</p>
              </div>
            )}

            {/* Search Results */}
            {!isLoading && searchQuery && searchResults.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Search Results</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {searchResults.slice(0, 6).map((product) => (
                    <div 
                      key={product.id} 
                      className="flex flex-col cursor-pointer hover:shadow-md transition-shadow rounded-lg overflow-hidden border"
                      onClick={() => {
                        onProductSelect(product);
                        handleClose();
                      }}
                    >
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <div
                          className="w-full h-full bg-center bg-cover"
                          style={{ backgroundImage: `url(${product.image_link})` }}
                        />
                      </div>
                      <div className="p-3 flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-gray-600 text-sm line-clamp-1">{product.desc}</p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-gray-900 rotate-45 flex-shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
                {searchResults.length > 6 && (
                  <div className="text-center mt-4">
                    <button 
                      onClick={() => {
                        router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
                        handleClose();
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View all {searchResults.length} results
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Recommended Products (shown when no search query) */}
            {!isLoading && !searchQuery && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Recommended Products</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="flex cursor-pointer hover:shadow-md transition-shadow rounded-lg overflow-hidden border"
                      onClick={() => {
                        onProductSelect(product);
                        handleClose();
                      }}
                    >
                      <div className="w-24 h-24 overflow-hidden bg-gray-100 flex-shrink-0">
                        <div
                          className="w-full h-full bg-center bg-cover"
                          style={{ backgroundImage: `url(${product.image_link})` }}
                        />
                      </div>
                      <div className="p-3 flex-1 flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-gray-900">{product.name}</h4>
                          <p className="text-gray-600 text-sm line-clamp-2">{product.desc}</p>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-gray-900 rotate-45 flex-shrink-0 ml-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-gray-50">
            <p className="text-sm text-gray-500 text-center">
              Press Enter to see all results or click on a product to view details
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchPopup;
