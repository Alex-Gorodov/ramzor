import { ReactComponent as Commander } from "../../img/icons/commander-icon.svg";
import { ReactComponent as Tent } from "../../img/icons/tent-icon.svg";
import { ReactComponent as Home } from "../../img/icons/home-icon.svg";
import { User } from "../../types/user";
import "./user-card.sass";

type UserProps = {
  user?: User;
};

export function UserCard({ user }: UserProps): JSX.Element {
  const availableUserHours = user?.employment.filter((active) => active).length || 0;
  const unAvailableUserHours = user?.employment.filter((active) => !active).length || 0;
  const isUserAvailable = (availableUserHours - unAvailableUserHours) > 0;

  if (user) return (
    <div className="user-card" draggable={isUserAvailable} data-available={(availableUserHours - unAvailableUserHours) > 0}>
      {user?.isCommander && <Commander style={{ position: 'absolute', top: '7px', right: '12px' }} />}
      <div className="user-card__wrapper">
        <h3 className="user-card__secondname">{user?.secondName}</h3>
        <p className="user-card__firstname">{user?.firstName}</p>
      </div>
      {user?.isOnMission && (availableUserHours - unAvailableUserHours) <= 0 ? <Home /> : <Tent />}
      <p className="user-card__employment">
        {user?.isOnMission && isUserAvailable ? `${availableUserHours - unAvailableUserHours}+` : ''}
      </p>
    </div>
  ); else {
    return (
      <div className="user-card user-card--empty" draggable={isUserAvailable} data-available={(availableUserHours - unAvailableUserHours) > 0}>
        {/* {user?.isCommander && <Commander style={{ position: 'absolute', top: '7px', right: '12px' }} />}
        <div className="user-card__wrapper">
          <h3 className="user-card__secondname">{user?.secondName}</h3>
          <p className="user-card__firstname">{user?.firstName}</p>
        </div>
        {user?.isOnMission && (availableUserHours - unAvailableUserHours) <= 0 ? <Home /> : <Tent />}
        <p className="user-card__employment">
          {user?.isOnMission && isUserAvailable ? `${availableUserHours - unAvailableUserHours}+` : ''}
        </p> */}
      </div>
    )
  }
}
