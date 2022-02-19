/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetChildren
// ====================================================

export interface GetChildren_children_items {
  __typename: 'Image' | 'ImageAlbum' | 'Movie';
  id: string;
  title: string;
  thumb: string | null;
}

export interface GetChildren_children {
  __typename: 'ItemsResult';
  items: (GetChildren_children_items | null)[] | null;
  total: number | null;
}

export interface GetChildren {
  /**
   * Query the children of the provided item.
   */
  children: GetChildren_children | null;
}

export interface GetChildrenVariables {
  item: string;
  offset?: number | null;
  limit?: number | null;
}
