import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  dataSource: [],
  detail: null,
};

export const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    getListRequest: (state, action) => {
      state.dataSource = [];
      state.detail = null;
      state.isLoading = action.payload;
    },
    getListRequestSuccess: (state, action) => {
      state.dataSource = action.payload;
      state.isLoading = false;
    },
    getListRequestError: (state) => {
      state.isLoading = false;
    },
    refreshBranch: (state) => {
      state.dataSource = [];
      state.detail = null;
    },
    setItemDetailRequest: (state, action) => {
      state.detail = action.payload;
    },
  },
});

export const {
  getListRequest,
  getListRequestSuccess,
  getListRequestError,
  setItemDetailRequest,
  refreshBranch,
} = branchSlice.actions;
export default branchSlice.reducer;
