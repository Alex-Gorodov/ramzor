import { createReducer } from "@reduxjs/toolkit";
import { AdminTableState } from "../../types/state";
import { addMission, addUser, changeDateDown, changeDateUp, removeMission, removeUser, toggleForm } from "./admin-actions";
import { missions } from "../../mocks/missions";
import { users } from "../../mocks/users";

const initialState: AdminTableState = {
  date: new Date(),
  missions: missions,
  isFormOpened: false,
  users: users,
}

export const adminTableReducer = createReducer(initialState, (builder) => {
  builder
  .addCase(changeDateDown, (state, action) => {
    const {date} = action.payload;
    const newDate = state.date.setDate(date.getDate() - 1);
    state.date = new Date(newDate);
  })
  .addCase(changeDateUp, (state, action) => {
    const {date} = action.payload;
    const newDate = state.date.setDate(date.getDate() + 1);
    state.date = new Date(newDate);
  })
  .addCase(removeMission, (state, action) => {
    const {mission} = action.payload;
    state.missions = state.missions.filter((oldMission) => mission.id !== oldMission.id);

    const deletedOrder = mission.order;
    state.missions = state.missions
      .filter((oldMission) => mission.id !== oldMission.id)
      .map((remainingMission) => {
        if (remainingMission.order > deletedOrder) {
          return { ...remainingMission, order: remainingMission.order - 1 };
        }
        return remainingMission;
      });
  })
  .addCase(addMission, (state, action) => {
    const {mission} = action.payload;
    state.missions.push(mission);
  })
  .addCase(toggleForm, (state, action) => {
    const {isOpened} = action.payload;
    state.isFormOpened = isOpened;
  })
  .addCase(addUser, (state, action) => {
    const {user} = action.payload;
    state.users.push(user);
  })
  .addCase(removeUser, (state, action) => {
    const {userToRemove} = action.payload;
    state.users = state.users.filter((user) => user.id !== userToRemove.id);
  })
})
