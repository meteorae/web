/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLibraries
// ====================================================

export interface GetLibraries_libraries_libraries {
  __typename: 'Library';
  id: string;
  name: string;
  type: string;
}

export interface GetLibraries_libraries {
  __typename: 'LibrariesResult';
  libraries: (GetLibraries_libraries_libraries | null)[] | null;
}

export interface GetLibraries {
  /**
   * Query all libraries.
   */
  libraries: GetLibraries_libraries | null;
}
