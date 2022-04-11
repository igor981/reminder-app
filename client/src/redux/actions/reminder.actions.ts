export const fetchedReminder = (reminder: object) => ({
  type: 'SET_REMINDER',
  payload: reminder,
});
export const updateReminder = (reminder: object) => ({
  type: 'UPDATE_REMINDER',
  payload: reminder,
});
export const checkReminder = (check: boolean) => ({
  type: 'CHECK_REMINDER',
  payload: check,
});
export const deleteReminder = () => ({
  type: 'DELETE_REMINDER',
});
export const deleteSubtask = (subtaskId: string) => ({
  type: 'DELETE_SUBTASK',
  payload: subtaskId,
});
export const addSubtask = (subtask: any) => ({
  type: 'ADD_SUBTASK',
  payload: subtask,
});
export const updateSubtask = (subtask: any) => ({
  type: 'UPDATE_SUBTASK',
  payload: subtask,
});
