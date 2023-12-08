import { User } from "../types/user";

interface MissionResult {
  success: boolean;
  message?: string;
  missionGroup: User[];
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
      missionGroup.unshift(commandersArr[i]);
    }
  } else {
    return { success: false, message: "The number of commanders is not specified.", missionGroup: users };
  }
  
  return { success: true, missionGroup: missionGroup};
}
