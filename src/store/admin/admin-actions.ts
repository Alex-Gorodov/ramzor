import { createAction } from "@reduxjs/toolkit";
import { Mission } from "../../types/mission";
import { User } from "../../types/user";

export const changeDateUp = createAction<{date: Date}>('admin/changeDateUp');

export const changeDateDown = createAction<{date: Date}>('admin/changeDateDown');

export const addMission = createAction<{mission: Mission}>('admin/addMission');

export const removeMission = createAction<{mission: Mission}>('admin/removeMission');

export const toggleForm = createAction<{isOpened: boolean}>('admin/toggleForm');

export const toggleUsersList = createAction<{isOpened: boolean}>('admin/toggleUsersList');

export const addUser = createAction<{user: User}>('admin/addUser');

export const removeUser = createAction<{userToRemove: User}>('admin/removeUser');