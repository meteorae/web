import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};

/** Authentication payload returned on successful login. */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

/** Item information. */
export type Item = {
  id: Scalars['ID'];
};

export type LatestResult = {
  __typename?: 'LatestResult';
  items?: Maybe<Array<Maybe<Item>>>;
  library: Library;
};

/** Library information. */
export type Library = {
  __typename?: 'Library';
  createdAt: Scalars['Time'];
  id: Scalars['ID'];
  language: Scalars['String'];
  locations: Array<Scalars['String']>;
  name: Scalars['String'];
  scannedAt: Scalars['Time'];
  type: Scalars['String'];
  updatedAt: Scalars['Time'];
};

/** Item information about a movie. */
export type Movie = Item & {
  __typename?: 'Movie';
  art?: Maybe<Scalars['String']>;
  createdAt: Scalars['Time'];
  id: Scalars['ID'];
  releaseDate?: Maybe<Scalars['String']>;
  sortTitle: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  thumb?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['Time'];
};

/** Item information about a movie. */
export type MusicAlbum = Item & {
  __typename?: 'MusicAlbum';
  art?: Maybe<Scalars['String']>;
  artist?: Maybe<Person>;
  createdAt: Scalars['Time'];
  id: Scalars['ID'];
  releaseDate?: Maybe<Scalars['String']>;
  sortTitle: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * Add a new library of the specified type, with the provided name, language and
   * location. This will trigger a scan for all locations provided.
   */
  addLibrary: Library;
  completeOnboarding?: Maybe<ServerInfo>;
  /** Authenticate user with the provided username and password. */
  login: AuthPayload;
  /** Create a new user with the provided username and password. */
  register: AuthPayload;
};


export type MutationAddLibraryArgs = {
  language: Scalars['String'];
  locations: Array<Scalars['String']>;
  name: Scalars['String'];
  type: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Person = Item & {
  __typename?: 'Person';
  art?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['String']>;
  createdAt: Scalars['Time'];
  deathDate?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  sortName: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  thumb?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type PhotoAlbum = Item & {
  __typename?: 'PhotoAlbum';
  art?: Maybe<Scalars['String']>;
  createdAt: Scalars['Time'];
  id: Scalars['ID'];
  releaseDate?: Maybe<Scalars['String']>;
  sortTitle: Scalars['String'];
  thumb?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type Query = {
  __typename?: 'Query';
  /** Query the children of the provided item. */
  children?: Maybe<Array<Maybe<Item>>>;
  /** Query the specified item. */
  item?: Maybe<Item>;
  /** Query all items. */
  items?: Maybe<Array<Maybe<Item>>>;
  /** Query latest content for all libraries. */
  latest?: Maybe<Array<Maybe<LatestResult>>>;
  /** Query all libraries. */
  libraries?: Maybe<Array<Maybe<Library>>>;
  /** Query the specified library. */
  library?: Maybe<Library>;
  serverInfo: ServerInfo;
  /** Query the specified user. */
  user?: Maybe<User>;
  /** Query all users. */
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryChildrenArgs = {
  item: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryItemArgs = {
  id: Scalars['ID'];
};


export type QueryItemsArgs = {
  libraryId: Scalars['ID'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryLatestArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryLibraryArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type ServerInfo = {
  __typename?: 'ServerInfo';
  onboarding: Scalars['Boolean'];
  version: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newUpdateAvailable?: Maybe<UpdateInfo>;
  onItemAdded: Item;
  onItemUpdated: Item;
  onLatestItemAdded?: Maybe<Array<Maybe<LatestResult>>>;
  onLibraryAdded: Library;
};

export type UpdateInfo = {
  __typename?: 'UpdateInfo';
  url: Scalars['String'];
  version: Scalars['String'];
};

/** User account information. */
export type User = {
  __typename?: 'User';
  createdAt: Scalars['Time'];
  id: Scalars['ID'];
  updatedAt: Scalars['Time'];
  username: Scalars['String'];
};

export type GetLibrariesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLibrariesQuery = { __typename?: 'Query', libraries?: Array<{ __typename?: 'Library', id: string, name: string, type: string } | null> | null };

export type OnLibraryAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnLibraryAddedSubscription = { __typename?: 'Subscription', onLibraryAdded: { __typename?: 'Library', id: string, name: string, type: string } };

export type GetLatestQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestQuery = { __typename?: 'Query', latest?: Array<{ __typename?: 'LatestResult', library: { __typename?: 'Library', id: string, name: string }, items?: Array<{ __typename?: 'Movie', title: string, thumb?: string | null, releaseDate?: string | null, id: string } | { __typename?: 'MusicAlbum', title: string, thumb?: string | null, id: string, artist?: { __typename?: 'Person', id: string, name: string } | null } | { __typename?: 'Person', id: string } | { __typename?: 'PhotoAlbum', title: string, thumb?: string | null, releaseDate?: string | null, id: string } | null> | null } | null> | null };

export type OnLatestHubAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnLatestHubAddedSubscription = { __typename?: 'Subscription', onLatestItemAdded?: Array<{ __typename?: 'LatestResult', library: { __typename?: 'Library', id: string, name: string }, items?: Array<{ __typename?: 'Movie', title: string, thumb?: string | null, releaseDate?: string | null, id: string } | { __typename?: 'MusicAlbum', title: string, thumb?: string | null, id: string, artist?: { __typename?: 'Person', id: string, name: string } | null } | { __typename?: 'Person', id: string } | { __typename?: 'PhotoAlbum', title: string, thumb?: string | null, releaseDate?: string | null, id: string } | null> | null } | null> | null };

export type OnItemUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnItemUpdatedSubscription = { __typename?: 'Subscription', onItemUpdated: { __typename?: 'Movie', title: string, thumb?: string | null, releaseDate?: string | null, id: string } | { __typename?: 'MusicAlbum', title: string, thumb?: string | null, id: string, artist?: { __typename?: 'Person', id: string, name: string } | null } | { __typename?: 'Person', id: string } | { __typename?: 'PhotoAlbum', title: string, thumb?: string | null, releaseDate?: string | null, id: string } };


export const GetLibrariesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLibraries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetLibrariesQuery, GetLibrariesQueryVariables>;
export const OnLibraryAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnLibraryAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onLibraryAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<OnLibraryAddedSubscription, OnLibraryAddedSubscriptionVariables>;
export const GetLatestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLatest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"library"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicAlbum"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PhotoAlbum"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetLatestQuery, GetLatestQueryVariables>;
export const OnLatestHubAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnLatestHubAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onLatestItemAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"library"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicAlbum"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PhotoAlbum"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OnLatestHubAddedSubscription, OnLatestHubAddedSubscriptionVariables>;
export const OnItemUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnItemUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onItemUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Movie"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicAlbum"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PhotoAlbum"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"}},{"kind":"Field","name":{"kind":"Name","value":"releaseDate"}}]}}]}}]}}]} as unknown as DocumentNode<OnItemUpdatedSubscription, OnItemUpdatedSubscriptionVariables>;