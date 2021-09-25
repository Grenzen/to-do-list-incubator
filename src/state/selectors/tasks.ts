import { RootStateType } from '../index'

export const tasksSelector = (state: RootStateType) => state.tasks.todoLists
export const newTaskTitleSelector = (state: RootStateType) => state.tasks.newTaskTitle