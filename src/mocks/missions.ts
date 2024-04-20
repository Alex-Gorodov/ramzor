import { completeMissionParticipants, resetMissionStatus } from "../utils/completeMissionParticipants";
import { Mission } from "../types/mission";
import mesimot from "../mesimot.json"
import { User } from "../types/user";
import { users } from "./users";
import ids from "../ids.json";

const jsonData = {
  mesimot,
  ids
};

export const missions: Mission[] = Object.keys(jsonData.mesimot.id).map((key) => {
  const id: number = jsonData.mesimot.id[key as keyof typeof jsonData.mesimot.id];
  const order: number = id;
  const name: string = jsonData.mesimot.name[key as keyof typeof jsonData.mesimot.name];
  const duration: number = jsonData.mesimot.duration[key as keyof typeof jsonData.mesimot.duration];
  const oneTimeActivity: boolean = jsonData.mesimot.one_time_activity[key as keyof typeof jsonData.mesimot.one_time_activity] === 1;
  const startDate: Date = jsonData.mesimot.start_date[key as keyof typeof jsonData.mesimot.start_date] ? new Date(jsonData.mesimot.start_date[key as keyof typeof jsonData.mesimot.start_date].replace(/"/g, '')) : new Date();
  const endDate: Date = jsonData.mesimot.end_date[key as keyof typeof jsonData.mesimot.end_date] ? new Date(jsonData.mesimot.end_date[key as keyof typeof jsonData.mesimot.end_date].replace(/"/g, '')) : new Date();
  
  let startTime: number = 0;
  if (jsonData.mesimot.start_time[key as keyof typeof jsonData.mesimot.start_time]) {
    const startTimeString = jsonData.mesimot.start_time[key as keyof typeof jsonData.mesimot.start_time].replace(/"/g, '');
    startTime = parseInt(startTimeString.startsWith('0') ? startTimeString.substring(1) : startTimeString.split(':')[0]);
  }
  startDate.setHours(startTime);
  
  const command: number = jsonData.mesimot.command[key as keyof typeof jsonData.mesimot.command];

  const participants: User[] = completeMissionParticipants(jsonData.mesimot.soldier[key as keyof typeof jsonData.mesimot.soldier], command, users.filter((user) => !user.isOnMission)).missionGroup;
  participants.map((user) => user.isOnMission = true);
  const description: string = '...';

  return {
    id,
    order,
    name,
    duration,
    oneTimeActivity,
    startDate,
    startTime,
    command,
    participants,
    description,
    endDate,
  };
});

const processMocks = (mocks: Mission[]): Mission[] => {
  let counter = missions.length - 1;

  return mocks.filter((mission) => !mission.oneTimeActivity).flatMap((mission) => {
    const missionsCount = Math.round((mission.endDate.getTime() - mission.startDate.getTime()) / (mission.duration * 60 * 60 * 1000));

    return Array.from({ length: missionsCount + 1 }, (_, i) => {
      counter++;

      const currentStartDate = new Date(mission.startDate.getTime() + i * mission.duration * 60 * 60 * 1000);
      const currentStartTime = mission.startTime + i * mission.duration;

      if (counter % 8 < 1) {
        resetMissionStatus(users);
      }

      return {
        ...mission,
        id: counter,
        participants: completeMissionParticipants(mission.participants.length - 1, mission.command, users.filter((user) => !user.isOnMission)).missionGroup,
        startTime: currentStartTime >= 24 ? currentStartTime % 24 : currentStartTime,
        startDate: currentStartDate,
      };
    }).flat();    
  });
};

export const newMissions = missions.concat(processMocks(missions))
