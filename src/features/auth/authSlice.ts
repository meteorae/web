import { gql } from '@apollo/client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
import client from '../../app/apollo';
import { APIRequestError, APIRequestStatus } from '../../types/store';
import { Login, LoginVariables, Login_login_user } from './__generated__/Login';
import type { NavigateFunction } from 'react-router-dom';

interface AuthState {
  user: Login_login_user | null;
  status: APIRequestStatus;
  error: APIRequestError;
}

const initialState: AuthState = {
  user: null,
  status: APIRequestStatus.Idle,
  error: null,
};

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const loginUser = createAsyncThunk<
  { data: Login; from: string; navigate: NavigateFunction },
  { data: LoginVariables; from: string; navigate: NavigateFunction },
  { dispatch: AppDispatch; state: AuthState; extra: typeof client }
>('auth/login', async ({ data, from, navigate }, { extra: apolloClient }) => {
  const { username, password } = data;

  const response = await apolloClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: { username, password },
  });

  return { data: response.data, from, navigate };
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Login_login_user>) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = APIRequestStatus.Pending;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { data, from, navigate } = action.payload;

        state.status = APIRequestStatus.Success;
        state.error = null;

        if (data.login?.token) {
          localStorage.setItem('token', data.login.token);
          state.user = data.login.user;
          navigate(from);
        } else {
          state.error = 'No token returned from server';
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = APIRequestStatus.Error;
      });
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
