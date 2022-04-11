export const loginAction = (user: object) => ({
  type: 'USER_LOGIN',
  payload: user,
});
export const logOutAction = () => ({
  type: 'USER_LOGOUT',
});
