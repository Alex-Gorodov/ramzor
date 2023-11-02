import { createReducer } from "@reduxjs/toolkit";
import { AuthState } from "../../types/state";
import { setUserInformation } from "./auth-actions";
import { users } from "../../mocks/users";
import { saveToken } from "../../services/token";

const initialState: AuthState = {
  userInfo: undefined
}

export const authReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(setUserInformation, (state, action) => {
        const {userInformation} = action.payload;
        if (userInformation && users.includes(userInformation)) {
          state.userInfo = userInformation;
          saveToken(state.userInfo.token)
        }
      })
  }
);
