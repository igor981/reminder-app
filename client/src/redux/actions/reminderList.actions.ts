export const setList = (list: any) => ({
  type: 'SET_LIST',
  payload: list,
});
export const checkTask = (task: any) => ({
  type: 'CHECK_TASK',
  payload: task,
});
export const deleteTask = (task: any) => ({
  type: 'DELETE_TASK',
  payload: task,
});
