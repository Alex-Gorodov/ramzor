import { HomePage } from "../../pages/home-page/home-page";
import { FC } from "react";
import { AppRoute } from "../../const";
import { Route, Routes } from "react-router-dom";
import browserHistory from "../../browser-history";
import { HistoryRouter } from "../history-route/history-route";
import { Provider } from "react-redux";
import { store } from "../../store";
import { LoginPage } from "../../pages/login-page/login-page";
import { AdminPage } from "../../pages/admin-page/admin-page";

export const App: FC = () => {
  return (
    <HistoryRouter history={browserHistory} basename="/">
      <Provider store={store}>
        <Routes>
          <Route path={AppRoute.Login} element={<LoginPage />} />
          <Route path={AppRoute.Root} element={<HomePage />} />
          <Route path={AppRoute.Admin} element={<AdminPage />}/>
        </Routes>
      </Provider>
    </HistoryRouter>
  );
}
