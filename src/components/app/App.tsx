import { Home } from "../../pages/home/home";
import { FC } from "react";
import { AppRoute } from "../../const";
import { Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import browserHistory from "../../browser-history";
import { HistoryRouter } from "../history-route/history-route";
import { configureStore } from "@reduxjs/toolkit";
import { calendarReducer } from "../../store/calendar/calendar-reducers";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});

export const App: FC = () => {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Provider store={store}>
          <Routes>
            <Route path={AppRoute.Root} element={<Home />} />
          </Routes>
        </Provider>
      </HistoryRouter>
    </HelmetProvider>
  );
}
