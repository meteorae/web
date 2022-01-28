/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItems
// ====================================================

export interface GetItems_items_items {
  __typename: "Movie";
  id: string;
  title: string;
  releaseDate: number;
  thumb: string;
  art: string;
}

export interface GetItems_items {
  __typename: "ItemsResult";
  items: (GetItems_items_items | null)[] | null;
  total: number | null;
}

export interface GetItems {
  /**
   * Query all items.
   */
  items: GetItems_items | null;
}

export interface GetItemsVariables {
  libraryId: string;
  offset?: number | null;
  limit?: number | null;
}
