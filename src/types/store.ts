export enum APIRequestStatus {
  Idle,
  Pending,
  Success,
  Error,
}

export type APIRequestError = string | null;
