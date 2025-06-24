import API from "@/store/services/api";
import { SignInPayload, SignUpPayload } from "@/types/auth";
import { authAction } from "./authSlice";

type SignUpResponse = {
  success: boolean;
  responseObject: {
    user: {
      id: string;
    };
  };
};

type LoginPayload = {
  email: string;
  password: string;
};

type ForgetPasswordPayload = {
  email: string;
};

type ResetPasswordPayload = {
  token: string;
  password: string;
};

type ForgetPasswordResponse = {
  success: boolean;
  message: string;
  responseObject: string;
};

type ResetPasswordResponse = {
  success: boolean;
  message: string;
};

const authQuery = API.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    signup: builder.mutation<SignUpResponse, SignUpPayload>({
      query: (user: SignUpPayload) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      transformResponse: (response: SignUpResponse) => response,
      transformErrorResponse: ({ data }: any) => data,
    }),
    login: builder.mutation({
      query: (user: LoginPayload) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }: any) {
        try {
          const { data } = await queryFulfilled;
          console.log("data", arg);
          localStorage.setItem(
            "refresh-token",
            data.responseObject.tokens.refresh.token
          );
          localStorage.setItem(
            "token",
            data.responseObject.tokens.access.token
          );
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: data.responseObject.tokens.access.token,
              refreshToken: data.responseObject.tokens.refresh.token,
              user: data.responseObject,
            })
          );

          dispatch(
            authAction.loginSuccess({
              user: data.responseObject,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),
    signIn: builder.mutation({
      query: (user: SignInPayload) => ({
        url: "/auth/decode-token",
        method: "POST",
        body: user,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }: any) {
        try {
          const { data } = await queryFulfilled;
          console.log("data", arg);
          localStorage.setItem(
            "refresh-token",
            data.responseObject.tokens.refresh.token
          );
          localStorage.setItem(
            "token",
            data.responseObject.tokens.access.token
          );
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: data.responseObject.tokens.access.token,
              refreshToken: data.responseObject.tokens.refresh.token,
              user: data.responseObject,
            })
          );

          dispatch(
            authAction.loginSuccess({
              user: data.responseObject,
            })
          );
        } catch (err) {
          // do nothing
        }
      },
      transformResponse: (response: any) => response,
      transformErrorResponse: (response: any) => response,
    }),
    // Forget Password - Generate Reset Token
    generateResetToken: builder.mutation<ForgetPasswordResponse, ForgetPasswordPayload>({
      query: (payload: ForgetPasswordPayload) => ({
        url: "/auth/generate-user-reset-password-token",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ForgetPasswordResponse) => response,
      transformErrorResponse: ({ data }: any) => data,
    }),
    // Reset Password
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordPayload>({
      query: (payload: ResetPasswordPayload) => ({
        url: "/auth/reset-user-password",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response: ResetPasswordResponse) => response,
      transformErrorResponse: ({ data }: any) => data,
    }),
    joinOrganizationByCode: builder.mutation({
      query: ({ code }) => ({
        url: "/organization/accept-invitation",
        method: "POST",
        body: { code },
      }),
      transformResponse: (response: any) => response,
    }),
    joinByOrganizationId: builder.mutation({
      query: (data) => ({
        url: `/organization/request-to-join`,
        method: "POST",
        formData: true,
        body: data,
      }),
      transformResponse: (response: any) => response,
    }),
    getSingleUser: builder.query({
      query: ({ id }) => `/users/${id}`,
    }),
    updateUser: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        formData: true,
        body: data,
      }),
      transformResponse: (response: any) => response,
    }),
  }),
});

export const {
  useSignupMutation,
  useSignInMutation,
  useLoginMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useJoinOrganizationByCodeMutation,
  useJoinByOrganizationIdMutation,
  useGenerateResetTokenMutation,
  useResetPasswordMutation,
} = authQuery;

export const { endpoints: signin } = authQuery;

export default authQuery;