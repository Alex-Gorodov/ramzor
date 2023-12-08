import { User } from "./user";

export type Mission = {
  id: number;
  order: number;
  name: string;
  duration: number;
  oneTimeActivity: boolean | undefined;
  startTime: number;
  startDate: Date;
  endTime?: number;
  endDate: Date;
  command: number;
  participants: User[];
  description: string;
}
