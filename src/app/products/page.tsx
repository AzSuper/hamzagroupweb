"use client";

import { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, ArrowUpRight, Download } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import ModernButtons from "../../components/ModernButtons";

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

function ProductCatalogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get("search") || "";
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  // Sync URL with search query
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }

    router.replace(`/products?${params.toString()}`, { scroll: false });
  }, [searchQuery, router, searchParams]);

  // Fetch products from API
  useEffect(() => {
    axios
      .get("https://hamzaserver-production.up.railway.app/api/materials")
      .then((response) => {
        setProducts(response.data);
        // If there's a search param, ensure results are filtered
        const urlSearch = searchParams.get("search");
        if (urlSearch) {
          setSearchQuery(urlSearch);
        }
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [searchParams]);

  // Filter products based on search query and category filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "all") {
      return matchesSearch;
    }
    return (
      matchesSearch && product.category.toLowerCase() === activeFilter.toLowerCase()
    );
  });

  // Function to download PDF
  const downloadPDF = (pdfUrl: string, productName: string) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.setAttribute(
      "download",
      `${productName.replace(/\s+/g, "_")}_description.pdf`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-50 p-4 md:p-8 min-h-screen mt-16">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Product List
        </h1>
        <p className="text-gray-600 mb-6">
          We are driving the sustainability business centered on eco-friendly
          materials.
        </p>

        {/* Search Bar */}
        <div className="relative mb-6 w-[70%]">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
        </div>

        {/* Filter Buttons */}
        <ModernButtons setActiveFilter={setActiveFilter} />

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col">
              <button
                onClick={() => setSelectedProduct(product)}
                className="w-full relative"
              >
                <div className="aspect-square overflow-hidden bg-gray-100 mb-4 rounded-lg">
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${product.image_link})` }}
                  />
                </div>
              </button>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-xl">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 mt-1 line-clamp-2">
                    {product.category}
                  </p>
                  <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                    {product.desc.length > 70
                      ? product.desc.substring(0, 70) + "..."
                      : product.desc}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="ml-2 flex-shrink-0"
                >
                  <ArrowUpRight className="w-6 h-6 text-gray-900 rotate-45" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Product Modal */}
        <Dialog
          open={!!selectedProduct}
          onOpenChange={() => setSelectedProduct(null)}
        >
          {selectedProduct && (
            <>
              <DialogTitle className="sr-only">
                Product Details: {selectedProduct.name}
              </DialogTitle>
              <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
                {/* Responsive grid layout */}
                <div className="grid md:grid-cols-2 grid-cols-1">
                  {/* Product image container */}
                  <div className="aspect-square w-full h-full relative overflow-hidden">
                    {/* QR Code Container */}
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-40 pointer-events-none">
                      <div className="bg-white/30 backdrop-blur-md p-4 rounded-lg pointer-events-auto">
                        <div className="text-center flex flex-col items-center">
                          <QRCodeSVG value={selectedProduct.pdf_link} size={128} />
                          <button
                            onClick={() =>
                              downloadPDF(
                                selectedProduct.pdf_link,
                                selectedProduct.name
                              )
                            }
                            className="text-sm mt-2 text-gray-600 hover:text-blue-500 flex items-center justify-center gap-1"
                          >
                            <Download className="w-4 h-4" />
                            Download Description
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="w-full h-full bg-center bg-cover"
                      style={{
                        backgroundImage: `url(${selectedProduct.image_link})`,
                      }}
                    />
                  </div>

                  {/* Product details container */}
                  <div className="p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                      {selectedProduct.desc}
                    </p>

                    <div className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">
                            Full Name:
                          </h3>
                          <p className="text-sm text-gray-600">
                            {selectedProduct.name}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">
                            ID:
                          </h3>
                          <p className="text-sm text-gray-600">
                            #{selectedProduct.id}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">
                            Category:
                          </h3>
                          <p className="text-sm text-gray-600">
                            {selectedProduct.category}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-800">
                            Source:
                          </h3>
                          <p className="text-sm text-gray-600">Hongkong Shengqing Materials Co.</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                          Sample:
                        </h3>
                        <p className="text-sm text-gray-600">
                           {selectedProduct.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </>
          )}
        </Dialog>
      </div>
    </div>
  );
}

export default function ProductCatalog() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductCatalogContent />
    </Suspense>
  );
}
