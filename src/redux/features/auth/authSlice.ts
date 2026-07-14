import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectCurrentUser = (state: RootState): User | null =>
  state.auth.user;

export const selectCurrentToken = (state: RootState): string | null =>
  state.auth.token;
