import { User } from "../types/user";

interface MissionResult {
  success: boolean;
  message?: string;
  missionGroup: User[];
}

export function completeMission(soldiers: number, commanders: number, users: User[]): MissionResult {
  if (soldiers <= 0 || commanders <= 0) {
    return { success: false, message: "The number of soldiers and commanders must be a non-negative number.", missionGroup: users };
  }

  const availableSoldiers = users.filter((user) => user.employment.filter((active) => active).length > user.employment.filter((active) => !active).length && !user.isCommander);

  const commandersArr = users.filter((user) => user.employment.filter((active) => active).length > user.employment.filter((active) => !active).length && user.isCommander);

  const missionGroup = [...availableSoldiers];
  
  if (commanders) {
    for (let i = 0; i <= commanders; i++) {
      missionGroup.unshift(commandersArr[i]);
    }
  } else {
    return { success: false, message: "The number of commanders is not specified.", missionGroup: users };
  }
  console.log(missionGroup);
  
  return { success: true, missionGroup: missionGroup};
}
