"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import { useLocale } from "../hooks/useLocals";
import { t } from "../utils/i18n";

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

const ProductShowCase = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/materials")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

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

  // Limit to 16 products for showcase
  const showcaseProducts = products.slice(0, 16);
  const { locale } = useLocale();


  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-xl md:text-2xl lg:text-5xl !font-black mb-12 mt-12 text-center text-[#0e0e0e]">
      {t("landing.explore.title", locale)}
      </h2>
      
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {showcaseProducts.map((product) => (
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

      {/* Show More Button */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => router.push("/products")}
          className="bg-[#0e0e0e] text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 flex flex-row gap-2 items-center group"
        >
          <h3 className="font-medium text-xl group-hover:font-bold">{t("landing.explore.all", locale)}</h3>
          <img
            src="../../assets/explore-icon.svg"
            alt="explore"
            className="w-7 h-auto transform transition-transform duration-300 group-hover:rotate-[80deg]"
          />
        </button>
      </div>

      {/* Product Modal - Same as in ProductCatalog */}
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
                  <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{selectedProduct.desc}</p>

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
                        <p className="text-sm text-gray-600">#{selectedProduct.id}</p>
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
                        <p className="text-sm text-gray-600">Eco-friendly</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Sample:
                      </h3>
                      <p className="text-sm text-gray-600">Available upon request</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Applicant:
                      </h3>
                      <p className="text-sm text-gray-600">Material Research Team</p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </>
        )}
      </Dialog>
    </section>
  );
};

export default ProductShowCase;