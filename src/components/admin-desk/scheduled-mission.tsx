import { ReactComponent as MissionInfo } from "../../img/icons/mission-info.svg";
// import { useSelector } from "react-redux";
import { useState } from "react";
// import { RootState } from "../../store/RootState";
import { SECONDS_PER_DAY } from "../../const";
import { Mission } from "../../types/mission";
import { UserCard } from "./user-card";
import './mission.sass';

type ScheduledMissionProps = {
  mission: Mission;
}

export function ScheduledMission({ mission }: ScheduledMissionProps): JSX.Element {
  // const missions = useSelector((state: RootState) => state.admin.missions);

  // const uniqueMissions = Array.from(new Set(missions.map(m => m.name))).map(name => missions.find(m => m.name === name));
  
  const [showInfo, setShowInfo] = useState(false);
  
  // const missionsCount = mission.oneTimeActivity === false ? Math.round(((mission.endDate.getTime() - (mission.startDate.getTime())) / SECONDS_PER_DAY) / (mission.duration * 60)) : 1;

  const endTime = mission.startTime + mission.duration;
  
  const missionTop = `calc(${(mission.startTime) / 24 * 100}% + 0.5px)`;
  const missionRight = `calc(${mission.order * 260 + 80.5}px)`;
  const missionHeight = `calc(${mission.duration * 42 + mission.duration}px - 1px)`;
  
  return (
    <tr className="mission" style={{
      top: missionTop,
      // width: missionWidth,
      right: missionRight,
      height: missionHeight
    }}>
      <td className="mission__container">
        <ul className="mission__participants">        
          {
            mission.participants.map((user) => {
              user = {...user, isOnMission: true};
              
              return (
                <li key={`${mission.name} -> ${user.id}`}>
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
              (endTime) < 10 ? `0${endTime}` : endTime
            }:
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
  );
}
