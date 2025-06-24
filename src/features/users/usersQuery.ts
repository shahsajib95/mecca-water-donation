import API from "@/store/services/api";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
const usersQuery = API.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      query: () => "/users/1", // or dynamically set
      providesTags: ["user"],
    }),
    updateUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: `/users/1`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = usersQuery;

export default usersQuery;
