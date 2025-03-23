const stateSelector = state => state.authReducer
const isAuthSelector = state => state.authReducer.isAuth
const userSelector = state => state.authReducer.user
const loginSelector = state => userSelector(state).login
const fullNameSelector = state => userSelector(state).fullName
const isAdminSelector = state => userSelector(state).isAdmin

export { stateSelector, isAuthSelector, userSelector, loginSelector, fullNameSelector, isAdminSelector }
