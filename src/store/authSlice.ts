import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
    },
    
    updateUserAddresses: (state, action: PayloadAction<{ billing?: any; shipping?: any }>) => {
      if (state.user) {
        if (action.payload.billing) state.user.billing = action.payload.billing;
        if (action.payload.shipping) state.user.shipping = action.payload.shipping;
      }
    },
  },
});

export const { login, logout, updateUserAddresses } = authSlice.actions;
export default authSlice.reducer;