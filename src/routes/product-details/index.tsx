import { Link, useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetProductsQuery,
} from "@/features/products/productQuery";
import { useAddToCartMutation } from "@/features/cart/cartQuery";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import HeaderTitle from "@/components/goBack";

export default function ProductDetails() {
  const { id } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(Number(id));
  const { data: products = [] } = useGetProductsQuery(); // For similar
  const [addToCart] = useAddToCartMutation();

  if (isLoading) return <p className="text-center mt-8">Loading product...</p>;
  if (isError || !product)
    return <p className="text-center mt-8 text-red-500">Product not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex">
          <HeaderTitle title="Product Details" />
        </div>
        <Select value="sar" onValueChange={() => {}}>
          <SelectTrigger className="w-[80px] text-sm">
            <SelectValue placeholder="SAR" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sar">SAR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Image Gallery */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="rounded-lg w-full h-auto"
          />
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[...Array(3)].map((_, i) => (
              <img
                key={i}
                src={product.image}
                className="rounded-md object-contain"
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="text-sm text-gray-500">{product.description}</p>
          <p className="text-xl font-bold mt-2">﷼ {product.price}</p>
          <Button
            className="bg-black text-white mt-3"
            onClick={() => {
              addToCart({ ...product, quantity: 1 })
                .unwrap()
                .then(() => toast.success("Added to cart"))
                .catch(() => toast.error("Failed to add"));
            }}
          >
            Add to Cart
          </Button>

          {/* Overview and Features */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Product Overview</h3>
            <p className="text-sm mt-1">
              For this item it will be distributed in Haram and Around Haram
              from 1 Ramadan to 10 Ramadan
            </p>

            <h3 className="mt-4 font-semibold text-lg">Key Features</h3>
            <ul className="list-disc ml-5 text-sm mt-1 space-y-1 text-gray-600">
              {product?.features?.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Suggested Similar Products</h2>
          <Link to="/product">
            <button className="text-sm text-purple-600">See All</button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...products]
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-3 text-center bg-gray-50"
              >
                <img
                  src={item.image}
                  className="h-20 object-contain mx-auto mb-2"
                />
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
                <p className="text-sm font-bold mt-1">﷼ {item.price}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
