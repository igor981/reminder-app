export const setList = (list: any) => {
    return {
        type: 'SET_LIST',
        payload: list
    }
}
export const checkTask = (task: any) => {
    return {
        type: 'CHECK_TASK',
        payload: task
    }
}
export const deleteTask = (task: any) => {
    return {
        type: 'DELETE_TASK',
        payload: task
    }
}