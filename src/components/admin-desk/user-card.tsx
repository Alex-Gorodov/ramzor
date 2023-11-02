import { useState } from "react";
import { User } from "../../types/user";
import './user-card.sass';

type UserProps = {
  user: User;
}

export function UserCard({user}: UserProps): JSX.Element {
  const availableUserHours = user.employment.filter((active) => active).length;
  const unAvailableUserHours = user.employment.filter((active) => !active).length;
  const isUserAvailable = availableUserHours - unAvailableUserHours > 0;
  const [isAvailable, setIsAvailable] = useState(isUserAvailable);

  return (
    <div className="user-card" draggable={isAvailable} data-available={availableUserHours - unAvailableUserHours > 0}>
      <p className="user-card__employment">
        {
          isUserAvailable
          ? `+${availableUserHours - unAvailableUserHours}`
          : availableUserHours - unAvailableUserHours === 0
            ? '0'
            : `-${unAvailableUserHours - availableUserHours}`
        }
      </p>
      <div className="user-card__wrapper">
        <h3 className="user-card__secondname">{user.secondName}</h3>
        <p className="user-card__firstname">{user.firstName}</p>
      </div>
      {
        availableUserHours - unAvailableUserHours <= 0 &&
        <button
          className="user-card__block-toggle" 
          title={
            isAvailable ? 'click to lock' : 'click to unlock'
          }
          onClick={() => setIsAvailable(!isAvailable)}
        >
          {
            isAvailable
            ?
            <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="5" width="15" height="11" rx="1" fill="black"/>
              <path d="M1.00039 5C0.939922 -0.334625 7.92409 -0.332042 8 5" stroke="black" stroke-width="2" stroke-linecap="round"/>
            </svg>
            :
            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="5" width="15" height="11" rx="1" fill="black"/>
              <path d="M4.00039 5C3.93992 -0.334625 10.9241 -0.332042 11 5" stroke="black" stroke-width="2" stroke-linecap="round"/>
            </svg>
          }
        </button>
      }
    </div>
  );
}
