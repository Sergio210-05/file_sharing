const serverURL = 'http://193.227.241.7'
// const serverURL = 'http://localhost:8000'
const mainURL = '/'
const csrfURL = '/api/csrf/'
const loginURL = '/api/login/'
const logoutURL = '/api/logout/'
const sessionURL = '/api/session/'
const userInfoURL = '/api/user_info/'
const removeSessionsURL = '/api/remove_user_sessions/'
const registrationURL = '/api/registration/'
const profileURL = '/api/profile/'
const storageURL = '/api/storage/'
const adminURL = '/api/admin/'
const adminUserStorageURL = '/api/admin/users/'
const getUsersURL = '/api/get_all_users/'
const changeAdminStatusURL = '/api/change_admin_status/'
const removeUserURL = '/api/remove_user/'
const baseURL = `${window.location.origin}`
const downloadURL = '/api/download/'

export { serverURL, mainURL, csrfURL, loginURL, logoutURL, 
  sessionURL, userInfoURL, removeSessionsURL, registrationURL, 
  profileURL, storageURL, adminURL, getUsersURL, changeAdminStatusURL,
  removeUserURL, adminUserStorageURL, baseURL, downloadURL,
}
