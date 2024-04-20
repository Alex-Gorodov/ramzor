import { User } from "../types/user";

interface MissionResult {
  success: boolean;
  message?: string;
  missionGroup: User[];
}

export function resetMissionStatus(users: User[]): void {
  users.forEach((user) => {
    user.isOnMission = false;
  });
}

export function completeMissionParticipants(soldiers: number, commanders: number, users: User[]): MissionResult {
  if (soldiers <= 0 || commanders <= 0) {
    return { success: false, message: "The number of soldiers and commanders must be a non-negative number.", missionGroup: users.filter((user) => !user.isOnMission) };
  }

  const availableSoldiers = users.filter((user) => user.employment.filter((active) => active).length > user.employment.filter((active) => !active).length && !user.isCommander);

  const commandersArr = users.filter((user) => user.employment.filter((active) => active).length > user.employment.filter((active) => !active).length && user.isCommander);

  const missionGroup = [...availableSoldiers].slice(0, soldiers);
  
  if (commanders) {
    for (let i = 0; i <= commanders - 1; i++) {
      const commander = commandersArr[i];
      if (commander) {
        missionGroup.unshift(commander);
        commander.isOnMission = true;  // Установка свойства isOnMission в true
      }
    }
  } else {
    return { success: false, message: "The number of commanders is not specified.", missionGroup: users };
  }

  // Установка свойства isOnMission в true для всех участников миссии, удостоверившись, что они не undefined
  missionGroup.filter(Boolean).forEach((participant) => {
    participant.isOnMission = true;
  });
  
  return { success: true, missionGroup: missionGroup.filter(Boolean) };
}