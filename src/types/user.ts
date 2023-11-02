export type User = {
  id: number;
  firstName: string;
  secondName: string;
  token: string;
  isAdmin: boolean;
  employment: boolean[];
}

export type AuthData = {
  id: number;
}