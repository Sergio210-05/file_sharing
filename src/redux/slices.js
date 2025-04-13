import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {
    id: null,
    login: null,
    fullName: null,
    email: null,
    isAdmin: false
  },
}

const sliceWithThunk = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const userAuthSlice = sliceWithThunk({
  name: "userAuth",
  initialState,
  reducers: {
    succesAuth: (state, { payload }) => {
      state.user = payload.user;
      state.isAuth = payload.isAuth;
    },
    succesLogout: (state) => {
      state.user = initialState.user;
      state.isAuth = false;
    }
  }
})

export const {succesAuth, succesLogout} = userAuthSlice.actions