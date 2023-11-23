export type User = {
  id: number;
  firstName: string;
  secondName: string;
  token: string;
  employment: boolean[];
  isAdmin?: boolean;
  isCommander?: boolean;
  isOnMission?: boolean;
}

export type AuthData = {
  id: number;
}
