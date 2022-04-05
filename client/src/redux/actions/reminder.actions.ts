export const fetchedReminder = (reminder: object) => {
    return {
        type: 'SET_REMINDER',
        payload: reminder
    }
}
export const updateReminder = (reminder: object) => {
    return {
        type: 'UPDATE_REMINDER',
        payload: reminder
    }
}