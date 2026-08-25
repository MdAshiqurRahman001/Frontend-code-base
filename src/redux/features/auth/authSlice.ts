import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { User, UserRole } from "@/types";

// ─── Auth State ───────────────────────────────────────────────────────────────

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: User; token: string; refreshToken?: string | null }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (action.payload.refreshToken !== undefined) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string | null>) => {
      state.refreshToken = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        user?: User | null;
        token?: string | null;
        refreshToken?: string | null;
      }>
    ) => {
      if (action.payload.user !== undefined) {
        state.user = action.payload.user;
      }
      if (action.payload.token !== undefined) {
        state.token = action.payload.token;
      }
      if (action.payload.refreshToken !== undefined) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const {
  setUser,
  setToken,
  setRefreshToken,
  setCredentials,
  updateUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectCurrentUser = (state: RootState): User | null =>
  state.auth.user;

export const selectCurrentToken = (state: RootState): string | null =>
  state.auth.token;

export const selectCurrentRefreshToken = (state: RootState): string | null =>
  state.auth.refreshToken;

export const selectIsAdmin = (state: RootState): boolean =>
  state.auth.user?.role === ("ADMIN" as UserRole);

export const selectIsAuthenticated = (state: RootState): boolean =>
  !!state.auth.token;
