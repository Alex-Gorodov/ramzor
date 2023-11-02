import { users } from "../../mocks/users";
import { UserCard } from "./user-card";

export function UsersData(): JSX.Element {
  let availables = 0;
  let zeros = 0;
  let unavailables = 0;

  users.map((user) => {
    if (user.employment.filter((active) => active).length === user.employment.filter((active) => !active).length)
    return (
      zeros++
    )
  })

  users.map((user) => {
    if (user.employment.filter((active) => active).length > user.employment.filter((active) => !active).length)
    return (
      availables++
    )
  })

  users.map((user) => {
    if (user.employment.filter((active) => !active).length > user.employment.filter((active) => active).length)
    return (
      unavailables++
    )
  })
  
  return (
    <div className="schedule-users__wrapper">
      {availables !== 0 &&
        <ul className="schedule__users schedule__users--available">
          {
            users.sort((userA, userB) => {
              const activeCountA = userA.employment.filter((active) => active).length;
              const activeCountB = userB.employment.filter((active) => active).length;
          
              return activeCountB - activeCountA;
            }).map((user) => {
              if (user.employment.filter((active) => active).length > user.employment.filter((active) => !active).length)
              return (
                <li key={`user-${user.token}`}>
                  <UserCard user={user}/>
                </li>
              )
            })
          }
        </ul>
      }
      {zeros !== 0 &&
        <ul className="schedule__users schedule__users--zero">
          {
            users.map((user) => {
              if (user.employment.filter((active) => !active).length === user.employment.filter((active) => active).length)
              return (
                <li key={`user-${user.token}`}>
                  <UserCard user={user}/>
                </li>
              )
            })
          }
        </ul>
      }
      {unavailables !== 0 &&
        <ul className="schedule__users schedule__users--unavailable">
          {
            users.sort((userA, userB) => {
              const activeCountA = userA.employment.filter((active) => active).length;
              const activeCountB = userB.employment.filter((active) => active).length;
          
              return activeCountB - activeCountA;
            }).map((user) => {
              if (user.employment.filter((active) => !active).length > user.employment.filter((active) => active).length)
              return (
                <li key={`user-${user.token}`}>
                  <UserCard user={user}/>
                </li>
              )
            })
          }
        </ul>
      }
    </div>
  );
}
