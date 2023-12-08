import {ReactComponent as UsersListToggler} from "../../img/icons/users-list-toggler.svg"
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { addUser, removeUser, toggleUsersList } from "../../store/admin/admin-actions";
import { createRandomBooleanArray } from "../../mocks/users";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/RootState";
import { UserListPosition } from "../../const";
import '../admin-desk/search.sass';
import { User } from "../../types/user";
import '../add-mission-form/form.sass';
import { UserCard } from "./user-card";
import cn from 'classnames';

export function UsersData(): JSX.Element {
  let availables = 0;
  let zeros = 0;
  let unavailables = 0;

  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [listPosition, setListPosition] = useState(UserListPosition[0]);
  const [isNewUserFormOpened, setNewUserFormOpened] = useState(false);
  const [isRemovingUser, setRemovingUser] = useState(false);
  const users = useSelector((state: RootState) => state.admin.users).filter((user) => !user.isOnMission);
  const [formData, setFormData] = useState({
    id: 0,
    firstName: '',
    secondName: '',
    isCommander: false,
    employment: []
  });

  const isListOpened = useSelector((state: RootState) => state.admin.isSoldiersListOpened);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const handleSoldierSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const inputValue = evt.target.value;
    setSearch(inputValue);

    const filtered = users.filter((user) =>
      user.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
      user.secondName.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  }

  const searchWrapperClassName = cn('schedule-users__search search', {
    'search--opened' : isSearchOpen,
  })

  const userWrapperClassName = cn('user-card__container', {
    'user-card__container--removing': isRemovingUser,
  });

  const handleChangeData = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleAddSoldier = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(addUser({user: {
      firstName: formData.firstName,
      secondName: formData.secondName,
      id: formData.id,
      isCommander: formData.isCommander,
      token: formData.firstName,
      platoon: 1,
      isOnMission: false,
      employment: createRandomBooleanArray(24, 0.23, 0.77)
    }}))

    if (formRef.current !== null) {
      formRef.current.reset();
    }

    setNewUserFormOpened(false);
  }


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
        <li className={userWrapperClassName} key={`user-${user.id}`} style={{animationDelay: `-${Math.random()}s`}}>
          {
            isRemovingUser &&
            <span onClick={() => dispatch(removeUser({userToRemove: user}))}></span>
          }
          <UserCard key={user.id} user={user}/>
        </li>
      )
      return null;
  });

  return (
    <div className="schedule-users__wrapper" style={{transform: listPosition}}>
      <div className="schedule-users__content">
        <div className="schedule-users__description">
          <h2 className="schedule-users__title">חיילים במנוחה</h2>
          <button className="search__btn" onClick={() => setSearchOpen(!isSearchOpen)} type="button" style={{marginLeft: zeros === 0 ? '20px' : 'auto'}}>
            <span className="visually-hidden">search soldier by name</span>
          </button>
          <div className="schedule-users__btn-wrapper">
            <button className="schedule-users__btn schedule-users__btn--add" onClick={() => setNewUserFormOpened(!isNewUserFormOpened)}>הוסף חייל</button>
            <button className="schedule-users__btn schedule-users__btn--remove" onClick={() => setRemovingUser(!isRemovingUser)}>הסר חייל</button>
          </div>
        </div>
        
        <div className={searchWrapperClassName}>
          <form action="" className="search__form form">
            <label className="search__label form__element" htmlFor="user-search">
              <input className="search__input form__input" type="text" name="user-search" id="user-search" placeholder="חיפוש..." onChange={handleSoldierSearch} value={isSearchOpen ? search : ''} autoComplete="off" style={{cursor: isSearchOpen ? 'text' : 'unset'}}/>
            </label>
          </form>
        </div>
          
        <form className="schedule-users__form form form__add-soldier" action="" ref={formRef} onSubmit={handleAddSoldier} style={{left: isNewUserFormOpened ? '50%' : '-50%'}}>
          <label className="form__element" htmlFor="new-user-first-name">
            <span>שם פרטי</span>
            <input className="form__input" name="firstName" type="text" onChange={handleChangeData} placeholder="שם פרטי" id="new-user-first-name"/>
          </label>
          <label className="form__element" htmlFor="new-user-second-name">
            <span>שם משפחה</span>
            <input className="form__input" name="secondName" type="text" onChange={handleChangeData} placeholder="שם משפחה" id="new-user-second-name"/>
          </label>
          <label className="form__element" htmlFor="new-user-id">
            <span>מספר אישי</span>
            <input className="form__input" name="id" type="number" onChange={handleChangeData} placeholder="מספר אישי" id="new-user-id"/>
          </label>
          <label className="form__element" htmlFor="new-user-platoon">
            <span>מחלקה</span>
            <input className="form__input" name="platoon" type="text" onChange={handleChangeData} placeholder="מחלקה" id="new-user-platoon"/>
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

        <div className="schedule-users__block" style={{transform: isSearchOpen ? 'translateY(10px)' : 'none', maxHeight: isSearchOpen ? '550px' : '580px', marginTop: isSearchOpen ? '30px' : '0'}}>
          {availables !== 0 &&
            <ul className="schedule__users schedule__users--available">
            {
              filteredUsers.length > 0
                ? filteredUsers.map((user) => (
                    <li className={userWrapperClassName} style={{ animationDelay: `-${Math.random()}s` }} key={`user-${user.id}`}>
                      {isRemovingUser && <span onClick={() => dispatch(removeUser({ userToRemove: user }))}></span>}
                      <UserCard key={user.id} user={user} />
                    </li>
                  ))
                : sortedUsers
            }
          </ul>
          }
          {zeros !== 0 &&
            <ul className="schedule__users schedule__users--zero">
              {
              filteredUsers.length > 0
                ?
                filteredUsers.map((user) => {
                  if (user.employment.filter((active) => !active).length >= user.employment.filter((active) => active).length) {
                    return (
                      <li className={userWrapperClassName} style={{animationDelay: `-${Math.random()}s`}} key={`user-out-${user.id}`} onClick={() => isRemovingUser && dispatch(removeUser({userToRemove: user}))}>
                        {
                          isRemovingUser &&
                          <span onClick={() => dispatch(removeUser({userToRemove: user}))}></span>
                        }
                        <UserCard key={`user-card-${user.id}`} user={user}/>
                      </li>
                    );
                  }
                  return null;
                })
                :
                users.map((user) => {
                  if (user.employment.filter((active) => !active).length >= user.employment.filter((active) => active).length) {
                    return (
                      <li className={userWrapperClassName} style={{animationDelay: `-${Math.random()}s`}} key={`user-out-${user.id}`} onClick={() => isRemovingUser && dispatch(removeUser({userToRemove: user}))}>
                        {
                          isRemovingUser &&
                          <span onClick={() => dispatch(removeUser({userToRemove: user}))}></span>
                        }
                        <UserCard key={`user-card-${user.id}`} user={user}/>
                      </li>
                    );
                  }
                  return null;
                })
              }
            </ul>
          }
        </div>

      </div>

      <div className="schedule__btn-wrapper">
        <button
          className="schedule__toggle-btn"
          onClick={() => {
            listPosition === UserListPosition[0]
              ? setListPosition(UserListPosition[1])
              : setListPosition(UserListPosition[0])
            dispatch(toggleUsersList({isOpened: !isListOpened}))
          }}
          data-opened={listPosition === UserListPosition[0]}>
            <span className="visually-hidden">פתיחת רמישת החיילים</span>
          <UsersListToggler/>
        </button>
      </div>

    </div>
  );
}
