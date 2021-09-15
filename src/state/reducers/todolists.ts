import { ToDoListTypes } from '../../App'
import * as types from '../types/todolists'
import * as actions from '../actions/todolists'

export type RemoveTodosType = ReturnType<typeof actions.removeTodoList>
export type AddTodosType = ReturnType<typeof actions.addTodoList>
export type ChangeTodosTitleType = ReturnType<typeof actions.changeTodoListTitle>
export type ChangeTodosFilterType = ReturnType<typeof actions.changeTodoListFilter>
type ActionType = RemoveTodosType | AddTodosType | ChangeTodosTitleType | ChangeTodosFilterType


export const todolistsReducer = (state: Array<ToDoListTypes>, action: ActionType): ToDoListTypes[] => {
    switch (action.type) {
        case types.REMOVE_TODOLIST:
            return state.filter(tdl => tdl.id !== action.payload.todolistId)
        case types.ADD_TODOLIST:
            return [
                ...state,
                {
                    id: action.payload.newTodolistId,
                    title: action.payload.newTodolistTitle,
                    filter: action.payload.newTodolistFilter,
                },
            ]
        case types.CHANGE_TODOLIST_TITLE:
            return state.map(tdl => tdl.id === action.payload.todolistId ?
                { ...tdl, title: action.payload.newTodolistTitle } : tdl)
        case types.CHANGE_TODOLIST_FILTER:
            return state.map(tdl => tdl.id === action.payload.todolistId ? {
                ...tdl,
                filter: action.payload.newFilter,
            } : tdl)
        default:
            throw new Error(`I don't understand this type`)
    }
}