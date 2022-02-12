/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLatest
// ====================================================

export interface GetLatest_latest_library {
  __typename: 'Library';
  id: string;
  name: string;
  type: string;
}

export interface GetLatest_latest_items {
  __typename: 'Movie';
  id: string;
  title: string;
  releaseDate: string | null;
  thumb: string | null;
}

export interface GetLatest_latest {
  __typename: 'LatestResult';
  library: GetLatest_latest_library;
  items: (GetLatest_latest_items | null)[] | null;
}

export interface GetLatest {
  /**
   * Query latest content for all libraries.
   */
  latest: (GetLatest_latest | null)[] | null;
}

export interface GetLatestVariables {
  limit?: number | null;
}
