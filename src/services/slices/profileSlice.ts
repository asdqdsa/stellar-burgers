import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TServerResponse,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { TUserResponse } from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

// export type TRegisterData = {
//   email: string;
//   name: string;
//   password: string;
// };

// type TAuthResponse = TServerResponse<{
//   refreshToken: string;
//   accessToken: string;
//   user: TUser;
// }>;

export const fetchRegisterUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { rejectValue: string }
>(
  'profile/fetchRegisterUser',
  async (credentials: TRegisterData): Promise<TAuthResponse> =>
    registerUserApi(credentials)
);

export const fetchUser = createAsyncThunk<
  TUserResponse,
  undefined,
  { rejectValue: string }
>('profile/fetchUser', async (): Promise<TUserResponse> => getUserApi());

export const loginUser = createAsyncThunk<TAuthResponse, TLoginData>(
  'profile/userLogin',
  async (credentials: TLoginData): Promise<TAuthResponse> =>
    loginUserApi(credentials)
);

export const logoutUser = createAsyncThunk<TServerResponse<{}>, undefined>(
  'profile/userLogout',
  async (): Promise<TServerResponse<{}>> => logoutApi()
);

export const userUpdate = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>
>(
  'profile/userUpdate',
  async (credentials: Partial<TRegisterData>): Promise<TUserResponse> =>
    updateUserApi(credentials)
);

export const recoverPassUser = createAsyncThunk<
  { success: boolean },
  { email: string },
  { rejectValue: string }
>(
  'profile/userRecoverPas',
  async ({ email }: { email: string }): Promise<{ success: boolean }> =>
    forgotPasswordApi({ email })
);

export const resetPassUser = createAsyncThunk<
  { success: boolean },
  { password: string; token: string },
  { rejectValue: string }
>(
  'profile/userResetPass',
  async ({
    password,
    token
  }: {
    password: string;
    token: string;
  }): Promise<{ success: boolean }> => resetPasswordApi({ password, token })
);

export type TProfileState = {
  userData: TUser;
  error: null | string;
  isLoading: boolean;
  isAuthorized: boolean;
  accessToken: string;
  refreshToken: string;
};

const initialState: TProfileState = {
  userData: { email: '', name: '' },
  error: null,
  isLoading: false,
  isAuthorized: false,
  accessToken: '',
  refreshToken: ''
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  selectors: {
    getUsername: (sliceState: TProfileState): string =>
      sliceState.userData.name,
    getAuthStatus: (sliceState: TProfileState): boolean =>
      sliceState.isAuthorized
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(fetchRegisterUser.rejected, (sliceState) => {
        sliceState.error = 'Error';
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
        console.log(action.payload);
      })
      .addCase(fetchUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(fetchUser.rejected, (sliceState) => {
        sliceState.error = 'Error';
      })
      .addCase(fetchUser.fulfilled, (sliceState, action) => {
        sliceState.isLoading = false;
        sliceState.userData = action.payload.user;
        console.log(
          action.payload.success,
          'success?',
          action.payload.user,
          'user?'
        );
      })
      .addCase(loginUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(loginUser.rejected, (sliceState) => {
        sliceState.error = 'Error login';
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
        console.log(sliceState.accessToken);
      })
      .addCase(logoutUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.isAuthorized = false;
        sliceState.error = null;
      })
      .addCase(logoutUser.rejected, (sliceState) => {
        sliceState.error = 'Error login';
      })
      .addCase(logoutUser.fulfilled, (sliceState, action) => {
        sliceState.isAuthorized = !action.payload.success;
        sliceState.isLoading = false;
        console.log('logout fullfilled');
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
        console.log('userUdpate', action.payload.user);
      })
      .addCase(recoverPassUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(recoverPassUser.rejected, (sliceState) => {
        sliceState.error = 'Error recover user';
      })
      .addCase(recoverPassUser.fulfilled, (sliceState, action) => {
        console.log(action.payload.success);
      })
      .addCase(resetPassUser.pending, (sliceState) => {
        sliceState.isLoading = true;
        sliceState.error = null;
      })
      .addCase(resetPassUser.rejected, (sliceState) => {
        sliceState.error = 'Error reset user';
      })
      .addCase(resetPassUser.fulfilled, (sliceState, action) => {
        console.log(action.payload.success);
      });
  }
});

export const { getUsername, getAuthStatus } = profileSlice.selectors;
export default profileSlice.reducer;
