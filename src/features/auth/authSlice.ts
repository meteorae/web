import { gql } from '@apollo/client';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../app/store';
import apolloClient from '../../app/apolloClient';
import { APIRequestError, APIRequestStatus } from '../../types/store';
import { Login, LoginVariables, Login_login_user } from './__generated__/Login';

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
  Login,
  LoginVariables,
  { dispatch: AppDispatch; state: AuthState }
>('auth/login', async (data) => {
  const { username, password } = data;

  const response = await apolloClient.mutate({
    mutation: LOGIN_MUTATION,
    variables: { username, password },
    fetchPolicy: 'no-cache',
  });

  return response.data;
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
        const { login } = action.payload;

        state.status = APIRequestStatus.Success;
        state.error = null;

        if (login?.token) {
          localStorage.setItem('token', login.token);
          state.user = login.user;
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
