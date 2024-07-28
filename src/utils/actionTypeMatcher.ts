import { PayloadAction } from '@reduxjs/toolkit';

export const isActionPending = () => (action: PayloadAction) =>
  action.type.endsWith('/pending') ? true : false;

export const isActionRejected = () => (action: PayloadAction) =>
  action.type.endsWith('/rejected') ? true : false;
