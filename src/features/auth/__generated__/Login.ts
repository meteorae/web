/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_user {
  __typename: "Account";
  id: number | null;
  username: string | null;
}

export interface Login_login {
  __typename: "Login";
  token: string | null;
  user: Login_login_user | null;
}

export interface Login {
  /**
   * Login to an existing account
   */
  login: Login_login | null;
}

export interface LoginVariables {
  username: string;
  password: string;
}
