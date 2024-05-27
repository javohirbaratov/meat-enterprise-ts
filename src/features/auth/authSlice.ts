import { createSlice } from "@reduxjs/toolkit";
import { IUser, authApi } from "../../app/services/auth/auth";
import { RootState } from "../../app/store";
import { localTokenKey } from "../../constants/const";

const initialState = {
  user: null,
  token: localStorage.getItem(localTokenKey),
  isAuthenticated: false,
  isLoading: false,
} as {
  user: null | IUser;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // Reset state to initial values
      Object.assign(state, initialState);

      // Remove token from local storage
      localStorage.removeItem(localTokenKey);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getUser.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        if (!action.payload.success) {
          localStorage.removeItem(localTokenKey);
          state.isAuthenticated = false;
          return;
        }

        // console.log("fulfilled", action);
        const { rol, familya, ism, telefon, email, token, status } =
          action.payload.data;

        state.user = {
          rol,
          familya,
          ism,
          telefon,
          email,
          token,
          status,
        };
        state.token = token;
        state.isAuthenticated = true;
        state.isLoading = false;

        /* LOCAL STORAGE */
        localStorage.setItem(localTokenKey, token);
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.getUser.matchPending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.isLoading = false;
        if (!action.payload.success) {
          localStorage.removeItem(localTokenKey);
          state.isAuthenticated = false;
          return;
        }

        const { rol, familya, ism, telefon, email, token, status } =
          action.payload.data;

        state.user = {
          rol,
          familya,
          ism,
          telefon,
          email,
          token,
          status,
        };
        state.token = token;
        state.isAuthenticated = true;

        /* LOCAL STORAGE */
        localStorage.setItem(localTokenKey, token);
      })
      .addMatcher(authApi.endpoints.getUser.matchRejected, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
      });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectedIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectedCurrentRole = (state: RootState) => state.auth?.user?.rol;
export const selectedUser = (state: RootState) => state.auth?.user;