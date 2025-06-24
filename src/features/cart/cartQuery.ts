import API from "@/store/services/api";
import toast from "react-hot-toast";

interface CartItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  quantity?: number;
}

const cartQuery = API.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => "/cart",
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation<CartItem, Omit<CartItem, "id">>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["cart"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          toast.error("Failed to add to cart");
        }
      },
    }),
    removeFromCart: builder.mutation<void, number>({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        
        } catch {
          toast.error("Failed to remove from cart");
        }
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartQuery;

export default cartQuery;
