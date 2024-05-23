import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  dataSource: [],
  dataTemp: [],
  optionSelect: [],
  detail: null,
  flags: 3,
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    getListRequest: (state, action) => {
      state.dataSource = [];
      state.detail = null;
      state.isLoading = action.payload;
    },
    flagSet: (state, action) => {
      state.flags = action.payload;
    },
    getListRequestSuccess: (state, action) => {
      state.dataSource = action.payload;
      state.isLoading = false;
    },
    getListAreaSuccess: (state, action) => {
      state.optionSelect = action.payload;
      state.isLoading = false;
    },
    getListRequestError: (state) => {
      state.isLoading = false;
    },
    refreshEmployee: (state) => {
      state.dataSource = [];
      state.detail = null;
      state.flags = 3;
      state.optionSelect = [];
    },
    refreshFormEmp: (state) => {
      state.detail = null;
      state.flags = 3;
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
  refreshEmployee,
  setItemDetailRequest,
  getListAreaSuccess,
  refreshFormEmp,
  flagSet,
  putDataToUpdateRefesh,
  getDataToUpdateRefesh
} = employeeSlice.actions;
export default employeeSlice.reducer;
