/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItems
// ====================================================

export interface GetItems_allItems_items {
  __typename: "Item";
  id: number | null;
  title: string | null;
  releaseDate: any | null;
  thumb: string | null;
  art: string | null;
}

export interface GetItems_allItems {
  __typename: "AllItemTypes";
  items: (GetItems_allItems_items | null)[] | null;
  totalCount: number | null;
}

export interface GetItems {
  allItems: GetItems_allItems | null;
}

export interface GetItemsVariables {
  offset?: number | null;
  limit?: number | null;
}
