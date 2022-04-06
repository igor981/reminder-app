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
export const deleteReminder = () => {
    return {
        type: 'DELETE_REMINDER'
    }
}
export const deleteSubtask = (subtaskId: string) => {
    return {
        type: 'DELETE_SUBTASK',
        payload: subtaskId
    }
}
export const addSubtask = (subtaskId: string) => {
    return {
        type: 'ADD_SUBTASK',
        payload: subtaskId
    }
}