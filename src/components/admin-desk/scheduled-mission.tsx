import { RootState } from "../../store/RootState";
import { Mission } from "../../types/mission";
import { useSelector } from "react-redux";
import { UserCard } from "./user-card";
import { useState } from "react";
import './mission.sass'

type ScheduledMissionProps = {
  mission: Mission;
}

export function ScheduledMission({mission}: ScheduledMissionProps): JSX.Element {
  const missions = useSelector((state: RootState) => state.admin.missions)

  const endTime = Math.round(mission.startingTime) + Math.round(mission.length);
  
  const uniqueMissions = missions.filter((mission, name, array) => {
    return array.findIndex((item) => item.name === mission.name) === name;
  })

  const [showInfo, setShowInfo] = useState(false);

  return (mission &&
    <div className="mission" style={{
      top: `calc(${mission.startingTime / 24 * 100}% + 0.5px)`,
      width: `calc(${100 / uniqueMissions.length}% - ${80 / uniqueMissions.length + 1}px)`,
      right: `calc(${mission.order / uniqueMissions.length * 100}% + ${80.5 - 80/uniqueMissions.length * mission.order}px)`,
      height: `calc(${mission.length * 42 + mission.length}px - 1px)`
    }}>
      <ul className="mission__participants">        
        {
          mission.participants.map((user) => {
            user = {...user, isOnMission: true};

            return (
              <li key={`${mission.name} -> ${user.firstName} ${user.secondName}`}>
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
            10 / Math.round(mission.startingTime) > 1
            ?
            '0' + Math.round(mission.startingTime)
            :
            (mission.startingTime)
          }:00 - {
            10 / (mission.startingTime + mission.length) > 1 && (mission.startingTime + mission.length) !== 9
            ?
            `0${endTime}`
            :
            endTime <= 24
              ?
              `${10 / endTime >= 1 ? endTime : '0' + endTime}`
              :
              `${(10 / endTime) % 24 > 1 ? endTime % 24 : '0' + endTime % 24}`}
              :
              {
                (mission.length + mission.startingTime) - Math.round(mission.length + mission.startingTime) !== 0 ? '30' : '00'
              }
        </span>
        <button className="mission__description-btn" type="button" onClick={() => setShowInfo(!showInfo)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5H11V7H9V5ZM9 9H11V15H9V9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z" fill="#999999"/>
          </svg>
        </button>
        <div className="mission__description" style={{bottom: showInfo ? '30px' : '200px', opacity: showInfo ? '1' : '0', userSelect: showInfo ? 'none' : 'all'}}>
          {mission.description}
        </div>
      </div>
    </div>
  );
}
