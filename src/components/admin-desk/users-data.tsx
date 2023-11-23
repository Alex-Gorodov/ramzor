import {ReactComponent as UsersListToggler} from "../../img/icons/users-list-toggler.svg"
import { UserListPosition } from "../../const";
import { UserCard } from "./user-card";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/RootState";
import { addUser } from "../../store/admin/admin-actions";
import '../add-mission-form/form.sass'
import { createRandomBooleanArray } from "../../mocks/users";

export function UsersData(): JSX.Element {
  let availables = 0;
  let zeros = 0;
  let unavailables = 0;

  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [listPosition, setListPosition] = useState(UserListPosition[0]);
  const [isNewUserFormOpened, setNewUserFormOpened] = useState(false);
  const users = useSelector((state: RootState) => state.admin.users);
  const [formData, setFormData] = useState({
    id: users.length,
    firstName: '',
    secondName: '',
    isCommander: false,
    employment: []
  });

  const handleChangeData = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleAddSoldier = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addUser({user: {
      id: formData.id,
      firstName: formData.firstName,
      secondName: formData.secondName,
      isCommander: formData.isCommander,
      token: formData.firstName,
      employment: createRandomBooleanArray(24, 0.23, 0.77)
    }}))

    if (formRef.current !== null) {
      formRef.current.reset();
    }

    setNewUserFormOpened(false);
  }

  useEffect(() => {
    if (formData.id !== users.length) {
      setFormData({...formData, id: users.length});
    }
  }, [dispatch, formData, users]);

  users.map((user) => {
    if (user.employment.filter((active) => active).length === user.employment.filter((active) => !active).length)
    return (
      zeros++
    )
    return null;
  })

  users.map((user) => {
    if (user.employment.filter((active) => active).length > user.employment.filter((active) => !active).length)
    return (
      availables++
    )
    return null;
  })

  users.map((user) => {
    if (user.employment.filter((active) => !active).length > user.employment.filter((active) => active).length)
    return (
      unavailables++
    )
    return null;
  })

  const sortedUsers = [...users].sort((userA, userB) => {
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
      return null;
  });

  return (
    <div className="schedule-users__wrapper" style={{transform: listPosition}}>
      <div className="schedule-users__content">
        <div className="schedule-users__description">
          <h2 className="schedule-users__title">חיילים במנוחה</h2>
          <button className="schedule-users__add-btn" onClick={() => setNewUserFormOpened(!isNewUserFormOpened)}>הוסף חייל</button>
        </div>
        <form className="schedule-users__form form form__add-soldier" action="" ref={formRef} onSubmit={handleAddSoldier} style={{left: isNewUserFormOpened ? '50%' : '-50%'}}>
          <label className="form__element" htmlFor="new-user-first-name">
            <span>שם פרטי של החייל:</span>
            <input className="form__input" name="firstName" type="text" onChange={handleChangeData} placeholder="name" id="new-user-first-name"/>
          </label>
          <label className="form__element" htmlFor="new-user-second-name">
            <span>שם משפחה של החייל</span>
            <input className="form__input" name="secondName" type="text" onChange={handleChangeData} placeholder="surname" id="new-user-second-name"/>
          </label>
          <fieldset className="form__fieldset">
            <span>האם מפקד:</span>
            <ul className="form__radio-group">
              <li>
                <label className="form__element" htmlFor="regular">
                  <input type="radio" name="isCommander" id="regular" onChange={handleChangeData} checked/>
                  <span>לא</span>
                </label>
              </li>
              <li>
                <label className="form__element" htmlFor="commander">
                  <input type="radio" name="isCommander" id="commander" onChange={handleChangeData}/>
                  <span>כן</span>
                </label>
              </li>
            </ul>
          </fieldset>
          <button type="submit">submit</button>
        </form>
        <div className="schedule-users__block">
          {availables !== 0 &&
            <ul className="schedule__users schedule__users--available">
              {
                sortedUsers
              }
            </ul>
          }
          {zeros !== 0 &&
            <ul className="schedule__users schedule__users--zero">
              {
                users.map((user) => {
                  if (user.employment.filter((active) => !active).length >= user.employment.filter((active) => active).length) {
                    return (
                      <li key={`user-${user.token}`}>
                        <UserCard user={user}/>
                      </li>
                    );
                  }
                  return null;
                })
              }
            </ul>
          }
        </div>
        {/* {unavailables !== 0 &&
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
                return null;
              })
            }
          </ul>
        } */}
      </div>
      <div className="schedule__btn-wrapper">
        <button
          className="schedule__toggle-btn"
          onClick={() => {
            listPosition === UserListPosition[0]
              ? setListPosition(UserListPosition[1])
              : setListPosition(UserListPosition[0])
          }}
          data-opened={listPosition === UserListPosition[0]}>
          <UsersListToggler/>
        </button>
      </div>
    </div>
  );
}
