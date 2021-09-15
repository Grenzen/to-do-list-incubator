import * as types from '../types/tasks'
import { v1 } from 'uuid'

export const addNewTaskArray = (newToDoListId: string) => ({
    type: types.ADD_NEW_TASKS_ARRAY,
    payload: {
        newToDoListId,
    },
} as const)

export const addTask = (newTaskTitle: string, toDoListId: string) => ({
    type: types.ADD_TASK,
    payload: {
        newTaskId: v1(),
        newTaskTitle,
        newTaskIsDone: false,
        toDoListId,
    },
} as const)

export const removeTask = (taskId: string, toDoListId: string) => ({
    type: types.REMOVE_TASK,
    payload: {
        taskId,
        toDoListId,
    },
} as const)

export const removeTasksArray = (toDoListsId: string) => ({
    type: types.REMOVE_TASKS_ARRAY,
    payload: {
        toDoListsId,
    },
} as const)

export const changeTaskTitle = (taskId: string, newTitle: string, toDoListId: string) => ({
    type: types.CHANGE_TASK_TITLE,
    payload: {
        taskId,
        newTitle,
        toDoListId,
    },
} as const)

export const changeSelect = (taskId: string, isDone: boolean, toDoListId: string) => ({
    type: types.CHANGE_SELECT,
    payload: {
        taskId,
        isDone,
        toDoListId,
    },
} as const)