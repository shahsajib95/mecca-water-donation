import API from "@/store/services/api";

interface OrderItem {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  quantity?: number;
}

interface Order {
  id?: number;
  items: OrderItem[];
  total: number;
  date: string;
  status: string;
}

const orderQuery = API.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
      providesTags: ["orders"],
    }),
    addOrder: builder.mutation<void, Order>({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useAddOrderMutation, useGetOrdersQuery } = orderQuery;

export default orderQuery;
