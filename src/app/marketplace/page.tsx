"use client";

import {
  Filter,
  Gavel,
  Heart,
  MapPin,
  Plus,
  Search,
  Share2,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  seller: string;
  location: string;
  rating: number;
  reviews: number;
  quantity: string;
  description: string;
  category: string;
  isAuction: boolean;
  timeLeft?: string;
  bids?: number;
  condition: "Fresh" | "Good" | "Fair";
}

export default function MarketplacePage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"browse" | "sell" | "my-listings">(
    "browse",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    t.browseItemsLabel,
    "Grains",
    "Vegetables",
    "Fruits",
    "Spices",
    "Livestock",
    "Equipment",
    "Seeds",
  ];

  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mockProducts: Product[] = [];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/marketplace/products")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        if (data?.products) {
          // map prisma product shape to UI shape
          const mapped = data.products.map((p: any) => ({
            id: p.id,
            name: p.name,
            price: p.price || 0,
            originalPrice: undefined,
            image: p.images?.[0]?.url || "/api/placeholder/300/200",
            seller: p.seller?.name || "Seller",
            location: p.seller?.location || "Unknown",
            rating: 4.5,
            reviews: p.reviews?.length || 0,
            quantity: p.quantity ? `${p.quantity}` : "1",
            description: p.description || "",
            category: p.category?.name || "Uncategorized",
            isAuction: (p.listings || []).some(
              (l: any) => l.type === "auction",
            ),
            timeLeft: undefined,
            bids: (p.listings || []).reduce(
              (acc: number, l: any) => acc + (l.bids?.length || 0),
              0,
            ),
            condition: (p.condition || "Good") as any,
          }));
          setProducts(mapped);
        } else {
          setError("Invalid response");
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err?.message || "Failed to load");
        setProducts(mockProducts);
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const source = products ?? mockProducts;
  const filteredProducts = source.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-muted" />
        </div>
        {product.isAuction && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            <Gavel className="w-3 h-3 inline mr-1" />
            {t.auctionTag}
          </div>
        )}
        {product.originalPrice && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
            {t.saleTag}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-muted">{product.rating}</span>
            <span className="text-xs text-muted">({product.reviews})</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted mb-2">
          <MapPin className="w-4 h-4" />
          <span>{product.location}</span>
        </div>

        <p className="text-sm text-muted mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-green-600">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-sm text-muted">{product.quantity}</span>
        </div>

        {product.isAuction && (
          <div className="flex items-center justify-between mb-3 text-sm">
            <span className="text-orange-600 font-medium">
              {product.timeLeft}
            </span>
            <span className="text-sm text-muted">{product.bids} bids</span>
          </div>
        )}

        <div className="flex space-x-2">
          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
            {product.isAuction ? t.placeBid : t.buyNow}
          </Button>
          <Button size="sm" variant="outline">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const SellProductForm = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900">
          <Plus className="w-5 h-5 mr-2 text-green-600" />
          {t.sellProduce}
        </CardTitle>
        <CardDescription className="text-muted">
          {t.listProduct}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName" className="text-gray-700">
                Product Name
              </Label>
              <Input
                id="productName"
                placeholder="Enter product name"
                className="text-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700">
                Category
              </Label>
              <select
                id="category"
                className="w-full h-10 px-3 py-2 text-gray-600 border border-input border-green-500 bg-background rounded-md text-sm"
              >
                <option value="">Select category</option>
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">
              Description
            </Label>
            <textarea
              id="description"
              className="w-full h-20 px-3 py-2 text-gray-600 border border-input border-green-500 bg-background rounded-md text-sm resize-none"
              placeholder="Describe your product..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-gray-700">
                Price (₹)
              </Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                className="text-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-gray-700">
                Quantity
              </Label>
              <Input
                id="quantity"
                placeholder="e.g., 50 kg"
                className="text-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="condition" className="text-gray-700">
                Condition
              </Label>
              <select
                id="condition"
                className="w-full h-10 px-3 py-2 text-gray-600 border border-input border-green-500 bg-background rounded-md text-sm"
              >
                <option value="Fresh">Fresh</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images" className="text-gray-700">
              Product Images
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                className="hidden"
              />
              <label htmlFor="images" className="cursor-pointer">
                <div className="text-muted">
                  <Plus className="w-8 h-8 mx-auto mb-2" />
                  <p>{t.clickToUploadImages}</p>
                  <p className="text-sm">{t.imageFormatsHint}</p>
                </div>
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="auction" className="rounded" />
            <Label htmlFor="auction" className="text-gray-700">
              {t.auction}
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700"
          >
            List Product
          </Button>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.marketplace}
            </h1>
            <p className="text-xl text-muted max-w-2xl mx-auto">
              {t.browseItemsLabel}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit mx-auto">
            <button
              onClick={() => setActiveTab("browse")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "browse"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t.browseItems}
            </button>
            <button
              onClick={() => setActiveTab("sell")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "sell"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t.sellProduce}
            </button>
            <button
              onClick={() => setActiveTab("my-listings")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "my-listings"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {t.myListings}
            </button>
          </div>

          {activeTab === "browse" && (
            <>
              {/* Search and Filter */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                    <Input
                      placeholder={t.searchProductsPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-gray-600"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 text-muted border border-input border-green-500 bg-background rounded-md text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <Button
                    variant="outline"
                    className="text-gray-600 border-green-500"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {t.filtersText}
                  </Button>
                </div>
              </div>

              {/* Products Grid */}
              {loading && (
                <div className="text-center py-12">
                  <p className="text-muted">Loading products…</p>
                </div>
              )}
              {error && (
                <div className="text-center py-12">
                  <p className="text-muted">{error}</p>
                </div>
              )}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12 text-gray-700">
                    <Search className="w-16 h-16 text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t.noProductsFound}
                    </h3>
                    <p className="text-muted">{t.noProductsFound}</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {activeTab === "sell" && <SellProductForm />}

          {activeTab === "my-listings" && (
            <Card>
              <CardContent className="text-center py-12 ">
                <ShoppingCart className="w-16 h-16 text-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t.noListingsYet}
                </h3>
                <p className="text-muted mb-4">{t.listFirstProduct}</p>
                <Button onClick={() => setActiveTab("sell")}>
                  {t.listFirstProduct}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
