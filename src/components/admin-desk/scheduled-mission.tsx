import { ReactComponent as MissionInfo } from "../../img/icons/mission-info.svg";
import { Mission } from "../../types/mission";
import { UserCard } from "./user-card";
import { useState } from "react";
import './mission.sass';

type ScheduledMissionProps = {
  mission: Mission;
  isDuplicatedMission?: boolean;
}

export function ScheduledMission({ mission, isDuplicatedMission }: ScheduledMissionProps): JSX.Element {
  const [showInfo, setShowInfo] = useState(false);
  const endTime = mission.startTime + mission.duration;

  const cutDuration = endTime % 24;
  const missionTop = `calc(${(mission.startTime) / 24 * 100}% + 0.5px)`;
  const missionRight = `calc(${mission.order * 260 + 80.5}px)`;
  const missionHeight = `calc(${mission.duration * 42 + mission.duration}px - 1px)`;

  return (
    <>
      <tr className="mission" style={{
        top: missionTop,
        right: missionRight,
        height: endTime <= 24 ? missionHeight : `calc(${(mission.duration - cutDuration) * 42}px + ${mission.duration - cutDuration - 1}px)`,
        overflow: mission.duration >= 4 && mission.participants.length <= 4 && endTime <= 24 ? 'hidden' : 'auto'
      }}>
        <td className="mission__container">
          <ul className="mission__participants">        
            {
              mission.participants.map((user) => {
                user = {...user, isOnMission: true};
                return (
                  <li key={`${mission.name} - ${mission.id} -> ${user.id}`}>
                    {
                      <UserCard user={user}/>
                    }
                  </li>
                )
              })
            }
          </ul>
          <div className="mission__info">
            <span>
              {
                (mission.startTime) < 10 ? `0${mission.startTime}` : mission.startTime
              }:00 - {
                (endTime < 10 ? `0${endTime}` : endTime > 24 && endTime % 24 < 10 ? `0${endTime % 24}` : endTime)
              }
              :
              {
                (endTime) - Math.round(endTime) !== 0 ? '30' : '00'
              }
            </span>
            <button className="mission__description-btn" type="button" onClick={() => setShowInfo(!showInfo)}>
              <span className="visually-hidden">מידע על המשימה</span>
              <MissionInfo/>
            </button>
            <div className="mission__description" style={{bottom: showInfo ? '30px' : '200px', opacity: showInfo ? '1' : '0', userSelect: showInfo ? 'none' : 'all'}}>
              {mission.description}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
}
