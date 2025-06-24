import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAddToCartMutation } from "@/features/cart/cartQuery";
import { useGetProductsQuery } from "@/features/products/productQuery";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "@/components/goBack";

export default function Product() {
  const navigate = useNavigate();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [addToCart] = useAddToCartMutation();

  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const skeletonArray = new Array(itemsPerPage).fill(null);

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const price = parseFloat(product.price);
    const withinMin = minPrice ? price >= parseFloat(minPrice) : true;
    const withinMax = maxPrice ? price <= parseFloat(maxPrice) : true;
    return matchesSearch && withinMin && withinMax;
  });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (isError) {
    toast.error("Failed to load products. Please try again later.");
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-600 font-semibold">Failed to load products.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="space-y-4 w-full lg:w-[800px] mt-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <HeaderTitle title="  Mecca mosques most needed" />

          <Select value="sar" onValueChange={() => {}}>
            <SelectTrigger className="w-[80px] text-sm">
              <SelectValue placeholder="SAR" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sar">SAR</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="rounded-lg bg-black text-white text-sm px-4 py-1">
          Providing Water
        </Button>

        <div className="relative w-full">
          <Input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 text-sm border border-gray-300 rounded-full"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
        {/* Filters */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full max-w-4xl">
            <Input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="text-sm rounded-full"
            />
            <Input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="text-sm rounded-full"
            />
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setMinPrice("");
                setMaxPrice("");
                setCurrentPage(1);
              }}
              className="text-sm rounded-full"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {(isLoading ? skeletonArray : paginatedProducts).map(
            (product, idx) => (
              <div
                key={product?.id || idx}
                className="rounded-xl border p-3 shadow text-center bg-gray-100"
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                  {isLoading ? (
                    <div className="w-16 h-16 bg-gray-300 rounded-md animate-pulse" />
                  ) : (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="mx-auto mb-2 h-24 object-contain rounded-md cursor-pointer"
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                  )}
                </div>
                <div className="mt-3 text-center">
                  {isLoading ? (
                    <>
                      <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto mb-2 animate-pulse" />
                      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-2 animate-pulse" />
                      <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto mb-3 animate-pulse" />
                      <div className="h-8 bg-gray-300 rounded-full w-full animate-pulse" />
                    </>
                  ) : (
                    <>
                      <p
                        className="text-[16px] font-semibold cursor-pointer"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        {product.title}
                      </p>
                      <p className="text-[14px] text-gray-500">
                        {product.description}
                      </p>
                      <p className="text-[20px] font-bold mt-1">
                        ﷼ {product.price}
                      </p>
                      <button
                        className="mt-2 w-full bg-gray-700 text-white rounded-full text-sm py-2"
                        onClick={() =>
                          addToCart({ ...product, quantity: 1 })
                            .unwrap()
                            .then(() => toast.success("Added to cart"))
                            .catch(() => toast.error("Failed to add to cart"))
                        }
                      >
                        Add to Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          )}
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
