/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItem
// ====================================================

export interface GetItem_item {
  __typename: 'Movie';
  id: string;
  title: string;
  releaseDate: string | null;
  thumb: string | null;
  summary: string | null;
}

export interface GetItem {
  /**
   * Query the specified item.
   */
  item: GetItem_item | null;
}

export interface GetItemVariables {
  id: string;
}
