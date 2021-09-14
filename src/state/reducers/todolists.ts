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
            return state.filter(tdl => tdl.id !== action.payload.id)
        case types.ADD_TODOLIST:
            return [
                ...state,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    filter: 'All',
                },
            ]
        case types.CHANGE_TODOLIST_TITLE:
            return state.map(tdl => tdl.id === action.payload.id ? { ...tdl, title: action.payload.title } : tdl)
        case types.CHANGE_TODOLIST_FILTER:
            return state.map(tdl => tdl.id === action.payload.id ? { ...tdl, filter: action.payload.filter } : tdl)
        default:
            throw new Error(`I don't understand this type`)
    }
}