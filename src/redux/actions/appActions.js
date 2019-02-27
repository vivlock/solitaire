export const SET_USER_PREFS = 'SET_USER_PREFS';
export function setUserPrefs(userPrefs) {
  return {
    type: SET_USER_PREFS,
    userPrefs
  }
}
