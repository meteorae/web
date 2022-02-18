/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetItem
// ====================================================

export interface GetItem_item_Image {
  __typename: 'Image' | 'ImageAlbum';
  id: string;
  title: string;
  thumb: string | null;
  summary: string | null;
}

export interface GetItem_item_Movie {
  __typename: 'Movie';
  id: string;
  title: string;
  thumb: string | null;
  summary: string | null;
  releaseDate: string | null;
}

export type GetItem_item = GetItem_item_Image | GetItem_item_Movie;

export interface GetItem {
  /**
   * Query the specified item.
   */
  item: GetItem_item | null;
}

export interface GetItemVariables {
  id: string;
}
