import { HomePage } from "../../pages/home-page/home-page";
import { FC } from "react";
import { AppRoute } from "../../const";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import browserHistory from "../../browser-history";
import { HistoryRouter } from "../history-route/history-route";
import { Provider } from "react-redux";
import { store } from "../../store";
import { LoginPage } from "../../pages/login-page/login-page";

export const App: FC = () => {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Provider store={store}>
          <Routes>
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Root} element={<HomePage />} />
          </Routes>
        </Provider>
      </HistoryRouter>
    </HelmetProvider>
  );
}
