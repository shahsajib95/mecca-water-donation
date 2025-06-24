import { useGetCartQuery } from "@/features/cart/cartQuery";
import {
  ClipboardList,
  Film,
  HomeIcon,
  ShoppingCart,
  User,
} from "lucide-react";
import { BiLogoProductHunt } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const { data: cart = [] } = useGetCartQuery();

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md rounded-full bg-white shadow-md border p-2 flex justify-around items-center">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-xs ${isActive ? "text-purple-700" : "text-gray-700"}`
        }
      >
        <HomeIcon className="w-5 h-5" />
        Home
      </NavLink>
      <NavLink
        to="/product"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-xs ${isActive ? "text-purple-700" : "text-gray-700"}`
        }
      >
        <BiLogoProductHunt className="w-5 h-5" />
        Products
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-xs ${isActive ? "text-purple-700" : "text-gray-700"}`
        }
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cart?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-700 text-white text-[10px] px-1.5 py-0.5 rounded-full">
              {cart.length}
            </span>
          )}
        </div>
        Cart
      </NavLink>
      <NavLink
        to="/orders"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-xs ${isActive ? "text-purple-700" : "text-gray-700"}`
        }
      >
        <ClipboardList className="w-5 h-5" />
        Orders
      </NavLink>
      <NavLink
        to="/media"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-xs ${isActive ? "text-purple-700" : "text-gray-700"}`
        }
      >
        <Film className="w-5 h-5" />
        Media
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-xs ${isActive ? "text-purple-700" : "text-gray-700"}`
        }
      >
        <User className="w-5 h-5" />
        Profile
      </NavLink>
    </nav>
  );
}
