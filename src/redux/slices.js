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

// export const succesAuth = (state, { payload }) => {
//   state.user = payload;
//   state.isAuth = true;
// }

// export const succesLogout = (state) => {
//   state.user = initialState.user;
//   state.isAuth = false;
// }

export const userAuthSlice = sliceWithThunk({
  name: "userAuth",
  initialState,
  reducers: {
    // succesAuth: succesAuth,
    // succesLogout: succesLogout,
    succesAuth: (state, { payload }) => {
      // console.log(payload)
      state.user = payload.user;
      state.isAuth = payload.isAuth;
      // console.log(state)
    },
    succesLogout: (state) => {
      state.user = initialState.user;
      state.isAuth = false;
    }
  }
})

export const {succesAuth, succesLogout} = userAuthSlice.actions