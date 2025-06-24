// src/features/auth/authSlice.ts

import { UserRespone } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  isAuthenticated: boolean;

  token: string | null;
  companySteps: string;
  companyInfo: object;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  user: UserRespone | null;
}
export interface ErrorTypes {
  response: { data: string };
}

const initialState: AuthState = {
  isAuthenticated: false,

  token: null,
  companySteps: "three",
  companyInfo: {},
  loading: false,
  error: null,
  isLoggedIn: false,
  user: null,
};

// export const signIn = createAsyncThunk(
//   "auth/signIn",
//   async (
//     credentials: { username: string; password: string },
//     { rejectWithValue },
//   ) => {
//     try {
//       const data = await loginAPI(credentials);
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// export const logout = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       await logoutAPI();
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, { payload }: PayloadAction<UserRespone>) => {
      state.isLoggedIn = true;
      state.user = payload;
      // state.token = payload
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    getlogout(state, action: PayloadAction<any>) {
      state.loading = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(signIn.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(
  //       signIn.fulfilled,
  //       (state, action: PayloadAction<{ user: any; token: string }>) => {
  //         state.isAuthenticated = true;
  //         state.user = action.payload.user;
  //         state.token = action.payload.token;
  //         state.loading = false;
  //         state.error = null;
  //       },
  //     )
  //     .addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(logout.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(logout.fulfilled, (state) => {
  //       state.isAuthenticated = false;
  //       state.user = null;
  //       state.token = null;
  //       state.loading = false;
  //       state.error = null;
  //     })
  //     .addCase(logout.rejected, (state, action: PayloadAction<any>) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });

  // },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
