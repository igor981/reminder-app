export const loginAction = (user: object) => {
    return {
        type: 'USER_LOGIN',
        payload: user
    }
}
export const logOutAction = () => {
    return {
        type: 'USER_LOGOUT',
    }
}