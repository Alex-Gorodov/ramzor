export type User = {
  id: number;
  platoon: number;
  firstName: string;
  secondName: string;
  token: string;
  employment: boolean[];
  isAdmin?: boolean;
  isCommander: boolean;
  isOnMission?: boolean;
  recruitmentCycle?: number;
}

export type AuthData = {
  id: number;
}
