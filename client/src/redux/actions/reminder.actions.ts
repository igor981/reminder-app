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
export const checkReminder = (check: boolean) => {
    return {
        type: 'CHECK_REMINDER',
        payload: check
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
export const addSubtask = (subtask: any) => {
    return {
        type: 'ADD_SUBTASK',
        payload: subtask
    }
}
export const updateSubtask = (subtask: any) => {
    return {
        type: 'UPDATE_SUBTASK',
        payload: subtask
    }
}