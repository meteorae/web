/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItems
// ====================================================

export interface GetItems_items_items_Image {
  __typename: 'Image' | 'ImageAlbum';
  id: string;
  title: string;
  thumb: string | null;
  art: string | null;
}

export interface GetItems_items_items_Movie {
  __typename: 'Movie';
  id: string;
  title: string;
  thumb: string | null;
  art: string | null;
  releaseDate: string | null;
}

export type GetItems_items_items =
  | GetItems_items_items_Image
  | GetItems_items_items_Movie;

export interface GetItems_items {
  __typename: 'ItemsResult';
  items: (GetItems_items_items | null)[] | null;
  total: number | null;
}

export interface GetItems_library {
  __typename: 'Library';
  id: string;
  name: string;
}

export interface GetItems {
  /**
   * Query all items.
   */
  items: GetItems_items | null;
  /**
   * Query the specified library.
   */
  library: GetItems_library | null;
}

export interface GetItemsVariables {
  libraryId: string;
  offset?: number | null;
  limit?: number | null;
}
