
import { useDispatch } from 'react-redux';
import './login.sass';
import { useRef } from 'react';
import { AppRoute } from '../../const';
import { setUserInformation, redirectToRoute } from '../../store/auth/auth-actions';
import { userIds, users } from '../../mocks/users';

export function Login() {
  const dispatch = useDispatch();

  const loginRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const value = loginRef.current?.value;
    
    if (loginRef.current !== null) {
      if (userIds.includes(Number(loginRef.current.value))) {
        dispatch(setUserInformation({userInformation: users.find((id) => value === id.id.toString())}));
        dispatch(redirectToRoute(AppRoute.Root));
      }
    }
  };

  return (
    <div className="login">
      <div className="login__logo-wrapper">
        לוגו גדוד
      </div>
      <p className="login__description">ברוך הבא למערכת ניהול הפלוגה</p>
      <form className="login__form" action="#" onSubmit={handleSubmit}>
        <label className="login__field" htmlFor="private-number">
          <input className="login__input" ref={loginRef} type="number" id="private-number" minLength={7} maxLength={7} required placeholder='הזן מספר אישי'/>
        </label>
 
        <button className="login__btn" type="submit">כניסה</button>
      </form>
      <span className="login__rights">Version 1.0</span>
    </div>
  );
}
