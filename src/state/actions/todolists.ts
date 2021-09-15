import * as types from '../types/todolists'
import { FilterPropTypes } from '../../App'

export const removeTodoList = (todolistId: string) => ({
    type: types.REMOVE_TODOLIST,
    payload: {
        todolistId,
    },
} as const)

export const addTodoList = (newTodolistTitle: string, newTodolistId: string) => ({
    type: types.ADD_TODOLIST,
    payload: {
        newTodolistId,
        newTodolistTitle,
        newTodolistFilter: 'ALL',
    },
} as const)

export const changeTodoListTitle = (todolistId: string, newTodolistTitle: string) => ({
    type: types.CHANGE_TODOLIST_TITLE,
    payload: {
        todolistId,
        newTodolistTitle,
    },
} as const)

export const changeTodoListFilter = (todolistId: string, newFilter: FilterPropTypes) => ({
    type: types.CHANGE_TODOLIST_FILTER,
    payload: {
        todolistId,
        newFilter,
    },
} as const)