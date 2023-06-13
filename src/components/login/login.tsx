
import { useDispatch } from 'react-redux';
import './login.sass';
import { useEffect, useRef, useState } from 'react';
import { AppRoute } from '../../const';
import { setUserInformation, redirectToRoute } from '../../store/auth/auth-actions';
import { userIds, users } from '../../mocks/users';
import { RotatingLines } from 'react-loader-spinner';

export function Login() {
  const dispatch = useDispatch();

  const loginRef = useRef<HTMLInputElement | null>(null);

  const [isInputFilled, setInputFilled] = useState(false);

  const handleChange = () => {
    setInputFilled(loginRef.current?.value.length === 7)
  }
  
  useEffect(() => {
    loginRef.current?.value.length === 7
      ? setInputFilled(true)
      : setInputFilled(false)
  }, [loginRef]);

  setTimeout(() => {
    const value = loginRef.current?.value;

    if (loginRef.current !== null) {
      if (userIds.includes(Number(loginRef.current.value))) {
        dispatch(setUserInformation({userInformation: users.find((id) => value === id.id.toString())}));
        dispatch(redirectToRoute(AppRoute.Root));
      }
    }
  }, 500);

  return (
    <div className="login">
      <div className="login__logo-wrapper">
        לוגו גדוד
      </div>
      <p className="login__description">ברוך הבא למערכת ניהול הפלוגה</p>
      <form className="login__form" action="#">
        <label className="login__field" htmlFor="private-number">
          <input className="login__input" ref={loginRef} onChange={handleChange} type="number" id="private-number" autoFocus required placeholder='הזן מספר אישי'/>
        </label>
 
        <button className="login__btn" type="submit" disabled={!isInputFilled}>
          {
            isInputFilled && userIds.includes(Number(loginRef.current?.value))
              ? <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="16"
                  visible={true}
                />
              : 'כניסה'
          }
        </button>
      </form>
      <span className="login__rights">Version 1.0</span>
    </div>
  );
}
