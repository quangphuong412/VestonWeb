import { combineReducers } from '@reduxjs/toolkit';
import { branchSlice } from './scense/branch';
import { employeeSlice } from './scense/employee';
import { materialSlice } from './scense/material';

export const apisSlice = combineReducers({
  branch: branchSlice,
  employee: employeeSlice,
  material: materialSlice,
});
