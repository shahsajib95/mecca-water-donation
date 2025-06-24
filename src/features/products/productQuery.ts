import API from "@/store/services/api";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

const productQuery = API.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productQuery;

export default productQuery;
