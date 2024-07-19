import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TAuthResponse,
  TRegisterData,
  getUserApi,
  registerUserApi
} from '@api';
import { TUserResponse } from '@api';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

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
  selectors: {},
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
        console.log(
          action.payload.success,
          'success?',
          action.payload.user,
          'user?'
        );
      });
  }
});

export default profileSlice.reducer;
