export interface Macros {
    protein: number,
    carbs: number,
    fats: number,
}
export interface Subtask {
    subTaskId: string,
    parentId: string,
    category: string,
    task: string,
    description: string,
    deadline: string,
    checked: boolean,
    cost: number,
    nutrients: Macros
}
export interface Task {
    category?: string,
    checked?: boolean,
    cost?: number,
    creatorId?: string,
    deadline?: string,
    description?: string,
    locked?: boolean,
    public?: boolean,
    subtasks?: Subtask[],
    task?: string,
    taskId?: string,
    __v?: number,
    _id?: string,
}

export interface List {
    [index: number]: Task;
}
export interface User {
    _id: string,
    userId: string,
    username: string,
    fname: string,
    lname: string,
    password: string,
    public: string,
    __v: string,
}

export interface RootReducerIf {
    reminder: Task,
    list: Task[],
    user: User
}
