import HeaderTitle from "@/components/goBack";
import { Button } from "@/components/ui/button";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "@/features/cart/cartQuery";
import { useAddOrderMutation } from "@/features/order/orderQuery";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { data: cart = [], isLoading, isError } = useGetCartQuery();

  const [removeFromCart] = useRemoveFromCartMutation();
  const [addOrder] = useAddOrderMutation();

  const navigate = useNavigate();

  const total = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0
  );
  const handleCheckout = async () => {
    try {
      await addOrder({
        items: cart,
        total,
        date: new Date().toISOString(),
        status: "pending",
      }).unwrap();

      // Remove each item from cart after successful order
      await Promise.all(cart.map((item) => removeFromCart(item.id).unwrap()));

      toast.success("Order placed successfully");
      navigate("/orders");
    } catch {
      toast.error("Failed to place order");
    }
  };

  if (isError) {
    toast.error("Failed to load cart. Please try again later.");
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-red-600 font-semibold">Failed to load cart.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">Loading cart...</p>
      </div>
    );
  }

  if (!cart.length) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 space-y-6">
      <HeaderTitle title="Your Cart" />
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain rounded"
              />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">﷼ {item.price}</p>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500"
                onClick={() =>
                  removeFromCart(item.id)
                    .unwrap()
                    .then(() => toast.success("Item removed from cart"))
                }
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <p className="text-xl font-semibold">Total: ﷼ {total.toFixed(2)}</p>
        <Button
          className="bg-purple-900 text-white rounded-full"
          onClick={() => handleCheckout()}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
