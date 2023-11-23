import { User } from "./user";

export type Mission = {
  id: number;
  order: number;
  name: string;
  length: number;
  isSpecial: boolean;
  startingDate: Date;
  startingTime: number;
  numOfCommanders: number;
  participants: User[];
  description: string;
}
