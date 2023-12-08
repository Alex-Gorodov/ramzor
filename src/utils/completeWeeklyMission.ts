import { useDispatch, useSelector } from "react-redux";
import { Mission } from "../types/mission";
import { User } from "../types/user";
import { addMission } from "../store/admin/admin-actions";
import { RootState } from "../store/RootState";
import { completeMissionParticipants } from "./completeMissionParticipants";

export function CompleteWeeklyMission(mission: Mission, users: User[]): void {
  const dispatch = useDispatch();
  const missions = useSelector((state: RootState) => state.admin.missions);

  if (mission.oneTimeActivity) {
    mission.startTime + mission.duration <= 24
      ? 
      dispatch(addMission({mission: {
        ...mission,
        id: missions.length,
        startTime: mission.startTime + mission.duration,
        participants: completeMissionParticipants(mission.participants.length, mission.command, users).missionGroup,
        description: `${mission.name}- ${mission.id}`
      }}))
      :
      dispatch(addMission({mission: {
        ...mission,
        id: missions.length,
        startDate: new Date(mission.startDate.getDate() + 1),
        startTime: Math.round((mission.startTime + mission.duration) % 24),
        participants: completeMissionParticipants(mission.participants.length, mission.command, users).missionGroup,
        description: `${mission.name}- ${mission.id}`
      }}))
  }
}
