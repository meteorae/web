/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_user {
  __typename: "User";
  id: string;
  username: string;
}

export interface Login_login {
  __typename: "AuthPayload";
  token: string;
  user: Login_login_user;
}

export interface Login {
  /**
   * Authenticate user with the provided username and password.
   */
  login: Login_login;
}

export interface LoginVariables {
  username: string;
  password: string;
}
