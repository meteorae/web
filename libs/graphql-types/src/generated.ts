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

export type Agent = {
  __typename?: 'Agent';
  identifier: Scalars['String'];
  name: Scalars['String'];
};

/** Authentication payload returned on successful login. */
export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Identifier = {
  __typename?: 'Identifier';
  name: Scalars['String'];
  type: Scalars['Int'];
  value: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  hash?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** Item information. */
export type Item = {
  art?: Maybe<Image>;
  createdAt: Scalars['Time'];
  deletedAt: Scalars['Time'];
  id: Scalars['ID'];
  identifiers?: Maybe<Array<Maybe<Identifier>>>;
  isAnalyzing: Scalars['Boolean'];
  isRefreshing: Scalars['Boolean'];
  sortTitle: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
  thumb?: Maybe<Image>;
  title: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type ItemsResult = {
  __typename?: 'ItemsResult';
  items?: Maybe<Array<Maybe<Item>>>;
  total?: Maybe<Scalars['Int']>;
};

export type LatestResult = {
  __typename?: 'LatestResult';
  items: Array<Item>;
  library: Library;
};

/** Library information. */
export type Library = {
  __typename?: 'Library';
  agent: Scalars['String'];
  createdAt: Scalars['Time'];
  id: Scalars['ID'];
  language: Scalars['String'];
  locations: Array<Scalars['String']>;
  name: Scalars['String'];
  scannedAt: Scalars['Time'];
  scanner: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type Movie = Item & {
  __typename?: 'Movie';
  art?: Maybe<Image>;
  createdAt: Scalars['Time'];
  deletedAt: Scalars['Time'];
  id: Scalars['ID'];
  identifiers?: Maybe<Array<Maybe<Identifier>>>;
  isAnalyzing: Scalars['Boolean'];
  isRefreshing: Scalars['Boolean'];
  sortTitle: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  tagline?: Maybe<Scalars['String']>;
  thumb?: Maybe<Image>;
  title: Scalars['String'];
  updatedAt: Scalars['Time'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Add a new library of the specified type, with the provided name, language and location. This will trigger a scan for all locations provided. */
  addLibrary: Library;
  completeOnboarding?: Maybe<ServerInfo>;
  /** Authenticate user with the provided username and password. */
  login: AuthPayload;
  /** Create a new user with the provided username and password. */
  register: AuthPayload;
};


export type MutationAddLibraryArgs = {
  agent: Scalars['String'];
  language: Scalars['String'];
  locations: Array<Scalars['String']>;
  name: Scalars['String'];
  scanner: Scalars['String'];
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

export type Query = {
  __typename?: 'Query';
  /** Query the available agents for a library type. */
  agents?: Maybe<Array<Agent>>;
  /** Query the children of the provided item. */
  children?: Maybe<ItemsResult>;
  /** Query the specified item. */
  item?: Maybe<Item>;
  /** Query all items. */
  items?: Maybe<ItemsResult>;
  /** Query latest content for all libraries. */
  latest?: Maybe<Array<Maybe<LatestResult>>>;
  /** Query all libraries. */
  libraries?: Maybe<Array<Maybe<Library>>>;
  /** Query the specified library. */
  library?: Maybe<Library>;
  /** Query the availabel scanners for a library type. */
  scanners?: Maybe<Array<Scanner>>;
  serverInfo: ServerInfo;
  /** Query the specified user. */
  user?: Maybe<User>;
  /** Query all users. */
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryAgentsArgs = {
  libraryType: Scalars['String'];
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


export type QueryScannersArgs = {
  libraryType: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};

export type Scanner = {
  __typename?: 'Scanner';
  identifier: Scalars['String'];
  name: Scalars['String'];
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

export type OnItemUpdatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnItemUpdatedSubscription = { __typename?: 'Subscription', onItemUpdated: { __typename?: 'Movie', id: string, title: string, startDate?: string | null, isRefreshing: boolean, thumb?: { __typename?: 'Image', url?: string | null } | null } };

export type OnLibraryAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnLibraryAddedSubscription = { __typename?: 'Subscription', onLibraryAdded: { __typename?: 'Library', id: string, name: string, type: string } };

export type GetLatestQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestQuery = { __typename?: 'Query', latest?: Array<{ __typename?: 'LatestResult', library: { __typename?: 'Library', id: string, name: string }, items: Array<{ __typename?: 'Movie', id: string, title: string, startDate?: string | null, isRefreshing: boolean, thumb?: { __typename?: 'Image', url?: string | null } | null }> } | null> | null };

export type GetItemsQueryVariables = Exact<{
  libraryId: Scalars['ID'];
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type GetItemsQuery = { __typename?: 'Query', items?: { __typename?: 'ItemsResult', total?: number | null, items?: Array<{ __typename: 'Movie', id: string, title: string, startDate?: string | null, isRefreshing: boolean, thumb?: { __typename?: 'Image', url?: string | null } | null } | null> | null } | null, library?: { __typename?: 'Library', id: string, name: string, type: string } | null };

export type CreateLibraryMutationVariables = Exact<{
  type: Scalars['String'];
  name: Scalars['String'];
  language: Scalars['String'];
  locations: Array<Scalars['String']> | Scalars['String'];
  scanner: Scalars['String'];
  agent: Scalars['String'];
}>;


export type CreateLibraryMutation = { __typename?: 'Mutation', addLibrary: { __typename?: 'Library', name: string } };

export type ScannersAndAgentsQueryVariables = Exact<{
  libraryType: Scalars['String'];
}>;


export type ScannersAndAgentsQuery = { __typename?: 'Query', scanners?: Array<{ __typename?: 'Scanner', name: string, identifier: string }> | null, agents?: Array<{ __typename?: 'Agent', name: string, identifier: string }> | null };


export const GetLibrariesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLibraries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetLibrariesQuery, GetLibrariesQueryVariables>;
export const OnItemUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnItemUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onItemUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"isRefreshing"}}]}}]}}]} as unknown as DocumentNode<OnItemUpdatedSubscription, OnItemUpdatedSubscriptionVariables>;
export const OnLibraryAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnLibraryAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"onLibraryAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<OnLibraryAddedSubscription, OnLibraryAddedSubscriptionVariables>;
export const GetLatestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLatest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"latest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"library"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"isRefreshing"}}]}}]}}]}}]} as unknown as DocumentNode<GetLatestQuery, GetLatestQueryVariables>;
export const GetItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"libraryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"libraryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"libraryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"thumb"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"isRefreshing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"library"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"libraryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetItemsQuery, GetItemsQueryVariables>;
export const CreateLibraryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLibrary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"locations"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"scanner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"agent"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addLibrary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}},{"kind":"Argument","name":{"kind":"Name","value":"locations"},"value":{"kind":"Variable","name":{"kind":"Name","value":"locations"}}},{"kind":"Argument","name":{"kind":"Name","value":"scanner"},"value":{"kind":"Variable","name":{"kind":"Name","value":"scanner"}}},{"kind":"Argument","name":{"kind":"Name","value":"agent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"agent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateLibraryMutation, CreateLibraryMutationVariables>;
export const ScannersAndAgentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ScannersAndAgents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"libraryType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scanners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"libraryType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"libraryType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}}]}},{"kind":"Field","name":{"kind":"Name","value":"agents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"libraryType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"libraryType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}}]}}]}}]} as unknown as DocumentNode<ScannersAndAgentsQuery, ScannersAndAgentsQueryVariables>;