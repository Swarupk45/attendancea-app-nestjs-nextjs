import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  role: string;
}

const initialState: UserState = {
  id: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<{ id: string; role: string }>) => {
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
    clearUserDetails: (state) => {
      state.id = '';
      state.role = '';
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;
export default userSlice.reducer;
