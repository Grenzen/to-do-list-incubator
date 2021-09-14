import * as types from '../types/todolists'
import { FilterPropTypes } from '../../App'

export const removeTodoList = (id: string) => ({
    type: types.REMOVE_TODOLIST,
    payload: {
        id,
    },
} as const)

export const addTodoList = (newTodolistTitle: string, id: string) => ({
    type: types.ADD_TODOLIST,
    payload: {
        id,
        title: newTodolistTitle,
    },
} as const)

export const changeTodoListTitle = (todolistId: string, newTodolistTitle: string) => ({
    type: types.CHANGE_TODOLIST_TITLE,
    payload: {
        id: todolistId,
        title: newTodolistTitle,
    },
} as const)

export const changeTodoListFilter = (todolistId: string, newFilter: FilterPropTypes) => ({
    type: types.CHANGE_TODOLIST_FILTER,
    payload: {
        id: todolistId,
        filter: newFilter,
    },
} as const)