import * as types from '../types/todoLists'
import { FilterPropTypes } from '../reducers/taskFilter'

type RemoveTodosType = ReturnType<typeof removeTodoList>
type AddTodosType = ReturnType<typeof addTodoList>
type ChangeTodosTitleType = ReturnType<typeof changeTodoListTitle>
type ChangeTodosFilterType = ReturnType<typeof changeTodoListFilter>
type SetNewTodoListTitleType = ReturnType<typeof setNewTodoListTitle>
export type ActionTodoListsType =
    RemoveTodosType | AddTodosType | ChangeTodosTitleType
    | ChangeTodosFilterType | SetNewTodoListTitleType

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

export const setNewTodoListTitle = (newTodoListTitle: string) => ({
    type: types.SET_NEW_TODOLIST_TITLE,
    payload: { newTodoListTitle },
} as const)