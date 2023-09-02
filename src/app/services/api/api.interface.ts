export interface ApiInterface {
  USER_LIST(): string,
  CREATE_USER(): string,
  UPDATE_USER(userId: string): string,
  USER(userId: string): string,
  DELETE_USER(userId: string): string,
}
