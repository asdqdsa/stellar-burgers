import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TServerResponse,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api';
import { TUserResponse } from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const fetchRegisterUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'profile/fetchRegisterUser',
  registerUserApi
);

export const fetchUser = createAsyncThunk<TUserResponse, undefined>(
  'profile/fetchUser',
  getUserApi
);

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'profile/userLogin',
  loginUserApi
);

export const logoutUser = createAsyncThunk<TServerResponse<{}>, undefined>(
  'profile/userLogout',
  logoutApi
);

export const userUpdate = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>('profile/userUpdate', updateUserApi);

export type TProfileState = {
  userData: TUser;
  error: null | string;
  isLoading: boolean;
  isAuthorized: boolean;
  accessToken: string;
  refreshToken: string;
  isAuthChecked: boolean;
};

export const initialState: TProfileState = {
  userData: { email: '', name: '' },
  error: null,
  isLoading: false,
  isAuthorized: false,
  accessToken: '',
  refreshToken: '',
  isAuthChecked: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAuthed: (sliceSate) => {
      sliceSate.isAuthorized = true;
    }
  },
  selectors: {
    isAuthCheckedSelector: (sliceState: TProfileState): boolean =>
      sliceState.isAuthChecked,
    userDataSelector: (sliceState: TProfileState): TUser => sliceState.userData,
    getUsername: (sliceState: TProfileState): string =>
      sliceState.userData.name,
    getAuthStatus: (sliceState: TProfileState): boolean =>
      sliceState.isAuthorized,
    getUser: (sliceState: TProfileState): TUser => sliceState.userData
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(fetchRegisterUser.rejected, (sliceState) => {
        sliceState.error = 'Error register user';
      })
      .addCase(fetchRegisterUser.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.userData = action.payload.user;
        sliceState.isAuthorized = action.payload.success;
        [sliceState.accessToken, sliceState.refreshToken] = [
          action.payload.accessToken,
          action.payload.refreshToken
        ];
        setCookie('accessToken', sliceState.accessToken);
        localStorage.setItem('refreshToken', sliceState.refreshToken);
      })
      .addCase(fetchUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(fetchUser.rejected, (sliceState, action) => {
        sliceState.error = action.error.message || 'Error fetching user.';
      })
      .addCase(fetchUser.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.isAuthChecked = true;
        sliceState.userData = action.payload.user;
      })
      .addCase(loginUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(loginUser.rejected, (sliceState) => {
        sliceState.error = 'Error loging in';
      })
      .addCase(loginUser.fulfilled, (sliceState, action) => {
        sliceState.userData = action.payload.user;
        sliceState.isAuthorized = true;
        sliceState.isLoading = false;
        [sliceState.accessToken, sliceState.refreshToken] = [
          action.payload.accessToken,
          action.payload.refreshToken
        ];
        setCookie('accessToken', sliceState.accessToken);
        localStorage.setItem('refreshToken', sliceState.refreshToken);
      })
      .addCase(logoutUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.isAuthorized = false;
        sliceState.error = null;
      })
      .addCase(logoutUser.rejected, (sliceState) => {
        sliceState.error = 'Error loging out';
      })
      .addCase(logoutUser.fulfilled, (sliceState) => {
        sliceState.isAuthorized = false;
        sliceState.isLoading = false;
        sliceState.userData = { email: '', name: '' };
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(userUpdate.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(userUpdate.rejected, (sliceState) => {
        sliceState.error = 'Error update user';
      })
      .addCase(userUpdate.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.userData = action.payload.user;
      });
  }
});

export const {
  getUser,
  getUsername,
  getAuthStatus,
  isAuthCheckedSelector,
  userDataSelector
} = profileSlice.selectors;
export const { setAuthed } = profileSlice.actions;
export default profileSlice.reducer;
