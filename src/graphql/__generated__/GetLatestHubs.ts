/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLatestHubs
// ====================================================

export interface GetLatestHubs_latest_library {
  __typename: 'Library';
  id: string;
  name: string;
  type: string;
}

export interface GetLatestHubs_latest_items_Image {
  __typename: 'Image' | 'ImageAlbum';
  id: string;
  title: string;
  thumb: string | null;
}

export interface GetLatestHubs_latest_items_Movie {
  __typename: 'Movie';
  id: string;
  title: string;
  thumb: string | null;
  releaseDate: string | null;
}

export type GetLatestHubs_latest_items =
  | GetLatestHubs_latest_items_Image
  | GetLatestHubs_latest_items_Movie;

export interface GetLatestHubs_latest {
  __typename: 'LatestResult';
  library: GetLatestHubs_latest_library;
  items: (GetLatestHubs_latest_items | null)[] | null;
}

export interface GetLatestHubs {
  /**
   * Query latest content for all libraries.
   */
  latest: (GetLatestHubs_latest | null)[] | null;
}

export interface GetLatestHubsVariables {
  limit?: number | null;
}
