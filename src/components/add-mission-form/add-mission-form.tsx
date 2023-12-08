import { useState, useRef, ChangeEvent, FormEvent, useEffect, useMemo } from 'react';
import { addMission, toggleForm } from '../../store/admin/admin-actions';
import { completeMissionParticipants } from '../../utils/completeMissionParticipants';
import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from '../admin-desk/user-card';
import { RootState } from '../../store/RootState';
import cn from 'classnames';
import './form.sass';

export function AddMissionForm(): JSX.Element {
  const dispatch = useDispatch();
  const isFormOpened = useSelector((state: RootState) => state.admin.isFormOpened);
  const missions = useSelector((state: RootState) => state.admin.missions);
  const users = useSelector((state: RootState) => state.admin.users);
  const formRef = useRef<HTMLFormElement>(null);
  const [showUserCards, setShowUserCards] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputDateClassName = cn('form__input form__input--date', {
    'form__input--date-has-value': hasValue,
  });

  const [formData, setFormData] = useState({
    id: missions.length,
    order: 0,
    name: '',
    lengthHours: 0,
    lengthMinutes: 0,
    oneTimeActivity: undefined,
    startingDate: new Date(),
    startMinutes: 0,
    startHours: 0,
    endingDate: new Date(),
    endMinutes: 0,
    endHours: 0,
    numOfCommanders: 0,
    participants: 0,
    description: '',
  });

  const handleCompleteSoldiers = useMemo(() => {
    return completeMissionParticipants(formData.participants, formData.numOfCommanders, users).missionGroup;
  }, [formData.participants, formData.numOfCommanders, users]);

  const handleChangeData = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleChangeDateData = (
    evt: ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setHasValue(true);
  };

  const presentedMission = missions.find((mission) => mission.name === formData.name);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(addMission({
      mission: {
        id: formData.id,
        order: presentedMission ? presentedMission.order : formData.id,
        name: formData.name,
        duration: formData.oneTimeActivity ? Math.round(formData.lengthHours) + formData.lengthMinutes / 60 : (formData.endHours - formData.startHours),
        oneTimeActivity: formData.oneTimeActivity,
        startDate: new Date(`${formData.startingDate}T${formData.startHours}:${formData.startMinutes ? formData.startMinutes : '00'}:00.000Z`),
        startTime: Math.round(formData.startHours) + formData.startMinutes / 60,
        endDate: new Date(`${formData.endingDate}T${formData.endHours}:${formData.endMinutes ? formData.endMinutes : '00'}:00.000Z`),
        command: Number(formData.numOfCommanders),
        participants: handleCompleteSoldiers.slice(0, formData.participants),
        description: formData.description,
      },
    }));

    dispatch(toggleForm({ isOpened: !isFormOpened }));

    if (formRef.current !== null) {
      formRef.current.reset();
    }
  };

  useEffect(() => {
    if (formData.id !== missions.length) {
      setFormData({ ...formData, id: missions.length });
    }
  }, [formData, missions]);

  const handleAutoComplete = () => {
    setShowUserCards(!showUserCards);
    setFormData((prevData) => ({
      ...prevData,
      participants: handleCompleteSoldiers.length - 1,
    }));
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        dispatch(toggleForm({ isOpened: false }));
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });

  return (
    <div className="form__container" style={{
      top: `${isFormOpened ? '0%' : '-150%'}`
    }}>
      <div className="form__wrapper">
        <div className="form__inner-wrapper">
          <h2 className="form__title">הוספת משימה חדשה</h2>
          <button className='form__close-btn' onClick={() => {dispatch(toggleForm({isOpened: !isFormOpened}))}} title='לסגור(esc)'>
            <span className="visually-hidden">לסגור</span>
          </button>
        </div>

        <form action="" method="post" className="mission-form form" ref={formRef} onSubmit={handleFormSubmit}>
          <label className="form__label form__element grid-form-element" htmlFor="mission-name">
            <span>שם המשימה:</span>
            <input className="form__input" type="text" name="name" id="mission-name" autoComplete="off" onChange={handleChangeData} required/>
          </label>

          <fieldset className="form__fieldset grid-form-element">
            <span>סוג משימה:</span>
            <ul className="form__radio-group form__list-group">
              <li>
                <label className="form__element" htmlFor="mission-regular">
                  <input type="radio" name="oneTimeActivity" value={'false'} id="mission-regular" onChange={handleChangeData}/>
                  <span>בת״ש</span>
                </label>
              </li>
              <li>
                <label className="form__element" htmlFor="mission-special">
                  <input type="radio" name="oneTimeActivity" value={'true'} id="mission-special" onChange={handleChangeData}/>
                  <span>מיוחדת</span>
                </label>
              </li>
            </ul>
          </fieldset>

          {
            formData.oneTimeActivity === 'true'
            && 
            <fieldset className="form__fieldset form__fieldset--column">
              <label className="form__element grid-form-element" htmlFor="mission-start">
                <span>התחלה:</span>
                <div>
                  <input className={inputDateClassName} type="date" onChange={handleChangeDateData} name="startingDate" id="mission-starting-date" style={{marginLeft: '32px'}}/>
                  <input className="form__input form__input--number" type="number" onChange={handleChangeData} name="startMinutes" id="mission-start-minutes"/>&nbsp;:&nbsp;
                  <input className="form__input form__input--number" type="number" onChange={handleChangeData} name="startHours" id="mission-start" required/>
                </div>
              </label>
              <label className="form__element grid-form-element" htmlFor="mission-length">
                <span>משך:</span>
                <div>
                  <input className="form__input form__input--number" type="number" onChange={handleChangeData} name="lengthMinutes" id="mission-length-minutes" min={0} max={30} step={30} placeholder="00/30"/>&nbsp;:&nbsp;
                  <input className="form__input form__input--number" type="number" onChange={handleChangeData} name="lengthHours" id="mission-length" required/>
                </div>
              </label>
            </fieldset>
          }
{/* TODO fill the mission for a few days */}
          {
            formData.oneTimeActivity === 'false'
            &&
            <fieldset className="form__fieldset form__fieldset--column">
              <label className="form__element grid-form-element" htmlFor="mission-start">
                <span>התחלה:</span>
                <div>
                  <input className={inputDateClassName} type="date" onChange={handleChangeDateData} name="startingDate" id="mission-starting-date" style={{marginLeft: '32px'}}/>
                  <input className="form__input form__input--number" type="number" onChange={handleChangeData} name="startMinutes" id="mission-start-minutes"/>&nbsp;:&nbsp;
                  <input className="form__input form__input--number" type="number" onChange={handleChangeData} name="startHours" id="mission-start" required/>
                </div>
              </label>
              <label className="form__element grid-form-element" htmlFor="mission-end">
                <span>סיום:</span>
                <div>
                  <input className={inputDateClassName} type="date" onChange={handleChangeDateData} name="endingDate" id="mission-ending-date" style={{marginLeft: '32px'}}/>
                  <input className="form__input form__input--number" type="number" onChange={handleChangeData} name="endMinutes" id="mission-end-minutes"/>&nbsp;:&nbsp;
                  <input className="form__input form__input--number" type="number" onChange={handleChangeData} name="endHours" id="mission-end" required/>
                </div>
              </label>
              <label className="form__element grid-form-element" htmlFor="mission-length">
                <span>משך:</span>
                <div>
                  <input className="form__input form__input--number" type="number" onChange={handleChangeData} name="lengthMinutes" id="mission-length-minutes" min={0} max={30} step={30} placeholder="00/30"/>&nbsp;:&nbsp;
                  <input className="form__input form__input--number" type="number" onChange={handleChangeData} name="lengthHours" id="mission-length" required/>
                </div>
              </label>
            </fieldset>
          }

          <fieldset className="form__fieldset form__fieldset--column">
            <ul className="form__participants-count form__list-group">
              <li>
                <label htmlFor="mission-commanders-count" className="form__element grid-form-element">
                  <span>מס׳ מפקדים:</span>
                  <input className="form__input form__input--number" type="number" name="numOfCommanders" onChange={handleChangeData} id="mission-commanders-count" required/>
                </label>
              </li>
              <li>
                <label htmlFor="mission-soldiers-count" className="form__element form__element--small">
                  <span>מס׳ חיילים:</span>
                  <input className="form__input form__input--number" type="number" name="participants" onChange={handleChangeData} id="mission-soldiers-count" required/>
                </label>
              </li>
            </ul>
            <div className="form__create-soldiers-list">
              <div className="form__complete-wrapper">
                <span>משתתפים:</span>
                <button className="form__btn form__btn--autocomplete" onClick={() => handleAutoComplete()} type="button">השלם אוטומטית</button>
              </div>
              <div className="form__creation-container">
                <ul className="form__soldiers-list">
                  {Array.from({ length: Number(formData.participants) + Number(formData.numOfCommanders) }).map((_, index) => (
                    <li key={index}>
                      {showUserCards ? (
                        <UserCard user={handleCompleteSoldiers[index]} />
                      ) : (
                        <UserCard />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </fieldset>
          <label className='form__label form__label--column' htmlFor="mission-description">
            תיאור משימה:
            <textarea className="form__description" name="description" id="mission-description" cols={30} rows={6} onChange={handleChangeData}></textarea>
          </label>
          <button className="form__btn form__btn--submit" type="submit">שמור</button>
        </form>
      </div>
    </div>
  );
}
