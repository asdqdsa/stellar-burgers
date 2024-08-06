/**
 * @jest-environment jsdom
 */
import profileSlice, {
  fetchRegisterUser,
  fetchUser,
  loginUser,
  logoutUser,
  userUpdate,
  initialState
} from '../slices/profileSlice';
import { userAuthData } from '../__mocks__/userAuthData';
import { userRegisterData } from '../__mocks__/userRegisterData';

describe('Profile/user requests state status', () => {
  // RegisterUser
  it('should handle status fulfilled for fetchRegisterUser', () => {
    const { refreshToken, accessToken, user } = userAuthData;
    const state = profileSlice(initialState, {
      type: fetchRegisterUser.fulfilled.type,
      payload: userAuthData
    });

    expect(state).toEqual({
      ...initialState,
      isAuthorized: true,
      userData: user,
      refreshToken: refreshToken,
      accessToken: accessToken,
      isLoading: false
    });
  });

  it('should handle status pending for fetchRegisterUser', () => {
    const state = profileSlice(initialState, {
      type: fetchRegisterUser.pending.type,
      payload: userAuthData
    });

    expect(state).toEqual({
      ...initialState,
      error: null,
      isLoading: true
    });
  });

  it('should handle status rejected for fetchRegisterUser', () => {
    const state = profileSlice(initialState, {
      type: fetchRegisterUser.rejected.type,
      payload: userAuthData
    });

    expect(state).toEqual({
      ...initialState,
      error: 'Error register user',
      isLoading: false
    });
  });

  // getUser
  it('should handle status fulfilled for fetchUser', () => {
    const { name, email } = userRegisterData;
    const sliceState = profileSlice(initialState, {
      type: fetchUser.fulfilled.type,
      payload: userAuthData
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: false,
      isAuthChecked: true,
      userData: { name, email }
    });
  });

  it('should handle status pending for fetchUser', () => {
    const sliceState = profileSlice(initialState, {
      type: fetchUser.pending.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle status rejected for fetchUser', () => {
    const sliceState = profileSlice(initialState, {
      type: fetchUser.rejected.type,
      error: 'Error fetching user.'
    });

    expect(sliceState).toEqual({
      ...initialState,
      error: 'Error fetching user.'
    });
  });

  // loginUser;
  it('should handle status fulfilled for loginUser', () => {
    const { name, email, password } = userRegisterData;
    const { accessToken, refreshToken } = userAuthData;
    const state = profileSlice(initialState, {
      type: loginUser.fulfilled.type,
      payload: {
        email,
        password,
        accessToken,
        refreshToken,
        user: userAuthData.user
      }
    });

    expect(state).toEqual({
      ...initialState,
      isAuthorized: true,
      isLoading: false,
      userData: { name, email },
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  });

  it('should handle status pending for loginUser', () => {
    const sliceState = profileSlice(initialState, {
      type: loginUser.pending.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle status rejected for loginUser', () => {
    const sliceState = profileSlice(initialState, {
      type: loginUser.rejected.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      error: 'Error loging in'
    });
  });

  // logout
  it('should handle status fulfilled for logoutUser', () => {
    const sliceState = profileSlice(initialState, {
      type: logoutUser.fulfilled.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isAuthorized: false,
      isLoading: false,
      userData: { email: '', name: '' }
    });
  });

  it('should handle status pending for logoutUser', () => {
    const sliceState = profileSlice(initialState, {
      type: logoutUser.pending.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isAuthorized: false,
      isLoading: true,
      error: null
    });
  });

  it('should handle status rejected for logoutUser', () => {
    const sliceState = profileSlice(initialState, {
      type: logoutUser.rejected.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      error: 'Error loging out'
    });
  });

  // updateUser
  it('should handle status fulfilled for userUpdate', () => {
    const { email, password } = userRegisterData;
    const state = profileSlice(initialState, {
      type: userUpdate.fulfilled.type,
      payload: { user: { email, password } }
    });

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      userData: { email, password }
    });
  });

  it('should handle status pending for userUpdate', () => {
    const sliceState = profileSlice(initialState, {
      type: userUpdate.pending.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  it('should handle status rejected for userUpdate', () => {
    const sliceState = profileSlice(initialState, {
      type: userUpdate.rejected.type
    });

    expect(sliceState).toEqual({
      ...initialState,
      error: 'Error update user'
    });
  });
});
